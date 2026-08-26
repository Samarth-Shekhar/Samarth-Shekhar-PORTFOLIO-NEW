import { useState } from 'react'

function WhatIWorkAcross() {
  const [activeTab, setActiveTab] = useState(0)

  const items = [
    {
      id: 'software',
      title: 'SOFTWARE',
      subtitle: 'Frontend & Full Stack Engineering',
      stack: 'React.js / Next.js / Node.js',
      styleClass: 'item--software',
      desc: 'Building responsive interfaces, web applications, REST APIs, and full-stack systems.',
    },
    {
      id: 'ai',
      title: 'AI',
      subtitle: 'Generative AI & Agentic Systems',
      stack: 'LLMs / RAG / LangChain / LangGraph',
      styleClass: 'item--ai',
      desc: 'Building AI-powered applications, RAG retrieval pipelines, and multi-agent workflows.',
    },
    {
      id: 'data',
      title: 'DATA',
      subtitle: 'Data Pipelines & Analysis',
      stack: 'Python / SQL / Pandas / NumPy',
      styleClass: 'item--data',
      desc: 'Processing data, extracting metrics, querying SQL databases, and building insights.',
    },
    {
      id: 'product',
      title: 'PRODUCT',
      subtitle: 'Product Management & Execution',
      stack: 'Agile / Requirements / JIRA / Notion',
      styleClass: 'item--product',
      desc: 'Defining user stories, structuring sprint backlogs, and coordinating technical workflows.',
    },
  ]

  return (
    <section className="ed-work-across section" aria-labelledby="work-across-heading">
      <div className="section__container">
        <div className="ed-work-across__header reveal-on-scroll">
          <span className="ed-section-label">CAREER IDENTITY</span>
          <h2 id="work-across-heading" className="ed-section-title">WHAT I WORK ACROSS</h2>
        </div>

        <div className="ed-work-across__list reveal-on-scroll">
          {items.map((item, idx) => {
            const isActive = activeTab === idx
            return (
              <div
                key={item.id}
                className={`ed-work-across__item ${item.styleClass} ${isActive ? 'active' : ''}`}
                onMouseEnter={() => setActiveTab(idx)}
                onClick={() => setActiveTab(idx)}
              >
                <div className="item-top">
                  <span className="item-index">0{idx + 1}</span>
                  <h3 className="item-title">{item.title}</h3>
                  <span className="item-arrow">↗</span>
                </div>

                <div className="item-reveal">
                  <div className="reveal-content">
                    <span className="reveal-subtitle">{item.subtitle}</span>
                    <span className="reveal-stack">{item.stack}</span>
                    <p className="reveal-desc">{item.desc}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhatIWorkAcross
