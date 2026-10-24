import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Home, User, FolderGit2, Briefcase, Wrench,
  GraduationCap, Award, Layers, Image as ImageIcon, FileText,
  Navigation, Settings, BarChart3, ShieldCheck, Plus, Trash2,
  Edit3, Save, ExternalLink, LogOut, RefreshCw, Copy, Check,
  Eye, Download, ArrowUp, ArrowDown, UploadCloud, X, Menu, AlertCircle
} from 'lucide-react'
import {
  getAdminAllContent, updateSettings, createProject, updateProject, deleteProject, reorderProjects,
  createExperience, updateExperience, deleteExperience,
  createSkill, updateSkill, deleteSkill,
  createEducation, updateEducation, deleteEducation,
  createCertification, updateCertification, deleteCertification,
  createFaq, updateFaq, deleteFaq,
  createSection, updateSection, deleteSection, reorderSections,
  uploadMediaFile, getMediaAssets, deleteMediaAsset, uploadResumePdf,
  getAnalyticsDashboard, getAdminMe, changePassword, changeEmail,
  getSessions, revokeSession, exportBackupJson, adminLogout, setAuthToken
} from '../utils/api.js'
import '../admin.css'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)

  // Main Data States
  const [adminUser, setAdminUser] = useState(null)
  const [siteSettings, setSiteSettings] = useState(null)
  const [projects, setProjects] = useState([])
  const [experiences, setExperiences] = useState([])
  const [skills, setSkills] = useState([])
  const [education, setEducation] = useState([])
  const [certifications, setCertifications] = useState([])
  const [faqs, setFaqs] = useState([])
  const [customSections, setCustomSections] = useState([])
  const [mediaList, setMediaList] = useState([])
  const [analytics, setAnalytics] = useState(null)
  const [sessions, setSessions] = useState([])
  const [analyticsRange, setAnalyticsRange] = useState(30)

  // Edit Modals
  const [editingProject, setEditingProject] = useState(null)
  const [editingExperience, setEditingExperience] = useState(null)
  const [editingSkill, setEditingSkill] = useState(null)
  const [editingEducation, setEditingEducation] = useState(null)
  const [editingCert, setEditingCert] = useState(null)
  const [editingFaq, setEditingFaq] = useState(null)
  const [editingSection, setEditingSection] = useState(null)

  // Profile forms
  const [curPassword, setCurPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newEmail, setNewEmail] = useState('')

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }

  // Load All Content
  const loadContent = async () => {
    try {
      setLoading(true)
      const [contentData, meData, analyticsData, sessionsData] = await Promise.all([
        getAdminAllContent(),
        getAdminMe().catch(() => null),
        getAnalyticsDashboard(analyticsRange).catch(() => null),
        getSessions().catch(() => ({ sessions: [] })),
      ])

      if (contentData) {
        setSiteSettings(contentData.settings || {})
        setProjects(contentData.projects || [])
        setExperiences(contentData.experiences || [])
        setSkills(contentData.skills || [])
        setEducation(contentData.education || [])
        setCertifications(contentData.certifications || [])
        setFaqs(contentData.faqs || [])
        setCustomSections(contentData.customSections || [])
        setMediaList(contentData.media || [])
      }

      if (meData) {
        setAdminUser(meData.user)
        setNewEmail(meData.user?.email || '')
      }

      if (analyticsData) setAnalytics(analyticsData)
      if (sessionsData) setSessions(sessionsData.sessions || [])
    } catch (err) {
      showToast(err.message || 'Failed to load portfolio content', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadContent()
  }, [analyticsRange])

  const handleLogout = async () => {
    try {
      await adminLogout()
    } catch {}
    setAuthToken('')
    navigate('/admin/login')
  }

  const handleSaveSettings = async () => {
    try {
      setSaving(true)
      await updateSettings(siteSettings)
      showToast('Settings saved successfully!')
    } catch (err) {
      showToast(err.message || 'Failed to save settings', 'error')
    } finally {
      setSaving(false)
    }
  }

  // File Upload Handlers
  const handleMediaUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      setSaving(true)
      const res = await uploadMediaFile(file)
      showToast(`Uploaded ${file.name} successfully!`)
      loadContent()
    } catch (err) {
      showToast(err.message || 'Upload failed', 'error')
    } finally {
      setSaving(false)
      e.target.value = ''
    }
  }

  const handleResumeUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      setSaving(true)
      const res = await uploadResumePdf(file)
      showToast('Official Resume PDF uploaded and published!')
      loadContent()
    } catch (err) {
      showToast(err.message || 'Resume upload failed', 'error')
    } finally {
      setSaving(false)
      e.target.value = ''
    }
  }

  if (loading && !siteSettings) {
    return (
      <div className="admin-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <RefreshCw className="spin" size={36} color="var(--admin-accent)" style={{ animation: 'spin 1s linear infinite' }} />
          <p style={{ marginTop: 16, color: 'var(--admin-muted)' }}>Loading Portfolio CMS Dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-body admin-layout">
      {/* Toast Alert */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 9999,
          background: toast.type === 'error' ? 'var(--admin-red)' : 'var(--admin-green)',
          color: '#fff',
          padding: '12px 20px',
          borderRadius: 8,
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          fontSize: 14,
          fontWeight: 500,
        }}>
          {toast.type === 'error' ? <AlertCircle size={18} /> : <Check size={18} />}
          {toast.message}
        </div>
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="admin-sidebar-header">
          <a href="/admin" className="admin-brand-link">
            <img src="/profile/glitched-ai-visor-portrait-transparent.png" alt="Avatar" style={{ width: 28, height: 28, borderRadius: '50%' }} />
            <span>Portfolio CMS</span>
          </a>
          <button className="admin-hamburger" onClick={() => setSidebarOpen(false)} style={{ display: sidebarOpen ? 'block' : 'none' }}>
            <X size={20} />
          </button>
        </div>

        <nav className="admin-sidebar-nav">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'hero', label: 'Hero & Home', icon: Home },
            { id: 'about', label: 'About', icon: User },
            { id: 'projects', label: 'Projects', icon: FolderGit2, badge: projects.length },
            { id: 'experience', label: 'Experience', icon: Briefcase, badge: experiences.length },
            { id: 'skills', label: 'Skills', icon: Wrench },
            { id: 'education', label: 'Education', icon: GraduationCap },
            { id: 'certifications', label: 'Certifications', icon: Award, badge: certifications.length },
            { id: 'sections', label: 'Section Manager', icon: Layers, badge: customSections.length },
            { id: 'media', label: 'Media Library', icon: ImageIcon, badge: mediaList.length },
            { id: 'resume', label: 'Resume', icon: FileText },
            { id: 'navigation', label: 'Header & Navigation', icon: Navigation },
            { id: 'settings', label: 'SEO & Website Settings', icon: Settings },
            { id: 'analytics', label: 'Analytics & Insights', icon: BarChart3 },
            { id: 'profile', label: 'Profile & Security', icon: ShieldCheck },
          ].map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                type="button"
                className={`admin-nav-item${isActive ? ' active' : ''}`}
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              >
                <Icon size={18} />
                <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
                {item.badge !== undefined && (
                  <span style={{ fontSize: 11, background: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: 10, color: 'var(--admin-muted)' }}>
                    {item.badge}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        <div className="admin-sidebar-footer">
          <div style={{ fontSize: 12, color: 'var(--admin-muted)', marginBottom: 10, wordBreak: 'break-all' }}>
            Logged in as:<br />
            <strong style={{ color: '#fff' }}>{adminUser?.email || 'admin'}</strong>
          </div>
          <button
            type="button"
            className="admin-btn admin-btn-secondary admin-btn-sm"
            onClick={handleLogout}
            style={{ width: '100%', justifyContent: 'flex-start' }}
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        {/* Topbar */}
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button className="admin-hamburger" onClick={() => setSidebarOpen(true)}>
              <Menu size={22} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 13, color: 'var(--admin-muted)' }}>CMS /</span>
              <strong style={{ fontSize: 15, textTransform: 'capitalize' }}>
                {activeTab.replace('-', ' ')}
              </strong>
            </div>
          </div>

          <div className="admin-topbar-right">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="admin-btn admin-btn-secondary admin-btn-sm"
              title="Preview public site in new tab"
            >
              <ExternalLink size={14} /> View Website ↗
            </a>
          </div>
        </header>

        {/* Tab Views */}
        <div className="admin-content">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              <div className="admin-card" style={{ background: 'linear-gradient(135deg, rgba(232,66,10,0.12) 0%, rgba(28,32,40,0.95) 100%)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                  <div>
                    <h2 style={{ fontSize: 22, margin: '0 0 6px', color: '#fff' }}>
                      Welcome back, {siteSettings?.author_name || 'Samarth'} 👋
                    </h2>
                    <p style={{ margin: 0, color: 'var(--admin-muted)', fontSize: 14 }}>
                      Your database-driven portfolio CMS is online. All edits publish immediately without redeployment.
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button className="admin-btn admin-btn-secondary" onClick={() => setActiveTab('resume')}>
                      <FileText size={15} /> Manage Resume
                    </button>
                    <button className="admin-btn admin-btn-primary" onClick={() => { setActiveTab('projects'); setEditingProject({}); }}>
                      <Plus size={15} /> New Project
                    </button>
                  </div>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="admin-grid-4">
                <div className="admin-card">
                  <div className="admin-label">Total Page Views</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginTop: 4 }}>
                    {analytics?.summary?.totalPageviews ?? 0}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--admin-muted)', marginTop: 4 }}>Recorded visitor hits</div>
                </div>
                <div className="admin-card">
                  <div className="admin-label">Unique Visitors</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--admin-blue)', marginTop: 4 }}>
                    {analytics?.summary?.uniqueVisitors ?? 0}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--admin-muted)', marginTop: 4 }}>Pseudonymous visitors</div>
                </div>
                <div className="admin-card">
                  <div className="admin-label">Resume Downloads</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--admin-green)', marginTop: 4 }}>
                    {analytics?.summary?.resumeDownloads ?? 0}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--admin-muted)', marginTop: 4 }}>PDF views & downloads</div>
                </div>
                <div className="admin-card">
                  <div className="admin-label">Published Projects</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--admin-accent)', marginTop: 4 }}>
                    {projects.filter(p => p.status === 'published').length} / {projects.length}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--admin-muted)', marginTop: 4 }}>Active on public site</div>
                </div>
              </div>

              {/* Quick Status Lists */}
              <div className="admin-grid-2">
                <div className="admin-card">
                  <div className="admin-card-header">
                    <h3 className="admin-card-title"><FolderGit2 size={16} /> Recent Projects</h3>
                    <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => setActiveTab('projects')}>
                      View All ({projects.length})
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {projects.slice(0, 4).map(p => (
                      <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--admin-card)', borderRadius: 6 }}>
                        <div>
                          <strong style={{ fontSize: 13.5, color: '#fff' }}>{p.title}</strong>
                          <div style={{ fontSize: 12, color: 'var(--admin-muted)' }}>{p.category} · {p.year}</div>
                        </div>
                        <span className={`admin-badge admin-badge-${p.status}`}>{p.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="admin-card">
                  <div className="admin-card-header">
                    <h3 className="admin-card-title"><BarChart3 size={16} /> Recent Visitor Activity</h3>
                    <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => setActiveTab('analytics')}>
                      Full Analytics →
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {analytics?.recentEvents?.slice(0, 5).map(e => (
                      <div key={e.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12.5, padding: '8px 12px', background: 'var(--admin-card)', borderRadius: 6 }}>
                        <div>
                          <span style={{ color: 'var(--admin-accent)', fontWeight: 600, textTransform: 'uppercase' }}>{e.event_type}</span>
                          <span style={{ color: 'var(--admin-muted)', marginLeft: 8 }}>{e.path || e.target_label || '/'}</span>
                        </div>
                        <span style={{ color: 'var(--admin-muted)' }}>{e.device_type} · {new Date(e.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    )) || <div style={{ color: 'var(--admin-muted)', fontSize: 13 }}>No visitor events recorded yet.</div>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HERO & HOME */}
          {activeTab === 'hero' && (
            <div className="admin-card">
              <div className="admin-card-header">
                <h3 className="admin-card-title"><Home size={18} /> Hero & Introduction Management</h3>
                <button className="admin-btn admin-btn-primary" onClick={handleSaveSettings} disabled={saving}>
                  <Save size={15} /> {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>

              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label className="admin-label">Author Name</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={siteSettings.author_name || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, author_name: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Headline</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={siteSettings.headline || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, headline: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Professional Subtitle / Statement</label>
                <textarea
                  className="admin-textarea"
                  value={siteSettings.statement || ''}
                  onChange={(e) => setSiteSettings({ ...siteSettings, statement: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="admin-grid-3">
                <div className="admin-form-group">
                  <label className="admin-label">Availability Status</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={siteSettings.available_status || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, available_status: e.target.value })}
                    placeholder="e.g. Available Now"
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Hero CTA Label</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={siteSettings.cta_label || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, cta_label: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Hero CTA Link</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={siteSettings.cta_link || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, cta_link: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label className="admin-label">Profile Avatar Image URL</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={siteSettings.avatar_url || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, avatar_url: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Upload New Avatar</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="admin-input"
                    onChange={async (e) => {
                      const file = e.target.files?.[0]
                      if (!file) return
                      const res = await uploadMediaFile(file)
                      setSiteSettings({ ...siteSettings, avatar_url: res.media.url })
                      showToast('Avatar uploaded!')
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ABOUT */}
          {activeTab === 'about' && (
            <div className="admin-card">
              <div className="admin-card-header">
                <h3 className="admin-card-title"><User size={18} /> About & Biography Section</h3>
                <button className="admin-btn admin-btn-primary" onClick={handleSaveSettings} disabled={saving}>
                  <Save size={15} /> Save Changes
                </button>
              </div>

              <div className="admin-form-group">
                <label className="admin-label">About Headline Quote</label>
                <input
                  type="text"
                  className="admin-input"
                  value={siteSettings.about_config?.headline || ''}
                  onChange={(e) => {
                    const cfg = { ...siteSettings.about_config, headline: e.target.value }
                    setSiteSettings({ ...siteSettings, about_config: cfg })
                  }}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Bio Paragraph 1 (Introduction)</label>
                <textarea
                  className="admin-textarea"
                  value={siteSettings.about_config?.bio?.[0] || ''}
                  onChange={(e) => {
                    const bio = [...(siteSettings.about_config?.bio || [])]
                    bio[0] = e.target.value
                    setSiteSettings({ ...siteSettings, about_config: { ...siteSettings.about_config, bio } })
                  }}
                  rows={3}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Bio Paragraph 2 (Experience & Tech)</label>
                <textarea
                  className="admin-textarea"
                  value={siteSettings.about_config?.bio?.[1] || ''}
                  onChange={(e) => {
                    const bio = [...(siteSettings.about_config?.bio || [])]
                    bio[1] = e.target.value
                    setSiteSettings({ ...siteSettings, about_config: { ...siteSettings.about_config, bio } })
                  }}
                  rows={3}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Bio Paragraph 3 (Mindset / Approach)</label>
                <textarea
                  className="admin-textarea"
                  value={siteSettings.about_config?.bio?.[2] || ''}
                  onChange={(e) => {
                    const bio = [...(siteSettings.about_config?.bio || [])]
                    bio[2] = e.target.value
                    setSiteSettings({ ...siteSettings, about_config: { ...siteSettings.about_config, bio } })
                  }}
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* TAB 4: PROJECTS */}
          {activeTab === 'projects' && (
            <div>
              <div className="admin-card">
                <div className="admin-card-header">
                  <h3 className="admin-card-title"><FolderGit2 size={18} /> Projects ({projects.length})</h3>
                  <button
                    className="admin-btn admin-btn-primary"
                    onClick={() => setEditingProject({
                      title: '', subtitle: '', tagline: '', category: 'AI & Autonomous Systems',
                      year: '2026', kind: 'project', description: '', highlights: [],
                      technologies: [], github: '', liveDemo: '', image: '', previewImage: '',
                      status: 'published', featured: 1
                    })}
                  >
                    <Plus size={15} /> Add New Project
                  </button>
                </div>

                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Order</th>
                        <th>Project</th>
                        <th>Category</th>
                        <th>Year</th>
                        <th>Status</th>
                        <th>Featured</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((p, idx) => (
                        <tr key={p.id}>
                          <td style={{ width: 80 }}>
                            <div style={{ display: 'flex', gap: 4 }}>
                              <button
                                className="admin-btn admin-btn-secondary admin-btn-sm"
                                disabled={idx === 0}
                                onClick={async () => {
                                  const newProjects = [...projects]
                                  const temp = newProjects[idx]
                                  newProjects[idx] = newProjects[idx - 1]
                                  newProjects[idx - 1] = temp
                                  const items = newProjects.map((item, i) => ({ id: item.id, order: i + 1 }))
                                  await reorderProjects(items)
                                  setProjects(newProjects)
                                  showToast('Reordered projects')
                                }}
                              >
                                <ArrowUp size={12} />
                              </button>
                              <button
                                className="admin-btn admin-btn-secondary admin-btn-sm"
                                disabled={idx === projects.length - 1}
                                onClick={async () => {
                                  const newProjects = [...projects]
                                  const temp = newProjects[idx]
                                  newProjects[idx] = newProjects[idx + 1]
                                  newProjects[idx + 1] = temp
                                  const items = newProjects.map((item, i) => ({ id: item.id, order: i + 1 }))
                                  await reorderProjects(items)
                                  setProjects(newProjects)
                                  showToast('Reordered projects')
                                }}
                              >
                                <ArrowDown size={12} />
                              </button>
                            </div>
                          </td>
                          <td>
                            <strong>{p.title}</strong>
                            <div style={{ fontSize: 12, color: 'var(--admin-muted)' }}>{p.subtitle}</div>
                            <div style={{ fontSize: 11, marginTop: 4, display: 'flex', gap: 10 }}>
                              {p.liveDemo && (
                                <a href={p.liveDemo} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--admin-primary, #4ade80)', textDecoration: 'none' }}>
                                  Live Build ↗
                                </a>
                              )}
                              {p.github && (
                                <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none' }}>
                                  Repo ↗
                                </a>
                              )}
                            </div>
                          </td>
                          <td>{p.category}</td>
                          <td>{p.year}</td>
                          <td><span className={`admin-badge admin-badge-${p.status}`}>{p.status}</span></td>
                          <td>{p.featured ? '⭐ Yes' : 'No'}</td>
                          <td style={{ textAlign: 'right' }}>
                            <div style={{ display: 'inline-flex', gap: 6 }}>
                              <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => setEditingProject(p)}>
                                <Edit3 size={13} /> Edit
                              </button>
                              <button
                                className="admin-btn admin-btn-danger admin-btn-sm"
                                onClick={async () => {
                                  if (confirm(`Delete project "${p.title}"?`)) {
                                    await deleteProject(p.id)
                                    showToast('Project deleted')
                                    loadContent()
                                  }
                                }}
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Project Edit Modal */}
              {editingProject && (
                <div className="admin-modal-overlay">
                  <div className="admin-modal" style={{ maxWidth: 760 }}>
                    <div className="admin-modal-header">
                      <h3 className="admin-card-title">{editingProject.id ? 'Edit Project' : 'Add New Project'}</h3>
                      <button onClick={() => setEditingProject(null)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>✕</button>
                    </div>

                    <div className="admin-modal-body">
                      <div className="admin-grid-2">
                        <div className="admin-form-group">
                          <label className="admin-label">Title *</label>
                          <input
                            type="text"
                            className="admin-input"
                            value={editingProject.title || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                            required
                          />
                        </div>
                        <div className="admin-form-group">
                          <label className="admin-label">Category</label>
                          <input
                            type="text"
                            className="admin-input"
                            value={editingProject.category || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="admin-grid-3">
                        <div className="admin-form-group">
                          <label className="admin-label">Year</label>
                          <input
                            type="text"
                            className="admin-input"
                            value={editingProject.year || '2026'}
                            onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                          />
                        </div>
                        <div className="admin-form-group">
                          <label className="admin-label">Publish Status</label>
                          <select
                            className="admin-select"
                            value={editingProject.status || 'published'}
                            onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value })}
                          >
                            <option value="published">Published</option>
                            <option value="draft">Draft (Admin Only)</option>
                            <option value="unpublished">Unpublished</option>
                          </select>
                        </div>
                        <div className="admin-form-group">
                          <label className="admin-label">Featured on Home</label>
                          <select
                            className="admin-select"
                            value={editingProject.featured ? '1' : '0'}
                            onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.value === '1' })}
                          >
                            <option value="1">Yes (Featured)</option>
                            <option value="0">No</option>
                          </select>
                        </div>
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-label">Subtitle</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={editingProject.subtitle || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-label">Tagline (One-line summary)</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={editingProject.tagline || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-label">Full Description</label>
                        <textarea
                          className="admin-textarea"
                          value={editingProject.description || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                          rows={3}
                        />
                      </div>

                      <div className="admin-grid-2">
                        <div className="admin-form-group">
                          <label className="admin-label">GitHub Repository URL</label>
                          <input
                            type="text"
                            className="admin-input"
                            value={editingProject.github || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, github: e.target.value })}
                            placeholder="https://github.com/..."
                          />
                        </div>
                        <div className="admin-form-group">
                          <label className="admin-label">Live Demo URL</label>
                          <input
                            type="text"
                            className="admin-input"
                            value={editingProject.liveDemo || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, liveDemo: e.target.value })}
                            placeholder="https://..."
                          />
                        </div>
                      </div>

                      <div className="admin-grid-2">
                        <div className="admin-form-group">
                          <label className="admin-label">Thumbnail / Preview Image URL</label>
                          <input
                            type="text"
                            className="admin-input"
                            value={editingProject.previewImage || editingProject.image || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, previewImage: e.target.value, image: e.target.value })}
                          />
                        </div>
                        <div className="admin-form-group">
                          <label className="admin-label">Upload New Preview Image</label>
                          <input
                            type="file"
                            accept="image/*"
                            className="admin-input"
                            onChange={async (e) => {
                              const file = e.target.files?.[0]
                              if (!file) return
                              const res = await uploadMediaFile(file)
                              setEditingProject({ ...editingProject, previewImage: res.media.url, image: res.media.url })
                              showToast('Uploaded image!')
                            }}
                          />
                        </div>
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-label">Technologies (comma-separated)</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={Array.isArray(editingProject.technologies) ? editingProject.technologies.join(', ') : ''}
                          onChange={(e) => setEditingProject({
                            ...editingProject,
                            technologies: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                          })}
                          placeholder="e.g. Python, LangGraph, React, FastAPI, Docker"
                        />
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-label">Highlights (one per line)</label>
                        <textarea
                          className="admin-textarea"
                          value={Array.isArray(editingProject.highlights) ? editingProject.highlights.join('\n') : ''}
                          onChange={(e) => setEditingProject({
                            ...editingProject,
                            highlights: e.target.value.split('\n').map(s => s.trim()).filter(Boolean)
                          })}
                          rows={3}
                          placeholder="Highlight 1&#10;Highlight 2"
                        />
                      </div>
                    </div>

                    <div className="admin-modal-footer">
                      <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setEditingProject(null)}>
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="admin-btn admin-btn-primary"
                        onClick={async () => {
                          try {
                            if (editingProject.id) {
                              await updateProject(editingProject.id, editingProject)
                              showToast('Project updated!')
                            } else {
                              await createProject(editingProject)
                              showToast('Project created!')
                            }
                            setEditingProject(null)
                            loadContent()
                          } catch (err) {
                            showToast(err.message, 'error')
                          }
                        }}
                      >
                        Save Project
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: EXPERIENCE & EXTRACURRICULAR */}
          {activeTab === 'experience' && (
            <div>
              <div className="admin-card">
                <div className="admin-card-header">
                  <h3 className="admin-card-title"><Briefcase size={18} /> Experience & Extracurricular Activities</h3>
                  <button
                    className="admin-btn admin-btn-primary"
                    onClick={() => setEditingExperience({
                      type: 'work', role: '', company: '', duration: '',
                      start_date: '', end_date: '', responsibilities: [],
                      description: '', status: 'published'
                    })}
                  >
                    <Plus size={15} /> Add Experience / Activity
                  </button>
                </div>

                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Role & Company</th>
                        <th>Duration</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {experiences.map((exp) => (
                        <tr key={exp.id}>
                          <td>
                            <span style={{
                              fontSize: 11,
                              fontWeight: 600,
                              textTransform: 'uppercase',
                              padding: '2px 8px',
                              borderRadius: 4,
                              background: exp.type === 'work' ? 'rgba(56,139,253,0.15)' : 'rgba(210,153,34,0.15)',
                              color: exp.type === 'work' ? '#58a6ff' : '#d29922'
                            }}>
                              {exp.type}
                            </span>
                          </td>
                          <td>
                            <strong>{exp.role}</strong>
                            <div style={{ fontSize: 12, color: 'var(--admin-muted)' }}>{exp.company}</div>
                          </td>
                          <td>{exp.duration}</td>
                          <td><span className={`admin-badge admin-badge-${exp.status}`}>{exp.status}</span></td>
                          <td style={{ textAlign: 'right' }}>
                            <div style={{ display: 'inline-flex', gap: 6 }}>
                              <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => setEditingExperience(exp)}>
                                <Edit3 size={13} /> Edit
                              </button>
                              <button
                                className="admin-btn admin-btn-danger admin-btn-sm"
                                onClick={async () => {
                                  if (confirm(`Delete ${exp.role}?`)) {
                                    await deleteExperience(exp.id)
                                    showToast('Deleted')
                                    loadContent()
                                  }
                                }}
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Experience Edit Modal */}
              {editingExperience && (
                <div className="admin-modal-overlay">
                  <div className="admin-modal" style={{ maxWidth: 640 }}>
                    <div className="admin-modal-header">
                      <h3 className="admin-card-title">{editingExperience.id ? 'Edit Experience' : 'Add Experience'}</h3>
                      <button onClick={() => setEditingExperience(null)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>✕</button>
                    </div>

                    <div className="admin-modal-body">
                      <div className="admin-grid-2">
                        <div className="admin-form-group">
                          <label className="admin-label">Category Type</label>
                          <select
                            className="admin-select"
                            value={editingExperience.type || 'work'}
                            onChange={(e) => setEditingExperience({ ...editingExperience, type: e.target.value })}
                          >
                            <option value="work">Work Experience</option>
                            <option value="extracurricular">Extracurricular Activity</option>
                          </select>
                        </div>
                        <div className="admin-form-group">
                          <label className="admin-label">Publish Status</label>
                          <select
                            className="admin-select"
                            value={editingExperience.status || 'published'}
                            onChange={(e) => setEditingExperience({ ...editingExperience, status: e.target.value })}
                          >
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                            <option value="unpublished">Unpublished</option>
                          </select>
                        </div>
                      </div>

                      <div className="admin-grid-2">
                        <div className="admin-form-group">
                          <label className="admin-label">Role Title *</label>
                          <input
                            type="text"
                            className="admin-input"
                            value={editingExperience.role || ''}
                            onChange={(e) => setEditingExperience({ ...editingExperience, role: e.target.value })}
                            required
                          />
                        </div>
                        <div className="admin-form-group">
                          <label className="admin-label">Company / Organization *</label>
                          <input
                            type="text"
                            className="admin-input"
                            value={editingExperience.company || ''}
                            onChange={(e) => setEditingExperience({ ...editingExperience, company: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="admin-grid-3">
                        <div className="admin-form-group">
                          <label className="admin-label">Duration Display</label>
                          <input
                            type="text"
                            className="admin-input"
                            value={editingExperience.duration || ''}
                            onChange={(e) => setEditingExperience({ ...editingExperience, duration: e.target.value })}
                            placeholder="e.g. May 2025 – Jul 2025"
                          />
                        </div>
                        <div className="admin-form-group">
                          <label className="admin-label">Start Date (YYYY-MM)</label>
                          <input
                            type="text"
                            className="admin-input"
                            value={editingExperience.start_date || ''}
                            onChange={(e) => setEditingExperience({ ...editingExperience, start_date: e.target.value })}
                            placeholder="2025-05"
                          />
                        </div>
                        <div className="admin-form-group">
                          <label className="admin-label">End Date (YYYY-MM)</label>
                          <input
                            type="text"
                            className="admin-input"
                            value={editingExperience.end_date || ''}
                            onChange={(e) => setEditingExperience({ ...editingExperience, end_date: e.target.value })}
                            placeholder="2025-07"
                          />
                        </div>
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-label">Overview Description</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={editingExperience.description || ''}
                          onChange={(e) => setEditingExperience({ ...editingExperience, description: e.target.value })}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-label">Responsibilities / Bullet Points (one per line)</label>
                        <textarea
                          className="admin-textarea"
                          value={Array.isArray(editingExperience.responsibilities) ? editingExperience.responsibilities.join('\n') : ''}
                          onChange={(e) => setEditingExperience({
                            ...editingExperience,
                            responsibilities: e.target.value.split('\n').map(s => s.trim()).filter(Boolean)
                          })}
                          rows={4}
                        />
                      </div>
                    </div>

                    <div className="admin-modal-footer">
                      <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setEditingExperience(null)}>
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="admin-btn admin-btn-primary"
                        onClick={async () => {
                          try {
                            if (editingExperience.id) {
                              await updateExperience(editingExperience.id, editingExperience)
                              showToast('Experience updated!')
                            } else {
                              await createExperience(editingExperience)
                              showToast('Experience added!')
                            }
                            setEditingExperience(null)
                            loadContent()
                          } catch (err) {
                            showToast(err.message, 'error')
                          }
                        }}
                      >
                        Save Experience
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: SKILLS */}
          {activeTab === 'skills' && (
            <div className="admin-card">
              <div className="admin-card-header">
                <h3 className="admin-card-title"><Wrench size={18} /> Skills & Capabilities</h3>
                <button
                  className="admin-btn admin-btn-primary"
                  onClick={() => setEditingSkill({ category: '', items: [], status: 'published' })}
                >
                  <Plus size={15} /> Add Skill Group
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
                {skills.map((s) => (
                  <div key={s.id} style={{ background: 'var(--admin-card)', border: '1px solid var(--admin-border)', borderRadius: 8, padding: 18 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <strong style={{ fontSize: 15, color: '#fff' }}>{s.category}</strong>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => setEditingSkill(s)}>
                          <Edit3 size={12} />
                        </button>
                        <button
                          className="admin-btn admin-btn-danger admin-btn-sm"
                          onClick={async () => {
                            if (confirm(`Delete skill group ${s.category}?`)) {
                              await deleteSkill(s.id)
                              showToast('Deleted')
                              loadContent()
                            }
                          }}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {(Array.isArray(s.items) ? s.items : []).map((item) => (
                        <span key={item} style={{ background: 'rgba(255,255,255,0.06)', padding: '4px 8px', borderRadius: 4, fontSize: 12, color: 'var(--admin-text)' }}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Skill Modal */}
              {editingSkill && (
                <div className="admin-modal-overlay">
                  <div className="admin-modal" style={{ maxWidth: 500 }}>
                    <div className="admin-modal-header">
                      <h3 className="admin-card-title">{editingSkill.id ? 'Edit Skill Group' : 'Add Skill Group'}</h3>
                      <button onClick={() => setEditingSkill(null)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>✕</button>
                    </div>
                    <div className="admin-modal-body">
                      <div className="admin-form-group">
                        <label className="admin-label">Category Name *</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={editingSkill.category || ''}
                          onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                          placeholder="e.g. AI & GenAI"
                          required
                        />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">Items (comma-separated)</label>
                        <textarea
                          className="admin-textarea"
                          value={Array.isArray(editingSkill.items) ? editingSkill.items.join(', ') : ''}
                          onChange={(e) => setEditingSkill({
                            ...editingSkill,
                            items: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                          })}
                          placeholder="React.js, Next.js, Node.js"
                          rows={3}
                        />
                      </div>
                    </div>
                    <div className="admin-modal-footer">
                      <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setEditingSkill(null)}>Cancel</button>
                      <button
                        type="button"
                        className="admin-btn admin-btn-primary"
                        onClick={async () => {
                          if (editingSkill.id) await updateSkill(editingSkill.id, editingSkill)
                          else await createSkill(editingSkill)
                          setEditingSkill(null)
                          showToast('Skills saved')
                          loadContent()
                        }}
                      >
                        Save Group
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 7: EDUCATION */}
          {activeTab === 'education' && (
            <div className="admin-card">
              <div className="admin-card-header">
                <h3 className="admin-card-title"><GraduationCap size={18} /> Education Details</h3>
                <button
                  className="admin-btn admin-btn-primary"
                  onClick={() => setEditingEducation({ institution: '', degree: '', division: '', year: '2022 – 2026', description: '', status: 'published' })}
                >
                  <Plus size={15} /> Add Education
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {education.map(edu => (
                  <div key={edu.id} style={{ padding: 20, background: 'var(--admin-card)', borderRadius: 8, border: '1px solid var(--admin-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontSize: 12, color: 'var(--admin-accent)', fontFamily: 'monospace' }}>{edu.year}</div>
                        <h3 style={{ fontSize: 18, margin: '4px 0 6px', color: '#fff' }}>{edu.institution}</h3>
                        <div style={{ fontSize: 14, color: 'var(--admin-text)' }}>{edu.degree}</div>
                        <div style={{ fontSize: 13, color: 'var(--admin-muted)', marginTop: 4 }}>{edu.division}</div>
                        {edu.description && <p style={{ fontSize: 13, color: 'var(--admin-muted)', marginTop: 10 }}>{edu.description}</p>}
                      </div>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => setEditingEducation(edu)}>
                          <Edit3 size={13} /> Edit
                        </button>
                        <button
                          className="admin-btn admin-btn-danger admin-btn-sm"
                          onClick={async () => {
                            if (confirm(`Delete ${edu.institution}?`)) {
                              await deleteEducation(edu.id)
                              showToast('Deleted')
                              loadContent()
                            }
                          }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Education Modal */}
              {editingEducation && (
                <div className="admin-modal-overlay">
                  <div className="admin-modal" style={{ maxWidth: 540 }}>
                    <div className="admin-modal-header">
                      <h3 className="admin-card-title">{editingEducation.id ? 'Edit Education' : 'Add Education'}</h3>
                      <button onClick={() => setEditingEducation(null)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>✕</button>
                    </div>
                    <div className="admin-modal-body">
                      <div className="admin-form-group">
                        <label className="admin-label">Institution *</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={editingEducation.institution || ''}
                          onChange={(e) => setEditingEducation({ ...editingEducation, institution: e.target.value })}
                          required
                        />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">Degree *</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={editingEducation.degree || ''}
                          onChange={(e) => setEditingEducation({ ...editingEducation, degree: e.target.value })}
                          required
                        />
                      </div>
                      <div className="admin-grid-2">
                        <div className="admin-form-group">
                          <label className="admin-label">Year Range</label>
                          <input
                            type="text"
                            className="admin-input"
                            value={editingEducation.year || ''}
                            onChange={(e) => setEditingEducation({ ...editingEducation, year: e.target.value })}
                            placeholder="2022 – 2026"
                          />
                        </div>
                        <div className="admin-form-group">
                          <label className="admin-label">Division / Location</label>
                          <input
                            type="text"
                            className="admin-input"
                            value={editingEducation.division || ''}
                            onChange={(e) => setEditingEducation({ ...editingEducation, division: e.target.value })}
                            placeholder="First Division · Noida, India"
                          />
                        </div>
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">Coursework / Description</label>
                        <textarea
                          className="admin-textarea"
                          value={editingEducation.description || ''}
                          onChange={(e) => setEditingEducation({ ...editingEducation, description: e.target.value })}
                          rows={3}
                        />
                      </div>
                    </div>
                    <div className="admin-modal-footer">
                      <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setEditingEducation(null)}>Cancel</button>
                      <button
                        type="button"
                        className="admin-btn admin-btn-primary"
                        onClick={async () => {
                          if (editingEducation.id) await updateEducation(editingEducation.id, editingEducation)
                          else await createEducation(editingEducation)
                          setEditingEducation(null)
                          showToast('Education saved')
                          loadContent()
                        }}
                      >
                        Save Education
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 8: CERTIFICATIONS */}
          {activeTab === 'certifications' && (
            <div className="admin-card">
              <div className="admin-card-header">
                <h3 className="admin-card-title"><Award size={18} /> Verified Industry Certifications ({certifications.length})</h3>
                <button
                  className="admin-btn admin-btn-primary"
                  onClick={() => setEditingCert({ title: '', issuer: '', platform: '', url: '', status: 'published' })}
                >
                  <Plus size={15} /> Add Certification
                </button>
              </div>

              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Issuer</th>
                      <th>Platform</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {certifications.map(c => (
                      <tr key={c.id}>
                        <td><strong>{c.title}</strong></td>
                        <td><span style={{ color: 'var(--admin-accent)', fontWeight: 600 }}>{c.issuer}</span></td>
                        <td>{c.platform || '—'}</td>
                        <td><span className={`admin-badge admin-badge-${c.status}`}>{c.status}</span></td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: 6 }}>
                            <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => setEditingCert(c)}>
                              <Edit3 size={13} /> Edit
                            </button>
                            <button
                              className="admin-btn admin-btn-danger admin-btn-sm"
                              onClick={async () => {
                                if (confirm(`Delete ${c.title}?`)) {
                                  await deleteCertification(c.id)
                                  showToast('Deleted')
                                  loadContent()
                                }
                              }}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Cert Modal */}
              {editingCert && (
                <div className="admin-modal-overlay">
                  <div className="admin-modal" style={{ maxWidth: 500 }}>
                    <div className="admin-modal-header">
                      <h3 className="admin-card-title">{editingCert.id ? 'Edit Certification' : 'Add Certification'}</h3>
                      <button onClick={() => setEditingCert(null)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>✕</button>
                    </div>
                    <div className="admin-modal-body">
                      <div className="admin-form-group">
                        <label className="admin-label">Title *</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={editingCert.title || ''}
                          onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                          required
                        />
                      </div>
                      <div className="admin-grid-2">
                        <div className="admin-form-group">
                          <label className="admin-label">Issuer *</label>
                          <input
                            type="text"
                            className="admin-input"
                            value={editingCert.issuer || ''}
                            onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                            placeholder="e.g. Google, NVIDIA"
                            required
                          />
                        </div>
                        <div className="admin-form-group">
                          <label className="admin-label">Platform</label>
                          <input
                            type="text"
                            className="admin-input"
                            value={editingCert.platform || ''}
                            onChange={(e) => setEditingCert({ ...editingCert, platform: e.target.value })}
                            placeholder="Coursera, AWS, etc."
                          />
                        </div>
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">Credential Verification URL</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={editingCert.url || ''}
                          onChange={(e) => setEditingCert({ ...editingCert, url: e.target.value })}
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                    <div className="admin-modal-footer">
                      <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setEditingCert(null)}>Cancel</button>
                      <button
                        type="button"
                        className="admin-btn admin-btn-primary"
                        onClick={async () => {
                          if (editingCert.id) await updateCertification(editingCert.id, editingCert)
                          else await createCertification(editingCert)
                          setEditingCert(null)
                          showToast('Certification saved')
                          loadContent()
                        }}
                      >
                        Save Certification
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 9: SECTION MANAGER (WEBSITE BUILDER) */}
          {activeTab === 'sections' && (
            <div>
              <div className="admin-card">
                <div className="admin-card-header">
                  <div>
                    <h3 className="admin-card-title"><Layers size={18} /> Dynamic Section Manager</h3>
                    <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--admin-muted)' }}>
                      Create new sections, add content blocks, change headings, and control publishing.
                    </p>
                  </div>
                  <button
                    className="admin-btn admin-btn-primary"
                    onClick={() => setEditingSection({
                      title: '', badge_title: '', description: '',
                      content_blocks: [
                        { type: 'text', content: 'Add custom section content here.' }
                      ],
                      status: 'published',
                      nav_label: '',
                      show_in_nav: 1
                    })}
                  >
                    <Plus size={15} /> Create Custom Section
                  </button>
                </div>

                {customSections.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--admin-muted)' }}>
                    <Layers size={36} style={{ opacity: 0.4, marginBottom: 12 }} />
                    <p style={{ fontSize: 15, margin: '0 0 6px', color: '#fff' }}>No custom sections created yet.</p>
                    <p style={{ fontSize: 13, margin: 0 }}>
                      You can add custom sections like Research & Publications, Achievements, Testimonials, Open Source, etc.
                    </p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {customSections.map(sec => (
                      <div key={sec.id} style={{ padding: 18, background: 'var(--admin-card)', borderRadius: 8, border: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <strong style={{ fontSize: 16, color: '#fff' }}>{sec.title}</strong>
                            <span className={`admin-badge admin-badge-${sec.status}`}>{sec.status}</span>
                            {sec.show_in_nav ? (
                              <span style={{ fontSize: 11, color: 'var(--admin-accent)', fontFamily: 'monospace' }}>Nav: {sec.nav_label || sec.title}</span>
                            ) : (
                              <span style={{ fontSize: 11, color: 'var(--admin-muted)' }}>Hidden from Nav</span>
                            )}
                          </div>
                          <div style={{ fontSize: 13, color: 'var(--admin-muted)', marginTop: 4 }}>
                            {sec.description || 'No description provided'} · {sec.content_blocks?.length || 0} blocks
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: 8 }}>
                          <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => setEditingSection(sec)}>
                            <Edit3 size={13} /> Edit Blocks
                          </button>
                          <button
                            className="admin-btn admin-btn-danger admin-btn-sm"
                            onClick={async () => {
                              if (confirm(`Delete section "${sec.title}"?`)) {
                                await deleteSection(sec.id)
                                showToast('Section deleted')
                                loadContent()
                              }
                            }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Section Builder Modal */}
              {editingSection && (
                <div className="admin-modal-overlay">
                  <div className="admin-modal" style={{ maxWidth: 760 }}>
                    <div className="admin-modal-header">
                      <h3 className="admin-card-title">{editingSection.id ? 'Edit Custom Section' : 'Create Custom Section'}</h3>
                      <button onClick={() => setEditingSection(null)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>✕</button>
                    </div>

                    <div className="admin-modal-body">
                      <div className="admin-grid-2">
                        <div className="admin-form-group">
                          <label className="admin-label">Section Heading Title *</label>
                          <input
                            type="text"
                            className="admin-input"
                            value={editingSection.title || ''}
                            onChange={(e) => setEditingSection({ ...editingSection, title: e.target.value })}
                            placeholder="e.g. Research & Publications"
                            required
                          />
                        </div>
                        <div className="admin-form-group">
                          <label className="admin-label">Badge Label</label>
                          <input
                            type="text"
                            className="admin-input"
                            value={editingSection.badge_title || ''}
                            onChange={(e) => setEditingSection({ ...editingSection, badge_title: e.target.value })}
                            placeholder="e.g. RESEARCH"
                          />
                        </div>
                      </div>

                      <div className="admin-form-group">
                        <label className="admin-label">Section Description</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={editingSection.description || ''}
                          onChange={(e) => setEditingSection({ ...editingSection, description: e.target.value })}
                          placeholder="Brief overview displayed below badge"
                        />
                      </div>

                      <div className="admin-grid-3">
                        <div className="admin-form-group">
                          <label className="admin-label">Publishing Workflow</label>
                          <select
                            className="admin-select"
                            value={editingSection.status || 'draft'}
                            onChange={(e) => setEditingSection({ ...editingSection, status: e.target.value })}
                          >
                            <option value="published">Published (Visible Publicly)</option>
                            <option value="draft">Draft (Admin Only)</option>
                            <option value="unpublished">Unpublished (Hidden)</option>
                          </select>
                        </div>
                        <div className="admin-form-group">
                          <label className="admin-label">Header Nav Link Label</label>
                          <input
                            type="text"
                            className="admin-input"
                            value={editingSection.nav_label || ''}
                            onChange={(e) => setEditingSection({ ...editingSection, nav_label: e.target.value })}
                            placeholder="e.g. Research"
                          />
                        </div>
                        <div className="admin-form-group">
                          <label className="admin-label">Show in Header Nav</label>
                          <select
                            className="admin-select"
                            value={editingSection.show_in_nav ? '1' : '0'}
                            onChange={(e) => setEditingSection({ ...editingSection, show_in_nav: e.target.value === '1' })}
                          >
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                          </select>
                        </div>
                      </div>

                      {/* Content Blocks Editor */}
                      <div style={{ marginTop: 20 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                          <label className="admin-label" style={{ margin: 0 }}>Content Blocks ({editingSection.content_blocks?.length || 0})</label>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button
                              type="button"
                              className="admin-btn admin-btn-secondary admin-btn-sm"
                              onClick={() => {
                                const blocks = [...(editingSection.content_blocks || [])]
                                blocks.push({ type: 'text', content: 'New text block content' })
                                setEditingSection({ ...editingSection, content_blocks: blocks })
                              }}
                            >
                              + Text Block
                            </button>
                            <button
                              type="button"
                              className="admin-btn admin-btn-secondary admin-btn-sm"
                              onClick={() => {
                                const blocks = [...(editingSection.content_blocks || [])]
                                blocks.push({ type: 'image', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c', caption: '' })
                                setEditingSection({ ...editingSection, content_blocks: blocks })
                              }}
                            >
                              + Image Block
                            </button>
                            <button
                              type="button"
                              className="admin-btn admin-btn-secondary admin-btn-sm"
                              onClick={() => {
                                const blocks = [...(editingSection.content_blocks || [])]
                                blocks.push({
                                  type: 'cards',
                                  items: [
                                    { title: 'Item 1', description: 'Description of item 1', badge: 'Featured', link: '' }
                                  ]
                                })
                                setEditingSection({ ...editingSection, content_blocks: blocks })
                              }}
                            >
                              + Cards Block
                            </button>
                          </div>
                        </div>

                        {(editingSection.content_blocks || []).map((block, bIdx) => (
                          <div key={bIdx} style={{ padding: 14, background: 'var(--admin-card)', borderRadius: 6, border: '1px solid var(--admin-border)', marginBottom: 10 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--admin-accent)', textTransform: 'uppercase' }}>
                                Block #{bIdx + 1} ({block.type})
                              </span>
                              <button
                                type="button"
                                style={{ background: 'none', border: 'none', color: 'var(--admin-red)', cursor: 'pointer', padding: 0 }}
                                onClick={() => {
                                  const blocks = editingSection.content_blocks.filter((_, i) => i !== bIdx)
                                  setEditingSection({ ...editingSection, content_blocks: blocks })
                                }}
                              >
                                Remove
                              </button>
                            </div>

                            {block.type === 'text' && (
                              <textarea
                                className="admin-textarea"
                                value={block.content || ''}
                                onChange={(e) => {
                                  const blocks = [...editingSection.content_blocks]
                                  blocks[bIdx].content = e.target.value
                                  setEditingSection({ ...editingSection, content_blocks: blocks })
                                }}
                                rows={3}
                              />
                            )}

                            {block.type === 'image' && (
                              <div className="admin-grid-2">
                                <input
                                  type="text"
                                  className="admin-input"
                                  value={block.url || ''}
                                  placeholder="Image URL"
                                  onChange={(e) => {
                                    const blocks = [...editingSection.content_blocks]
                                    blocks[bIdx].url = e.target.value
                                    setEditingSection({ ...editingSection, content_blocks: blocks })
                                  }}
                                />
                                <input
                                  type="text"
                                  className="admin-input"
                                  value={block.caption || ''}
                                  placeholder="Caption"
                                  onChange={(e) => {
                                    const blocks = [...editingSection.content_blocks]
                                    blocks[bIdx].caption = e.target.value
                                    setEditingSection({ ...editingSection, content_blocks: blocks })
                                  }}
                                />
                              </div>
                            )}

                            {block.type === 'cards' && (
                              <div>
                                {(block.items || []).map((card, cIdx) => (
                                  <div key={cIdx} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: 8, marginTop: 6 }}>
                                    <input
                                      type="text"
                                      className="admin-input"
                                      value={card.title || ''}
                                      placeholder="Card Title"
                                      onChange={(e) => {
                                        const blocks = [...editingSection.content_blocks]
                                        blocks[bIdx].items[cIdx].title = e.target.value
                                        setEditingSection({ ...editingSection, content_blocks: blocks })
                                      }}
                                    />
                                    <input
                                      type="text"
                                      className="admin-input"
                                      value={card.description || ''}
                                      placeholder="Card Description"
                                      onChange={(e) => {
                                        const blocks = [...editingSection.content_blocks]
                                        blocks[bIdx].items[cIdx].description = e.target.value
                                        setEditingSection({ ...editingSection, content_blocks: blocks })
                                      }}
                                    />
                                    <input
                                      type="text"
                                      className="admin-input"
                                      value={card.link || ''}
                                      placeholder="Link URL"
                                      onChange={(e) => {
                                        const blocks = [...editingSection.content_blocks]
                                        blocks[bIdx].items[cIdx].link = e.target.value
                                        setEditingSection({ ...editingSection, content_blocks: blocks })
                                      }}
                                    />
                                  </div>
                                ))}
                                <button
                                  type="button"
                                  className="admin-btn admin-btn-secondary admin-btn-sm"
                                  style={{ marginTop: 8 }}
                                  onClick={() => {
                                    const blocks = [...editingSection.content_blocks]
                                    blocks[bIdx].items.push({ title: 'New Card', description: '', badge: '', link: '' })
                                    setEditingSection({ ...editingSection, content_blocks: blocks })
                                  }}
                                >
                                  + Add Item
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="admin-modal-footer">
                      <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setEditingSection(null)}>Cancel</button>
                      <button
                        type="button"
                        className="admin-btn admin-btn-primary"
                        onClick={async () => {
                          try {
                            if (editingSection.id) await updateSection(editingSection.id, editingSection)
                            else await createSection(editingSection)
                            setEditingSection(null)
                            showToast('Section saved and published!')
                            loadContent()
                          } catch (err) {
                            showToast(err.message, 'error')
                          }
                        }}
                      >
                        Save Section
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 10: MEDIA LIBRARY */}
          {activeTab === 'media' && (
            <div className="admin-card">
              <div className="admin-card-header">
                <div>
                  <h3 className="admin-card-title"><ImageIcon size={18} /> Central Media Library ({mediaList.length})</h3>
                  <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--admin-muted)' }}>
                    Persistent uploads for projects, resume PDFs, and section images.
                  </p>
                </div>
                <div>
                  <label className="admin-btn admin-btn-primary" style={{ cursor: 'pointer' }}>
                    <UploadCloud size={15} /> Upload Media
                    <input type="file" onChange={handleMediaUpload} style={{ display: 'none' }} />
                  </label>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
                {mediaList.map(asset => {
                  const isPdf = asset.mimetype === 'application/pdf'
                  return (
                    <div key={asset.id} style={{ background: 'var(--admin-card)', border: '1px solid var(--admin-border)', borderRadius: 8, overflow: 'hidden' }}>
                      <div style={{ height: 140, background: '#0a0c0e', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                        {isPdf ? (
                          <div style={{ textAlign: 'center', color: 'var(--admin-accent)' }}>
                            <FileText size={48} />
                            <div style={{ fontSize: 11, marginTop: 4, color: '#fff' }}>PDF DOCUMENT</div>
                          </div>
                        ) : (
                          <img src={asset.url} alt={asset.alt_text} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        )}
                        <span style={{ position: 'absolute', top: 8, left: 8, fontSize: 10, background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '2px 6px', borderRadius: 4, textTransform: 'uppercase' }}>
                          {asset.category}
                        </span>
                      </div>

                      <div style={{ padding: 12 }}>
                        <strong style={{ fontSize: 13, color: '#fff', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={asset.original_name}>
                          {asset.original_name}
                        </strong>
                        <div style={{ fontSize: 11, color: 'var(--admin-muted)', marginTop: 2 }}>
                          {(asset.size / 1024).toFixed(1)} KB · {new Date(asset.created_at).toLocaleDateString()}
                        </div>

                        <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                          <button
                            type="button"
                            className="admin-btn admin-btn-secondary admin-btn-sm"
                            style={{ flex: 1 }}
                            onClick={() => {
                              navigator.clipboard.writeText(asset.url)
                              showToast('Copied URL to clipboard!')
                            }}
                          >
                            <Copy size={12} /> Copy URL
                          </button>
                          <a
                            href={asset.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="admin-btn admin-btn-secondary admin-btn-sm"
                          >
                            <Eye size={12} />
                          </a>
                          <button
                            type="button"
                            className="admin-btn admin-btn-danger admin-btn-sm"
                            onClick={async () => {
                              if (confirm(`Delete ${asset.original_name}?`)) {
                                await deleteMediaAsset(asset.id)
                                showToast('Asset deleted')
                                loadContent()
                              }
                            }}
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* TAB 11: RESUME */}
          {activeTab === 'resume' && (
            <div className="admin-card">
              <div className="admin-card-header">
                <div>
                  <h3 className="admin-card-title"><FileText size={18} /> Resume & PDF Management</h3>
                  <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--admin-muted)' }}>
                    Upload and manage your official resume PDF. Controls the Resume button in the public header.
                  </p>
                </div>
                <button className="admin-btn admin-btn-primary" onClick={handleSaveSettings} disabled={saving}>
                  <Save size={15} /> Save Settings
                </button>
              </div>

              <div className="admin-grid-2">
                <div>
                  <div style={{ background: 'var(--admin-card)', padding: 20, borderRadius: 8, border: '1px solid var(--admin-border)', marginBottom: 20 }}>
                    <h4 style={{ fontSize: 14, margin: '0 0 14px', color: '#fff' }}>Current Published Resume</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                      <div style={{ width: 48, height: 48, borderRadius: 8, background: 'rgba(232,66,10,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--admin-accent)' }}>
                        <FileText size={26} />
                      </div>
                      <div>
                        <strong style={{ fontSize: 14, color: '#fff' }}>
                          {siteSettings.resume_config?.filename || 'Samarth-Shekhar-Resume-2026.pdf'}
                        </strong>
                        <div style={{ fontSize: 12, color: 'var(--admin-muted)' }}>
                          File URL: {siteSettings.resume_config?.fileUrl || '/Samarth-Shekhar-Resume-2026.pdf'}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--admin-muted)', marginTop: 2 }}>
                          Last Updated: {siteSettings.resume_config?.lastUpdated || '2026-10-22'}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 10 }}>
                      <a
                        href={siteSettings.resume_config?.fileUrl || '/Samarth-Shekhar-Resume-2026.pdf'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                      >
                        <Eye size={13} /> View Current PDF ↗
                      </a>
                      <a
                        href="/api/public/resume"
                        download
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                      >
                        <Download size={13} /> Test Download
                      </a>
                    </div>
                  </div>

                  <div style={{ background: 'var(--admin-card)', padding: 20, borderRadius: 8, border: '1px solid var(--admin-border)' }}>
                    <h4 style={{ fontSize: 14, margin: '0 0 10px', color: '#fff' }}>Upload Updated Resume PDF</h4>
                    <p style={{ fontSize: 13, color: 'var(--admin-muted)', marginBottom: 14 }}>
                      Select a new PDF file to overwrite the current published version.
                    </p>
                    <label className="admin-btn admin-btn-primary" style={{ cursor: 'pointer' }}>
                      <UploadCloud size={15} /> Select PDF File to Upload
                      <input type="file" accept="application/pdf" onChange={handleResumeUpload} style={{ display: 'none' }} />
                    </label>
                  </div>
                </div>

                <div>
                  <div style={{ background: 'var(--admin-card)', padding: 20, borderRadius: 8, border: '1px solid var(--admin-border)' }}>
                    <h4 style={{ fontSize: 14, margin: '0 0 14px', color: '#fff' }}>Header Button Controls</h4>
                    
                    <div className="admin-form-group">
                      <label className="admin-label">Resume Button Visibility in Header</label>
                      <select
                        className="admin-select"
                        value={siteSettings.resume_config?.buttonPublished ? '1' : '0'}
                        onChange={(e) => {
                          const cfg = { ...siteSettings.resume_config, buttonPublished: e.target.value === '1' }
                          setSiteSettings({ ...siteSettings, resume_config: cfg })
                        }}
                      >
                        <option value="1">Published (Visible in Header Navigation)</option>
                        <option value="0">Unpublished (Hidden from Header)</option>
                      </select>
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-label">Button Label</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={siteSettings.resume_config?.buttonLabel || 'Resume'}
                        onChange={(e) => {
                          const cfg = { ...siteSettings.resume_config, buttonLabel: e.target.value }
                          setSiteSettings({ ...siteSettings, resume_config: cfg })
                        }}
                      />
                    </div>

                    <div className="admin-form-group">
                      <label className="admin-label">Download Tracking</label>
                      <select
                        className="admin-select"
                        value={siteSettings.resume_config?.downloadEnabled ? '1' : '0'}
                        onChange={(e) => {
                          const cfg = { ...siteSettings.resume_config, downloadEnabled: e.target.value === '1' }
                          setSiteSettings({ ...siteSettings, resume_config: cfg })
                        }}
                      >
                        <option value="1">Enabled (Log downloads to Analytics)</option>
                        <option value="0">Disabled</option>
                      </select>
                    </div>

                    <div style={{ padding: 12, background: 'rgba(46,160,67,0.1)', border: '1px solid rgba(46,160,67,0.3)', borderRadius: 6, fontSize: 13, color: '#3fb950', marginTop: 16 }}>
                      Total Recorded Resume Downloads: <strong>{analytics?.summary?.resumeDownloads ?? 0}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 12: HEADER & NAVIGATION */}
          {activeTab === 'navigation' && (
            <div className="admin-card">
              <div className="admin-card-header">
                <div>
                  <h3 className="admin-card-title"><Navigation size={18} /> Header & Navigation Manager</h3>
                  <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--admin-muted)' }}>
                    Reorder navigation links, edit labels, and toggle visibility. Unpublished sections are automatically excluded.
                  </p>
                </div>
                <button className="admin-btn admin-btn-primary" onClick={handleSaveSettings} disabled={saving}>
                  <Save size={15} /> Save Navigation
                </button>
              </div>

              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Navigation Item</th>
                      <th>Destination Link</th>
                      <th>Visible in Header</th>
                      <th>Link Label</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(siteSettings.header_config || []).map((item, idx) => (
                      <tr key={item.id || idx}>
                        <td style={{ width: 80 }}>
                          <div style={{ display: 'flex', gap: 4 }}>
                            <button
                              className="admin-btn admin-btn-secondary admin-btn-sm"
                              disabled={idx === 0}
                              onClick={() => {
                                const nav = [...siteSettings.header_config]
                                const temp = nav[idx]
                                nav[idx] = nav[idx - 1]
                                nav[idx - 1] = temp
                                setSiteSettings({ ...siteSettings, header_config: nav })
                              }}
                            >
                              <ArrowUp size={12} />
                            </button>
                            <button
                              className="admin-btn admin-btn-secondary admin-btn-sm"
                              disabled={idx === siteSettings.header_config.length - 1}
                              onClick={() => {
                                const nav = [...siteSettings.header_config]
                                const temp = nav[idx]
                                nav[idx] = nav[idx + 1]
                                nav[idx + 1] = temp
                                setSiteSettings({ ...siteSettings, header_config: nav })
                              }}
                            >
                              <ArrowDown size={12} />
                            </button>
                          </div>
                        </td>
                        <td><strong>{item.id}</strong></td>
                        <td><code>#{item.id}</code></td>
                        <td>
                          <input
                            type="checkbox"
                            checked={item.show !== false}
                            onChange={(e) => {
                              const nav = [...siteSettings.header_config]
                              nav[idx].show = e.target.checked
                              setSiteSettings({ ...siteSettings, header_config: nav })
                            }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="admin-input"
                            style={{ padding: '6px 10px', fontSize: 13 }}
                            value={item.label || ''}
                            onChange={(e) => {
                              const nav = [...siteSettings.header_config]
                              nav[idx].label = e.target.value
                              setSiteSettings({ ...siteSettings, header_config: nav })
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ marginTop: 24, padding: 18, background: 'var(--admin-card)', borderRadius: 8, border: '1px solid var(--admin-border)' }}>
                <h4 style={{ fontSize: 14, margin: '0 0 10px', color: '#fff' }}>Navigation Preview</h4>
                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', padding: '12px 16px', background: '#0d0f12', borderRadius: 6 }}>
                  {(siteSettings.header_config || []).filter(i => i.show !== false).map(i => (
                    <span key={i.id} style={{ color: '#fff', fontSize: 13 }}>{i.label}</span>
                  ))}
                  {siteSettings.resume_config?.buttonPublished && (
                    <span style={{ color: 'var(--admin-accent)', fontSize: 13, border: '1px solid var(--admin-accent)', padding: '2px 8px', borderRadius: 4 }}>
                      {siteSettings.resume_config?.buttonLabel || 'Resume'}
                    </span>
                  )}
                  <span style={{ marginLeft: 'auto', background: 'var(--admin-accent)', color: '#fff', padding: '4px 10px', borderRadius: 4, fontSize: 12 }}>
                    {siteSettings.cta_label || "Let's Connect"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 13: SEO & WEBSITE SETTINGS */}
          {activeTab === 'settings' && (
            <div className="admin-card">
              <div className="admin-card-header">
                <div>
                  <h3 className="admin-card-title"><Settings size={18} /> SEO & Website Settings</h3>
                  <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--admin-muted)' }}>
                    Global metadata, contact information, social profiles, and database backups.
                  </p>
                </div>
                <button className="admin-btn admin-btn-primary" onClick={handleSaveSettings} disabled={saving}>
                  <Save size={15} /> Save Settings
                </button>
              </div>

              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label className="admin-label">Page Title Tag</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={siteSettings.site_title || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, site_title: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Meta Description</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={siteSettings.meta_description || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, meta_description: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-grid-3">
                <div className="admin-form-group">
                  <label className="admin-label">Contact Email</label>
                  <input
                    type="email"
                    className="admin-input"
                    value={siteSettings.contact_email || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, contact_email: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">GitHub URL</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={siteSettings.github_url || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, github_url: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">LinkedIn URL</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={siteSettings.linkedin_url || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, linkedin_url: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label className="admin-label">Location Text</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={siteSettings.location_text || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, location_text: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Footer Copyright Text</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={siteSettings.footer_text || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, footer_text: e.target.value })}
                  />
                </div>
              </div>

              {/* Database Backup & Export */}
              <div style={{ marginTop: 24, padding: 20, background: 'var(--admin-card)', borderRadius: 8, border: '1px solid var(--admin-border)' }}>
                <h4 style={{ fontSize: 14, margin: '0 0 6px', color: '#fff' }}>Database Content Backup & Export</h4>
                <p style={{ fontSize: 13, color: 'var(--admin-muted)', marginBottom: 14 }}>
                  Export your entire database content (settings, projects, experiences, skills, education, certifications, custom sections) as a standalone JSON file.
                </p>
                <a
                  href="/api/admin/backup/export"
                  download
                  className="admin-btn admin-btn-secondary"
                >
                  <Download size={15} /> Export Portfolio Backup (JSON)
                </a>
              </div>
            </div>
          )}

          {/* TAB 14: ANALYTICS & INSIGHTS */}
          {activeTab === 'analytics' && (
            <div>
              <div className="admin-card">
                <div className="admin-card-header">
                  <div>
                    <h3 className="admin-card-title"><BarChart3 size={18} /> Real Visitor Analytics & Insights</h3>
                    <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--admin-muted)' }}>
                      First-party, privacy-conscious visitor events recorded in real-time. Never fabricated.
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <select
                      className="admin-select"
                      style={{ width: 'auto' }}
                      value={analyticsRange}
                      onChange={(e) => setAnalyticsRange(Number(e.target.value))}
                    >
                      <option value="7">Last 7 Days</option>
                      <option value="30">Last 30 Days</option>
                      <option value="90">Last 90 Days</option>
                      <option value="365">All Time</option>
                    </select>
                    <a
                      href="/api/admin/analytics/export"
                      download
                      className="admin-btn admin-btn-secondary"
                    >
                      <Download size={14} /> Export CSV
                    </a>
                  </div>
                </div>

                {/* KPI Metrics */}
                <div className="admin-grid-4">
                  <div style={{ padding: 16, background: 'var(--admin-card)', borderRadius: 8, border: '1px solid var(--admin-border)' }}>
                    <div className="admin-label">Total Page Views</div>
                    <div style={{ fontSize: 26, fontWeight: 700, color: '#fff', marginTop: 4 }}>
                      {analytics?.summary?.totalPageviews ?? 0}
                    </div>
                  </div>
                  <div style={{ padding: 16, background: 'var(--admin-card)', borderRadius: 8, border: '1px solid var(--admin-border)' }}>
                    <div className="admin-label">Unique Visitors</div>
                    <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--admin-blue)', marginTop: 4 }}>
                      {analytics?.summary?.uniqueVisitors ?? 0}
                    </div>
                  </div>
                  <div style={{ padding: 16, background: 'var(--admin-card)', borderRadius: 8, border: '1px solid var(--admin-border)' }}>
                    <div className="admin-label">Total Sessions</div>
                    <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--admin-accent)', marginTop: 4 }}>
                      {analytics?.summary?.totalSessions ?? 0}
                    </div>
                  </div>
                  <div style={{ padding: 16, background: 'var(--admin-card)', borderRadius: 8, border: '1px solid var(--admin-border)' }}>
                    <div className="admin-label">Avg Engagement</div>
                    <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--admin-green)', marginTop: 4 }}>
                      {analytics?.summary?.avgEngagementSeconds ?? 0}s
                    </div>
                  </div>
                </div>

                {/* Daily Views Bar Chart */}
                <div style={{ marginTop: 24, padding: 20, background: 'var(--admin-card)', borderRadius: 8, border: '1px solid var(--admin-border)' }}>
                  <h4 style={{ fontSize: 14, margin: '0 0 16px', color: '#fff' }}>Daily Traffic Timeline</h4>
                  {analytics?.dailyViews?.length ? (
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 160, paddingBottom: 24, overflowX: 'auto' }}>
                      {analytics.dailyViews.map((day) => {
                        const maxVal = Math.max(...analytics.dailyViews.map(d => d.views), 1)
                        const heightPct = Math.max((day.views / maxVal) * 100, 8)
                        return (
                          <div key={day.date} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 42 }}>
                            <div style={{ fontSize: 10, color: '#fff', marginBottom: 4 }}>{day.views}</div>
                            <div
                              style={{
                                width: 24,
                                height: `${heightPct}%`,
                                background: 'linear-gradient(to top, var(--admin-accent), #ff7a45)',
                                borderRadius: '4px 4px 0 0',
                              }}
                            />
                            <div style={{ fontSize: 10, color: 'var(--admin-muted)', marginTop: 6, whiteSpace: 'nowrap' }}>
                              {day.date.slice(5)}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div style={{ color: 'var(--admin-muted)', fontSize: 13, textAlign: 'center', padding: '24px 0' }}>
                      No daily traffic data recorded in this period yet.
                    </div>
                  )}
                </div>

                {/* Top Sources & Devices */}
                <div className="admin-grid-3" style={{ marginTop: 20 }}>
                  <div style={{ padding: 18, background: 'var(--admin-card)', borderRadius: 8, border: '1px solid var(--admin-border)' }}>
                    <h4 style={{ fontSize: 13.5, margin: '0 0 12px', color: '#fff' }}>Top Referring Websites</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {analytics?.topReferrers?.map((r, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                          <span style={{ color: 'var(--admin-text)' }}>{r.source}</span>
                          <strong style={{ color: 'var(--admin-accent)' }}>{r.count}</strong>
                        </div>
                      )) || <div style={{ color: 'var(--admin-muted)' }}>None recorded</div>}
                    </div>
                  </div>

                  <div style={{ padding: 18, background: 'var(--admin-card)', borderRadius: 8, border: '1px solid var(--admin-border)' }}>
                    <h4 style={{ fontSize: 13.5, margin: '0 0 12px', color: '#fff' }}>Device Distribution</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {analytics?.devices?.map((d, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                          <span style={{ color: 'var(--admin-text)' }}>{d.device}</span>
                          <strong style={{ color: 'var(--admin-blue)' }}>{d.count}</strong>
                        </div>
                      )) || <div style={{ color: 'var(--admin-muted)' }}>None recorded</div>}
                    </div>
                  </div>

                  <div style={{ padding: 18, background: 'var(--admin-card)', borderRadius: 8, border: '1px solid var(--admin-border)' }}>
                    <h4 style={{ fontSize: 13.5, margin: '0 0 12px', color: '#fff' }}>Outbound Link Clicks</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {analytics?.topExternalClicks?.map((c, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                          <span style={{ color: 'var(--admin-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 160 }} title={c.target_label}>
                            {c.target_label}
                          </span>
                          <strong style={{ color: 'var(--admin-green)' }}>{c.count}</strong>
                        </div>
                      )) || <div style={{ color: 'var(--admin-muted)' }}>None recorded</div>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 15: PROFILE & SECURITY */}
          {activeTab === 'profile' && (
            <div className="admin-card">
              <div className="admin-card-header">
                <div>
                  <h3 className="admin-card-title"><ShieldCheck size={18} /> Admin Profile & Security</h3>
                  <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--admin-muted)' }}>
                    Account credentials, password updates, security controls, and session revocation.
                  </p>
                </div>
              </div>

              <div className="admin-grid-2">
                {/* Account Details */}
                <div style={{ background: 'var(--admin-card)', padding: 20, borderRadius: 8, border: '1px solid var(--admin-border)' }}>
                  <h4 style={{ fontSize: 14, margin: '0 0 16px', color: '#fff' }}>Account Information</h4>
                  <div style={{ fontSize: 13, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div>
                      <span className="admin-label">Account ID</span>
                      <code style={{ color: '#fff', background: '#0a0c0e', padding: '4px 8px', borderRadius: 4 }}>
                        {adminUser?.id || 'usr_admin_samarth'}
                      </code>
                    </div>
                    <div>
                      <span className="admin-label">Role</span>
                      <span className="admin-badge admin-badge-published">{adminUser?.role || 'admin'}</span>
                    </div>
                    <div>
                      <span className="admin-label">Last Password Change</span>
                      <span style={{ color: '#fff' }}>
                        {adminUser?.lastPasswordChange ? new Date(adminUser.lastPasswordChange).toLocaleString() : 'Not recorded'}
                      </span>
                    </div>
                  </div>

                  {/* Change Email */}
                  <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--admin-border)' }}>
                    <h5 style={{ fontSize: 13.5, margin: '0 0 10px', color: '#fff' }}>Update Email Address</h5>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <input
                        type="email"
                        className="admin-input"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="newemail@domain.com"
                      />
                      <button
                        className="admin-btn admin-btn-secondary"
                        onClick={async () => {
                          try {
                            const res = await changeEmail(newEmail)
                            setAdminUser({ ...adminUser, email: res.email })
                            showToast('Email address updated!')
                          } catch (err) {
                            showToast(err.message, 'error')
                          }
                        }}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>

                {/* Change Password */}
                <div style={{ background: 'var(--admin-card)', padding: 20, borderRadius: 8, border: '1px solid var(--admin-border)' }}>
                  <h4 style={{ fontSize: 14, margin: '0 0 16px', color: '#fff' }}>Change Password</h4>
                  <div className="admin-form-group">
                    <label className="admin-label">Current Password *</label>
                    <input
                      type="password"
                      className="admin-input"
                      value={curPassword}
                      onChange={(e) => setCurPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">New Password (min 8 chars) *</label>
                    <input
                      type="password"
                      className="admin-input"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      minLength={8}
                    />
                  </div>
                  <button
                    className="admin-btn admin-btn-primary"
                    onClick={async () => {
                      try {
                        await changePassword(curPassword, newPassword)
                        showToast('Password changed successfully!')
                        setCurPassword('')
                        setNewPassword('')
                        loadContent()
                      } catch (err) {
                        showToast(err.message, 'error')
                      }
                    }}
                  >
                    Change Password
                  </button>
                </div>
              </div>

              {/* Active Sessions */}
              <div style={{ marginTop: 24, padding: 20, background: 'var(--admin-card)', borderRadius: 8, border: '1px solid var(--admin-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <div>
                    <h4 style={{ fontSize: 14, margin: '0 0 4px', color: '#fff' }}>Active Sessions ({sessions.length})</h4>
                    <p style={{ margin: 0, fontSize: 12.5, color: 'var(--admin-muted)' }}>
                      Devices and browsers currently logged into this admin account.
                    </p>
                  </div>
                  {sessions.length > 1 && (
                    <button
                      className="admin-btn admin-btn-danger admin-btn-sm"
                      onClick={async () => {
                        if (confirm('Revoke all other active sessions?')) {
                          await revokeSession(null, true)
                          showToast('All other sessions revoked')
                          loadContent()
                        }
                      }}
                    >
                      Revoke Other Sessions
                    </button>
                  )}
                </div>

                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Device / User Agent</th>
                        <th>IP Address</th>
                        <th>Created</th>
                        <th>Last Active</th>
                        <th style={{ textAlign: 'right' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sessions.map(s => (
                        <tr key={s.id}>
                          <td style={{ fontSize: 12.5, maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={s.user_agent}>
                            {s.user_agent}
                          </td>
                          <td><code>{s.ip_address}</code></td>
                          <td style={{ fontSize: 12 }}>{new Date(s.created_at).toLocaleString()}</td>
                          <td style={{ fontSize: 12 }}>{new Date(s.last_active_at).toLocaleString()}</td>
                          <td style={{ textAlign: 'right' }}>
                            <button
                              className="admin-btn admin-btn-danger admin-btn-sm"
                              onClick={async () => {
                                await revokeSession(s.id, false)
                                showToast('Session revoked')
                                loadContent()
                              }}
                            >
                              Revoke
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
