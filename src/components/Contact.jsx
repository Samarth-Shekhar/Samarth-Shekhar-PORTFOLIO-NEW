function Contact() {
  return (
    <section id="contact" className="contact section" aria-labelledby="contact-heading">
      <div className="section__container">
        <div className="contact__banner-card reveal-on-scroll">
          <div className="contact__banner-bg" aria-hidden="true"></div>

          <div className="contact__banner-content">
            <div className="contact__badge">
              <span className="contact__badge-dot">●</span>
              <span>GET IN TOUCH</span>
            </div>

            <h2 id="contact-heading" className="contact__banner-title">
              LET'S BUILD SOMETHING<br />GREAT TOGETHER
            </h2>

            <p className="contact__banner-desc">
              Have an opportunity, project idea, or technical problem worth solving? Let's connect and discuss how I can contribute.
            </p>

            <div className="contact__banner-actions">
              <a
                href="mailto:samarthshekhar.work@gmail.com"
                className="contact__cta-btn"
              >
                CONTACT ME ↗
              </a>
              <a
                href="tel:+919650754598"
                className="contact__cta-btn contact__cta-btn--secondary"
              >
                +91 9650754598
              </a>
              <a
                href="https://www.linkedin.com/in/samarth-shekhar-185ba311a"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__cta-btn contact__cta-btn--secondary"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
