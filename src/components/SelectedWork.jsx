import { projects } from '../data/projects.js'
import ProjectVisual from './ProjectVisual.jsx'

const VISUAL_TYPES = { 1: 'multi-agent', 2: 'folate', 3: 'meal-planner' }

function SelectedWork({ onProjectClick }) {
  return (
    <section id="work" className="section section--alt" aria-labelledby="work-heading">
      <div className="container">
        {/* Section header */}
        <div className="section-header reveal">
          <div className="section-header__top">
            <div className="section-header__num-title">
              <span className="section-header__num">02</span>
              <h2 id="work-heading" className="section-title">Selected Work</h2>
            </div>
            <span className="label">Projects</span>
          </div>
        </div>

        {/* Project rows */}
        <div className="work__list">
          {projects.map((project, idx) => {
            const isReversed = idx % 2 !== 0
            const visualType = VISUAL_TYPES[project.id] || 'default'

            return (
              <article
                key={project.id}
                className={`project-row reveal${isReversed ? ' project-row--reversed' : ''}`}
                onClick={() => onProjectClick(project)}
                role="button"
                tabIndex={0}
                aria-label={`View case study: ${project.title}`}
                onKeyDown={(e) => e.key === 'Enter' && onProjectClick(project)}
              >
                {/* Visual */}
                <div className="project-row__visual">
                  <div className="project-row__visual-inner">
                    <ProjectVisual type={visualType} image={project.image} />
                    <span className="project-visual__tag" aria-hidden="true">// 0{idx + 1}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="project-row__content">
                  <div className="project-row__meta">
                    <span className="project-row__num">0{idx + 1}</span>
                    <span className="project-row__cat">{project.category}</span>
                  </div>

                  <h3 className="project-row__title">{project.title}</h3>
                  <span className="project-row__subtitle">{project.subtitle}</span>

                  <p className="project-row__desc">{project.description}</p>

                  {/* Tech stack */}
                  <div className="project-row__tech" aria-label="Technologies used">
                    {project.technologies.map((t) => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>

                  {/* CTA row */}
                  <div className="project-row__cta">
                    <div className="project-row__links">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`GitHub repository for ${project.title}`}
                        >
                          GitHub ↗
                        </a>
                      )}
                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Live demo for ${project.title}`}
                        >
                          Live Demo ↗
                        </a>
                      )}
                    </div>
                    <div className="project-row__cta-text">
                      Case Study
                      <span className="project-row__cta-arrow" aria-hidden="true"> ↗</span>
                    </div>
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

export default SelectedWork
