import express from 'express'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import db from './db.js'
import {
  authenticateUser,
  revokeSession,
  revokeOtherSessions,
  getUserSessions,
  changePassword,
  changeEmail,
  createPasswordRecoveryToken,
  resetPasswordWithToken,
} from './auth.js'
import { requireAdmin, loginLimiter, upload, hashIp } from './middleware.js'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

// ==========================================
// 1. PUBLIC ENDPOINTS
// ==========================================

// Get all published website content in a single fast, unified payload
router.get('/public/content', (req, res) => {
  try {
    const settingsRow = db.prepare('SELECT * FROM site_settings WHERE id = ?').get('default') || {}
    const projects = db.prepare(`
      SELECT * FROM projects
      WHERE status = 'published'
      ORDER BY display_order ASC, id ASC
    `).all().map(p => ({
      ...p,
      highlights: p.highlights ? JSON.parse(p.highlights) : [],
      features: p.features ? JSON.parse(p.features) : [],
      technologies: p.technologies ? JSON.parse(p.technologies) : [],
      metrics: p.metrics ? JSON.parse(p.metrics) : [],
      gallery: p.gallery ? JSON.parse(p.gallery) : [],
      caseStudy: p.caseStudy ? JSON.parse(p.caseStudy) : null,
    }))

    const experiences = db.prepare(`
      SELECT * FROM experiences
      WHERE status = 'published' AND type = 'work'
      ORDER BY display_order ASC, id ASC
    `).all().map(e => ({
      ...e,
      responsibilities: e.responsibilities ? JSON.parse(e.responsibilities) : [],
    }))

    const extracurricular = db.prepare(`
      SELECT * FROM experiences
      WHERE status = 'published' AND type = 'extracurricular'
      ORDER BY display_order ASC, id ASC
    `).all().map(e => ({
      ...e,
      responsibilities: e.responsibilities ? JSON.parse(e.responsibilities) : [],
    }))

    const skills = db.prepare(`
      SELECT * FROM skills
      WHERE status = 'published'
      ORDER BY display_order ASC, id ASC
    `).all().map(s => ({
      ...s,
      items: s.items ? JSON.parse(s.items) : [],
    }))

    const education = db.prepare(`
      SELECT * FROM education
      WHERE status = 'published'
      ORDER BY display_order ASC, id ASC
    `).all()

    const certifications = db.prepare(`
      SELECT * FROM certifications
      WHERE status = 'published'
      ORDER BY display_order ASC, id ASC
    `).all()

    const faqs = db.prepare(`
      SELECT * FROM faqs
      WHERE status = 'published'
      ORDER BY display_order ASC, id ASC
    `).all()

    const customSections = db.prepare(`
      SELECT * FROM custom_sections
      WHERE status = 'published'
      ORDER BY display_order ASC
    `).all().map(cs => ({
      ...cs,
      content_blocks: cs.content_blocks ? JSON.parse(cs.content_blocks) : [],
    }))

    // Parse configs from settings
    const headerConfig = settingsRow.header_config ? JSON.parse(settingsRow.header_config) : []
    const resumeConfig = settingsRow.resume_config ? JSON.parse(settingsRow.resume_config) : {}
    const aboutConfig = settingsRow.about_config ? JSON.parse(settingsRow.about_config) : {}
    const statsConfig = settingsRow.stats_config ? JSON.parse(settingsRow.stats_config) : {}

    res.json({
      settings: {
        siteTitle: settingsRow.site_title,
        metaDescription: settingsRow.meta_description,
        authorName: settingsRow.author_name,
        tagline: settingsRow.tagline,
        headline: settingsRow.headline,
        statement: settingsRow.statement,
        avatarUrl: settingsRow.avatar_url,
        availableStatus: settingsRow.available_status,
        ctaLabel: settingsRow.cta_label,
        ctaLink: settingsRow.cta_link,
        contactEmail: settingsRow.contact_email,
        githubUrl: settingsRow.github_url,
        linkedinUrl: settingsRow.linkedin_url,
        locationText: settingsRow.location_text,
        footerText: settingsRow.footer_text,
        headerConfig,
        resumeConfig,
        aboutConfig,
        statsConfig,
      },
      projects,
      experiences,
      extracurricular,
      skills,
      education,
      certifications,
      faqs,
      customSections,
    })
  } catch (err) {
    console.error('Error fetching public content:', err)
    res.status(500).json({ error: 'Failed to load portfolio content' })
  }
})

// Public Resume Download & Event Tracker
router.get('/public/resume', (req, res) => {
  try {
    const settingsRow = db.prepare('SELECT resume_config FROM site_settings WHERE id = ?').get('default')
    const resumeConfig = settingsRow?.resume_config ? JSON.parse(settingsRow.resume_config) : {}
    const fileUrl = resumeConfig.fileUrl || '/Samarth-Shekhar-Resume-2026.pdf'

    // Record resume download event
    const visitorId = req.query.vid || req.headers['x-visitor-id'] || 'anon'
    const sessionId = req.query.sid || 'ses_resume'
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const ipHash = hashIp(ip)

    db.prepare(`
      INSERT INTO analytics_events (event_type, session_id, visitor_id, path, target_label, target_url, ip_hash)
      VALUES ('resume_download', ?, ?, '/public/resume', 'Resume Download', ?, ?)
    `).run(sessionId, visitorId, fileUrl, ipHash)

    // Redirect to public resume location or upload path
    res.redirect(fileUrl)
  } catch (err) {
    console.error('Error handling resume request:', err)
    res.redirect('/Samarth-Shekhar-Resume-2026.pdf')
  }
})

