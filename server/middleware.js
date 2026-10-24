import multer from 'multer'
import path from 'path'
import fs from 'fs'
import crypto from 'crypto'
import rateLimit from 'express-rate-limit'
import { validateSession } from './auth.js'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const UPLOADS_DIR = path.join(__dirname, '../uploads')
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true })
}

// 1. Authentication Middleware
export function requireAdmin(req, res, next) {
  let token = null

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.cookies && req.cookies.admin_token) {
    token = req.cookies.admin_token
  }

  if (!token) {
    return res.status(401).json({ error: 'Authentication required. Please log in.' })
  }

  const session = validateSession(token)
  if (!session) {
    return res.status(401).json({ error: 'Session expired or invalid. Please log in again.' })
  }

  req.user = {
    id: session.user_id,
    email: session.email,
    role: session.role,
    lastPasswordChange: session.last_password_change,
  }
  req.sessionId = session.id
  next()
}

// 2. Rate Limiters
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Max 10 login attempts per IP per 15 min
  message: { error: 'Too many login attempts. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
})

export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 120, // 120 requests per minute
  standardHeaders: true,
  legacyHeaders: false,
})

// 3. Multer Storage and Validation
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    const safeBase = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 30)
    const randomSuffix = crypto.randomBytes(6).toString('hex')
    cb(null, `${safeBase}-${randomSuffix}${ext}`)
  },
})

const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/svg+xml',
    'image/gif',
  ]
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Unsupported file format. Allowed: PDF, JPG, PNG, WEBP, SVG, GIF.'))
  }
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15 MB
})

// 4. IP Privacy Hasher
const IP_SALT = process.env.JWT_SECRET || 'salt_analytics_privacy_2026'
export function hashIp(ip) {
  if (!ip) return 'unknown'
  return crypto.createHmac('sha256', IP_SALT).update(ip).digest('hex').slice(0, 16)
}
