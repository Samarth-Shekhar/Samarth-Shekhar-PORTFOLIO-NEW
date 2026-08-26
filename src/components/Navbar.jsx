import { useState, useEffect } from 'react'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, targetId) => {
    e.preventDefault()
    setIsMenuOpen(false)
    const element = document.getElementById(targetId)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Skills', id: 'skills' },
    { label: 'Certifications', id: 'certifications' },
    { label: 'Contact', id: 'contact' },
  ]

  return (
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="navbar__inner">
        <div className="navbar__left">
          <a
            href="#hero"
            className="navbar__logo-link"
            onClick={(e) => handleNavClick(e, 'hero')}
            aria-label="Go to top"
          >
            <div className="navbar__avatar-icon">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="6" fill="#111111"/>
                <circle cx="14" cy="11" r="5" fill="#FF451A"/>
                <path d="M7 23C7 19.134 10.134 16 14 16C17.866 16 21 19.134 21 23" stroke="#F3F2ED" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="navbar__logo-text">SAMARTH</span>
          </a>

          <div className="navbar__status-pill">
            <span className="navbar__status-dot"></span>
            <span className="navbar__status-text">Available Now</span>
          </div>
        </div>

        <div className="navbar__links" role="menubar">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="navbar__link"
              role="menuitem"
              onClick={(e) => handleNavClick(e, link.id)}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="navbar__right">
          <a
            href="/resume.pdf"
            className="navbar__cta-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17"/>
            </svg>
            Resume
          </a>

          <button
            className={`navbar__hamburger ${isMenuOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="navbar__hamburger-line" />
            <span className="navbar__hamburger-line" />
            <span className="navbar__hamburger-line" />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`navbar__mobile-menu ${isMenuOpen ? 'navbar__mobile-menu--open' : ''}`}
        role="menu"
        aria-hidden={!isMenuOpen}
      >
        <div className="navbar__mobile-menu-inner">
          <div className="navbar__mobile-status">
            <span className="navbar__status-dot"></span>
            <span>SOFTWARE &bull; AI &bull; PRODUCT</span>
          </div>
          {navLinks.map((link, index) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="navbar__mobile-link"
              role="menuitem"
              onClick={(e) => handleNavClick(e, link.id)}
              style={{ animationDelay: `${index * 0.05}s` }}
              tabIndex={isMenuOpen ? 0 : -1}
            >
              <span className="navbar__mobile-link-number">0{index + 1}</span>
              {link.label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            className="navbar__mobile-resume"
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={isMenuOpen ? 0 : -1}
          >
            Download Resume
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
