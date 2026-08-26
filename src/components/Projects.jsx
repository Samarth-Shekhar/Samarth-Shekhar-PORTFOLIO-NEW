import { useState } from 'react'
import { projects } from '../data/projects.js'
import ProjectCard from './ProjectCard.jsx'

function Projects({ onProjectClick }) {
  const [filter, setFilter] = useState('ALL')

  const filteredProjects = filter === 'ALL'
    ? projects
    : projects.filter((p) => p.category.toUpperCase() === filter)

  return (
    <section id="projects" className="projects section" aria-labelledby="projects-heading">
      <div className="section__container">
        <div className="section__header reveal-on-scroll">
          <div className="section__badge">
            <span className="section__badge-icon">●</span>
            <span className="section__badge-text">FEATURED WORK</span>
          </div>
          <h2 id="projects-heading" className="section__title">FEATURED PROJECTS</h2>
        </div>

        <div className="projects__filter-bar reveal-on-scroll">
          {['ALL', 'AI', 'SOFTWARE'].map((cat) => (
            <button
              key={cat}
              className={`projects__filter-btn ${filter === cat ? 'projects__filter-btn--active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat === 'ALL' ? 'ALL PROJECTS' : cat}
            </button>
          ))}
        </div>

        <div className="projects__grid">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={onProjectClick}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
