function HowIThink() {
  const pmSkills = [
    'Requirements',
    'User Stories',
    'Agile',
    'Sprint Planning',
    'Prioritization',
    'Documentation',
    'Stakeholder Communication',
  ]

  return (
    <section className="ed-think section" aria-labelledby="think-heading">
      <div className="section__container">
        <div className="ed-section-num reveal-on-scroll">05</div>
        <div className="ed-think__header reveal-on-scroll">
          <span className="ed-section-label">PRODUCT & EXECUTION</span>
          <h2 id="think-heading" className="ed-section-title">HOW I THINK</h2>
        </div>

        <div className="ed-think__content reveal-on-scroll">
          <p className="think-quote">
            "I enjoy understanding the problem behind a feature, breaking it into actionable work, and working with technical teams to turn ideas into useful products."
          </p>

          <div className="think-skills-list">
            {pmSkills.map((skill, idx) => (
              <span key={skill} className="think-pill">
                {skill}
                {idx < pmSkills.length - 1 && <span className="slash"> / </span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowIThink
