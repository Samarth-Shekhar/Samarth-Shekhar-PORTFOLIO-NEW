import { certifications } from '../data/certifications.js'

function Certifications() {
  return (
    <section id="certifications" className="certifications-section" aria-labelledby="certs-heading">
      <div className="container">
        {/* Section Badge Header matching Dribbble reference */}
        <div className="section-badge-header reveal">
          <div className="section-badge section-badge--dark">
            <span className="section-badge__icon" aria-hidden="true">📜</span>
            <h2 id="certs-heading" className="section-badge__title">
              CERTIFICATIONS
            </h2>
          </div>
          <p className="section-desc section-desc--dark">
            Verified industry credentials and professional certifications across Project Management, Generative AI, Cloud Infrastructure, and Deep Learning.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="cert-grid reveal reveal-delay-1">
          {certifications.map((cert, index) => (
            <div key={index} className="cert-card">
              <span className="cert-card__issuer">{cert.issuer}</span>
              <h3 className="cert-card__title">{cert.title}</h3>
              <span className="cert-card__badge">
                ✓ VERIFIED ACCREDITATION {cert.platform ? `· ${cert.platform}` : ''}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certifications
