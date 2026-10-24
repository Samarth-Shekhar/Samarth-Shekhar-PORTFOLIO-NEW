import readline from 'readline'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import db, { initDatabase } from '../db.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '../../.env') })
initDatabase()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

console.log('=== SAMARTH PORTFOLIO CMS ADMIN SETUP ===')

const defaultEmail = process.env.ADMIN_EMAIL || 'samarthshekharmj@gmail.com'

rl.question(`Enter Admin Email [default: ${defaultEmail}]: `, (inputEmail) => {
  const email = (inputEmail.trim() || defaultEmail).toLowerCase()
  rl.question('Enter New Admin Password (min 8 chars): ', (password) => {
    if (!password || password.length < 8) {
      console.error('Password must be at least 8 characters long.')
      rl.close()
      process.exit(1)
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    const now = new Date().toISOString()

    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email)
    if (existing) {
      db.prepare(`
        UPDATE users
        SET password_hash = ?, last_password_change = ?, updated_at = ?
        WHERE id = ?
      `).run(hash, now, now, existing.id)
      console.log(`[Success] Updated password for existing admin: ${email}`)
    } else {
      const id = 'usr_admin_' + Date.now()
      db.prepare(`
        INSERT INTO users (id, email, password_hash, role, last_password_change)
        VALUES (?, ?, ?, 'admin', ?)
      `).run(id, email, hash, now)
      console.log(`[Success] Created new admin user: ${email}`)
    }

    rl.close()
    process.exit(0)
  })
})
