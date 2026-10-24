import SectionIcon from './SectionIcon.jsx'
import { projects } from '../data/projects.js'
import { experiences } from '../data/experience.js'

function Stats() {
  const portfolioProjects = projects.filter((project) => project.kind !== 'website')
  const featuredProject = portfolioProjects.find((project) => project.id === 1) || portfolioProjects[0]
  const validationRate = featuredProject?.metrics?.find((metric) => metric.label === 'Evaluation Pass Rate')?.value || '98.4%'
  const projectPills = [
    { label: 'AI', tone: 'dark', id: 'ai' },
    { label: 'Generative AI', tone: 'orange', id: 'genai' },
    { label: 'Data Engineering', tone: 'outline', id: 'data' },
    { label: 'Full-Stack Development', tone: 'green', id: 'fullstack' },
    { label: 'Web Applications', tone: 'outline', id: 'webapps' },
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

        <div className="stats-reference-art">
          <img
            src="/stats/portfolio-dashboard-metrics-overview.png"
            alt="Portfolio statistics showing featured projects, agent validation pass rate, and industry roles"
          />
        </div>

        <div className="stats-grid stats-grid--fallback">
          <article className="stat-card stat-card--cream">
            <div className="stat-card__top">
              <div className="stat-card__num">
                {String(portfolioProjects.length).padStart(2, '0')}<span className="stat-card__num--orange">+</span>
              </div>
              <div className="stat-card__label">Featured Projects</div>
              <div className="stat-card__sub">AI, full-stack, data, and secure creator platforms</div>
            </div>

            <div className="stat-pill-stack">
              {/* Decorative accent doodles matching reference */}
              <svg className="stat-pill-sparkle" viewBox="0 0 40 40" fill="none" stroke="var(--orange)" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <line x1="6" y1="34" x2="18" y2="22" />
                <line x1="22" y1="18" x2="26" y2="6" />
                <line x1="28" y1="24" x2="38" y2="28" />
              </svg>
              <span className="stat-pill-dash" aria-hidden="true" />

              {projectPills.map((pill) => (
                <span key={pill.label} className={`stat-pill stat-pill--${pill.tone} stat-pill--${pill.id}`}>
                  {pill.label}
                </span>
              ))}
            </div>
          </article>

          <article className="stat-card stat-card--dark">
            <div className="stat-card__top">
              <div className="stat-card__num">{validationRate}</div>
              <div className="stat-card__label stat-card__label--green">Agent Validation Pass Rate</div>
              <div className="stat-card__sub">Autonomous Agentic AI Workflow Platform</div>
            </div>

            <div className="stat-terminal" aria-label="Agent validation terminal">
              <div className="stat-terminal__header">
                <span><i className="stat-terminal__dot" /> 4 Autonomous AI Agents</span>
                <span className="stat-terminal__active">ACTIVE</span>
              </div>
              <ul className="stat-terminal__agents">
                {[
                  [
                    'Planner',
                    'Breaks down complex tasks',
                    (
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="8" y1="9" x2="16" y2="9" />
                        <line x1="8" y1="13" x2="16" y2="13" />
                        <line x1="8" y1="17" x2="12" y2="17" />
                      </svg>
                    ),
                  ],
                  [
                    'Retriever',
                    'Fetches relevant context',
                    (
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                    ),
                  ],
                  [
                    'Executor',
                    'Uses tools to complete tasks',
                    (
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                      </svg>
                    ),
                  ],
                  [
                    'Evaluator',
                    'Validates and improves output',
                    (
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="9 12 11 14 15 10" />
                      </svg>
                    ),
                  ],
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
              <div className="stat-card__sub">AI, React, software development &amp; IT experience</div>
            </div>

            <div className="stat-gauge-ui">
              <svg className="stat-gauge-ui__svg" viewBox="0 0 320 200" fill="none" aria-hidden="true">
                <path d="M 32 170 A 128 128 0 0 1 288 170" stroke="rgba(21,19,17,.12)" strokeWidth="16" strokeLinecap="round" />
                <path d="M 32 170 A 128 128 0 0 1 242 68" stroke="var(--orange)" strokeWidth="16" strokeLinecap="round" />
                <path d="M 54 170 A 106 106 0 0 1 266 170" stroke="rgba(21,19,17,.14)" strokeWidth="1.2" />
                <path d="M 68 170 A 92 92 0 0 1 252 170" stroke="rgba(21,19,17,.08)" strokeWidth="1" strokeDasharray="2 6" />
                <line x1="160" y1="170" x2="228" y2="78" stroke="var(--orange)" strokeWidth="3.5" strokeLinecap="round" className="stat-gauge-needle" />
                <circle cx="160" cy="170" r="12" fill="#08100a" />
                <circle cx="160" cy="170" r="5" fill="#fff" />
                <text x="60" y="132" textAnchor="middle" className="stat-gauge-ui__tick">02</text>
                <text x="106" y="80" textAnchor="middle" className="stat-gauge-ui__tick">04</text>
                <text x="160" y="58" textAnchor="middle" className="stat-gauge-ui__tick stat-gauge-ui__tick--active">05</text>
                <text x="214" y="80" textAnchor="middle" className="stat-gauge-ui__tick">06</text>
                <text x="260" y="132" textAnchor="middle" className="stat-gauge-ui__tick">07</text>
                <text x="160" y="152" textAnchor="middle" className="stat-gauge-ui__caption">INDUSTRY EXPERIENCE</text>
              </svg>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default Stats
