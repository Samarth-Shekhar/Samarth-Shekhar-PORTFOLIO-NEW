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
      const offset = 60
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  const navLinks = [
    { label: 'ABOUT', id: 'about' },
    { label: 'WORK', id: 'work' },
    { label: 'EXPERIENCE', id: 'experience' },
    { label: 'CONTACT', id: 'contact' },
  ]

  return (
    <nav className={`ed-navbar ${isScrolled ? 'ed-navbar--scrolled' : ''}`} role="navigation">
      <div className="ed-navbar__inner">
        <a
          href="#hero"
          className="ed-navbar__logo"
          onClick={(e) => handleNavClick(e, 'hero')}
        >
          <span className="logo-text">SAMARTH</span>
          <span className="logo-dot"></span>
        </a>

        <div className="ed-navbar__links">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="ed-navbar__link"
              onClick={(e) => handleNavClick(e, link.id)}
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          className={`ed-navbar__hamburger ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
        </button>
      </div>

      <div className={`ed-navbar__mobile-drawer ${isMenuOpen ? 'open' : ''}`}>
        <div className="drawer-inner">
          {navLinks.map((link, idx) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="drawer-link"
              onClick={(e) => handleNavClick(e, link.id)}
            >
              <span className="drawer-num">0{idx + 1}</span>
              <span className="drawer-label">{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
