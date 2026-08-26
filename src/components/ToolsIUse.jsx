function ToolsIUse() {
  const categories = [
    {
      label: 'FRONTEND',
      items: ['React.js', 'Next.js', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'],
    },
    {
      label: 'BACKEND',
      items: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs'],
    },
    {
      label: 'AI',
      items: ['LLMs', 'RAG', 'LangChain', 'LangGraph', 'Llama', 'Pydantic'],
    },
    {
      label: 'DATA',
      items: ['Python', 'SQL', 'Pandas', 'NumPy'],
    },
    {
      label: 'DATABASE',
      items: ['MongoDB', 'Firebase'],
    },
    {
      label: 'DEVELOPMENT',
      items: ['Git', 'GitHub', 'Docker'],
    },
  ]

  return (
    <section id="skills" className="ed-tools section" aria-labelledby="tools-heading">
      <div className="section__container">
        <div className="ed-section-num reveal-on-scroll">04</div>
        <div className="ed-tools__header reveal-on-scroll">
          <span className="ed-section-label">TECHNICAL STACK</span>
          <h2 id="tools-heading" className="ed-section-title">TOOLS I USE</h2>
        </div>

        <div className="ed-tools__grid reveal-on-scroll">
          {categories.map((cat) => (
            <div key={cat.label} className="ed-tools-row">
              <span className="cat-label">{cat.label}</span>
              <div className="cat-items">
                {cat.items.map((tool, idx) => (
                  <span key={tool} className="tool-text">
                    {tool}
                    {idx < cat.items.length - 1 && <span className="sep">&bull;</span>}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ToolsIUse
