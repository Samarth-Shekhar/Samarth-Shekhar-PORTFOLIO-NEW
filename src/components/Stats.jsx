import SectionIcon from './SectionIcon.jsx'
import { projects } from '../data/projects.js'
import { experiences } from '../data/experience.js'

function Stats() {
  const portfolioProjects = projects.filter((project) => project.kind !== 'website')
  const featuredProject = portfolioProjects.find((project) => project.id === 1) || portfolioProjects[0]
  const validationRate = featuredProject?.metrics?.find((metric) => metric.label === 'Evaluation Pass Rate')?.value || '98.4%'
  const projectPills = [
    { label: 'AI', tone: 'dark' },
    { label: 'Generative AI', tone: 'orange' },
    { label: 'Data Engineering', tone: 'outline' },
    { label: 'Full-Stack Development', tone: 'green' },
    { label: 'Web Applications', tone: 'outline' },
  ]

  return (
    <section className="stats-section bg-grid" aria-labelledby="stats-heading">
      <div className="container">
        <div className="section-badge-header reveal">
          <div className="section-badge section-badge--light">
            <span className="section-badge__icon" aria-hidden="true"><SectionIcon type="stats" /></span>
            <h2 id="stats-heading" className="section-badge__title">STATS</h2>
          </div>
          <p className="section-desc">
            A snapshot of the projects, engineering outcomes, and industry experience behind my portfolio.
          </p>
        </div>

        <div className="stats-reference-art reveal reveal-delay-1">
          <img
            src="/stats/portfolio-dashboard-metrics-overview.png"
            alt="Portfolio statistics showing featured projects, agent validation pass rate, and industry roles"
          />
        </div>

        <div className="stats-grid stats-grid--fallback reveal reveal-delay-1">
          <article className="stat-card stat-card--cream">
            <div className="stat-card__top">
              <div className="stat-card__num">
                {String(portfolioProjects.length).padStart(2, '0')}<span className="stat-card__num--orange">+</span>
              </div>
              <div className="stat-card__label">Featured Projects</div>
              <div className="stat-card__sub">AI, full-stack, data, and secure creator platforms</div>
            </div>

            <div className="stat-pill-stack">
              {projectPills.map((pill) => (
                <span key={pill.label} className={`stat-pill stat-pill--${pill.tone}`}>
                  {pill.label}
                </span>
              ))}
            </div>
          </article>

          <article className="stat-card stat-card--dark">
            <div className="stat-card__top">
              <div className="stat-card__num stat-card__num--green">{validationRate}</div>
              <div className="stat-card__label">Agent Validation Pass Rate</div>
              <div className="stat-card__sub">{featuredProject?.subtitle}</div>
            </div>

            <div className="stat-terminal" aria-label="Agent validation terminal">
              <div className="stat-terminal__header">
                <span><i className="stat-terminal__dot" /> 4 Autonomous AI Agents</span>
                <span className="stat-terminal__active">ACTIVE</span>
              </div>
              <ul className="stat-terminal__agents">
                {[
                  ['Planner', 'Breaks down complex tasks', '▤'],
                  ['Retriever', 'Fetches relevant context', '⌕'],
                  ['Executor', 'Uses tools to complete tasks', '⚙'],
                  ['Evaluator', 'Validates and improves output', '✓'],
                ].map(([agent, description, icon]) => (
                  <li key={agent}>
                    <span className="stat-terminal__agent-icon" aria-hidden="true">{icon}</span>
                    <span className="stat-terminal__agent-copy"><strong>{agent}</strong><small>{description}</small></span>
                    <em>Running <i className="stat-terminal__dot" /></em>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <article className="stat-card stat-card--cream">
            <div className="stat-card__top">
              <div className="stat-card__num">
                {String(experiences.length).padStart(2, '0')}<span className="stat-card__num--orange">+</span>
              </div>
              <div className="stat-card__label">Industry Roles</div>
              <div className="stat-card__sub">AI, Software Development &amp; IT Experience</div>
            </div>

            <div className="stat-gauge-ui">
              <svg className="stat-gauge-ui__svg" viewBox="0 0 260 160" fill="none" aria-hidden="true">
                <path d="M 22 134 A 108 108 0 0 1 238 134" stroke="rgba(21,19,17,.13)" strokeWidth="12" />
                <path d="M 22 134 A 108 108 0 0 1 214 57" stroke="var(--orange)" strokeWidth="12" strokeLinecap="round" />
                <path d="M 38 134 A 92 92 0 0 1 222 134" stroke="rgba(21,19,17,.16)" strokeWidth="1.2" />
                <path d="M 49 134 A 81 81 0 0 1 211 134" stroke="rgba(21,19,17,.08)" strokeWidth="1" strokeDasharray="2 6" />
                <line x1="130" y1="134" x2="192" y2="59" stroke="var(--orange)" strokeWidth="3" strokeLinecap="round" />
                <circle cx="130" cy="134" r="9" fill="var(--dark)" />
                <circle cx="130" cy="134" r="3" fill="#fff" />
                <text x="44" y="105" textAnchor="middle" className="stat-gauge-ui__tick">02</text>
                <text x="82" y="63" textAnchor="middle" className="stat-gauge-ui__tick">04</text>
                <text x="130" y="38" textAnchor="middle" className="stat-gauge-ui__tick stat-gauge-ui__tick--active">05</text>
                <text x="178" y="63" textAnchor="middle" className="stat-gauge-ui__tick">06</text>
                <text x="216" y="105" textAnchor="middle" className="stat-gauge-ui__tick">07</text>
                <text x="130" y="121" textAnchor="middle" className="stat-gauge-ui__caption">INDUSTRY EXPERIENCE</text>
              </svg>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default Stats
