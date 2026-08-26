function DataSection() {
  const tools = ['Python', 'SQL', 'Pandas', 'NumPy', 'Data Analysis']

  return (
    <section id="data" className="data-section section" aria-labelledby="data-heading">
      <div className="section__container">
        <div className="section__header reveal-on-scroll">
          <span className="section__number" aria-hidden="true">07</span>
          <h2 id="data-heading" className="section__title">DATA</h2>
        </div>

        <div className="data-section__content reveal-on-scroll">
          <p className="data-section__description">
            Working knowledge of data processing, analysis and structured workflows using Python and SQL.
          </p>
          <div className="data-section__tools">
            {tools.map((tool) => (
              <span key={tool} className="data-section__tool">{tool}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default DataSection
