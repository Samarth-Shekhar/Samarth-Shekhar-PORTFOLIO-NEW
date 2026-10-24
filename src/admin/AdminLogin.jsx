import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { adminLogin, forgotPassword, resetPassword, setAuthToken, getAuthToken } from '../utils/api.js'
import '../admin.css'

export default function AdminLogin() {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Forgot password modal
  const [showForgot, setShowForgot] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [recoveryToken, setRecoveryToken] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [forgotStep, setForgotStep] = useState(1) // 1: request token, 2: set new password

  useEffect(() => {
    // If already logged in, redirect directly to /admin
    if (getAuthToken()) {
      navigate('/admin')
    }

    if (location.search.includes('expired=1')) {
      setError('Your previous session has expired. Please log in again.')
    }
  }, [navigate, location])

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const data = await adminLogin(email, password)
      setAuthToken(data.token)
      setSuccess('Authentication successful. Redirecting to dashboard...')
      setTimeout(() => {
        navigate('/admin')
      }, 500)
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const handleRequestRecovery = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    try {
      const res = await forgotPassword(forgotEmail)
      if (res.recoveryToken) {
        setRecoveryToken(res.recoveryToken)
        setForgotStep(2)
        setSuccess('Recovery token generated (Dev Mode). Please enter your new password.')
      } else {
        setSuccess('If the account exists, recovery instructions have been prepared.')
      }
    } catch (err) {
      setError(err.message || 'Failed to request recovery.')
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    try {
      await resetPassword(recoveryToken, newPassword)
      setSuccess('Password reset successfully! You can now log in.')
      setShowForgot(false)
      setForgotStep(1)
      setPassword('')
    } catch (err) {
      setError(err.message || 'Failed to reset password.')
    }
  }

  return (
    <div className="admin-body admin-login-wrapper">
      <div className="admin-login-box">
        <div className="admin-login-brand">
          <img src="/profile/glitched-ai-visor-portrait-transparent.png" alt="Samarth Shekhar" />
          <div>
            <h1 className="admin-login-title">Portfolio CMS Admin</h1>
            <div className="admin-login-subtitle">Samarth Shekhar · Portfolio 2k26</div>
          </div>
        </div>

        {error && (
          <div style={{ background: 'rgba(248, 81, 73, 0.15)', border: '1px solid rgba(248, 81, 73, 0.3)', color: '#f85149', padding: '10px 14px', borderRadius: 6, fontSize: 13, marginBottom: 16 }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ background: 'rgba(46, 160, 67, 0.15)', border: '1px solid rgba(46, 160, 67, 0.3)', color: '#3fb950', padding: '10px 14px', borderRadius: 6, fontSize: 13, marginBottom: 16 }}>
            {success}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="admin-form-group">
            <label className="admin-label">Admin Email</label>
            <input
              type="email"
              className="admin-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. samarthshekharmj@gmail.com"
              required
              autoFocus
            />
          </div>

          <div className="admin-form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="admin-label">Password</label>
              <button
                type="button"
                onClick={() => { setShowForgot(true); setError(''); setSuccess(''); }}
                style={{ background: 'none', border: 'none', color: 'var(--admin-accent)', fontSize: 12, cursor: 'pointer', padding: 0 }}
              >
                Forgot password?
              </button>
            </div>
            <input
              type="password"
              className="admin-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="admin-btn admin-btn-primary"
            style={{ width: '100%', padding: '12px', marginTop: 8 }}
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard →'}
          </button>
        </form>

        <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--admin-border)', textAlign: 'center' }}>
          <a href="/" style={{ color: 'var(--admin-muted)', textDecoration: 'none', fontSize: 13 }}>
            ← Return to Public Portfolio
          </a>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgot && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: 440 }}>
            <div className="admin-modal-header">
              <h3 className="admin-card-title">Reset Admin Password</h3>
              <button
                onClick={() => setShowForgot(false)}
                style={{ background: 'none', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div className="admin-modal-body">
              {forgotStep === 1 ? (
                <form onSubmit={handleRequestRecovery}>
                  <p style={{ fontSize: 13, color: 'var(--admin-muted)', marginBottom: 16 }}>
                    Enter your admin email address to generate a secure recovery token.
                  </p>
                  <div className="admin-form-group">
                    <label className="admin-label">Admin Email</label>
                    <input
                      type="email"
                      className="admin-input"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="samarthshekharmj@gmail.com"
                      required
                    />
                  </div>
                  <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 20 }}>
                    <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setShowForgot(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="admin-btn admin-btn-primary">
                      Generate Recovery Token →
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleResetPassword}>
                  <p style={{ fontSize: 13, color: 'var(--admin-muted)', marginBottom: 16 }}>
                    Enter your recovery token and choose a new password.
                  </p>
                  <div className="admin-form-group">
                    <label className="admin-label">Recovery Token</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={recoveryToken}
                      onChange={(e) => setRecoveryToken(e.target.value)}
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">New Password (min 8 chars)</label>
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
                  <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 20 }}>
                    <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setForgotStep(1)}>
                      Back
                    </button>
                    <button type="submit" className="admin-btn admin-btn-primary">
                      Confirm New Password
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
