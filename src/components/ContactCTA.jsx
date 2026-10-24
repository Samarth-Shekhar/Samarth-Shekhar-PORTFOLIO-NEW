import { useState, useRef } from 'react'
import { trackEvent } from '../utils/analytics.js'
import botanicalFoliage from '../assets/botanical_3d_foliage.jpg'

function ContactCTA({ settings = {} }) {
  const email = settings.contactEmail || 'samarthshekharmj@gmail.com'
  const github = settings.githubUrl || 'https://github.com/Samarth-Shekhar'
  const linkedin = settings.linkedinUrl || 'https://www.linkedin.com/in/samarth-shekhar-185ba311a'

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })
  const showcaseRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!showcaseRef.current) return
    const rect = showcaseRef.current.getBoundingClientRect()
    // Subtle parallax offset (-10px to +10px)
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10
    setMouseOffset({ x, y })
  }

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    trackEvent('contact_form_submit', { name: formData.name, subject: formData.subject })
    const mailtoSubject = encodeURIComponent(formData.subject ? `[Portfolio Inquiry] ${formData.subject}` : `[Portfolio Inquiry] from ${formData.name}`)
    const mailtoBody = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
      window.location.href = `mailto:${email}?subject=${mailtoSubject}&body=${mailtoBody}`
    }, 600)
  }

  return (
    <section id="contact" className="cta-banner-section" aria-labelledby="cta-heading">
      <div className="container">
        <div
          ref={showcaseRef}
          className="contact-showcase"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* 3D Botanical Thorns & Foliage Background */}
          <div className="contact-showcase__ambient" aria-hidden="true">
            {/* Luminous subtle grid overlay */}
            <div className="cs-ambient-grid" />

            {/* Dual color ambient light: Warm Terracotta/Amber on Left, Deep Emerald on Right */}
            <div className="cs-ambient-lights" />

            {/* 3D Panoramic Foliage Layer with gentle sway & interactive parallax */}
            <div
              className="cs-3d-foliage-wrap"
              style={{
                transform: `translate3d(${mouseOffset.x * -1}px, ${mouseOffset.y * -0.6}px, 0)`
              }}
            >
              <img
                src={botanicalFoliage}
                alt=""
                className="cs-3d-foliage-img"
              />
            </div>

            {/* Botanical depth corner glows */}
            <div className="cs-botanical-accent cs-botanical-accent--left" />
            <div className="cs-botanical-accent cs-botanical-accent--right" />

            {/* Readability scrim so foreground text & form remain crisp */}
            <div className="cs-readability-scrim" />
          </div>

          <div className="contact-showcase__content">
            {/* Left Info Column */}
            <div className="contact-showcase__info">
              <div className="contact-showcase__tag">
                <span className="live-ping" />
                <span>// OPEN FOR WORK · 2026</span>
              </div>

              <h2 id="cta-heading" className="contact-showcase__title">
                Let's build<br /><em>something great</em><br />together.
              </h2>

              <p className="contact-showcase__sub">
                Whether you're looking for an AI Engineer, a full-stack builder, or an engineering collaborator to launch high-velocity products — send a transmission.
              </p>

              <div className="contact-touchpoints">
                <a
                  href={`mailto:${email}`}
                  className="touchpoint-card"
                  onClick={() => trackEvent('direct_email_click')}
                >
                  <span className="touchpoint-card__icon">✉</span>
                  <div className="touchpoint-card__text">
                    <small>DIRECT INBOX</small>
                    <strong>{email}</strong>
                  </div>
                  <span className="touchpoint-card__arrow">↗</span>
                </a>
              </div>

              <div className="contact-social-pills">
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-motion-badge social-motion-badge--github"
                  onClick={() => trackEvent('contact_github_click')}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub</span>
                  <em>↗</em>
                </a>

                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-motion-badge social-motion-badge--linkedin"
                  onClick={() => trackEvent('contact_linkedin_click')}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                  <span>LinkedIn</span>
                  <em>↗</em>
                </a>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="contact-showcase__form-wrapper">
              <div className="contact-form-glow" />
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form__header">
                  <div className="contact-form__dots">
                    <span className="dot dot--red" />
                    <span className="dot dot--yellow" />
                    <span className="dot dot--green" />
                  </div>
                  <span className="contact-form__title">new_message.sh</span>
                  <span className="contact-form__status-badge">OPEN</span>
                </div>

                <div className="contact-form__fields">
                  <div className="form-group--floating">
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder=" "
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <label htmlFor="contact-name">Your Name</label>
                  </div>

                  <div className="form-group--floating">
                    <input
                      id="contact-email-input"
                      type="email"
                      required
                      placeholder=" "
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <label htmlFor="contact-email-input">Email Address</label>
                  </div>

                  <div className="form-group--floating">
                    <input
                      id="contact-subject"
                      type="text"
                      placeholder=" "
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                    <label htmlFor="contact-subject">Topic / Opportunity (Optional)</label>
                  </div>

                  <div className="form-group--floating">
                    <textarea
                      id="contact-message"
                      rows="4"
                      required
                      placeholder=" "
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                    <label htmlFor="contact-message">Your Message</label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className={`contact-submit-btn${submitted ? ' is-sent' : ''}`}
                >
                  <span className="contact-submit-btn__shine" />
                  {submitted ? 'Message Sent ✓' : submitting ? 'Sending...' : 'Send Message ↗'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactCTA
