function ProductSection() {
  const tools = [
    'Product Roadmapping', 'Requirement Analysis', 'User Stories',
    'Backlog Management', 'Prioritization (MoSCoW)', 'Agile & Scrum',
    'Sprint Planning', 'JIRA', 'Notion', 'Miro', 'Gantt Charts',
    'Risk Management', 'Stakeholder Communication', 'Documentation',
  ]

  return (
    <section id="product" className="product-section section" aria-labelledby="product-heading">
      <div className="section__container">
        <div className="section__header reveal-on-scroll">
          <span className="section__number" aria-hidden="true">08</span>
          <h2 id="product-heading" className="section__title">PRODUCT + PROJECT</h2>
        </div>

        <div className="product-section__content reveal-on-scroll">
          <p className="product-section__description">
            I enjoy understanding the problem behind a feature, translating requirements into actionable work, and collaborating with technical teams to move projects forward.
          </p>
          <div className="product-section__tools">
            {tools.map((tool) => (
              <span key={tool} className="product-section__tool">{tool}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductSection
