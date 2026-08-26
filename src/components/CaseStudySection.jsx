import { useState } from 'react'
import { projects } from '../data/projects.js'
import ProjectVisual from './ProjectVisual.jsx'

function CaseStudySection({ onProjectClick }) {
  const [expandedId, setExpandedId] = useState(2) // Default expanded to Folate (Project 02)

  const getVisualType = (id) => {
    if (id === 1) return 'multi-agent'
    if (id === 2) return 'folate'
    if (id === 3) return 'meal-planner'
    return 'default'
  }

  return (
    <section className="case-study-section section" aria-labelledby="case-study-heading">
      <div className="section__container">
        <div className="section__header reveal-on-scroll">
          <div className="section__badge">
            <span className="section__badge-icon">📁</span>
            <span className="section__badge-text">CASE STUDY</span>
          </div>
          <h2 id="case-study-heading" className="section__title">PROJECT SHOWCASE</h2>
        </div>

        <p className="case-study-section__subtitle reveal-on-scroll">
          A deep dive into some of my most impactful software and AI project implementations.
        </p>

        <div className="case-study__list reveal-on-scroll">
          {projects.map((project) => {
            const isExpanded = expandedId === project.id
            const visualType = getVisualType(project.id)

            return (
              <div
                key={project.id}
                className={`case-study-item ${isExpanded ? 'case-study-item--expanded' : ''}`}
              >
                <div
                  className="case-study-item__header"
                  onClick={() => setExpandedId(isExpanded ? null : project.id)}
                >
                  <div className="case-study-item__title-block">
                    <span className="case-study-item__num">// {project.number}</span>
                    <h3 className="case-study-item__title">{project.title}</h3>
                  </div>

                  <div className="case-study-item__meta">
                    <div className="case-study-item__tags">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="case-tag">{tech}</span>
                      ))}
                    </div>
                    <button className="case-study-item__toggle" aria-label="Toggle case study preview">
                      <span>{isExpanded ? '−' : '+'}</span>
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="case-study-item__content">
                    <div className="case-study-item__preview">
                      <ProjectVisual type={visualType} />
                    </div>

                    <div className="case-study-item__details">
                      <div className="details-header">
                        <span className="details-category">{project.category}</span>
                        <p className="details-desc">{project.description}</p>
                      </div>

                      <div className="details-features">
                        <span className="features-title">Core Capabilities:</span>
                        <ul>
                          {project.features.slice(0, 4).map((f, i) => (
                            <li key={i}>✓ {f}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="details-actions">
                        <button
                          className="details-modal-btn"
                          onClick={() => onProjectClick(project)}
                        >
                          Explore Full Case Study ↗
                        </button>
                        {project.liveDemo && (
                          <a
                            href={project.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="details-live-btn"
                          >
                            Live Demo (folate.pro) ↗
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="details-github-btn"
                          >
                            GitHub Repo ↗
                          </a>
                        )}
                      </div>
                    </div>
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

export default CaseStudySection
