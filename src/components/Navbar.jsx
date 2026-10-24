import { useEffect, useState } from 'react'
import { trackEvent } from '../utils/analytics.js'

const DEFAULT_NAV_LINKS = [
  { label: 'Home', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Certifications', id: 'certifications' },
  { label: 'Education', id: 'education' },
  { label: 'Skills', id: 'skills' },
  { label: 'FAQ', id: 'faq' },
  { label: 'Contact', id: 'contact' },
]

function NavMark() {
  return (
    <span className="nav__mark" aria-hidden="true">
      <svg viewBox="0 0 36 36" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Hair strokes */}
        <path d="M10 13l3-4 3 3 3-4 4 4 4-3 2 4" strokeWidth="2.2" />
        {/* Sunglasses with reflections */}
        <path d="M8 18h20" strokeWidth="1.8" />
        <rect x="9" y="16.5" width="8" height="5.5" rx="1.5" fill="currentColor" stroke="none" />
        <rect x="19" y="16.5" width="8" height="5.5" rx="1.5" fill="currentColor" stroke="none" />
        <line x1="11.5" y1="18" x2="13.5" y2="20.5" stroke="#f4f1ec" strokeWidth="1.2" />
        <line x1="21.5" y1="18" x2="23.5" y2="20.5" stroke="#f4f1ec" strokeWidth="1.2" />
        {/* Nose */}
        <path d="M18 20v2.5a1.2 1.2 0 0 1-1.2 1.2" strokeWidth="1.8" />
        {/* Smile */}
        <path d="M14 26.5a4.5 4.5 0 0 0 8 0" strokeWidth="1.8" />
      </svg>
    </span>
  )
}

function Navbar({ settings = {}, customSections = [] }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const scrollTo = (event, id) => {
    event.preventDefault()
    setMenuOpen(false)
    const element = document.getElementById(id)
    if (!element) return
    window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - 74, behavior: 'smooth' })
  }

  // Build active navigation links
  let links = []
  if (Array.isArray(settings?.headerConfig) && settings.headerConfig.length > 0) {
    links = settings.headerConfig
      .filter((item) => item.show !== false)
      .map((item) => ({
        label: item.label,
        id: item.id,
        href: item.href,
      }))
  } else {
    links = [...DEFAULT_NAV_LINKS]
  }

  // Include published custom sections if show_in_nav is enabled
  if (Array.isArray(customSections)) {
    customSections.forEach((sec) => {
      if (sec.status === 'published' && sec.show_in_nav) {
        // Only add if not already in links
        if (!links.some((l) => l.id === sec.id)) {
          links.push({
            label: sec.nav_label || sec.title,
            id: sec.id,
          })
        }
      }
    })
  }

  // Resume configuration
  const resumeConfig = settings?.resumeConfig || {
    fileUrl: '/Samarth-Shekhar-Resume-2026.pdf',
    buttonPublished: true,
    buttonLabel: 'Resume',
  }
  const isResumePublished = resumeConfig.buttonPublished !== false

  const handleResumeClick = (e) => {
    trackEvent('resume_download', {
      targetLabel: resumeConfig.buttonLabel || 'Resume',
      targetUrl: resumeConfig.fileUrl || '/api/public/resume',
    })
  }

  const ctaLabel = settings?.ctaLabel || 'Let’s Connect'
  const ctaLink = settings?.ctaLink || '#contact'
  const availableStatus = settings?.availableStatus || 'Available Now'

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`} aria-label="Main navigation">
      <div className="nav__inner">
        <a href="#about" className="nav__brand" onClick={(event) => scrollTo(event, 'about')} aria-label="Samarth Shekhar home">
          <NavMark />
        </a>
        <div className="nav__status">
          <span className="nav__dot" aria-hidden="true" />
          <span>{availableStatus}</span>
        </div>

        <div className="nav__links">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href ?? `#${link.id}`}
              className="nav__link"
              onClick={link.id ? (event) => scrollTo(event, link.id) : undefined}
              target={link.href ? '_blank' : undefined}
              rel={link.href ? 'noopener noreferrer' : undefined}
            >
              {link.label}
            </a>
          ))}

          {/* Dedicated Resume Button matching existing design */}
          {isResumePublished && (
            <a
              href={resumeConfig.fileUrl || '/api/public/resume'}
              className="nav__link nav__resume-btn"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleResumeClick}
            >
              {resumeConfig.buttonLabel || 'Resume'} ↗
            </a>
          )}
        </div>

        <a
          href={ctaLink}
          className="nav__cta"
          onClick={ctaLink.startsWith('#') ? (event) => scrollTo(event, ctaLink.slice(1)) : undefined}
        >
          <span className="nav__cta-icon" aria-hidden="true">↗</span>
          {ctaLabel}
        </a>

        <button
          className={`nav__hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen((value) => !value)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`nav__drawer${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        {links.map((link, index) => (
          <a
            key={link.label}
            href={link.href ?? `#${link.id}`}
            className="nav__drawer-link"
            onClick={link.id ? (event) => scrollTo(event, link.id) : undefined}
            target={link.href ? '_blank' : undefined}
            rel={link.href ? 'noopener noreferrer' : undefined}
          >
            {link.label}
            <span>0{index + 1}</span>
          </a>
        ))}

        {isResumePublished && (
          <a
            href={resumeConfig.fileUrl || '/api/public/resume'}
            className="nav__drawer-link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              handleResumeClick(e)
              setMenuOpen(false)
            }}
            style={{ color: 'var(--orange)' }}
          >
            {resumeConfig.buttonLabel || 'Resume'} ↗
            <span>PDF</span>
          </a>
        )}
      </div>
    </nav>
  )
}

export default Navbar
