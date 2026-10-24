function Education() {
  return (
    <section id="education" className="education-section bg-grid" aria-labelledby="edu-heading">
      <div className="container">
        {/* Section Badge Header matching Dribbble reference */}
        <div className="section-badge-header reveal">
          <div className="section-badge section-badge--light">
            <span className="section-badge__icon" aria-hidden="true">🎓</span>
            <h2 id="edu-heading" className="section-badge__title">
              EDUCATION
            </h2>
          </div>
          <p className="section-desc">
            Rigorous undergraduate foundation in Information Technology, systems architecture, algorithms, and distributed computing.
          </p>
        </div>

        {/* Big Editorial Education Card */}
        <div className="edu-card-hero reveal reveal-delay-1">
          <span className="edu-hero-year">2022 – 2026 // ACADEMIC DEGREE</span>
          <h3 className="edu-hero-inst">Amity University</h3>
          <div className="edu-hero-degree">
            Bachelor of Technology (B.Tech) in Information Technology
          </div>
          <p className="edu-hero-desc">
            Comprehensive computer science curriculum with strong emphasis on Data Structures &amp; Algorithms, Object-Oriented Design, Operating Systems, Database Management Systems (DBMS), Computer Networks, and Cloud Infrastructure.
          </p>
          <div className="edu-hero-loc">
            FIRST DIVISION WITH DISTINCTION · VAISHALI, GHAZIABAD, UTTAR PRADESH, INDIA
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education
