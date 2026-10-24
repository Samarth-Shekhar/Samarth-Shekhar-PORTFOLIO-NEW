import { projects as defaultProjects } from '../data/projects.js'
import botanicalFoliage from '../assets/botanical_3d_foliage.jpg'

function Hero({ settings = {}, projects = defaultProjects, onSelectProject }) {
  const scrollTo = (event, id) => {
    event.preventDefault()
    const element = document.getElementById(id)
    if (!element) return
    const top = element.getBoundingClientRect().top + window.scrollY - 70
    window.scrollTo({ top, behavior: 'smooth' })
  }

  const handleProjectClick = (event, projectId) => {
    event.preventDefault()
    if (onSelectProject) {
      onSelectProject(projectId)
    } else {
      scrollTo(event, `project-card-${projectId}`)
    }
  }

  const avatarUrl = settings.avatarUrl || '/profile/glitched-ai-visor-portrait-transparent.png'
  const resumeUrl = settings.resumeConfig?.fileUrl || '/Samarth-Shekhar-Resume-2026.pdf'

  const portfolioProjects = projects.filter((project) => project.kind !== 'website')

  return (
    <section id="about" className="hero-minimal bg-grid" aria-label="Hero Introduction">
      <div className="container">
        <div className="hero-minimal__identity reveal">
          <div className="hero-minimal__profile">
            <a href="#about" onClick={(event) => scrollTo(event, 'about')} className="hero-minimal__avatar" aria-label="Return to home hero">
              <img src={avatarUrl} alt="Glitched AI visor portrait" />
            </a>
            <div className="hero-minimal__name-block">
              <span className="hero-minimal__im">I'M</span>
              <h1 className="hero-minimal__name">
                SAMARTH <em>SHEKHAR</em>
              </h1>
              <p className="hero-minimal__tagline-sub">
                Building intelligent <em>digital products.</em>
              </p>
            </div>
          </div>
          <div className="hero-minimal__statement-block">
            <p className="hero-minimal__statement">
              AI engineering, full-stack development, and product thinking.
            </p>
            <div className="hero-social-links" aria-label="Hero quick links and actions">
              <a
                href={settings.githubUrl || 'https://github.com/Samarth-Shekhar'}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-pill hero-social-pill--github"
                aria-label="GitHub profile"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub</span>
                <span className="hero-social-pill__arrow">↗</span>
              </a>

              <a
                href={settings.linkedinUrl || 'https://www.linkedin.com/in/samarth-shekhar-185ba311a'}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-pill hero-social-pill--linkedin"
                aria-label="LinkedIn profile"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
                <span>LinkedIn</span>
                <span className="hero-social-pill__arrow">↗</span>
              </a>

              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-pill hero-social-pill--resume"
                aria-label="Download Resume PDF"
              >
                <span>Resume PDF</span>
                <span className="hero-social-pill__arrow">↗</span>
              </a>

              <a
                href="#contact"
                onClick={(event) => scrollTo(event, 'contact')}
                className="hero-social-pill hero-social-pill--contact"
                aria-label="Scroll to contact section"
              >
                <span>Let's Talk</span>
                <span className="hero-social-pill__arrow">↓</span>
              </a>
            </div>
          </div>
        </div>

        <div className="hero-workbench reveal reveal-up d1">
          <div className="hero-feature__topline">
            <span className="hero-feature__label">SELECTED WORK / ALL SYSTEMS</span>
            <span className="hero-feature__count">// 0{Math.min(portfolioProjects.length, 4)}</span>
          </div>

          <div className="hero-workbench__content">
            {/* 3D Botanical Foliage Background matching reference */}
            <div className="hero-workbench__foliage-ambient" aria-hidden="true">
              <div className="hero-workbench__ambient-lights" />
              <img
                src={botanicalFoliage}
                alt=""
                className="hero-workbench__foliage-img"
              />
              <div className="hero-workbench__scrim" />
            </div>

            <div className="hero-workbench__intro">
              <span className="hero-feature__category">AI / PRODUCT / EXPERIENCES</span>
              <h2>Ideas into <em>useful systems.</em></h2>
              <p>A compact collection of AI products, workflow tools, and full-stack platforms built to solve real-world problems.</p>
              <a href="#projects" onClick={(event) => scrollTo(event, 'projects')} className="hero-feature__link">Explore all projects ↗</a>
            </div>

            <div className="hero-workbench__grid" aria-label="Project highlights">
              {portfolioProjects.map((project, index) => (
                <a
                  key={project.id}
                  className={`hero-project hero-project--${project.id}`}
                  href={`#project-card-${project.id}`}
                  onClick={(e) => handleProjectClick(e, project.id)}
                >
                  <img
                    src={project.previewImage || project.image}
                    alt={project.title}
                    onError={(e) => {
                      if (project.image && e.currentTarget.src !== project.image) {
                        e.currentTarget.src = project.image
                      }
                    }}
                  />
                  <span className="hero-project__shade" />
                  <span className="hero-project__number">// 0{index + 1}</span>
                  <span className="hero-project__title">{project.title}</span>
                  <span className="hero-project__meta">{project.category}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="hero-feature__footer">
            <span>AGENTIC AI · WEB PRODUCTS · APPLIED DATA · CREATOR TOOLS</span>
            <span>DESIGNING FOR CLARITY &amp; IMPACT</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
