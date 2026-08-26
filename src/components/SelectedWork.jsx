import { projects } from '../data/projects.js'
import ProjectVisual from './ProjectVisual.jsx'

function SelectedWork({ onProjectClick }) {
  const getVisualType = (id) => {
    if (id === 1) return 'multi-agent'
    if (id === 2) return 'folate'
    if (id === 3) return 'meal-planner'
    return 'default'
  }

  return (
    <section id="work" className="ed-work section" aria-labelledby="work-heading">
      <div className="section__container">
        {/* Section Header */}
        <div className="ed-section-num reveal-on-scroll">02</div>
        <div className="ed-work__header reveal-on-scroll">
          <span className="ed-section-label">EDITORIAL SHOWCASE</span>
          <h2 id="work-heading" className="ed-section-title">SELECTED WORK</h2>
        </div>

        {/* Viewport-filling Alternating Projects */}
        <div className="ed-work__list">
          {projects.map((project, idx) => {
            const isEven = idx % 2 === 0
            const visualType = getVisualType(project.id)

            return (
              <article
                key={project.id}
                className={`ed-project-row reveal-on-scroll ${isEven ? 'row--left' : 'row--right'}`}
                onClick={() => onProjectClick(project)}
              >
                <div className="ed-project-row__inner">
                  {/* Visual Side */}
                  <div className="ed-project-row__visual">
                    <div className="visual-wrapper">
                                <ProjectVisual type={visualType} image={project.image} />
                      <div className="visual-overlay-tag">// 0{idx + 1} PROJECT</div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="ed-project-row__content">
                    <div className="content-meta">
                      <span className="meta-number">0{idx + 1}</span>
                      <span className="meta-category">{project.category}</span>
                    </div>

                    <h3 className="content-title">{project.title}</h3>
                    <span className="content-subtitle">{project.subtitle}</span>

                    <p className="content-desc">{project.description}</p>

                    <div className="content-tech">
                      <span className="tech-label">TECH / STACK:</span>
                      <div className="tech-list">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="tech-item">{tech}</span>
                        ))}
                      </div>
                    </div>

                    <div className="content-features">
                      <span className="features-label">HIGHLIGHTS:</span>
                      <div className="features-tags">
                        {project.features.slice(0, 4).map((f) => (
                          <span key={f} className="feature-tag">✓ {f}</span>
                        ))}
                      </div>
                    </div>

                    <div className="content-action">
                      <span className="action-text">VIEW CASE STUDY</span>
                      <span className="action-arrow">↗</span>
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
