function EducationEditorial() {
  return (
    <section className="ed-education section" aria-labelledby="edu-heading">
      <div className="section__container">
        <div className="ed-section-num reveal-on-scroll">07</div>
        <div className="ed-education__header reveal-on-scroll">
          <span className="ed-section-label">ACADEMIC BACKGROUND</span>
          <h2 id="edu-heading" className="ed-section-title">EDUCATION</h2>
        </div>

        <div className="ed-education__content reveal-on-scroll">
          <div className="edu-block">
            <span className="edu-year">2022 &ndash; 2026</span>
            <h3 className="edu-inst">AMITY UNIVERSITY</h3>
            <p className="edu-degree">Bachelor of Technology (B.Tech) in Information Technology</p>
            <span className="edu-division">First Division</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EducationEditorial
