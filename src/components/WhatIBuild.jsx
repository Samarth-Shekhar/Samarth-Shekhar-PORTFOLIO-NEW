import { useState } from 'react'

function WhatIBuild() {
  const [activeCard, setActiveCard] = useState(0)

  const cards = [
    {
      number: '01',
      tag: 'SOFTWARE & FULL STACK',
      title: 'SOFTWARE',
      subtitle: 'Frontend & Full Stack Applications',
      desc: 'Building responsive interfaces, APIs and practical software applications.',
      stack: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'FastAPI', 'Tailwind CSS'],
      visualType: 'code',
      codeSnippet: `const App = () => {
  return (
    <ResponsiveLayout>
      <APIConnector endpoint="/v1/build" />
      <UIComponent theme="editorial" />
    </ResponsiveLayout>
  )
}`,
    },
    {
      number: '02',
      tag: 'AI & GENERATIVE WORKFLOWS',
      title: 'AI',
      subtitle: 'LLMs, RAG & Multi-Agent Platforms',
      desc: 'Building AI-powered applications, LLM workflows, RAG systems and automation.',
      stack: ['Python', 'LangGraph', 'LangChain', 'FastAPI', 'Llama', 'Pydantic'],
      visualType: 'rag',
      codeSnippet: `class AgentOrchestrator:
  async def run_pipeline(self, query: str):
    plan = await self.planner.execute(query)
    context = await self.retriever.search(plan)
    return await self.executor.synthesize(context)`,
    },
    {
      number: '03',
      tag: 'DATA & ANALYTICS',
      title: 'DATA',
      subtitle: 'Data Pipelines & Insight Extraction',
      desc: 'Working with Python, SQL and data processing to turn information into useful insights.',
      stack: ['Python', 'SQL', 'Pandas', 'NumPy', 'Data Analysis'],
      visualType: 'data',
      codeSnippet: `import pandas as pd

df = pd.read_sql("SELECT * FROM metrics", conn)
insights = df.groupby('workflow').aggregate({'latency': 'mean', 'success_rate': 'max'})`,
    },
    {
      number: '04',
      tag: 'PRODUCT & AGILE',
      title: 'PRODUCT',
      subtitle: 'Requirements, Sprint & Project Execution',
      desc: 'Understanding requirements, organizing execution and collaborating across technical workflows.',
      stack: ['JIRA', 'Agile & Scrum', 'User Stories', 'Backlog Management', 'Miro', 'Notion'],
      visualType: 'product',
      codeSnippet: `// Sprint Backlog Execution
- User Story: Implement RAG Context Cache
- MoSCoW: Must Have | Priority: High
- Acceptance Criteria: < 200ms retrieval latency`,
    },
  ]

  return (
    <section className="what-i-build section" aria-labelledby="what-i-build-heading">
      <div className="section__container">
        <div className="section__header reveal-on-scroll">
          <div className="section__badge">
            <span className="section__badge-icon">●</span>
            <span className="section__badge-text">CAPABILITIES</span>
          </div>
          <h2 id="what-i-build-heading" className="section__title">WHAT I BUILD</h2>
        </div>

        <p className="what-i-build__intro reveal-on-scroll">
          Here's how I bring technical ideas to life across software, AI systems, data pipelines, and product workflows.
        </p>

        <div className="what-i-build__tabs reveal-on-scroll">
          {cards.map((card, index) => (
            <button
              key={card.number}
              className={`what-i-build__tab ${activeCard === index ? 'what-i-build__tab--active' : ''}`}
              onClick={() => setActiveCard(index)}
              aria-selected={activeCard === index}
            >
              <span className="what-i-build__tab-num">{card.number}</span>
              <span className="what-i-build__tab-title">{card.title}</span>
            </button>
          ))}
        </div>

        <div className="what-i-build__showcase reveal-on-scroll">
          <div className="what-i-build__showcase-content">
            <span className="what-i-build__showcase-tag">{cards[activeCard].tag}</span>
            <h3 className="what-i-build__showcase-title">{cards[activeCard].subtitle}</h3>
            <p className="what-i-build__showcase-desc">{cards[activeCard].desc}</p>

            <div className="what-i-build__showcase-stack">
              <span className="what-i-build__stack-label">Core Tech & Tools:</span>
              <div className="what-i-build__stack-tags">
                {cards[activeCard].stack.map((item) => (
                  <span key={item} className="what-i-build__stack-tag">{item}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="what-i-build__showcase-preview">
            <div className="what-i-build__code-header">
              <div className="what-i-build__code-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span className="what-i-build__code-filename">{cards[activeCard].title.toLowerCase()}-module.spec</span>
            </div>
            <pre className="what-i-build__code-body">
              <code>{cards[activeCard].codeSnippet}</code>
            </pre>
          </div>
        </div>

        <div className="what-i-build__grid">
          {cards.map((card, index) => (
            <article
              key={card.number}
              className={`what-i-build__card ${activeCard === index ? 'what-i-build__card--selected' : ''}`}
              onClick={() => setActiveCard(index)}
            >
              <div className="what-i-build__card-header">
                <span className="what-i-build__card-num">{card.number}</span>
                <span className="what-i-build__card-pill">{card.title}</span>
              </div>
              <h4 className="what-i-build__card-title">{card.title}</h4>
              <p className="what-i-build__card-desc">{card.desc}</p>
              <div className="what-i-build__card-footer">
                <span>Explore Capabilities</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhatIBuild
