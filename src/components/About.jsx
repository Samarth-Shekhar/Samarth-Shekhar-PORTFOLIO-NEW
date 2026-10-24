const domains = [
  { num: '01', name: 'Software Development' },
  { num: '02', name: 'AI & GenAI'           },
  { num: '03', name: 'Data'                 },
  { num: '04', name: 'Product'              },
]

function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <div className="container">
        {/* Section header */}
        <div className="section-header reveal">
          <div className="section-header__top">
            <div className="section-header__num-title">
              <span className="section-header__num">01</span>
              <h2 id="about-heading" className="section-title">About</h2>
            </div>
            <span className="label">Background</span>
          </div>
        </div>

        {/* Two-column editorial grid */}
        <div className="about__grid">
          {/* Left — main copy */}
          <div className="about__body reveal reveal-delay-1">
            <h3 className="about__headline">
              "I like building things that sit between <em>technology</em> and people."
            </h3>

            <p className="about__text about__text--bordered">
              I'm a B.Tech Information Technology graduate from Amity University, Noida. I enjoy
              working at the intersection of software engineering, AI applications, and product
              thinking — understanding the problem first, then building something practical.
            </p>

            <p className="about__text">
              Over the course of my degree, I've worked on AI-powered platforms, multi-agent
              orchestration systems, full-stack web applications, and data workflows. I've
              interned across AI automation, frontend development, IT operations, and
              software engineering — giving me broad exposure to how real teams build and ship.
            </p>

            <p className="about__text">
              I'm drawn to projects where the technical and the practical intersect — where
              understanding the problem is just as important as knowing the right tool.
            </p>
          </div>

          {/* Right — domain list */}
          <div className="about__side reveal reveal-delay-2">
            <span className="about__side-title">Areas I work across</span>
            <div className="about__domains">
              {domains.map((d) => (
                <div key={d.num} className="about__domain-item">
                  <span className="about__domain-num">{d.num}</span>
                  <span className="about__domain-name">{d.name}</span>
                  <span className="about__domain-arrow" aria-hidden="true">↗</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
