function ProjectVisual({ type }) {
  if (type === 'multi-agent') {
    return (
      <div className="project-visual project-visual--agent">
        <div className="project-visual__window">
          <div className="project-visual__bar">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
            <span className="title">multi-agent-orchestrator v1.0.4</span>
          </div>
          <div className="project-visual__body">
            <div className="agent-node-graph">
              <div className="node node--planner">
                <span className="node-icon">🧠</span>
                <span className="node-label">Planner Agent</span>
              </div>
              <div className="node-connector">→</div>
              <div className="node node--retriever">
                <span className="node-icon">🔍</span>
                <span className="node-label">Retriever (RAG)</span>
              </div>
              <div className="node-connector">→</div>
              <div className="node node--executor">
                <span className="node-icon">⚡</span>
                <span className="node-label">Executor Agent</span>
              </div>
              <div className="node-connector">→</div>
              <div className="node node--evaluator">
                <span className="node-icon">✓</span>
                <span className="node-label">Evaluator</span>
              </div>
            </div>
            <div className="agent-terminal-output">
              <span className="log-line green">$ langgraph run pipeline --task "Analyze context & route workflow"</span>
              <span className="log-line yellow">[Planner] Task decomposed into 3 sub-tasks.</span>
              <span className="log-line cyan">[Retriever] 4 vector chunks retrieved (embedding_dim=1536).</span>
              <span className="log-line green">[Executor] Synthesizing output via Llama-3 API...</span>
              <span className="log-line white">[Evaluator] Status 200 OK — Grounding confidence: 98.4%</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'folate') {
    return (
      <div className="project-visual project-visual--folate">
        <div className="project-visual__browser">
          <div className="project-visual__browser-bar">
            <div className="browser-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="browser-url">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span>http://folate.pro</span>
            </div>
            <span className="live-badge">LIVE DEMO</span>
          </div>
          <div className="project-visual__browser-content">
            <div className="folate-header">
              <span className="folate-logo">FOLATE.AI</span>
              <span className="folate-tag">Natural Language Web Generator</span>
            </div>
            <div className="folate-prompt-box">
              <span className="prompt-label">Prompt:</span>
              <p className="prompt-text">"Generate a modern responsive SaaS landing page with dark mode, interactive cards, and hero analytics dashboard."</p>
              <button className="prompt-btn">Generate App ✨</button>
            </div>
            <div className="folate-preview-grid">
              <div className="preview-card preview-card--hero">
                <span className="card-tag">AI Generated Result</span>
                <h4>Analytics Engine Dashboard</h4>
                <div className="preview-chart">
                  <div className="chart-bar" style={{ height: '60%' }}></div>
                  <div className="chart-bar" style={{ height: '85%' }}></div>
                  <div className="chart-bar" style={{ height: '45%' }}></div>
                  <div className="chart-bar" style={{ height: '95%' }}></div>
                </div>
              </div>
              <div className="preview-card">
                <span className="card-price">$43,923</span>
                <span className="card-sub">+24% from last week</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'meal-planner') {
    return (
      <div className="project-visual project-visual--meal">
        <div className="project-visual__ui">
          <div className="meal-header">
            <span className="meal-title">🥗 AI Meal Planner & Recipe Generator</span>
            <span className="meal-badge">Python + LangChain</span>
          </div>
          <div className="meal-grid">
            <div className="meal-card">
              <span className="meal-time">Breakfast · 450 kcal</span>
              <h5>Avocado & Egg Protein Toast</h5>
              <div className="macro-bar">
                <span className="macro protein">P: 28g</span>
                <span className="macro carbs">C: 35g</span>
                <span className="macro fats">F: 18g</span>
              </div>
            </div>
            <div className="meal-card">
              <span className="meal-time">Lunch · 650 kcal</span>
              <h5>Grilled Salmon Bowl with Quinoa</h5>
              <div className="macro-bar">
                <span className="macro protein">P: 45g</span>
                <span className="macro carbs">C: 48g</span>
                <span className="macro fats">F: 22g</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="project-visual project-visual--default">
      <div className="project-visual__ui">
        <div className="video-header">
          <span className="video-logo">🎥 Video Sharing Platform</span>
          <span className="video-badge">React.js + Express + MongoDB</span>
        </div>
        <div className="video-screen">
          <div className="video-player-mock">
            <span className="play-button">▶</span>
            <span className="video-time">10:42 / 18:30</span>
          </div>
          <div className="video-info">
            <h5>Collaborative Content Management & Workflow</h5>
            <span className="video-meta">Role-Based Access Control · Content Moderation</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectVisual
