// Client-side API integration for public and admin operations

const API_BASE = '/api'

export function getAuthToken() {
  return localStorage.getItem('admin_token') || ''
}

export function setAuthToken(token) {
  if (token) {
    localStorage.setItem('admin_token', token)
  } else {
    localStorage.removeItem('admin_token')
  }
}

async function request(endpoint, options = {}) {
  const headers = { ...options.headers }
  const token = getAuthToken()
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
    options.body = JSON.stringify(options.body)
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  })

  if (res.status === 401 && endpoint.startsWith('/admin') && !endpoint.includes('/login')) {
    setAuthToken('')
    window.location.href = '/admin/login?expired=1'
    throw new Error('Session expired. Please log in again.')
  }

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || 'An error occurred while communicating with the server.')
  }
  return data
}

// 1. PUBLIC
export const fetchPublicContent = () => request('/public/content')
export const submitContactForm = (payload) => request('/public/contact', { method: 'POST', body: payload })

// 2. AUTH
export const adminLogin = (email, password) => request('/admin/login', { method: 'POST', body: { email, password } })
export const adminLogout = () => request('/admin/logout', { method: 'POST' })
export const getAdminMe = () => request('/admin/me')
export const changePassword = (currentPassword, newPassword) => request('/admin/change-password', { method: 'POST', body: { currentPassword, newPassword } })
export const changeEmail = (newEmail) => request('/admin/change-email', { method: 'POST', body: { newEmail } })
export const getSessions = () => request('/admin/sessions')
export const revokeSession = (sessionId, revokeOthers) => request('/admin/sessions/revoke', { method: 'POST', body: { sessionId, revokeOthers } })
export const forgotPassword = (email) => request('/admin/forgot-password', { method: 'POST', body: { email } })
export const resetPassword = (token, newPassword) => request('/admin/reset-password', { method: 'POST', body: { token, newPassword } })

// 3. ADMIN CONTENT
export const getAdminAllContent = () => request('/admin/all-content')
export const updateSettings = (settings) => request('/admin/settings', { method: 'PUT', body: settings })

// Projects
export const createProject = (project) => request('/admin/projects', { method: 'POST', body: project })
export const updateProject = (id, project) => request(`/admin/projects/${id}`, { method: 'PUT', body: project })
export const deleteProject = (id) => request(`/admin/projects/${id}`, { method: 'DELETE' })
export const reorderProjects = (items) => request('/admin/projects/reorder', { method: 'POST', body: { items } })

// Experiences
export const createExperience = (exp) => request('/admin/experiences', { method: 'POST', body: exp })
export const updateExperience = (id, exp) => request(`/admin/experiences/${id}`, { method: 'PUT', body: exp })
export const deleteExperience = (id) => request(`/admin/experiences/${id}`, { method: 'DELETE' })

// Skills
export const createSkill = (skill) => request('/admin/skills', { method: 'POST', body: skill })
export const updateSkill = (id, skill) => request(`/admin/skills/${id}`, { method: 'PUT', body: skill })
export const deleteSkill = (id) => request(`/admin/skills/${id}`, { method: 'DELETE' })

// Education
export const createEducation = (edu) => request('/admin/education', { method: 'POST', body: edu })
export const updateEducation = (id, edu) => request(`/admin/education/${id}`, { method: 'PUT', body: edu })
export const deleteEducation = (id) => request(`/admin/education/${id}`, { method: 'DELETE' })

// Certifications
export const createCertification = (cert) => request('/admin/certifications', { method: 'POST', body: cert })
export const updateCertification = (id, cert) => request(`/admin/certifications/${id}`, { method: 'PUT', body: cert })
export const deleteCertification = (id) => request(`/admin/certifications/${id}`, { method: 'DELETE' })

// FAQs
export const createFaq = (faq) => request('/admin/faqs', { method: 'POST', body: faq })
export const updateFaq = (id, faq) => request(`/admin/faqs/${id}`, { method: 'PUT', body: faq })
export const deleteFaq = (id) => request(`/admin/faqs/${id}`, { method: 'DELETE' })

// Custom Section Manager
export const createSection = (section) => request('/admin/sections', { method: 'POST', body: section })
export const updateSection = (id, section) => request(`/admin/sections/${id}`, { method: 'PUT', body: section })
export const deleteSection = (id) => request(`/admin/sections/${id}`, { method: 'DELETE' })
export const reorderSections = (items) => request('/admin/sections/reorder', { method: 'POST', body: { items } })

// Media & Resume
export const uploadMediaFile = (file, altText) => {
  const formData = new FormData()
  formData.append('file', file)
  if (altText) formData.append('altText', altText)
  return request('/admin/media/upload', { method: 'POST', body: formData })
}
export const getMediaAssets = () => request('/admin/media')
export const deleteMediaAsset = (id) => request(`/admin/media/${id}`, { method: 'DELETE' })
export const uploadResumePdf = (file) => {
  const formData = new FormData()
  formData.append('resume', file)
  return request('/admin/resume/upload', { method: 'POST', body: formData })
}

// Analytics
export const getAnalyticsDashboard = (days = 30) => request(`/admin/analytics/dashboard?days=${days}`)

// Backup
export const exportBackupJson = () => request('/admin/backup/export')
