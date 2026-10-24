import SectionIcon from './SectionIcon.jsx'
import { useState } from 'react'
import { projects as defaultProjects } from '../data/projects.js'

function ProjectGlyph({ type }) {
  if (type === 1) {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="7" r="3" /><circle cx="7" cy="24" r="3" /><circle cx="25" cy="24" r="3" />
        <path d="M14 9.5 8.8 21M18 9.5l5.2 11M10 24h12" />
      </svg>
    )
  }

  if (type === 2) {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <rect x="4" y="5" width="24" height="21" rx="3" /><path d="M4 11h24M9 8h.01M13 8h.01M17 8h.01M9 16h14M9 20h9" />
      </svg>
    )
  }

  if (type === 3) {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M7 15h18v6a5 5 0 0 1-5 5H12a5 5 0 0 1-5-5v-6Z" /><path d="M10 13c0-5 3-7 6-7s6 2 6 7M12 19h.01M16 22h.01M20 18h.01" />
      </svg>
    )
  }

  if (type === 5) {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="m4 11 12-6 12 6-12 6L4 11Z" />
        <path d="M8 14v6c3 2.2 13 2.2 16 0v-6M28 11v8" />
        <circle cx="24" cy="24" r="4" />
        <path d="M24 21v6M21 24h6" />
      </svg>
    )
  }

  if (type === 6) {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M5 7h9c2 0 4 1.5 4 3.5V26c0-2-2-3-4-3H5V7ZM27 7h-9c-2 0-4 1.5-4 3.5V26c0-2 2-3 4-3h9V7Z" />
        <path d="M22 10v5M19.5 12.5h5M23.8 19.5h.01" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="4" y="7" width="24" height="18" rx="3" /><path d="m14 13 6 3-6 3v-6ZM8 4v3M24 4v3M8 25v3M24 25v3" />
    </svg>
  )
}

function ProjectTitle({ project }) {
  const titleParts = {
    1: <>MULTI-AGENT <em>ORCHESTRATION</em> SYSTEM</>,
    2: <>FOLATE — AI <em>WEB GENERATOR</em></>,
    3: <>NUTRIAI <em>PERSONAL AI MEAL PLANNER</em></>,
    4: <>COLLABORATIVE <em>VIDEO SHARING PLATFORM</em></>,
    5: <>STUDENTGRAD <em>STUDY ABROAD PLATFORM</em></>,
    6: <>4PL ACADEMY <em>EDUCATION PLATFORM</em></>,
  }

  if (titleParts[project.id]) {
    return titleParts[project.id]
  }

  // Fallback for new user-created projects
  const words = (project.title || '').split(' ')
  if (words.length > 2) {
    const lastWord = words.pop()
    return <>{words.join(' ')} <em>{lastWord}</em></>
  }
  return project.title
}

