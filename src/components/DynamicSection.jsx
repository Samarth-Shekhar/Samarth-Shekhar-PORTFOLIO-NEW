import SectionIcon from './SectionIcon.jsx'

export default function DynamicSection({ section }) {
  if (!section || section.status !== 'published') return null

  const blocks = section.content_blocks || []

  return (
    <section id={section.id} className="experience experience--light dynamic-section" aria-labelledby={`${section.id}-heading`}>
      <div className="container">
        {/* Section Badge Header matching portfolio theme */}
        <div className="section-badge-header reveal">
          <div className="section-badge section-badge--dark">
            <span className="section-badge__icon" aria-hidden="true">
              <SectionIcon type="default" />
            </span>
            <h2 id={`${section.id}-heading`} className="section-badge__title">
              {section.badge_title || section.title.toUpperCase()}
            </h2>
          </div>
          {section.description && (
            <p className="section-desc section-desc--dark">
              {section.description}
            </p>
          )}
        </div>

        {/* Content Blocks */}
        <div className="dynamic-blocks reveal reveal-delay-1" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {blocks.map((block, idx) => {
            if (block.type === 'text') {
              return (
                <div key={idx} className="dynamic-block dynamic-block--text" style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--ink)' }}>
                  {block.content ? (
                    <div style={{ whiteSpace: 'pre-line' }}>{block.content}</div>
                  ) : (
                    <p>{block.text}</p>
                  )}
                </div>
              )
            }

            if (block.type === 'image') {
              return (
                <figure key={idx} className="dynamic-block dynamic-block--image" style={{ margin: 0 }}>
                  <img
                    src={block.url}
                    alt={block.caption || 'Section visual'}
                    style={{ width: '100%', maxHeight: 480, objectFit: 'cover', borderRadius: 8, border: '1px solid var(--line-l)' }}
                  />
                  {block.caption && (
                    <figcaption style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 8, fontStyle: 'italic' }}>
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              )
            }

            if (block.type === 'stats') {
              const items = block.items || []
              return (
                <div key={idx} className="dynamic-block dynamic-block--stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
                  {items.map((item, sIdx) => (
                    <div key={sIdx} className="stat-card stat-card--cream" style={{ padding: '24px 20px' }}>
                      <div className="stat-card__num" style={{ fontSize: 32 }}>
                        {item.value}
                      </div>
                      <div className="stat-card__label" style={{ marginTop: 8 }}>{item.label}</div>
                      {item.sub && <div className="stat-card__sub">{item.sub}</div>}
                    </div>
                  ))}
                </div>
              )
            }

            if (block.type === 'cards') {
              const cards = block.items || []
              return (
                <div key={idx} className="dynamic-block dynamic-block--cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
                  {cards.map((card, cIdx) => (
                    <div
                      key={cIdx}
                      style={{
                        padding: 24,
                        background: '#fff',
                        border: '1px solid var(--line-l)',
                        borderRadius: 6,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        {card.badge && (
                          <span style={{ fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--orange)', fontFamily: 'var(--f-mono)' }}>
                            {card.badge}
                          </span>
                        )}
                        <h3 style={{ fontSize: 18, margin: '8px 0 10px', color: 'var(--ink)' }}>{card.title}</h3>
                        <p style={{ fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.6 }}>{card.description}</p>
                      </div>
                      {card.link && (
                        <div style={{ marginTop: 16 }}>
                          <a href={card.link} target="_blank" rel="noopener noreferrer" className="btn btn--ghost-dark" style={{ fontSize: 12, padding: '8px 16px' }}>
                            {card.linkLabel || 'Learn more ↗'}
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )
            }

            if (block.type === 'button') {
              return (
                <div key={idx} className="dynamic-block dynamic-block--button" style={{ textAlign: block.align || 'left' }}>
                  <a href={block.url} target={block.external ? '_blank' : undefined} rel={block.external ? 'noopener noreferrer' : undefined} className="btn btn--primary">
                    {block.label}
                  </a>
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </section>
  )
}
