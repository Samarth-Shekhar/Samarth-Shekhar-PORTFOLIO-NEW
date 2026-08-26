import { useState } from 'react'

function AISection() {
  const [activeRagStep, setActiveRagStep] = useState(0)

  const tools = [
    'Generative AI', 'LLMs', 'RAG', 'LangChain', 'LangGraph',
    'Prompt Engineering', 'AI Automation', 'Multi-Agent Systems',
    'FastAPI', 'Llama', 'Pydantic',
  ]

  const ragSteps = [
    {
      label: 'USER QUERY',
      icon: '?',
      detail: 'Natural language input received from the user or downstream API endpoint.',
      payload: 'Query: "How does the multi-agent task routing algorithm handle failure states?"',
    },
    {
      label: 'RETRIEVAL',
      icon: '⟳',
      detail: 'Retriever agent generates dense embeddings and queries relevant context vector databases.',
      payload: 'Embedding Model: text-embedding-3-small | Top-K: 4 chunks retrieved',
    },
    {
      label: 'CONTEXT',
      icon: '≡',
      detail: 'Context manager aggregates, filters, and formats retrieved document chunks into system prompt memory.',
      payload: 'Context Payload: [Chunk 104: Router Exception Logic, Chunk 89: Evaluator Retry Rules]',
    },
    {
      label: 'LLM',
      icon: '◆',
      detail: 'Llama/OpenAI model synthesizes grounded answer using retrieved context and prompt rules.',
      payload: 'Model: Llama-3 / GPT-4o | System Prompt: "Answer strictly based on retrieved context."',
    },
    {
      label: 'RESPONSE',
      icon: '✓',
      detail: 'Evaluator agent validates output structure, checks factual consistency, and returns final payload.',
      payload: 'Status: 200 OK | Validation: Verified | Latency: 420ms',
    },
  ]

  return (
    <section id="ai" className="ai-section section" aria-labelledby="ai-heading">
      <div className="section__container">
        <div className="section__header reveal-on-scroll">
          <div className="section__badge">
            <span className="section__badge-icon">●</span>
            <span className="section__badge-text">ARTIFICIAL INTELLIGENCE</span>
          </div>
          <h2 id="ai-heading" className="section__title">AI + GENAI</h2>
        </div>

        <div className="ai-section__content">
          <div className="ai-section__text reveal-on-scroll">
            <p className="ai-section__description">
              Hands-on experience building AI-powered applications, retrieval workflows, automation systems and multi-agent applications using practical LLM technologies.
            </p>

            <div className="ai-section__tools">
              {tools.map((tool) => (
                <span key={tool} className="ai-section__tool">{tool}</span>
              ))}
            </div>

            <div className="ai-section__interactive-tip">
              <span className="tip-badge">Interactive Simulation:</span>
              <span>Click on any node in the RAG Workflow to test the data pipeline live!</span>
            </div>
          </div>

          <div className="ai-section__rag reveal-on-scroll">
            <div className="ai-section__rag-header">
              <h3 className="ai-section__rag-title">RAG WORKFLOW SIMULATION</h3>
              <span className="ai-section__rag-badge">LangGraph + FastAPI</span>
            </div>

            <div className="ai-section__rag-flow">
              {ragSteps.map((step, index) => (
                <div key={step.label} className="ai-section__rag-step">
                  <button
                    className={`ai-section__rag-node ${activeRagStep === index ? 'ai-section__rag-node--active' : ''}`}
                    onClick={() => setActiveRagStep(index)}
                    aria-label={`RAG step ${step.label}`}
                  >
                    <span className="ai-section__rag-icon" aria-hidden="true">{step.icon}</span>
                    <span className="ai-section__rag-label">{step.label}</span>
                    <span className="ai-section__rag-num">0{index + 1}</span>
                  </button>
                  {index < ragSteps.length - 1 && (
                    <div className="ai-section__rag-arrow" aria-hidden="true">
                      <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                        <path d="M8 0V16M8 16L2 10M8 16L14 10" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="ai-section__rag-inspector">
              <div className="ai-section__rag-inspector-header">
                <span className="status-indicator"></span>
                <span className="inspector-title">Pipeline Node Inspection: <strong>{ragSteps[activeRagStep].label}</strong></span>
              </div>
              <p className="inspector-detail">{ragSteps[activeRagStep].detail}</p>
              <div className="inspector-payload">
                <code>{ragSteps[activeRagStep].payload}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AISection
