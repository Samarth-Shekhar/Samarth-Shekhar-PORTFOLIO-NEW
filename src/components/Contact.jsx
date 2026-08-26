function Contact() {
  return (
    <section id="contact" className="ed-contact section" aria-labelledby="contact-heading">
      <div className="section__container">
        <div className="ed-contact__body reveal-on-scroll">
          <div className="ed-contact__badge">LET'S CONNECT</div>

          <h2 id="contact-heading" className="ed-contact__title">
            <span>LET'S</span>
            <span>BUILD</span>
            <span className="accent-text">SOMETHING.</span>
          </h2>

          <p className="ed-contact__sub">
            Have an opportunity, idea or problem worth solving?
          </p>

          <div className="ed-contact__actions">
            <a
              href="mailto:samarthshekhar.work@gmail.com"
              className="contact-action-btn primary"
            >
              EMAIL ME ↗
            </a>
            <a
              href="https://www.linkedin.com/in/samarth-shekhar-185ba311a"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-action-btn"
            >
              LINKEDIN ↗
            </a>
            <a
              href="https://github.com/Samarth-Shekharadd"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-action-btn"
            >
              GITHUB ↗
            </a>
            <a
              href="tel:+919650754598"
              className="contact-action-btn"
            >
              +91 9650754598
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
