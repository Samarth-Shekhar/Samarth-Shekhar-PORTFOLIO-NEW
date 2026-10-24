import { useState } from 'react'
import { experiences as defaultExperiences } from '../data/experience.js'
import SectionIcon from './SectionIcon.jsx'

function ExperienceEditorial({ experiences = defaultExperiences }) {
  const [openId, setOpenId] = useState(1)

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id))

  const list = experiences.filter(e => e.type !== 'extracurricular')

  return (
    <section id="experience" className="experience experience--light" aria-labelledby="exp-heading">
      <div className="container">
        {/* Section Badge Header matching Dribbble reference */}
        <div className="section-badge-header reveal">
          <div className="section-badge section-badge--dark">
            <span className="section-badge__icon" aria-hidden="true"><SectionIcon type="experience" /></span>
            <h2 id="exp-heading" className="section-badge__title">
              EXPERIENCE
            </h2>
          </div>
          <p className="section-desc section-desc--dark">
            Hands-on product, AI, web engineering, and growth work across company websites, automation, and digital platforms.
          </p>
        </div>

        {/* Experience List Accordion */}
        <div className="exp-list reveal reveal-delay-1" role="list">
          {list.map((exp, idx) => {
            const isOpen = openId === exp.id
            const responsibilities = Array.isArray(exp.responsibilities) ? exp.responsibilities : []
            return (
              <div
                key={exp.id}
                className={`exp-item${isOpen ? ' open' : ''}`}
                role="listitem"
              >
                <div
                  className="exp-item__trigger"
                  onClick={() => toggle(exp.id)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  aria-controls={`exp-body-${exp.id}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      toggle(exp.id)
                    }
                  }}
                >
                  <span className="exp-num">0{idx + 1}</span>

                  <div className="exp-main">
                    <h3 className="exp-role">{exp.role}</h3>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                      <span className="exp-company">{exp.company}</span>
                      <span className="exp-duration">· {exp.duration}</span>
                    </div>
                  </div>

                  <span className="exp-toggle" aria-hidden="true">+</span>
                </div>

                <div
                  id={`exp-body-${exp.id}`}
                  className="exp-body"
                  aria-hidden={!isOpen}
                >
                  <div className="exp-body__inner">
                    <ul className="exp-resp-list">
                      {responsibilities.map((resp, i) => (
                        <li key={i} className="exp-resp">
                          <span className="exp-resp-bullet" aria-hidden="true">→</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ExperienceEditorial
