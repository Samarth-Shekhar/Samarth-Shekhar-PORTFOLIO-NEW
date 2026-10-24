import { useEffect } from 'react'
import ProjectVisual from './ProjectVisual.jsx'

const VISUAL_TYPES = {
  1: 'multi-agent',
  2: 'folate',
  3: 'meal-planner',
  4: 'video',
}

function CaseStudyOverlay({ project, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  if (!project) return null

  const cs = project.caseStudy || {}
  const visualType = VISUAL_TYPES[project.id] || 'default'

  return (
    <div
      className="overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="overlay-title"
    >
      {/* Sticky header */}
      <div className="overlay__header">
        <div className="overlay__header-inner">
          <div className="overlay__meta">
            <span className="overlay__meta-num">// 0{project.id} In-Depth Engineering Case Study</span>
            <span className="overlay__meta-cat">{project.category} · {project.year}</span>
          </div>
          <button
            className="overlay__close"
            onClick={onClose}
            aria-label="Close case study"
          >
            Close [Esc]
          </button>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="overlay__body">
        {/* Title block */}
        <div className="overlay__title-block">
          <span className="overlay__subtitle">{project.subtitle}</span>
          <h1 id="overlay-title" className="overlay__title">{project.title}</h1>
          {project.tagline && (
            <p style={{ font: '500 15px/1.5 var(--f-mono)', color: 'var(--orange)' }}>
              {project.tagline}
            </p>
          )}
          <p className="overlay__desc">{cs.overview || project.description}</p>

          {/* Key Metrics Strip inside modal */}
          {project.metrics && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: 12,
                marginTop: 16,
                padding: '16px 20px',
                background: 'rgba(26,24,22,0.04)',
                border: '1px solid var(--line-l)',
                borderRadius: 4,
              }}
            >
              {project.metrics.map((m, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ font: '400 9px/1 var(--f-mono)', letterSpacing: '.12em', color: 'var(--muted)', textTransform: 'uppercase' }}>
                    {m.label}
                  </span>
                  <span style={{ font: '700 16px/1 var(--f-body)', color: 'var(--ink)' }}>
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Visual Simulation */}
        <div className="overlay__visual">
          <ProjectVisual type={visualType} image={project.image} />
        </div>

        {/* 2×2 specs grid: Problem vs Approach, Contribution vs Learnings */}
        <div className="overlay__specs">
          <div>
            <span className="overlay__spec-label">01 // Problem & Context</span>
            <p className="overlay__spec-text">{cs.problem || project.description}</p>
          </div>
          <div>
            <span className="overlay__spec-label">02 // Technical Approach & Architecture</span>
            <p className="overlay__spec-text">{cs.approach || cs.overview}</p>
          </div>
          <div>
            <span className="overlay__spec-label">03 // My Role & Core Contributions</span>
            <p className="overlay__spec-text">{cs.contribution || 'Designed and implemented core components and system workflows.'}</p>
          </div>
          <div>
            <span className="overlay__spec-label">04 // Engineering Takeaways & Mastery</span>
            <p className="overlay__spec-text">{cs.learned || 'Gained practical experience building production systems.'}</p>
          </div>
        </div>

        {/* Tech & Features */}
        <div className="overlay__tech-features">
          <div>
            <span className="overlay__block-title">Complete Technology Stack</span>
            <div className="overlay__tech-tags">
              {project.technologies.map((t) => (
                <span key={t} className="overlay__tech-pill">{t}</span>
              ))}
            </div>
          </div>
          <div>
            <span className="overlay__block-title">Architectural Features & Capabilities</span>
            <ul className="overlay__features-list">
              {project.features.map((f) => (
                <li key={f} className="overlay__feature-item">
                  <span className="overlay__feature-check" aria-hidden="true">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action links */}
        <div className="overlay__actions">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              View on GitHub ↗
            </a>
          )}
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline-dark"
            >
              Live Demo ↗
            </a>
          )}
          <button className="btn btn--outline-dark" onClick={onClose}>
            ← Back to Portfolio
          </button>
        </div>
      </div>
    </div>
  )
}

export default CaseStudyOverlay
