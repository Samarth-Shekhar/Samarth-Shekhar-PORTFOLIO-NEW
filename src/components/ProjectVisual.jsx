function ProjectVisual({ type, image }) {
  /* ── 1. Multi-Agent Orchestration ── */
  if (type === 'multi-agent') {
    return (
      <div className="pv-card-frame" style={{ background: '#0D0E12', minHeight: 330 }}>
        {/* Title Bar */}
        <div className="pv-titlebar">
          <span className="pv-dot pv-dot-r" />
          <span className="pv-dot pv-dot-y" />
          <span className="pv-dot pv-dot-g" />
          <span className="pv-titlebar-text">langgraph-engine // state-machine-dag-runner</span>
        </div>

        <div className="pv-realistic-image">
          <img src={image} alt="" />
          <span>LIVE SYSTEM VIEW</span>
        </div>

        {/* Interior Pipeline UI */}
        <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* SVG Animated DAG Flow */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 6, padding: '12px 14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6, flexWrap: 'wrap' }}>
              <div style={{ background: 'rgba(232,66,10,0.15)', border: '1px solid var(--orange)', borderRadius: 4, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#fff', fontFamily: 'var(--f-mono)' }}>
                <span>🧠</span> <strong>Planner</strong>
              </div>
              <span style={{ color: 'var(--orange)', fontSize: 12 }}>→</span>
              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 4, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#fff', fontFamily: 'var(--f-mono)' }}>
                <span>🔍</span> <strong>Retriever</strong>
              </div>
              <span style={{ color: 'var(--orange)', fontSize: 12 }}>→</span>
              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 4, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#fff', fontFamily: 'var(--f-mono)' }}>
                <span>⚡</span> <strong>Executor</strong>
              </div>
              <span style={{ color: 'var(--orange)', fontSize: 12 }}>→</span>
              <div style={{ background: 'rgba(45,164,78,0.15)', border: '1px solid #2da44e', borderRadius: 4, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#2da44e', fontFamily: 'var(--f-mono)' }}>
                <span>🛡️</span> <strong>Evaluator</strong>
              </div>
            </div>
          </div>

          {/* Terminal Console Stream */}
          <div style={{ background: '#07080A', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 6, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 5, overflow: 'hidden' }}>
            <div style={{ font: '400 9px/1.4 var(--f-mono)', color: '#2da44e' }}>$ langgraph run pipeline --task "Decompose enterprise research & synthesize"</div>
            <div style={{ font: '400 9px/1.4 var(--f-mono)', color: '#febc2e' }}>[Planner] Generated 4-stage execution DAG (depth: 2, parallel: true)</div>
            <div style={{ font: '400 9px/1.4 var(--f-mono)', color: '#56b6d8' }}>[Retriever] ChromaDB vector query → 6 semantic chunks (cos_sim: 0.94)</div>
            <div style={{ font: '400 9px/1.4 var(--f-mono)', color: 'rgba(255,255,255,.7)' }}>[Executor] Synthesizing context via Llama-3 with tool routing…</div>
            <div style={{ font: '400 9px/1.4 var(--f-mono)', color: '#2da44e' }}>[Evaluator] Schema validation passed ✓ Accuracy: 98.4% (Latency: 780ms)</div>
          </div>

          {/* Telemetry Footer */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
            <span style={{ font: '500 9px/1 var(--f-mono)', color: 'rgba(255,255,255,.4)' }}>VECTOR DENSITY: 1536-DIM</span>
            <span style={{ font: '500 9px/1 var(--f-mono)', color: 'var(--orange)' }}>CYCLIC FEEDBACK: ENABLED</span>
            <span style={{ font: '500 9px/1 var(--f-mono)', color: '#2da44e' }}>STATUS: 200 OK (ASYNC)</span>
          </div>
        </div>
      </div>
    )
  }

  /* ── 2. Folate — AI Web Generator ── */
  if (type === 'folate') {
    return (
      <div className="pv-card-frame" style={{ background: '#0F1215', minHeight: 330 }}>
        {/* Safari Browser Bar */}
        <div className="pv-titlebar" style={{ background: 'rgba(255,255,255,.05)' }}>
          <div style={{ display: 'flex', gap: 5 }}>
            <span className="pv-dot pv-dot-r" />
            <span className="pv-dot pv-dot-y" />
            <span className="pv-dot pv-dot-g" />
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,.08)', borderRadius: 4, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 6, font: '400 9px/1 var(--f-mono)', color: 'rgba(255,255,255,.6)', maxWidth: 240, margin: '0 auto' }}>
            <span>🔒</span> https://folate.pro/sandbox/preview
          </div>
          <span style={{ font: '600 8px/1 var(--f-mono)', color: '#2da44e', background: 'rgba(45,164,78,.15)', padding: '3px 6px', borderRadius: 3 }}>
            LIVE
          </span>
        </div>

        <div className="pv-realistic-image">
          <img src={image} alt="" />
          <span>GENERATED PRODUCT PREVIEW</span>
        </div>

        {/* Split Screen Workspace */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: 14, flex: 1 }}>
          {/* Left: Code Editor Pane */}
          <div style={{ background: '#080A0D', border: '1px solid rgba(255,255,255,.06)', borderRadius: 5, padding: 10, display: 'flex', flexDirection: 'column', gap: 4, font: '400 8.5px/1.5 var(--f-mono)', color: 'rgba(255,255,255,.7)' }}>
            <div style={{ color: 'var(--orange)', marginBottom: 2 }}>// App.jsx (Live Generated)</div>
            <div><span style={{ color: '#e06c75' }}>import</span> React <span style={{ color: '#e06c75' }}>from</span> <span style={{ color: '#98c379' }}>'react'</span></div>
            <div><span style={{ color: '#61afef' }}>function</span> <span style={{ color: '#e5c07b' }}>Hero</span>() &#123;</div>
            <div style={{ paddingLeft: 8 }}><span style={{ color: '#e06c75' }}>return</span> (</div>
            <div style={{ paddingLeft: 14 }}>&lt;<span style={{ color: '#e06c75' }}>header</span> className=<span style={{ color: '#98c379' }}>"saas-hero"</span>&gt;</div>
            <div style={{ paddingLeft: 20 }}>&lt;<span style={{ color: '#e06c75' }}>h1</span>&gt;Next-Gen Analytics&lt;/<span style={{ color: '#e06c75' }}>h1</span>&gt;</div>
            <div style={{ paddingLeft: 20 }}>&lt;<span style={{ color: '#e06c75' }}>button</span>&gt;Get Started&lt;/<span style={{ color: '#e06c75' }}>button</span>&gt;</div>
            <div style={{ paddingLeft: 14 }}>&lt;/<span style={{ color: '#e06c75' }}>header</span>&gt;</div>
            <div style={{ paddingLeft: 8 }}>)</div>
            <div>&#125;</div>
          </div>

          {/* Right: Rendered Live SaaS Preview Pane */}
          <div style={{ background: 'linear-gradient(135deg, #182026 0%, #101418 100%)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 5, padding: 12, display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ font: '600 10px/1 var(--f-body)', color: '#fff' }}>Analytics SaaS</span>
              <span style={{ font: '500 8px/1 var(--f-mono)', color: '#2da44e' }}>+34% Growth</span>
            </div>

            {/* Simulated Live Bar Chart */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 38 }}>
              <div style={{ background: 'var(--orange)', height: '45%', flex: 1, borderRadius: 2 }} />
              <div style={{ background: 'var(--orange)', height: '70%', flex: 1, borderRadius: 2 }} />
              <div style={{ background: 'var(--orange)', height: '55%', flex: 1, borderRadius: 2 }} />
              <div style={{ background: 'var(--orange)', height: '90%', flex: 1, borderRadius: 2 }} />
              <div style={{ background: 'var(--orange-2)', height: '100%', flex: 1, borderRadius: 2 }} />
            </div>

            <div style={{ background: 'var(--orange)', color: '#fff', font: '600 8.5px/1 var(--f-mono)', padding: '6px', textAlign: 'center', borderRadius: 3 }}>
              One-Click Deploy ↗
            </div>
          </div>
        </div>

        {/* Prompt Input Bar at bottom */}
        <div style={{ padding: '8px 14px', background: 'rgba(0,0,0,.5)', borderTop: '1px solid rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ font: '500 8px/1 var(--f-mono)', color: 'var(--orange)' }}>PROMPT:</span>
          <span style={{ font: '400 9px/1 var(--f-mono)', color: 'rgba(255,255,255,.7)', flex: 1 }}>"Add dark mode toggle and real-time revenue graph"</span>
          <span style={{ font: '500 8px/1 var(--f-mono)', color: '#fff', background: 'rgba(255,255,255,.1)', padding: '3px 6px', borderRadius: 2 }}>Hot-Reloaded</span>
        </div>
      </div>
    )
  }

  /* ── 3. AI Meal Planner & Nutrition Platform ── */
  if (type === 'meal-planner') {
    return (
      <div className="pv-card-frame" style={{ background: '#F8F6F2', minHeight: 330, color: '#151311' }}>
        {/* App Titlebar */}
        <div style={{ padding: '10px 16px', background: '#ECE7E0', borderBottom: '1px solid rgba(21,19,17,.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ font: '700 12px/1 var(--f-body)', color: '#151311' }}>🥗 NutriPlan AI</span>
          <span style={{ font: '500 9px/1 var(--f-mono)', color: 'var(--orange)' }}>TARGET: 2,150 KCAL</span>
        </div>

        <div className="pv-realistic-image">
          <img src={image} alt="" />
          <span>PERSONALIZED MEAL PLAN</span>
        </div>

        {/* Macro Progress Rings & Biometrics */}
        <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {/* Protein Card */}
            <div style={{ background: '#fff', border: '1px solid rgba(21,19,17,.08)', borderRadius: 6, padding: '8px 10px', textAlign: 'center' }}>
              <div style={{ font: '700 13px/1 var(--f-body)', color: '#2a7a4b' }}>145g / 95%</div>
              <div style={{ font: '500 8px/1 var(--f-mono)', color: '#666', marginTop: 3 }}>PROTEIN</div>
            </div>
            {/* Carbs Card */}
            <div style={{ background: '#fff', border: '1px solid rgba(21,19,17,.08)', borderRadius: 6, padding: '8px 10px', textAlign: 'center' }}>
              <div style={{ font: '700 13px/1 var(--f-body)', color: '#8a5a00' }}>210g / 88%</div>
              <div style={{ font: '500 8px/1 var(--f-mono)', color: '#666', marginTop: 3 }}>CARBS</div>
            </div>
            {/* Fats Card */}
            <div style={{ background: '#fff', border: '1px solid rgba(21,19,17,.08)', borderRadius: 6, padding: '8px 10px', textAlign: 'center' }}>
              <div style={{ font: '700 13px/1 var(--f-body)', color: '#7a2a00' }}>65g / 90%</div>
              <div style={{ font: '500 8px/1 var(--f-mono)', color: '#666', marginTop: 3 }}>HEALTHY FATS</div>
            </div>
          </div>

          {/* Daily Meal Schedule Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ background: '#fff', border: '1px solid rgba(21,19,17,.08)', borderRadius: 6, padding: '9px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ font: '600 8.5px/1 var(--f-mono)', color: 'var(--orange)' }}>BREAKFAST · 480 KCAL</span>
                <div style={{ font: '600 11px/1.3 var(--f-body)', color: '#151311', marginTop: 2 }}>Avocado &amp; Poached Egg Protein Toast</div>
              </div>
              <span style={{ font: '500 9px/1 var(--f-mono)', color: '#2a7a4b' }}>P: 28g</span>
            </div>

            <div style={{ background: '#fff', border: '1px solid rgba(21,19,17,.08)', borderRadius: 6, padding: '9px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ font: '600 8.5px/1 var(--f-mono)', color: 'var(--orange)' }}>DINNER · 680 KCAL</span>
                <div style={{ font: '600 11px/1.3 var(--f-body)', color: '#151311', marginTop: 2 }}>Pan-Seared Salmon Bowl with Quinoa</div>
              </div>
              <span style={{ font: '500 9px/1 var(--f-mono)', color: '#2a7a4b' }}>P: 46g</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  /* ── 4. Collaborative Video Publishing Platform ── */
  return (
    <div className="pv-card-frame" style={{ background: '#121016', minHeight: 330 }}>
      {/* Studio Header */}
      <div className="pv-titlebar" style={{ background: 'rgba(255,255,255,.05)' }}>
        <div style={{ display: 'flex', gap: 5 }}>
          <span className="pv-dot pv-dot-r" />
          <span className="pv-dot pv-dot-y" />
          <span className="pv-dot pv-dot-g" />
        </div>
        <span className="pv-titlebar-text">youtube-creator-studio // delegated-upload-vault</span>
        <span style={{ marginLeft: 'auto', font: '600 8px/1 var(--f-mono)', color: 'var(--orange)' }}>
          ZERO CREDENTIAL LEAKAGE
        </span>
      </div>

      {/* Video Viewport & Timeline */}
      <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        {/* Video Screen */}
        <div style={{ background: '#000', borderRadius: 6, height: 110, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={image}
            alt=""
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }}
          />
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(232,66,10,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, zIndex: 2, cursor: 'pointer' }}>
            ▶
          </div>
          <div style={{ position: 'absolute', bottom: 6, left: 10, right: 10, display: 'flex', justifyContent: 'space-between', zIndex: 2, font: '400 8.5px/1 var(--f-mono)', color: '#fff' }}>
            <span>08:42 / 16:30 · 4K 60FPS</span>
            <span>EDITOR: ALEX_VFX</span>
          </div>
        </div>

        {/* Resumable Chunked Upload Progress Bar */}
        <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 5, padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', font: '500 8.5px/1 var(--f-mono)', color: 'rgba(255,255,255,.8)' }}>
            <span>YouTube Data API v3 Chunked Upload</span>
            <span style={{ color: 'var(--orange)' }}>7.2 GB / 10 GB (72%)</span>
          </div>
          <div style={{ height: 4, background: 'rgba(255,255,255,.1)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ width: '72%', height: '100%', background: 'var(--orange)', borderRadius: 2 }} />
          </div>
        </div>

        {/* Creator Approval Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(45,164,78,.1)', border: '1px solid rgba(45,164,78,.25)', borderRadius: 5, padding: '8px 12px' }}>
          <span style={{ font: '500 9px/1 var(--f-mono)', color: '#2da44e' }}>
            ✓ Verified Scoped Token · Creator One-Click Publish
          </span>
          <span style={{ font: '600 8.5px/1 var(--f-mono)', color: '#fff', background: '#2da44e', padding: '3px 8px', borderRadius: 3 }}>
            Ready to Stage
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProjectVisual
