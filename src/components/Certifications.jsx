import { certifications } from '../data/certifications.js'

function Certifications() {
  return (
    <section id="certifications" className="certifications section" aria-labelledby="certifications-heading">
      <div className="section__container">
        <div className="section__header reveal-on-scroll">
          <span className="section__number" aria-hidden="true">11</span>
          <h2 id="certifications-heading" className="section__title">CERTIFICATIONS</h2>
        </div>

        <div className="certifications__grid">
          {certifications.map((cert, index) => (
            <div
              key={cert.title}
              className="certifications__card reveal-on-scroll"
              style={{ animationDelay: `${index * 0.06}s` }}
            >
              <span className="certifications__issuer">{cert.issuer}</span>
              <h3 className="certifications__title">{cert.title}</h3>
              {cert.platform && (
                <span className="certifications__platform">{cert.platform}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certifications
