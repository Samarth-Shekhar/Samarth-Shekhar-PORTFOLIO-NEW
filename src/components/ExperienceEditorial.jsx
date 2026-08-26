import { useState } from 'react'
import { experiences } from '../data/experience.js'

function ExperienceEditorial() {
  const [expandedId, setExpandedId] = useState(1)

  return (
    <section id="experience" className="ed-experience section" aria-labelledby="exp-heading">
      <div className="section__container">
        <div className="ed-section-num reveal-on-scroll">03</div>
        <div className="ed-experience__header reveal-on-scroll">
          <span className="ed-section-label">CAREER JOURNEY</span>
          <h2 id="exp-heading" className="ed-section-title">EXPERIENCE</h2>
        </div>

        <div className="ed-experience__list reveal-on-scroll">
          {experiences.map((exp, idx) => {
            const isExpanded = expandedId === exp.id
            return (
              <div
                key={exp.id}
                className={`ed-experience-item ${isExpanded ? 'active' : ''}`}
                onClick={() => setExpandedId(isExpanded ? null : exp.id)}
              >
                <div className="item-header">
                  <div className="header-left">
                    <span className="item-num">0{idx + 1}</span>
                    <h3 className="item-role">{exp.role}</h3>
                  </div>

                  <div className="header-right">
                    <span className="item-company">{exp.company}</span>
                    <span className="item-date">{exp.duration}</span>
                    <span className="item-toggle">{isExpanded ? '−' : '+'}</span>
                  </div>
                </div>

                {isExpanded && (
                  <div className="item-body">
                    <ul className="resp-list">
                      {exp.responsibilities.map((r, i) => (
                        <li key={i} className="resp-item">
                          <span className="bullet">→</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ExperienceEditorial
