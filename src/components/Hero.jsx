function Hero() {
  const handleScrollTo = (e, targetId) => {
    e.preventDefault()
    const elem = document.getElementById(targetId)
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section id="hero" className="ed-hero" aria-label="Hero Introduction">
      <div className="ed-hero__container">
        {/* Editorial Top Metadata */}
        <div className="ed-hero__metadata reveal-on-scroll">
          <span className="meta-item">B.TECH IT GRADUATE</span>
          <span className="meta-divider">/</span>
          <span className="meta-item">SOFTWARE &bull; AI &bull; PRODUCT</span>
          <span className="meta-divider">/</span>
          <span className="meta-item">2026</span>
        </div>

        {/* Asymmetrical Typography Main Body */}
        <div className="ed-hero__body">
          <div className="ed-hero__left reveal-on-scroll">
            <span className="ed-hero__label">PORTFOLIO '26</span>
            <div className="ed-hero__tagline-pill">SOFTWARE &bull; AI &bull; PRODUCT</div>
          </div>

          <div className="ed-hero__center reveal-on-scroll">
            <h1 className="ed-hero__title">
              <span className="title-line line-1">SAMARTH</span>
              <span className="title-line line-2">SHEKHAR</span>
            </h1>
          </div>

          <div className="ed-hero__right reveal-on-scroll">
            <p className="ed-hero__lead">
              "B.Tech IT graduate who enjoys turning ideas into useful software, experimenting with AI, and solving problems that make products better."
            </p>
            <p className="ed-hero__sub">
              I’ve worked across software development, AI automation, frontend applications, data workflows and project execution. I like understanding the problem first, building something practical, and learning along the way.
            </p>

            <div className="ed-hero__actions">
              <a
                href="#work"
                className="ed-btn ed-btn--primary"
                onClick={(e) => handleScrollTo(e, 'work')}
              >
                VIEW WORK ↗
              </a>
              <a
                href="#contact"
                className="ed-btn ed-btn--secondary"
                onClick={(e) => handleScrollTo(e, 'contact')}
              >
                LET'S CONNECT
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Scroll Indicator & Socials */}
        <div className="ed-hero__bottom reveal-on-scroll">
          <div className="ed-hero__scroll-indicator">
            <span className="scroll-line"></span>
            <span className="scroll-text">SCROLL TO EXPLORE</span>
          </div>

          <div className="ed-hero__socials">
            <a
              href="https://github.com/Samarth-Shekharadd"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              GITHUB ↗
            </a>
            <a
              href="https://www.linkedin.com/in/samarth-shekhar-185ba311a"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              LINKEDIN ↗
            </a>
            <a
              href="mailto:samarthshekhar.work@gmail.com"
              className="social-link"
            >
              EMAIL ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
