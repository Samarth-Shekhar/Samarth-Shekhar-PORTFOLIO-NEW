function StatsSection() {
  return (
    <section className="stats-section section" aria-labelledby="stats-heading">
      <div className="section__container">
        <div className="section__header reveal-on-scroll">
          <div className="section__badge">
            <span className="section__badge-icon">●</span>
            <span className="section__badge-text">STATS</span>
          </div>
          <h2 id="stats-heading" className="section__title">MEASURABLE IMPACT</h2>
        </div>

        <p className="stats-section__subtitle reveal-on-scroll">
          A quick look at the key highlights and practical experience behind my software and product journey.
        </p>

        <div className="stats-section__grid reveal-on-scroll">
          {/* Card 1 */}
          <div className="stats-card stats-card--light">
            <span className="stats-card__number">10+</span>
            <h3 className="stats-card__label">FEATURED PROJECTS</h3>
            <p className="stats-card__desc">Full-Stack & AI platforms built from ground up.</p>
            <div className="stats-card__pills">
              <span className="stats-pill">Multi-Agent</span>
              <span className="stats-pill">Folate AI</span>
              <span className="stats-pill">Meal Planner</span>
              <span className="stats-pill">Video Platform</span>
              <span className="stats-pill">Generative AI</span>
              <span className="stats-pill">REST APIs</span>
            </div>
          </div>

          {/* Card 2: Dark card */}
          <div className="stats-card stats-card--dark">
            <span className="stats-card__number">04</span>
            <h3 className="stats-card__label">INTERNSHIPS COMPLETED</h3>
            <p className="stats-card__desc">Hands-on experience in AI automation, React.js, IT operations, and software engineering.</p>
            <div className="stats-card__quote">
              <span className="quote-icon">“</span>
              <span>Collaborated across cross-functional tech & product teams.</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="stats-card stats-card--light">
            <span className="stats-card__number">100%</span>
            <h3 className="stats-card__label">TECHNICAL EXECUTION</h3>
            <p className="stats-card__desc">Combining software engineering, data analysis, and product management workflows.</p>
            <div className="stats-card__meter">
              <div className="stats-meter-track">
                <div className="stats-meter-fill" style={{ width: '100%' }}></div>
              </div>
              <span className="meter-label">SOFTWARE &bull; AI &bull; PRODUCT</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StatsSection
