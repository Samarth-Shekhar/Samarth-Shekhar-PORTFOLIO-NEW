function TechStack() {
  const categories = [
    { number: '01', title: 'FRONTEND', items: 'React.js · Next.js · JavaScript · HTML · CSS · Tailwind CSS' },
    { number: '02', title: 'BACKEND', items: 'Node.js · Express.js · FastAPI · REST APIs' },
    { number: '03', title: 'DATABASE', items: 'MongoDB · Firebase · SQL' },
    { number: '04', title: 'AI', items: 'LLMs · RAG · LangChain · LangGraph · Llama · Pydantic' },
    { number: '05', title: 'DATA', items: 'Python · Pandas · NumPy · Data Analysis' },
    { number: '06', title: 'DEVELOPMENT', items: 'Git · GitHub · Docker' },
  ]

  return (
    <section className="tech-stack section" aria-labelledby="tech-stack-heading">
      <div className="section__container">
        <div className="section__header reveal-on-scroll">
          <span className="section__number" aria-hidden="true">10</span>
          <h2 id="tech-stack-heading" className="section__title">TECH STACK</h2>
        </div>

        <div className="tech-stack__grid">
          {categories.map((cat, index) => (
            <div
              key={cat.number}
              className="tech-stack__item reveal-on-scroll"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <span className="tech-stack__number">{cat.number}</span>
              <div className="tech-stack__info">
                <h3 className="tech-stack__title">{cat.title}</h3>
                <p className="tech-stack__items">{cat.items}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechStack
