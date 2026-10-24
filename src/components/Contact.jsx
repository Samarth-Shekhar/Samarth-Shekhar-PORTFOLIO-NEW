function Contact() {
  return (
    <section id="contact" className="section section--alt" aria-labelledby="contact-heading">
      <div className="container">
        {/* Section header */}
        <div className="section-header reveal">
          <div className="section-header__top">
            <div className="section-header__num-title">
              <span className="section-header__num">06</span>
              <h2 id="contact-heading" className="section-title">Contact</h2>
            </div>
            <span className="label">Let's Connect</span>
          </div>
        </div>

        <div className="contact__inner">
          {/* Big editorial headline */}
          <div className="contact__headline reveal reveal-delay-1">
            <span>Let's</span>
            <span>build</span>
            <span>something.</span>
          </div>

          {/* Right column — links */}
          <div className="contact__right reveal reveal-delay-2">
            <p className="contact__sub">
              Have an opportunity, idea, or problem worth solving? I'd love to hear from you.
              Whether it's a role, a project, or just a good conversation about technology.
            </p>

            <nav className="contact__actions" aria-label="Contact links">
              <a
                href="mailto:samarthshekharmj@gmail.com"
                className="contact__link"
                id="contact-email"
              >
                <span className="contact__link-label">Email</span>
                <span className="contact__link-value">samarthshekharmj@gmail.com</span>
                <span className="contact__link-arrow" aria-hidden="true">↗</span>
              </a>

              <a
                href="https://www.linkedin.com/in/samarth-shekhar-185ba311a"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__link"
                id="contact-linkedin"
                aria-label="Connect on LinkedIn"
              >
                <span className="contact__link-label">LinkedIn</span>
                <span className="contact__link-value">Samarth Shekhar</span>
                <span className="contact__link-arrow" aria-hidden="true">↗</span>
              </a>

              <a
                href="https://github.com/Samarth-Shekhar"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__link"
                id="contact-github"
                aria-label="Visit GitHub profile"
              >
                <span className="contact__link-label">GitHub</span>
                <span className="contact__link-value">Samarth-Shekhar</span>
                <span className="contact__link-arrow" aria-hidden="true">↗</span>
              </a>

              <a
                href="tel:+919650754598"
                className="contact__link"
                id="contact-phone"
                aria-label="Call Samarth"
              >
                <span className="contact__link-label">Phone</span>
                <span className="contact__link-value">+91 96507 54598</span>
                <span className="contact__link-arrow" aria-hidden="true">↗</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