// Privacy-Conscious Visitor Analytics Tracking
router.post('/analytics/track', (req, res) => {
  try {
    const {
      eventType = 'pageview',
      sessionId,
      visitorId,
      path = '/',
      referrer = '',
      targetLabel = '',
      targetUrl = '',
      deviceType = 'desktop',
      browser = 'Unknown',
      os = 'Unknown',
      durationSeconds = 0,
    } = req.body

    // Do not record if no visitor ID provided or if it's admin traffic
    if (!visitorId || !sessionId) {
      return res.status(200).json({ status: 'ignored' })
    }

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const ipHash = hashIp(ip)

    db.prepare(`
      INSERT INTO analytics_events (
        event_type, session_id, visitor_id, path, referrer,
        target_label, target_url, device_type, browser, os,
        duration_seconds, ip_hash
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      eventType,
      sessionId,
      visitorId,
      path,
      referrer,
      targetLabel,
      targetUrl,
      deviceType,
      browser,
      os,
      durationSeconds,
      ipHash
    )

    res.json({ status: 'recorded' })
  } catch (err) {
    console.error('Analytics track error:', err)
    res.status(200).json({ status: 'ignored' }) // Fail silently so public experience is unaffected
  }
})

// Public Contact Form Submission
router.post('/public/contact', (req, res) => {
  try {
    const { name, email, message, subject } = req.body
    if (!email || !message) {
      return res.status(400).json({ error: 'Email and message are required' })
    }

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const ipHash = hashIp(ip)

    // Record contact submission event in analytics
    db.prepare(`
      INSERT INTO analytics_events (event_type, session_id, visitor_id, path, target_label, target_url, ip_hash)
      VALUES ('contact_submit', 'contact_form', ?, '/contact', ?, ?, ?)
    `).run(name || 'Anonymous', subject || 'Portfolio Contact Form', email, ipHash)

    res.json({ success: true, message: 'Message recorded successfully!' })
  } catch (err) {
    console.error('Contact submit error:', err)
    res.status(500).json({ error: 'Failed to submit message' })
  }
})

// ==========================================
// 2. ADMIN AUTHENTICATION & SECURITY
// ==========================================

router.post('/admin/login', loginLimiter, (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  const userAgent = req.headers['user-agent']

  const result = authenticateUser(email, password, ip, userAgent)
  if (result.error) {
    return res.status(401).json({ error: result.error })
  }

  // Set HTTP-Only Cookie for additional security
  res.cookie('admin_token', result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 72 * 3600 * 1000,
  })

  res.json({
    user: result.user,
    token: result.token,
    sessionId: result.sessionId,
    expiresAt: result.expiresAt,
  })
})

router.post('/admin/logout', requireAdmin, (req, res) => {
  revokeSession(req.sessionId, req.user.id)
  res.clearCookie('admin_token')
  res.json({ success: true, message: 'Logged out successfully' })
})

router.get('/admin/me', requireAdmin, (req, res) => {
  const user = db.prepare('SELECT id, email, role, last_password_change, created_at FROM users WHERE id = ?').get(req.user.id)
  const activeSessions = getUserSessions(req.user.id)

  res.json({
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      lastPasswordChange: user.last_password_change,
      createdAt: user.created_at,
    },
    activeSessionsCount: activeSessions.length,
    currentSessionId: req.sessionId,
  })
})

router.post('/admin/change-password', requireAdmin, (req, res) => {
  const { currentPassword, newPassword } = req.body
  const result = changePassword(req.user.id, currentPassword, newPassword)

  if (result.error) {
    return res.status(400).json({ error: result.error })
  }

  res.json({ success: true, message: 'Password updated successfully', lastPasswordChange: result.lastPasswordChange })
})

router.post('/admin/change-email', requireAdmin, (req, res) => {
  const { newEmail } = req.body
  const result = changeEmail(req.user.id, newEmail)

  if (result.error) {
    return res.status(400).json({ error: result.error })
  }

  res.json({ success: true, message: 'Email address updated successfully', email: result.email })
})

router.get('/admin/sessions', requireAdmin, (req, res) => {
  const sessions = getUserSessions(req.user.id)
  res.json({ sessions, currentSessionId: req.sessionId })
})

router.post('/admin/sessions/revoke', requireAdmin, (req, res) => {
  const { sessionId, revokeOthers } = req.body

  if (revokeOthers) {
    revokeOtherSessions(req.user.id, req.sessionId)
    return res.json({ success: true, message: 'All other active sessions revoked' })
  }

  if (sessionId) {
    revokeSession(sessionId, req.user.id)
    return res.json({ success: true, message: 'Session revoked' })
  }

  res.status(400).json({ error: 'Please specify sessionId or revokeOthers' })
})

// Password Reset Flow
router.post('/admin/forgot-password', loginLimiter, (req, res) => {
  const { email } = req.body
  if (!email) return res.status(400).json({ error: 'Email is required' })

  const result = createPasswordRecoveryToken(email)
  // In development, return the token directly so the admin can test recovery immediately without an SMTP service
  res.json({
    success: true,
    message: 'If the account exists, password recovery instructions have been prepared.',
    recoveryToken: process.env.NODE_ENV !== 'production' ? result.token : undefined,
  })
})

router.post('/admin/reset-password', (req, res) => {
  const { token, newPassword } = req.body
  const result = resetPasswordWithToken(token, newPassword)

  if (result.error) {
    return res.status(400).json({ error: result.error })
  }

  res.json({ success: true, message: 'Password has been reset. You may now log in.' })
})

// ==========================================
// 3. ADMIN CONTENT CRUD & SECTION BUILDER
// ==========================================

// Get ALL content for admin dashboard (including drafts, unpublished items)
router.get('/admin/all-content', requireAdmin, (req, res) => {
  try {
    const settingsRow = db.prepare('SELECT * FROM site_settings WHERE id = ?').get('default') || {}
    const projects = db.prepare('SELECT * FROM projects ORDER BY display_order ASC, id ASC').all().map(p => ({
      ...p,
      highlights: p.highlights ? JSON.parse(p.highlights) : [],
      features: p.features ? JSON.parse(p.features) : [],
      technologies: p.technologies ? JSON.parse(p.technologies) : [],
      metrics: p.metrics ? JSON.parse(p.metrics) : [],
      gallery: p.gallery ? JSON.parse(p.gallery) : [],
      caseStudy: p.caseStudy ? JSON.parse(p.caseStudy) : null,
    }))

    const experiences = db.prepare('SELECT * FROM experiences ORDER BY display_order ASC, id ASC').all().map(e => ({
      ...e,
      responsibilities: e.responsibilities ? JSON.parse(e.responsibilities) : [],
    }))

    const skills = db.prepare('SELECT * FROM skills ORDER BY display_order ASC, id ASC').all().map(s => ({
      ...s,
      items: s.items ? JSON.parse(s.items) : [],
    }))

    const education = db.prepare('SELECT * FROM education ORDER BY display_order ASC, id ASC').all()
    const certifications = db.prepare('SELECT * FROM certifications ORDER BY display_order ASC, id ASC').all()
    const faqs = db.prepare('SELECT * FROM faqs ORDER BY display_order ASC, id ASC').all()
    const customSections = db.prepare('SELECT * FROM custom_sections ORDER BY display_order ASC').all().map(cs => ({
      ...cs,
      content_blocks: cs.content_blocks ? JSON.parse(cs.content_blocks) : [],
    }))

    const media = db.prepare('SELECT * FROM media_assets ORDER BY created_at DESC').all()

    res.json({
      settings: {
        ...settingsRow,
        header_config: settingsRow.header_config ? JSON.parse(settingsRow.header_config) : [],
        resume_config: settingsRow.resume_config ? JSON.parse(settingsRow.resume_config) : {},
        about_config: settingsRow.about_config ? JSON.parse(settingsRow.about_config) : {},
        stats_config: settingsRow.stats_config ? JSON.parse(settingsRow.stats_config) : {},
      },
      projects,
      experiences,
      skills,
      education,
      certifications,
      faqs,
      customSections,
      media,
    })
  } catch (err) {
    console.error('Admin all-content error:', err)
    res.status(500).json({ error: 'Failed to load content for dashboard' })
  }
})

// Update Site Settings & Configurations
router.put('/admin/settings', requireAdmin, (req, res) => {
  try {
    const {
      site_title, meta_description, author_name, tagline, headline,
      statement, avatar_url, available_status, cta_label, cta_link,
      contact_email, github_url, linkedin_url, location_text, footer_text,
      header_config, resume_config, about_config, stats_config
    } = req.body

    db.prepare(`
      UPDATE site_settings SET
        site_title = COALESCE(?, site_title),
        meta_description = COALESCE(?, meta_description),
        author_name = COALESCE(?, author_name),
        tagline = COALESCE(?, tagline),
        headline = COALESCE(?, headline),
        statement = COALESCE(?, statement),
        avatar_url = COALESCE(?, avatar_url),
        available_status = COALESCE(?, available_status),
        cta_label = COALESCE(?, cta_label),
        cta_link = COALESCE(?, cta_link),
        contact_email = COALESCE(?, contact_email),
        github_url = COALESCE(?, github_url),
        linkedin_url = COALESCE(?, linkedin_url),
        location_text = COALESCE(?, location_text),
        footer_text = COALESCE(?, footer_text),
        header_config = COALESCE(?, header_config),
        resume_config = COALESCE(?, resume_config),
        about_config = COALESCE(?, about_config),
        stats_config = COALESCE(?, stats_config),
        updated_at = datetime('now')
      WHERE id = 'default'
    `).run(
      site_title, meta_description, author_name, tagline, headline,
      statement, avatar_url, available_status, cta_label, cta_link,
      contact_email, github_url, linkedin_url, location_text, footer_text,
      header_config ? JSON.stringify(header_config) : null,
      resume_config ? JSON.stringify(resume_config) : null,
      about_config ? JSON.stringify(about_config) : null,
      stats_config ? JSON.stringify(stats_config) : null
    )

    res.json({ success: true, message: 'Settings saved successfully' })
  } catch (err) {
    console.error('Update settings error:', err)
    res.status(500).json({ error: 'Failed to update settings' })
  }
})

// PROJECTS CRUD
router.post('/admin/projects', requireAdmin, (req, res) => {
  try {
    const {
      title, subtitle, tagline, category, year, kind = 'project',
      description, highlights = [], features = [], technologies = [],
      metrics = [], github = '', liveDemo = '', image = '', previewImage = '',
      gallery = [], caseStudy = null, status = 'published', featured = 1
    } = req.body

    if (!title) return res.status(400).json({ error: 'Title is required' })

    const maxOrder = db.prepare('SELECT MAX(display_order) as m FROM projects').get().m || 0

    const result = db.prepare(`
      INSERT INTO projects (
        title, subtitle, tagline, category, year, kind, description,
        highlights, features, technologies, metrics, github, liveDemo,
        image, previewImage, gallery, caseStudy, status, featured, display_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      title, subtitle, tagline, category, year, kind, description,
      JSON.stringify(highlights), JSON.stringify(features),
      JSON.stringify(technologies), JSON.stringify(metrics),
      github, liveDemo, image, previewImage, JSON.stringify(gallery),
      caseStudy ? JSON.stringify(caseStudy) : null,
      status, featured ? 1 : 0, maxOrder + 1
    )

    res.json({ success: true, id: result.lastInsertRowid, message: 'Project created' })
  } catch (err) {
    console.error('Create project error:', err)
    res.status(500).json({ error: 'Failed to create project' })
  }
})

router.put('/admin/projects/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params
    const {
      title, subtitle, tagline, category, year, kind, description,
      highlights, features, technologies, metrics, github, liveDemo,
      image, previewImage, gallery, caseStudy, status, featured, display_order
    } = req.body

    db.prepare(`
      UPDATE projects SET
        title = COALESCE(?, title),
        subtitle = COALESCE(?, subtitle),
        tagline = COALESCE(?, tagline),
        category = COALESCE(?, category),
        year = COALESCE(?, year),
        kind = COALESCE(?, kind),
        description = COALESCE(?, description),
        highlights = COALESCE(?, highlights),
        features = COALESCE(?, features),
        technologies = COALESCE(?, technologies),
        metrics = COALESCE(?, metrics),
        github = COALESCE(?, github),
        liveDemo = COALESCE(?, liveDemo),
        image = COALESCE(?, image),
        previewImage = COALESCE(?, previewImage),
        gallery = COALESCE(?, gallery),
        caseStudy = COALESCE(?, caseStudy),
        status = COALESCE(?, status),
        featured = COALESCE(?, featured),
        display_order = COALESCE(?, display_order),
        updated_at = datetime('now')
      WHERE id = ?
    `).run(
      title, subtitle, tagline, category, year, kind, description,
      highlights ? JSON.stringify(highlights) : null,
      features ? JSON.stringify(features) : null,
      technologies ? JSON.stringify(technologies) : null,
      metrics ? JSON.stringify(metrics) : null,
      github, liveDemo, image, previewImage,
      gallery ? JSON.stringify(gallery) : null,
      caseStudy !== undefined ? (caseStudy ? JSON.stringify(caseStudy) : null) : null,
      status, featured !== undefined ? (featured ? 1 : 0) : null,
      display_order, id
    )

    res.json({ success: true, message: 'Project updated' })
  } catch (err) {
    console.error('Update project error:', err)
    res.status(500).json({ error: 'Failed to update project' })
  }
})

