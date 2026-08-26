import { useEffect } from 'react'
import ProjectVisual from './ProjectVisual.jsx'

function CaseStudyOverlay({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!project) return null

  const getVisualType = (id) => {
    if (id === 1) return 'multi-agent'
    if (id === 2) return 'folate'
    if (id === 3) return 'meal-planner'
    return 'default'
  }

  const caseStudy = project.caseStudy || {}

  return (
    <div className="ed-case-study-overlay" role="dialog" aria-modal="true">
      <div className="overlay-header">
        <div className="header-meta">
          <span className="meta-num">// 0{project.id} CASE STUDY</span>
          <span className="meta-cat">{project.category}</span>
        </div>
        <button className="overlay-close-btn" onClick={onClose} aria-label="Close Case Study">
          CLOSE [X]
        </button>
      </div>

      <div className="overlay-scroll-body">
        <div className="overlay-container">
          {/* Main Title Block */}
          <div className="overlay-title-block">
            <h1 className="overlay-title">{project.title}</h1>
            <span className="overlay-subtitle">{project.subtitle}</span>
            <p className="overlay-desc">{project.description}</p>
          </div>

          {/* Visual Showcase */}
          <div className="overlay-visual">
            <ProjectVisual type={getVisualType(project.id)} />
          </div>

          {/* Editorial Specs Grid */}
          <div className="overlay-specs-grid">
            <div className="spec-col">
              <span className="spec-label">PROBLEM STATEMENT</span>
              <p className="spec-text">{caseStudy.problem || project.description}</p>
            </div>
            <div className="spec-col">
              <span className="spec-label">TECHNICAL APPROACH</span>
              <p className="spec-text">{caseStudy.approach || caseStudy.overview}</p>
            </div>
            <div className="spec-col">
              <span className="spec-label">MY CONTRIBUTION</span>
              <p className="spec-text">{caseStudy.contribution || "Designed and implemented key architectural components."}</p>
            </div>
            <div className="spec-col">
              <span className="spec-label">KEY LEARNINGS</span>
              <p className="spec-text">{caseStudy.learned || "Gained practical experience building production systems."}</p>
            </div>
          </div>

          {/* Tech Stack & Features */}
          <div className="overlay-tech-block">
            <div className="tech-col">
              <span className="block-title">TECHNOLOGY STACK</span>
              <div className="tech-tags">
                {project.technologies.map((t) => (
                  <span key={t} className="tech-pill">{t}</span>
                ))}
              </div>
            </div>

            <div className="tech-col">
              <span className="block-title">KEY FEATURES</span>
              <ul className="features-list">
                {project.features.map((f) => (
                  <li key={f}>✓ {f}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Links */}
          <div className="overlay-actions">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn action-btn--primary"
              >
                VIEW REPOSITORIES (GITHUB) ↗
              </a>
            )}
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn action-btn--live"
              >
                LIVE DEMO (FOLATE.PRO) ↗
              </a>
            )}
            <button className="action-btn action-btn--close" onClick={onClose}>
              BACK TO PORTFOLIO
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CaseStudyOverlay
