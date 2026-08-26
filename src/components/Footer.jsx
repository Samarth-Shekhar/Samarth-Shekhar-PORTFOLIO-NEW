function Footer() {
  return (
    <footer className="ed-footer" role="contentinfo">
      <div className="ed-footer__container">
        <div className="ed-footer__top">
          <div className="footer-left">
            <span className="footer-brand">SAMARTH SHEKHAR</span>
            <span className="footer-tagline">SOFTWARE &bull; AI &bull; PRODUCT</span>
          </div>

          <div className="footer-right">
            <a
              href="https://github.com/Samarth-Shekharadd"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/samarth-shekhar-185ba311a"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              LinkedIn
            </a>
            <a
              href="mailto:samarthshekhar.work@gmail.com"
              className="footer-link"
            >
              Email
            </a>
          </div>
        </div>

        <div className="ed-footer__bottom">
          <span className="copyright">&copy; 2026 Samarth Shekhar</span>
          <span className="location">Noida / Delhi NCR, India</span>
        </div>

        <div className="ed-footer__watermark" aria-hidden="true">
          SAMARTH SHEKHAR
        </div>
      </div>
    </footer>
  )
}

export default Footer
