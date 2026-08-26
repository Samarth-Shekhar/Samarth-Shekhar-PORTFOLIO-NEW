function About() {
  const cards = [
    { number: '01', title: 'SOFTWARE', desc: 'Frontend and full-stack development.' },
    { number: '02', title: 'AI', desc: 'LLMs, RAG and AI-powered applications.' },
    { number: '03', title: 'DATA', desc: 'Python, SQL and data analysis.' },
    { number: '04', title: 'PRODUCT', desc: 'Requirements, Agile execution and project coordination.' },
  ]

  const interests = [
    'Software Development',
    'Full Stack',
    'Frontend',
    'AI / GenAI',
    'Data',
    'Product & Project Management',
  ]

  return (
    <section id="about" className="about section" aria-labelledby="about-heading">
      <div className="section__container">
        <div className="section__header reveal-on-scroll">
          <div className="section__badge">
            <span className="section__badge-icon">●</span>
            <span className="section__badge-text">ABOUT</span>
          </div>
          <h2 id="about-heading" className="section__title">A LITTLE ABOUT ME</h2>
        </div>

        <div className="about__content reveal-on-scroll">
          <p className="about__text" style={{ marginBottom: '20px' }}>
            I’m a B.Tech IT graduate with a genuine curiosity for both technology and how people use it.
          </p>
          <p className="about__text" style={{ marginBottom: '20px' }}>
            My experience has taken me from building frontend applications and working with APIs to experimenting with LLMs, RAG, AI automation, and multi-agent systems. I’ve also had opportunities to work around Agile workflows, requirements, documentation, and project coordination.
          </p>
          <p className="about__text" style={{ marginBottom: '32px' }}>
            I’m still learning, building, and figuring things out — but that’s what I enjoy most about technology. Give me a problem, and I like digging into it until I can turn it into something that actually works.
          </p>

          <div className="about__interests">
            <span className="about__interests-label">Currently interested in:</span>
            <div className="about__interests-tags">
              {interests.map((interest) => (
                <span key={interest} className="about__interest-tag">{interest}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="about__cards">
          {cards.map((card, index) => (
            <div key={card.number} className="about__card reveal-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
              <span className="about__card-number">{card.number}</span>
              <h3 className="about__card-title">{card.title}</h3>
              <p className="about__card-desc">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
