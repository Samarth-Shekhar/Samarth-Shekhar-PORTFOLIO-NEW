function Education() {
  const coursework = [
    'Data Structures', 'DBMS', 'Operating Systems', 'Computer Networks',
    'Software Engineering', 'AI', 'Data Analytics', 'Full Stack Development',
  ]

  return (
    <section id="education" className="education section" aria-labelledby="education-heading">
      <div className="section__container">
        <div className="section__header reveal-on-scroll">
          <span className="section__number" aria-hidden="true">12</span>
          <h2 id="education-heading" className="section__title">EDUCATION</h2>
        </div>

        <div className="education__content reveal-on-scroll">
          <div className="education__main">
            <h3 className="education__institution">Amity University, Noida</h3>
            <p className="education__degree">B.Tech in Information Technology</p>
            <div className="education__meta">
              <span className="education__year">2022 – 2026</span>
              <span className="education__divider" aria-hidden="true">·</span>
              <span className="education__division">First Division</span>
            </div>
          </div>

          <div className="education__coursework">
            <h4 className="education__coursework-title">Relevant Coursework</h4>
            <div className="education__coursework-tags">
              {coursework.map((course) => (
                <span key={course} className="education__coursework-tag">{course}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education
