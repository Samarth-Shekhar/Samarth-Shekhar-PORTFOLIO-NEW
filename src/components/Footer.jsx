function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__container">
        <div className="footer__top-bar">
          <div className="footer__brand-col">
            <span className="footer__logo">SAMARTH SHEKHAR</span>
            <span className="footer__tagline">SOFTWARE &bull; AI &bull; PRODUCT</span>
            <p className="footer__bio">
              B.Tech IT graduate passionate about software development, AI systems, and product execution.
            </p>
          </div>

          <div className="footer__links-col">
            <h4 className="footer__col-title">NAVIGATION</h4>
            <a href="#about" className="footer__link">About</a>
            <a href="#projects" className="footer__link">Projects</a>
            <a href="#experience" className="footer__link">Experience</a>
            <a href="#skills" className="footer__link">Skills</a>
            <a href="#contact" className="footer__link">Contact</a>
          </div>

          <div className="footer__links-col">
            <h4 className="footer__col-title">ROLES</h4>
            <span className="footer__link-text">Full Stack Developer</span>
            <span className="footer__link-text">Software Engineer</span>
            <span className="footer__link-text">AI / GenAI Developer</span>
            <span className="footer__link-text">Product / Project PM</span>
          </div>

          <div className="footer__links-col">
            <h4 className="footer__col-title">CONNECT</h4>
            <a
              href="https://github.com/Samarth-Shekhar"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/samarth-shekhar-185ba311a"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              LinkedIn ↗
            </a>
            <a href="tel:+919650754598" className="footer__link">
              +91 9650754598
            </a>
            <a href="mailto:samarthshekhar.work@gmail.com" className="footer__link">
              Email
            </a>
          </div>
        </div>

        <div className="footer__bottom-row">
          <p className="footer__copyright">&copy; 2026 Samarth Shekhar. All rights reserved.</p>
          <p className="footer__location">Noida / Delhi NCR, India</p>
        </div>

        {/* Giant Outlined Watermark Title from Reference Design */}
        <div className="footer__watermark" aria-hidden="true">
          SAMARTH SHEKHAR
        </div>
      </div>
    </footer>
  )
}

export default Footer