function ProjectDetails({ project }) {
  const previewImage = project.previewImage || project.image
  const isWebsiteProject = project.kind === 'website'

  const highlights = Array.isArray(project.highlights) ? project.highlights : []
  const technologies = Array.isArray(project.technologies) ? project.technologies : []
  const metrics = Array.isArray(project.metrics) ? project.metrics : []
  const highlightTags = Array.isArray(project.highlightTags) ? project.highlightTags : []

  return (
    <div className="project-accordion__panel">
      <div className="project-accordion__detail">
        <div className="project-detail__intro">
          <span className="project-detail__eyebrow">{project.subtitle}</span>
          <p className="project-detail__tagline">{project.tagline}</p>
          <p className="project-detail__description">{project.description}</p>
        </div>

        {metrics.length > 0 && (
          <div className="project-detail__metrics">
            {metrics.map((metric) => (
              <div key={metric.label} className="project-detail__metric">
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
              </div>
            ))}
          </div>
        )}

        <div className="project-detail__columns">
          {highlights.length > 0 && (
            <div>
              <span className="project-detail__label">What I built</span>
              <ul className="project-detail__list">
                {highlights.slice(0, isWebsiteProject ? 7 : 4).map((highlight) => (
                  <li key={highlight}><span>↳</span>{highlight}</li>
                ))}
              </ul>
            </div>
          )}
          {technologies.length > 0 && (
            <div>
              <span className="project-detail__label">Technology</span>
              <div className="project-detail__stack">
                {technologies.map((technology) => <span key={technology}>{technology}</span>)}
              </div>
            </div>
          )}
        </div>

        {highlightTags.length > 0 && (
          <div className="project-detail__highlights">
            <span className="project-detail__label">Project Highlights</span>
            <div className="project-detail__highlight-tags">
              {highlightTags.map((highlight) => <span key={highlight}>{highlight}</span>)}
            </div>
          </div>
        )}

        {project.caseStudy && (
          <div className="project-detail__case-study">
            {project.caseStudy.overview && <div><span className="project-detail__label">Overview</span><p>{project.caseStudy.overview}</p></div>}
            {project.caseStudy.problem && <div><span className="project-detail__label">The problem</span><p>{project.caseStudy.problem}</p></div>}
            {project.caseStudy.approach && <div><span className="project-detail__label">The approach</span><p>{project.caseStudy.approach}</p></div>}
            {project.caseStudy.contribution && <div><span className="project-detail__label">My contribution</span><p>{project.caseStudy.contribution}</p></div>}
            {project.caseStudy.learned && <div><span className="project-detail__label">What I learned</span><p>{project.caseStudy.learned}</p></div>}
          </div>
        )}

        <div className="project-detail__actions">
          {project.liveDemo && <a className="btn btn--primary" href={project.liveDemo} target="_blank" rel="noopener noreferrer">{isWebsiteProject ? 'Live Website ↗' : 'View live build ↗'}</a>}
          {project.github && <a className="btn btn--ghost-cream" href={project.github} target="_blank" rel="noopener noreferrer">{isWebsiteProject ? 'GitHub Repository ↗' : 'Explore repository ↗'}</a>}
        </div>
      </div>

      <div className="project-expanded-visual">
        <img
          src={previewImage}
          alt={`${project.title} project preview`}
          onError={(e) => {
            if (project.image && e.currentTarget.src !== project.image) {
              e.currentTarget.src = project.image
            }
          }}
        />
        <div className="project-expanded-visual__caption"><span>PROJECT PREVIEW</span><span>0{project.id} / {project.year}</span></div>
      </div>
    </div>
  )
}

function CaseStudies({ projects = defaultProjects, selectedProjectId, onSelectProject }) {
  const [internalOpenId, setInternalOpenId] = useState(null)

  // Use selectedProjectId if passed, otherwise use local state
  const openId = selectedProjectId !== undefined ? selectedProjectId : internalOpenId

  const toggleProject = (id) => {
    const nextId = openId === id ? null : id
    if (onSelectProject) {
      onSelectProject(nextId)
    }
    setInternalOpenId(nextId)
  }

  return (
    <section id="projects" className="case-study-editorial" aria-labelledby="projects-heading">
      <div className="container">
        <div className="section-badge-header reveal">
          <div className="section-badge section-badge--dark">
            <span className="section-badge__icon" aria-hidden="true"><SectionIcon type="projects" /></span>
            <h2 id="projects-heading" className="section-badge__title">PROJECTS</h2>
          </div>
          <p className="section-desc section-desc--dark">
            Selected builds across agentic AI, full-stack product engineering, applied data, and secure creator tooling. Select a project to open the full story.
          </p>
        </div>

        <div className="project-accordion reveal reveal-delay-1">
          {projects.map((project, index) => {
            const isOpen = openId === project.id
            return (
              <article key={project.id} id={`project-card-${project.id}`} className={`project-accordion__item project-accordion__item--${project.id}${isOpen ? ' is-open' : ''}`}>
                <button
                  type="button"
                  className="project-accordion__trigger"
                  onClick={() => toggleProject(project.id)}
                  aria-expanded={isOpen}
                  aria-controls={`project-panel-${project.id}`}
                >
                  <span className="project-accordion__number">// 0{index + 1}</span>
                  <span className="project-accordion__glyph"><ProjectGlyph type={project.id} /></span>
                  <span className="project-accordion__title-wrap">
                    <span className="project-accordion__meta">{project.category} <i>·</i> {project.year}</span>
                    <span className="project-accordion__title"><ProjectTitle project={project} /></span>
                    <span className="project-accordion__subtitle">{project.subtitle}</span>
                  </span>
                  <span className="project-accordion__thumb" aria-hidden="true">
                    <img
                      src={project.previewImage || project.image}
                      alt=""
                      onError={(e) => {
                        if (project.image && e.currentTarget.src !== project.image) {
                          e.currentTarget.src = project.image
                        }
                      }}
                    />
                    <span>{project.category}</span>
                  </span>
                  <span className="project-accordion__toggle" aria-hidden="true"><span /> <span /></span>
                </button>

                {isOpen && (
                  <div id={`project-panel-${project.id}`} className="project-accordion__content" aria-hidden={false}>
                    <ProjectDetails project={project} />
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CaseStudies
