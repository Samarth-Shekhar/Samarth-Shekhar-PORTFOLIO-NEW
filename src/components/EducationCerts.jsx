import { certifications as defaultCertifications } from '../data/certifications.js'
import SectionIcon from './SectionIcon.jsx'

function EducationCerts({ education: propEdu, certifications: propCerts }) {
  const certList = propCerts && propCerts.length > 0 ? propCerts : defaultCertifications

  // Education primary item
  let primaryEdu = null
  if (Array.isArray(propEdu) && propEdu.length > 0) {
    primaryEdu = propEdu[0]
  }

  const yearDisplay = primaryEdu?.year || '2022 – 2026'
  const instDisplay = primaryEdu?.institution || 'Amity University'
  const degreeDisplay = primaryEdu?.degree || 'Bachelor of Technology (B.Tech) in Information Technology'
  const descDisplay = primaryEdu?.description || 'Rigorous coursework in Data Structures & Algorithms, Database Management Systems, Computer Networks, Software Engineering, and Object-Oriented System Design.'
  const divisionDisplay = primaryEdu?.division || 'Graduation: 2026 · First Division · Noida, India'

  return (
    <section id="education" className="edu-certs" aria-labelledby="edu-heading">
      <div className="container">
        {/* Section Badge Header matching Dribbble reference */}
        <div className="section-badge-header reveal">
          <div className="section-badge section-badge--dark">
            <span className="section-badge__icon" aria-hidden="true"><SectionIcon type="education" /></span>
            <h2 id="edu-heading" className="section-badge__title">
              EDUCATION
            </h2>
          </div>
          <p className="section-desc section-desc--dark">
            Formal university computer science foundation paired with verified industry credentials from Google, NVIDIA, Microsoft, Cisco, and Oracle.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="edu-certs__grid">
          {/* Left: Education */}
          <div className="edu-block reveal reveal-left" id="education-details">
            <span className="edu-year">{yearDisplay} // ACADEMIC FOUNDATION</span>
            <h3 className="edu-inst">{instDisplay}</h3>
            <p className="edu-degree">
              {degreeDisplay}.<br />
              {descDisplay}
            </p>
            <div className="edu-division">
              {divisionDisplay}
            </div>
          </div>

          {/* Right: Certifications */}
          <div className="reveal reveal-delay-2" id="certifications">
            <h3 className="edu-certs__subheading">CERTIFICATIONS</h3>
            <span className="section-label section-label--light" style={{ marginBottom: 16 }}>
              Verified Accreditations
            </span>
            <div className="cert-list" role="list">
              {certList.map((cert) => (
                <div key={cert.title} className="cert-item" role="listitem">
                  <span className="cert-issuer">{cert.issuer}</span>
                  <span className="cert-title">{cert.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EducationCerts
