import { useState } from 'react'
import { experiences } from '../data/experience.js'

function Experience() {
  const [expandedId, setExpandedId] = useState(1)

  return (
    <section id="experience" className="experience section" aria-labelledby="experience-heading">
      <div className="section__container">
        <div className="section__header reveal-on-scroll">
          <div className="section__badge">
            <span className="section__badge-icon">●</span>
            <span className="section__badge-text">CAREER JOURNEY</span>
          </div>
          <h2 id="experience-heading" className="section__title">EXPERIENCE</h2>
        </div>

        <div className="experience__timeline">
          {experiences.map((exp, index) => {
            const isExpanded = expandedId === exp.id
            return (
              <article
                key={exp.id}
                className={`experience__item reveal-on-scroll ${isExpanded ? 'experience__item--active' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setExpandedId(isExpanded ? null : exp.id)}
              >
                <div className="experience__marker" aria-hidden="true">
                  <div className="experience__dot">
                    <span className="experience__dot-inner"></span>
                  </div>
                  {index < experiences.length - 1 && <div className="experience__line"></div>}
                </div>

                <div className="experience__card">
                  <div className="experience__header">
                    <div className="experience__role-block">
                      <span className="experience__num">0{index + 1}</span>
                      <div>
                        <h3 className="experience__role">{exp.role}</h3>
                        <p className="experience__company">{exp.company}</p>
                      </div>
                    </div>

                    <div className="experience__meta">
                      <span className="experience__duration">{exp.duration}</span>
                      <button
                        className="experience__toggle-btn"
                        aria-label={isExpanded ? 'Collapse experience' : 'Expand experience'}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
                        >
                          <path d="M6 9l6 6 6-6"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="experience__body">
                    <ul className="experience__list" role="list">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} className="experience__list-item">
                          <span className="experience__check">→</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Experience
