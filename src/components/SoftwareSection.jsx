function SoftwareSection() {
  const stacks = [
    {
      title: 'FRONTEND',
      items: ['React.js', 'Next.js', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'],
    },
    {
      title: 'BACKEND',
      items: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs'],
    },
    {
      title: 'DATABASE',
      items: ['MongoDB', 'Firebase', 'SQL'],
    },
    {
      title: 'DEVELOPMENT',
      items: ['Git', 'GitHub', 'Docker'],
    },
  ]

  return (
    <section id="software" className="software-section section" aria-labelledby="software-heading">
      <div className="section__container">
        <div className="section__header reveal-on-scroll">
          <span className="section__number" aria-hidden="true">06</span>
          <h2 id="software-heading" className="section__title">SOFTWARE</h2>
        </div>

        <p className="software-section__description reveal-on-scroll">
          Hands-on experience building responsive interfaces, APIs, AI-powered applications and practical software projects.
        </p>

        <div className="software-section__stacks">
          {stacks.map((stack, index) => (
            <div key={stack.title} className="software-section__stack reveal-on-scroll" style={{ animationDelay: `${index * 0.08}s` }}>
              <h3 className="software-section__stack-title">{stack.title}</h3>
              <div className="software-section__stack-items">
                {stack.items.map((item) => (
                  <span key={item} className="software-section__stack-item">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SoftwareSection