router.delete('/admin/projects/:id', requireAdmin, (req, res) => {
  try {
    db.prepare('DELETE FROM projects WHERE id = ?').run(req.params.id)
    res.json({ success: true, message: 'Project deleted' })
  } catch (err) {
    console.error('Delete project error:', err)
    res.status(500).json({ error: 'Failed to delete project' })
  }
})

router.post('/admin/projects/reorder', requireAdmin, (req, res) => {
  try {
    const { items } = req.body // Array of { id, order }
    if (!Array.isArray(items)) return res.status(400).json({ error: 'Items array required' })

    const update = db.prepare('UPDATE projects SET display_order = ? WHERE id = ?')
    const txn = db.transaction((rows) => {
      for (const row of rows) update.run(row.order, row.id)
    })
    txn(items)

    res.json({ success: true, message: 'Projects reordered' })
  } catch (err) {
    console.error('Reorder error:', err)
    res.status(500).json({ error: 'Failed to reorder projects' })
  }
})

// EXPERIENCES & EXTRACURRICULAR CRUD
router.post('/admin/experiences', requireAdmin, (req, res) => {
  try {
    const {
      type = 'work', role, company, duration = '', start_date = '', end_date = '',
      responsibilities = [], description = '', status = 'published'
    } = req.body

    if (!role || !company) return res.status(400).json({ error: 'Role and company are required' })

    const maxOrder = db.prepare('SELECT MAX(display_order) as m FROM experiences WHERE type = ?').get(type).m || 0

    const result = db.prepare(`
      INSERT INTO experiences (
        type, role, company, duration, start_date, end_date,
        responsibilities, description, status, display_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      type, role, company, duration, start_date, end_date,
      JSON.stringify(responsibilities), description, status, maxOrder + 1
    )

    res.json({ success: true, id: result.lastInsertRowid, message: 'Experience added' })
  } catch (err) {
    console.error('Create experience error:', err)
    res.status(500).json({ error: 'Failed to add experience' })
  }
})

router.put('/admin/experiences/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params
    const {
      type, role, company, duration, start_date, end_date,
      responsibilities, description, status, display_order
    } = req.body

    db.prepare(`
      UPDATE experiences SET
        type = COALESCE(?, type),
        role = COALESCE(?, role),
        company = COALESCE(?, company),
        duration = COALESCE(?, duration),
        start_date = COALESCE(?, start_date),
        end_date = COALESCE(?, end_date),
        responsibilities = COALESCE(?, responsibilities),
        description = COALESCE(?, description),
        status = COALESCE(?, status),
        display_order = COALESCE(?, display_order),
        updated_at = datetime('now')
      WHERE id = ?
    `).run(
      type, role, company, duration, start_date, end_date,
      responsibilities ? JSON.stringify(responsibilities) : null,
      description, status, display_order, id
    )

    res.json({ success: true, message: 'Experience updated' })
  } catch (err) {
    console.error('Update experience error:', err)
    res.status(500).json({ error: 'Failed to update experience' })
  }
})

router.delete('/admin/experiences/:id', requireAdmin, (req, res) => {
  try {
    db.prepare('DELETE FROM experiences WHERE id = ?').run(req.params.id)
    res.json({ success: true, message: 'Experience deleted' })
  } catch (err) {
    console.error('Delete experience error:', err)
    res.status(500).json({ error: 'Failed to delete experience' })
  }
})

// SKILLS CRUD
router.post('/admin/skills', requireAdmin, (req, res) => {
  try {
    const { category, items = [], status = 'published' } = req.body
    if (!category) return res.status(400).json({ error: 'Category is required' })

    const maxOrder = db.prepare('SELECT MAX(display_order) as m FROM skills').get().m || 0

    const result = db.prepare(`
      INSERT INTO skills (category, items, status, display_order)
      VALUES (?, ?, ?, ?)
    `).run(category, JSON.stringify(items), status, maxOrder + 1)

    res.json({ success: true, id: result.lastInsertRowid, message: 'Skill group added' })
  } catch (err) {
    console.error('Create skill error:', err)
    res.status(500).json({ error: 'Failed to add skill group' })
  }
})

router.put('/admin/skills/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params
    const { category, items, status, display_order } = req.body

    db.prepare(`
      UPDATE skills SET
        category = COALESCE(?, category),
        items = COALESCE(?, items),
        status = COALESCE(?, status),
        display_order = COALESCE(?, display_order),
        updated_at = datetime('now')
      WHERE id = ?
    `).run(
      category,
      items ? JSON.stringify(items) : null,
      status, display_order, id
    )

    res.json({ success: true, message: 'Skill group updated' })
  } catch (err) {
    console.error('Update skill error:', err)
    res.status(500).json({ error: 'Failed to update skill group' })
  }
})

router.delete('/admin/skills/:id', requireAdmin, (req, res) => {
  try {
    db.prepare('DELETE FROM skills WHERE id = ?').run(req.params.id)
    res.json({ success: true, message: 'Skill group deleted' })
  } catch (err) {
    console.error('Delete skill error:', err)
    res.status(500).json({ error: 'Failed to delete skill group' })
  }
})

// EDUCATION CRUD
router.post('/admin/education', requireAdmin, (req, res) => {
  try {
    const { institution, degree, division = '', year = '', description = '', status = 'published' } = req.body
    if (!institution || !degree) return res.status(400).json({ error: 'Institution and degree required' })

    const result = db.prepare(`
      INSERT INTO education (institution, degree, division, year, description, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(institution, degree, division, year, description, status)

    res.json({ success: true, id: result.lastInsertRowid, message: 'Education added' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to add education' })
  }
})

router.put('/admin/education/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params
    const { institution, degree, division, year, description, status } = req.body
    db.prepare(`
      UPDATE education SET
        institution = COALESCE(?, institution),
        degree = COALESCE(?, degree),
        division = COALESCE(?, division),
        year = COALESCE(?, year),
        description = COALESCE(?, description),
        status = COALESCE(?, status),
        updated_at = datetime('now')
      WHERE id = ?
    `).run(institution, degree, division, year, description, status, id)

    res.json({ success: true, message: 'Education updated' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to update education' })
  }
})

router.delete('/admin/education/:id', requireAdmin, (req, res) => {
  try {
    db.prepare('DELETE FROM education WHERE id = ?').run(req.params.id)
    res.json({ success: true, message: 'Education deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete education' })
  }
})

// CERTIFICATIONS CRUD
router.post('/admin/certifications', requireAdmin, (req, res) => {
  try {
    const { title, issuer, platform = '', url = '', status = 'published' } = req.body
    if (!title || !issuer) return res.status(400).json({ error: 'Title and issuer required' })

    const maxOrder = db.prepare('SELECT MAX(display_order) as m FROM certifications').get().m || 0

    const result = db.prepare(`
      INSERT INTO certifications (title, issuer, platform, url, status, display_order)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(title, issuer, platform, url, status, maxOrder + 1)

    res.json({ success: true, id: result.lastInsertRowid, message: 'Certification added' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to add certification' })
  }
})

router.put('/admin/certifications/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params
    const { title, issuer, platform, url, status, display_order } = req.body
    db.prepare(`
      UPDATE certifications SET
        title = COALESCE(?, title),
        issuer = COALESCE(?, issuer),
        platform = COALESCE(?, platform),
        url = COALESCE(?, url),
        status = COALESCE(?, status),
        display_order = COALESCE(?, display_order),
        updated_at = datetime('now')
      WHERE id = ?
    `).run(title, issuer, platform, url, status, display_order, id)

    res.json({ success: true, message: 'Certification updated' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to update certification' })
  }
})

router.delete('/admin/certifications/:id', requireAdmin, (req, res) => {
  try {
    db.prepare('DELETE FROM certifications WHERE id = ?').run(req.params.id)
    res.json({ success: true, message: 'Certification deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete certification' })
  }
})

// FAQS CRUD
router.post('/admin/faqs', requireAdmin, (req, res) => {
  try {
    const { question, answer, status = 'published' } = req.body
    if (!question || !answer) return res.status(400).json({ error: 'Question and answer required' })

    const maxOrder = db.prepare('SELECT MAX(display_order) as m FROM faqs').get().m || 0

    const result = db.prepare(`
      INSERT INTO faqs (question, answer, status, display_order)
      VALUES (?, ?, ?, ?)
    `).run(question, answer, status, maxOrder + 1)

    res.json({ success: true, id: result.lastInsertRowid, message: 'FAQ added' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to add FAQ' })
  }
})

router.put('/admin/faqs/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params
    const { question, answer, status, display_order } = req.body
    db.prepare(`
      UPDATE faqs SET
        question = COALESCE(?, question),
        answer = COALESCE(?, answer),
        status = COALESCE(?, status),
        display_order = COALESCE(?, display_order),
        updated_at = datetime('now')
      WHERE id = ?
    `).run(question, answer, status, display_order, id)

    res.json({ success: true, message: 'FAQ updated' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to update FAQ' })
  }
})

router.delete('/admin/faqs/:id', requireAdmin, (req, res) => {
  try {
    db.prepare('DELETE FROM faqs WHERE id = ?').run(req.params.id)
    res.json({ success: true, message: 'FAQ deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete FAQ' })
  }
})

// ==========================================
// 4. DYNAMIC SECTION MANAGER (WEBSITE BUILDER)
// ==========================================

router.post('/admin/sections', requireAdmin, (req, res) => {
  try {
    const {
      title, badge_title = '', description = '',
      content_blocks = [], status = 'draft',
      nav_label = '', show_in_nav = 1
    } = req.body

    if (!title) return res.status(400).json({ error: 'Section title is required' })

    const slug = 'sec_' + title.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 30) + '_' + crypto.randomBytes(3).toString('hex')
    const maxOrder = db.prepare('SELECT MAX(display_order) as m FROM custom_sections').get().m || 0

    db.prepare(`
      INSERT INTO custom_sections (
        id, title, badge_title, description, content_blocks, status, display_order, nav_label, show_in_nav
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      slug, title, badge_title || title.toUpperCase(), description,
      JSON.stringify(content_blocks), status, maxOrder + 1,
      nav_label || title, show_in_nav ? 1 : 0
    )

    res.json({ success: true, id: slug, message: 'Custom section created successfully' })
  } catch (err) {
    console.error('Create section error:', err)
    res.status(500).json({ error: 'Failed to create section' })
  }
})

router.put('/admin/sections/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params
    const {
      title, badge_title, description, content_blocks,
      status, display_order, nav_label, show_in_nav
    } = req.body

    db.prepare(`
      UPDATE custom_sections SET
        title = COALESCE(?, title),
        badge_title = COALESCE(?, badge_title),
        description = COALESCE(?, description),
        content_blocks = COALESCE(?, content_blocks),
        status = COALESCE(?, status),
        display_order = COALESCE(?, display_order),
        nav_label = COALESCE(?, nav_label),
        show_in_nav = COALESCE(?, show_in_nav),
        updated_at = datetime('now')
      WHERE id = ?
    `).run(
      title, badge_title, description,
      content_blocks ? JSON.stringify(content_blocks) : null,
      status, display_order, nav_label,
      show_in_nav !== undefined ? (show_in_nav ? 1 : 0) : null,
      id
    )

    res.json({ success: true, message: 'Section updated successfully' })
  } catch (err) {
    console.error('Update section error:', err)
    res.status(500).json({ error: 'Failed to update section' })
  }
})

router.delete('/admin/sections/:id', requireAdmin, (req, res) => {
  try {
    db.prepare('DELETE FROM custom_sections WHERE id = ?').run(req.params.id)
    res.json({ success: true, message: 'Section deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete section' })
  }
})

router.post('/admin/sections/reorder', requireAdmin, (req, res) => {
  try {
    const { items } = req.body
    if (!Array.isArray(items)) return res.status(400).json({ error: 'Items array required' })

    const update = db.prepare('UPDATE custom_sections SET display_order = ? WHERE id = ?')
    const txn = db.transaction((rows) => {
      for (const row of rows) update.run(row.order, row.id)
    })
    txn(items)

    res.json({ success: true, message: 'Sections reordered' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to reorder sections' })
  }
})

// ==========================================
// 5. MEDIA LIBRARY & RESUME MANAGEMENT
// ==========================================

router.post('/admin/media/upload', requireAdmin, upload.single('file'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' })

    const fileUrl = `/uploads/${req.file.filename}`
    const id = 'med_' + crypto.randomBytes(8).toString('hex')
    const isPdf = req.file.mimetype === 'application/pdf'
    const category = isPdf ? 'resume' : 'image'

    db.prepare(`
      INSERT INTO media_assets (id, filename, original_name, url, mimetype, size, alt_text, category)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      req.file.filename,
      req.file.originalname,
      fileUrl,
      req.file.mimetype,
      req.file.size,
      req.body.altText || req.file.originalname,
      category
    )

    res.json({
      success: true,
      media: {
        id,
        filename: req.file.filename,
        originalName: req.file.originalname,
        url: fileUrl,
        mimetype: req.file.mimetype,
        size: req.file.size,
        category,
      },
      message: 'File uploaded successfully',
    })
  } catch (err) {
    console.error('Media upload error:', err)
    res.status(500).json({ error: 'Failed to upload media file' })
  }
})

router.get('/admin/media', requireAdmin, (req, res) => {
  try {
    const media = db.prepare('SELECT * FROM media_assets ORDER BY created_at DESC').all()
    res.json({ media })
  } catch (err) {
    res.status(500).json({ error: 'Failed to list media' })
  }
})

router.delete('/admin/media/:id', requireAdmin, (req, res) => {
  try {
    const asset = db.prepare('SELECT * FROM media_assets WHERE id = ?').get(req.params.id)
    if (asset) {
      const filePath = path.join(__dirname, '../uploads', asset.filename)
      if (fs.existsSync(filePath)) {
        try { fs.unlinkSync(filePath) } catch {}
      }
      db.prepare('DELETE FROM media_assets WHERE id = ?').run(req.params.id)
    }
    res.json({ success: true, message: 'Asset deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete media asset' })
  }
})

// Upload and set Active Resume PDF
router.post('/admin/resume/upload', requireAdmin, upload.single('resume'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No resume PDF provided' })
    if (req.file.mimetype !== 'application/pdf') {
      return res.status(400).json({ error: 'File must be a valid PDF document' })
    }

    const fileUrl = `/uploads/${req.file.filename}`
    const id = 'med_resume_' + crypto.randomBytes(6).toString('hex')
    const now = new Date().toISOString().split('T')[0]

    // Save to media library
    db.prepare(`
      INSERT INTO media_assets (id, filename, original_name, url, mimetype, size, alt_text, category)
      VALUES (?, ?, ?, ?, ?, ?, 'Official Resume PDF', 'resume')
    `).run(id, req.file.filename, req.file.originalname, fileUrl, req.file.mimetype, req.file.size)

    // Update site_settings.resume_config
    const settingsRow = db.prepare('SELECT resume_config FROM site_settings WHERE id = ?').get('default')
    const currentConfig = settingsRow?.resume_config ? JSON.parse(settingsRow.resume_config) : {}

    const updatedConfig = {
      ...currentConfig,
      fileUrl,
      filename: req.file.originalname,
      buttonPublished: true,
      lastUpdated: now,
    }

    db.prepare(`
      UPDATE site_settings SET
        resume_config = ?,
        updated_at = datetime('now')
      WHERE id = 'default'
    `).run(JSON.stringify(updatedConfig))

    res.json({
      success: true,
      resumeConfig: updatedConfig,
      message: 'Resume PDF uploaded and set as active published resume!',
    })
  } catch (err) {
    console.error('Resume upload error:', err)
    res.status(500).json({ error: 'Failed to upload resume PDF' })
  }
})

// ==========================================
// 6. VISITOR ANALYTICS & INSIGHTS
// ==========================================

router.get('/admin/analytics/dashboard', requireAdmin, (req, res) => {
  try {
    const days = parseInt(req.query.days || '30', 10)
    const dateLimit = `datetime('now', '-${days} days')`

    // Summary counts
    const totalPageviews = db.prepare(`
      SELECT COUNT(*) as count FROM analytics_events
      WHERE event_type = 'pageview' AND created_at >= ${dateLimit}
    `).get().count

    const uniqueVisitors = db.prepare(`
      SELECT COUNT(DISTINCT visitor_id) as count FROM analytics_events
      WHERE created_at >= ${dateLimit}
    `).get().count

    const totalSessions = db.prepare(`
      SELECT COUNT(DISTINCT session_id) as count FROM analytics_events
      WHERE created_at >= ${dateLimit}
    `).get().count

    const resumeDownloads = db.prepare(`
      SELECT COUNT(*) as count FROM analytics_events
      WHERE event_type IN ('resume_download', 'resume_view') AND created_at >= ${dateLimit}
    `).get().count

    const outboundClicks = db.prepare(`
      SELECT COUNT(*) as count FROM analytics_events
      WHERE event_type = 'click_external' AND created_at >= ${dateLimit}
    `).get().count

    const contactSubmissions = db.prepare(`
      SELECT COUNT(*) as count FROM analytics_events
      WHERE event_type = 'contact_submit' AND created_at >= ${dateLimit}
    `).get().count

    const avgEngagement = db.prepare(`
      SELECT AVG(duration_seconds) as avg_duration FROM analytics_events
      WHERE duration_seconds > 0 AND created_at >= ${dateLimit}
    `).get().avg_duration || 45

    // Daily Timeline
    const dailyViews = db.prepare(`
      SELECT strftime('%Y-%m-%d', created_at) as date,
             COUNT(*) as views,
             COUNT(DISTINCT visitor_id) as visitors
      FROM analytics_events
      WHERE created_at >= ${dateLimit}
      GROUP BY strftime('%Y-%m-%d', created_at)
      ORDER BY date ASC
    `).all()

    // Top Pages
    const topPages = db.prepare(`
      SELECT path, COUNT(*) as views
      FROM analytics_events
      WHERE event_type = 'pageview' AND created_at >= ${dateLimit}
      GROUP BY path
      ORDER BY views DESC
      LIMIT 10
    `).all()

    // Top Referring Sources
    const topReferrers = db.prepare(`
      SELECT COALESCE(NULLIF(referrer, ''), 'Direct / Bookmark') as source, COUNT(*) as count
      FROM analytics_events
      WHERE created_at >= ${dateLimit}
      GROUP BY source
      ORDER BY count DESC
      LIMIT 8
    `).all()

    // Device breakdown
    const devices = db.prepare(`
      SELECT COALESCE(NULLIF(device_type, ''), 'Desktop') as device, COUNT(*) as count
      FROM analytics_events
      WHERE created_at >= ${dateLimit}
      GROUP BY device
      ORDER BY count DESC
    `).all()

    // Top external link clicks
    const topExternalClicks = db.prepare(`
      SELECT target_label, target_url, COUNT(*) as count
      FROM analytics_events
      WHERE event_type = 'click_external' AND created_at >= ${dateLimit}
      GROUP BY target_label, target_url
      ORDER BY count DESC
      LIMIT 8
    `).all()

    // Recent events stream
    const recentEvents = db.prepare(`
      SELECT id, event_type, path, target_label, device_type, browser, created_at
      FROM analytics_events
      ORDER BY id DESC
      LIMIT 15
    `).all()

    res.json({
      summary: {
        totalPageviews,
        uniqueVisitors,
        totalSessions,
        resumeDownloads,
        outboundClicks,
        contactSubmissions,
        avgEngagementSeconds: Math.round(avgEngagement),
      },
      dailyViews,
      topPages,
      topReferrers,
      devices,
      topExternalClicks,
      recentEvents,
      rangeDays: days,
    })
  } catch (err) {
    console.error('Analytics dashboard error:', err)
    res.status(500).json({ error: 'Failed to fetch analytics' })
  }
})

// Export CSV of Analytics Events
router.get('/admin/analytics/export', requireAdmin, (req, res) => {
  try {
    const events = db.prepare(`
      SELECT id, event_type, session_id, visitor_id, path, referrer,
             target_label, target_url, device_type, browser, duration_seconds, created_at
      FROM analytics_events
      ORDER BY id DESC
      LIMIT 2000
    `).all()

    let csv = 'ID,Event Type,Session ID,Visitor Hash,Path,Referrer,Target Label,Target URL,Device,Browser,Duration (s),Timestamp\n'
    for (const e of events) {
      const clean = (val) => `"${String(val || '').replace(/"/g, '""')}"`
      csv += `${e.id},${clean(e.event_type)},${clean(e.session_id)},${clean(e.visitor_id)},${clean(e.path)},${clean(e.referrer)},${clean(e.target_label)},${clean(e.target_url)},${clean(e.device_type)},${clean(e.browser)},${e.duration_seconds},${clean(e.created_at)}\n`
    }

    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', `attachment; filename=portfolio-analytics-${new Date().toISOString().split('T')[0]}.csv`)
    res.send(csv)
  } catch (err) {
    res.status(500).json({ error: 'Failed to export analytics' })
  }
})

// ==========================================
// 7. BACKUP & EXPORT/IMPORT
// ==========================================

router.get('/admin/backup/export', requireAdmin, (req, res) => {
  try {
    const backup = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      site_settings: db.prepare('SELECT * FROM site_settings').all(),
      projects: db.prepare('SELECT * FROM projects').all(),
      experiences: db.prepare('SELECT * FROM experiences').all(),
      skills: db.prepare('SELECT * FROM skills').all(),
      education: db.prepare('SELECT * FROM education').all(),
      certifications: db.prepare('SELECT * FROM certifications').all(),
      faqs: db.prepare('SELECT * FROM faqs').all(),
      custom_sections: db.prepare('SELECT * FROM custom_sections').all(),
      media_assets: db.prepare('SELECT * FROM media_assets').all(),
    }

    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Content-Disposition', `attachment; filename=portfolio-backup-${new Date().toISOString().split('T')[0]}.json`)
    res.send(JSON.stringify(backup, null, 2))
  } catch (err) {
    res.status(500).json({ error: 'Failed to create backup' })
  }
})

export default router
