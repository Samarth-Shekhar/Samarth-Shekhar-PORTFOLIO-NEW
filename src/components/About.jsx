function About() {
  const exploringItems = [
    'Software',
    'AI / GenAI',
    'Full Stack',
    'Data',
    'Product',
  ]

  return (
    <section id="about" className="ed-about section" aria-labelledby="about-heading">
      <div className="ed-about__container">
        {/* Editorial Section Number */}
        <div className="ed-section-num reveal-on-scroll">01</div>

        <div className="ed-about__grid">
          <div className="ed-about__main reveal-on-scroll">
            <span className="ed-about__label">A LITTLE ABOUT ME</span>
            <h2 id="about-heading" className="ed-about__headline">
              "I like building things that sit somewhere between technology and people."
            </h2>
            <p className="ed-about__text">
              I'm a B.Tech IT graduate with experience across frontend development, AI automation, technical projects, data workflows and Agile execution.
            </p>
          </div>

          <div className="ed-about__side reveal-on-scroll">
            <span className="side-title">CURRENTLY EXPLORING</span>
            <ul className="exploring-list">
              {exploringItems.map((item, idx) => (
                <li key={item} className="exploring-item">
                  <span className="item-num">0{idx + 1}</span>
                  <span className="item-name">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
