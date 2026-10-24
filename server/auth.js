import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import db from './db.js'

const JWT_SECRET = process.env.JWT_SECRET || 'default_super_secret_jwt_key_2026'
const SESSION_EXPIRY_HOURS = parseInt(process.env.SESSION_EXPIRY_HOURS || '72', 10)

export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: `${SESSION_EXPIRY_HOURS}h` })
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch {
    return null
  }
}

export function createSession(userId, ipAddress, userAgent) {
  const sessionId = 'ses_' + crypto.randomBytes(16).toString('hex')
  const token = generateToken({ userId, sessionId })
  const expiresAt = new Date(Date.now() + SESSION_EXPIRY_HOURS * 3600 * 1000).toISOString()

  db.prepare(`
    INSERT INTO sessions (id, user_id, token, ip_address, user_agent, expires_at, last_active_at)
    VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
  `).run(sessionId, userId, token, ipAddress || 'Unknown', userAgent || 'Unknown', expiresAt)

  return { sessionId, token, expiresAt }
}

export function validateSession(token) {
  const decoded = verifyToken(token)
  if (!decoded || !decoded.userId || !decoded.sessionId) return null

  const session = db.prepare(`
    SELECT s.*, u.email, u.role, u.last_password_change
    FROM sessions s
    JOIN users u ON s.user_id = u.id
    WHERE s.id = ? AND s.token = ? AND s.expires_at > datetime('now')
  `).get(decoded.sessionId, token)

  if (!session) return null

  // Update last_active_at
  db.prepare("UPDATE sessions SET last_active_at = datetime('now') WHERE id = ?").run(session.id)

  return session
}

export function revokeSession(sessionId, userId) {
  return db.prepare('DELETE FROM sessions WHERE id = ? AND user_id = ?').run(sessionId, userId)
}

export function revokeOtherSessions(userId, currentSessionId) {
  return db.prepare('DELETE FROM sessions WHERE user_id = ? AND id != ?').run(userId, currentSessionId)
}

export function getUserSessions(userId) {
  return db.prepare(`
    SELECT id, ip_address, user_agent, created_at, expires_at, last_active_at
    FROM sessions
    WHERE user_id = ? AND expires_at > datetime('now')
    ORDER BY last_active_at DESC
  `).all(userId)
}

export function authenticateUser(email, password, ipAddress, userAgent) {
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase().trim())
  if (!user) return { error: 'Invalid email or password' }

  const match = bcrypt.compareSync(password, user.password_hash)
  if (!match) return { error: 'Invalid email or password' }

  const session = createSession(user.id, ipAddress, userAgent)
  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      lastPasswordChange: user.last_password_change,
    },
    token: session.token,
    sessionId: session.sessionId,
    expiresAt: session.expiresAt,
  }
}

export function changePassword(userId, currentPassword, newPassword) {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId)
  if (!user) return { error: 'User not found' }

  const match = bcrypt.compareSync(currentPassword, user.password_hash)
  if (!match) return { error: 'Current password is incorrect' }

  if (!newPassword || newPassword.length < 8) {
    return { error: 'New password must be at least 8 characters' }
  }

  const salt = bcrypt.genSaltSync(10)
  const newHash = bcrypt.hashSync(newPassword, salt)
  const now = new Date().toISOString()

  db.prepare(`
    UPDATE users
    SET password_hash = ?, last_password_change = ?, updated_at = ?
    WHERE id = ?
  `).run(newHash, now, now, userId)

  return { success: true, lastPasswordChange: now }
}

export function changeEmail(userId, newEmail) {
  const cleanEmail = newEmail.toLowerCase().trim()
  if (!cleanEmail || !cleanEmail.includes('@')) {
    return { error: 'Please provide a valid email address' }
  }

  const existing = db.prepare('SELECT id FROM users WHERE email = ? AND id != ?').get(cleanEmail, userId)
  if (existing) {
    return { error: 'Email is already in use by another account' }
  }

  db.prepare("UPDATE users SET email = ?, updated_at = datetime('now') WHERE id = ?").run(cleanEmail, userId)
  return { success: true, email: cleanEmail }
}

export function createPasswordRecoveryToken(email) {
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase().trim())
  if (!user) {
    // Return mock success for security so email enumeration is prevented
    return { success: true, token: null }
  }

  const recoveryToken = crypto.randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + 3600 * 1000).toISOString() // 1 hour

  db.prepare(`
    UPDATE users
    SET recovery_token = ?, recovery_token_expires = ?
    WHERE id = ?
  `).run(recoveryToken, expiresAt, user.id)

  return { success: true, token: recoveryToken, email: user.email }
}

export function resetPasswordWithToken(token, newPassword) {
  if (!token || !newPassword || newPassword.length < 8) {
    return { error: 'Invalid token or password is too short (min 8 chars)' }
  }

  const user = db.prepare(`
    SELECT * FROM users
    WHERE recovery_token = ? AND recovery_token_expires > datetime('now')
  `).get(token)

  if (!user) {
    return { error: 'Password reset token is invalid or has expired' }
  }

  const salt = bcrypt.genSaltSync(10)
  const newHash = bcrypt.hashSync(newPassword, salt)
  const now = new Date().toISOString()

  db.prepare(`
    UPDATE users
    SET password_hash = ?, recovery_token = NULL, recovery_token_expires = NULL,
        last_password_change = ?, updated_at = ?
    WHERE id = ?
  `).run(newHash, now, now, user.id)

  // Revoke all existing sessions on password reset
  db.prepare('DELETE FROM sessions WHERE user_id = ?').run(user.id)

  return { success: true }
}
