import { useEffect, useRef } from 'react'

function ProjectModal({ project, onClose }) {
  const modalRef = useRef(null)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    closeButtonRef.current?.focus()

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) onClose()
  }

  const cs = project.caseStudy

  return (
    <div
      className="project-modal"
      ref={modalRef}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="project-modal__content">
        <button
          className="project-modal__close"
          onClick={onClose}
          ref={closeButtonRef}
          aria-label="Close project details"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        <div className="project-modal__header">
          <span className="project-modal__number">{project.number}</span>
          <span className="project-modal__category">{project.category}</span>
        </div>

        <h2 id="modal-title" className="project-modal__title">{project.title}</h2>

        {project.subtitle && (
          <p className="project-modal__subtitle">{project.subtitle}</p>
        )}

        <div className="project-modal__tech">
          {project.technologies.map((tech) => (
            <span key={tech} className="project-modal__tech-tag">{tech}</span>
          ))}
        </div>

        {cs && (
          <div className="project-modal__sections">
            <div className="project-modal__section">
              <h3 className="project-modal__section-title">OVERVIEW</h3>
              <p>{cs.overview}</p>
            </div>

            <div className="project-modal__section">
              <h3 className="project-modal__section-title">PROBLEM</h3>
              <p>{cs.problem}</p>
            </div>

            <div className="project-modal__section">
              <h3 className="project-modal__section-title">APPROACH</h3>
              <p>{cs.approach}</p>
            </div>

            <div className="project-modal__section">
              <h3 className="project-modal__section-title">KEY FEATURES</h3>
              <ul className="project-modal__features">
                {project.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="project-modal__section">
              <h3 className="project-modal__section-title">TECHNOLOGY</h3>
              <div className="project-modal__tech-list">
                {project.technologies.map((tech) => (
                  <span key={tech} className="project-modal__tech-item">{tech}</span>
                ))}
              </div>
            </div>

            <div className="project-modal__section">
              <h3 className="project-modal__section-title">MY CONTRIBUTION</h3>
              <p>{cs.contribution}</p>
            </div>

            <div className="project-modal__section">
              <h3 className="project-modal__section-title">WHAT I LEARNED</h3>
              <p>{cs.learned}</p>
            </div>
          </div>
        )}

        <div className="project-modal__links">
          {project.github ? (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-modal__link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          ) : (
            <span className="project-modal__link project-modal__link--disabled">GitHub — Coming Soon</span>
          )}
          {project.liveDemo ? (
            <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="project-modal__link">
              Live Demo ↗
            </a>
          ) : (
            <span className="project-modal__link project-modal__link--disabled">Live Demo — Coming Soon</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectModal
