const capabilitiesData = [
  {
    id: 1,
    title: 'Frontend & UI Architecture',
    subtitle: 'Reactive Interfaces & Design Systems',
    desc: 'Crafting responsive, high-performance web applications with React.js, Next.js, and vanilla CSS architectures. Obsessed with accessibility, fluid micro-interactions, and 60fps renders.',
    tags: ['React.js', 'Next.js', 'TypeScript', 'CSS3 / Grid', 'State Management'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'AI & Autonomous Systems',
    subtitle: 'Agentic Workflows & RAG Pipelines',
    desc: 'Designing state-graph topologies with LangGraph, dense vector search across ChromaDB, dynamic prompt synthesis, and self-correcting evaluation loops for complex enterprise tasks.',
    tags: ['LangGraph', 'LangChain', 'Llama-3', 'RAG / Vector Stores', 'Pydantic'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Backend, APIs & Cloud',
    subtitle: 'Microservices & High-Throughput Engines',
    desc: 'Architecting resilient RESTful APIs with FastAPI and Node.js/Express, document & relational database modeling with MongoDB and SQL, containerized in Docker for seamless cloud scale.',
    tags: ['FastAPI', 'Node.js', 'Docker', 'MongoDB', 'OAuth2 / Security'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
  },
]

function Capabilities() {
  return (
    <section id="capabilities" className="capabilities-section bg-grid" aria-labelledby="caps-heading">
      <div className="container">
        {/* Section Badge Header matching Dribbble reference */}
        <div className="section-badge-header reveal">
          <div className="section-badge section-badge--light">
            <span className="section-badge__icon" aria-hidden="true">⚙️</span>
            <h2 id="caps-heading" className="section-badge__title">
              CAPABILITIES
            </h2>
          </div>
          <p className="section-desc">
            Bridging technical depth across frontend engineering, agentic AI frameworks, and distributed cloud microservices into cohesive digital products.
          </p>
        </div>

        {/* 3 Device Frame Mockup Cards matching Dribbble reference */}
        <div className="device-cards-grid reveal reveal-delay-1">
          {capabilitiesData.map((item) => (
            <div key={item.id} className="device-card">
              {/* Realistic Device Frame */}
              <div className="device-frame">
                <img src={item.image} alt={item.title} loading="lazy" />
              </div>

              <h3 className="device-card__title">
                {item.id === 1 && <>Frontend <em>&amp; UI Architecture</em></>}
                {item.id === 2 && <>AI <em>&amp; Autonomous Systems</em></>}
                {item.id === 3 && <>Backend, <em>APIs &amp; Cloud</em></>}
              </h3>
              <p className="device-card__desc">{item.desc}</p>

              {/* Tags */}
              <div className="device-card__tags">
                {item.tags.map((tag) => (
                  <span key={tag} className="device-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Capabilities
