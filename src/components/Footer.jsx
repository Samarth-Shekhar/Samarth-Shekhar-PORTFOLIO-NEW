function Footer({ settings = {} }) {
  const scrollToTop = (event) => {
    event.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollTo = (event, id) => {
    event.preventDefault()
    const element = document.getElementById(id)
    if (!element) return
    const top = element.getBoundingClientRect().top + window.scrollY - 70
    window.scrollTo({ top, behavior: 'smooth' })
  }

  const resumeUrl = settings.resumeConfig?.fileUrl || '/Samarth-Shekhar-Resume-2026.pdf'
  const email = settings.contactEmail || 'samarthshekharmj@gmail.com'
  const github = settings.githubUrl || 'https://github.com/Samarth-Shekhar'
  const linkedin = settings.linkedinUrl || 'https://www.linkedin.com/in/samarth-shekhar-185ba311a'
  const locationText = settings.locationText || 'VAISHALI, GHAZIABAD, UTTAR PRADESH · B.TECH IT 2026'

  const links = [
    ['About', 'about'],
    ['Projects', 'projects'],
    ['Experience', 'experience'],
    ['Certifications', 'certifications'],
    ['Education', 'education'],
    ['Skills', 'skills'],
    ['FAQ', 'faq'],
    ['Resume', resumeUrl],
    ['Contact', 'contact'],
  ]

  return (
    <footer className="footer-editorial" role="contentinfo">
      <div className="container">
        <div className="footer-editorial__grid">
          <div>
            <div className="footer-brand">SAMARTH <em>SHEKHAR</em></div>
            <p className="footer-description">
              B.Tech IT graduate combining hands-on technical depth in Agentic AI with full-stack web engineering and certified project management.
            </p>
          </div>

          <div>
            <div className="footer-col-title">Index</div>
            <div className="footer-col-links">
              {links.map(([label, destination]) => (
                <a
                  key={label}
                  href={destination.startsWith('/') ? destination : `#${destination}`}
                  className="footer-col-link"
                  onClick={destination.startsWith('/') ? undefined : (event) => scrollTo(event, destination)}
                  target={destination.startsWith('/') ? '_blank' : undefined}
                  rel={destination.startsWith('/') ? 'noopener noreferrer' : undefined}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="footer-col-title">Focus</div>
            <div className="footer-col-links">
              <span className="footer-col-link">Autonomous Agents</span>
              <span className="footer-col-link">RAG &amp; Vector Stores</span>
              <span className="footer-col-link">React &amp; Next.js</span>
              <span className="footer-col-link">FastAPI Microservices</span>
              <span className="footer-col-link">Agile Product Execution</span>
            </div>
          </div>

          <div>
            <div className="footer-col-title">Connect</div>
            <div className="footer-col-links">
              <a href={github} target="_blank" rel="noopener noreferrer" className="footer-col-link">GitHub →</a>
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="footer-col-link">LinkedIn →</a>
              <a href={`mailto:${email}`} className="footer-col-link">Email →</a>
              <a href="#about" onClick={scrollToTop} className="footer-col-link footer-col-link--accent">Back to Top ↑</a>
            </div>
          </div>
        </div>

        <div className="footer-editorial__bottom">
          <span>{locationText}</span>
          <span>© {new Date().getFullYear()} SAMARTH SHEKHAR. ALL RIGHTS RESERVED.</span>
        </div>

        <div className="footer-watermark" aria-hidden="true">SAMARTH SHEKHAR</div>
      </div>
    </footer>
  )
}

export default Footer
