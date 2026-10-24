const articles = [
  {
    id: 1,
    tag: 'SYSTEMS ARCHITECTURE · 2025',
    title: 'Deconstructing Multi-Agent Graph Topologies',
    desc: 'Why monolithic prompts saturate context windows and fail in production. An analysis of LangGraph state machines, cyclic agent reflection, and localized memory hierarchies.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 2,
    tag: 'SECURITY & WEBSYSTEMS · 2024',
    title: 'Zero-Trust Token Delegation in Creator Workflows',
    desc: 'Eliminating credential sharing in the creator economy. How scoped Google OAuth2 ephemeral tokens and chunked resumable streams protect channel assets during video handoffs.',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1000&q=85',
  },
]

function Journal() {
  return (
    <section id="journal" className="journal-section" aria-labelledby="journal-heading">
      <div className="container">
        {/* Section Badge Header matching Dribbble reference */}
        <div className="section-badge-header reveal">
          <div className="section-badge section-badge--dark">
            <span className="section-badge__icon" aria-hidden="true">📓</span>
            <h2 id="journal-heading" className="section-badge__title">
              JOURNAL
            </h2>
          </div>
          <p className="section-desc section-desc--dark">
            Engineering thoughts, architectural post-mortems, and design patterns from building real-world AI and web software.
          </p>
        </div>

        {/* 2 Editorial Cards Grid matching Dribbble reference */}
        <div className="journal-grid reveal reveal-delay-1">
          {articles.map((item) => (
            <article key={item.id} className="journal-card">
              <div className="journal-card__img-wrap">
                <img
                  src={item.image}
                  alt={item.title}
                  className="journal-card__img"
                  loading="lazy"
                />
              </div>
              <div className="journal-card__body">
                <span className="journal-card__meta">{item.tag}</span>
                <h3 className="journal-card__title">
                  {item.id === 1 ? (
                    <>Deconstructing <em>Multi-Agent</em> GRAPH TOPOLOGIES</>
                  ) : (
                    <>Zero-Trust <em>Token Delegation</em> IN CREATOR WORKFLOWS</>
                  )}
                </h3>
                <p className="journal-card__desc">{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Journal
