import { useState } from 'react'
import SectionIcon from './SectionIcon.jsx'

const defaultFaqs = [
  { question: 'Are you available for full-time software engineering roles starting in 2026?', answer: 'Yes. I am actively interviewing for full-time Software Developer, AI Engineer, Full-Stack Engineer, and Product roles in Vaishali, Ghaziabad, remotely, or with relocation.' },
  { question: 'What is your primary technical expertise?', answer: 'I work across full-stack product engineering and agentic AI architecture, using React, Node.js, Python, LangGraph, RAG, FastAPI, Docker, and modern databases.' },
  { question: 'How does your industry experience inform your approach?', answer: 'My work across AI automation, React engineering, enterprise IT, and digital solutions has taught me to connect clear requirements with reliable implementation and business outcomes.' },
  { question: 'Can I inspect the source code or test live projects?', answer: 'Yes. My projects include GitHub repositories and live builds where available, including Folate and the AI Meal Planner.' },
  { question: 'How do you manage projects and requirements?', answer: 'I structure work through user stories, scope and priority discussions, iterative reviews, and clear technical documentation so teams can move confidently.' },
]

function FAQSection({ faqs: propFaqs }) {
  const [openIndex, setOpenIndex] = useState(0)
  const list = propFaqs && propFaqs.length > 0 ? propFaqs : defaultFaqs

  return (
    <section id="faq" className="faq-section faq-section--dark" aria-labelledby="faq-heading">
      <div className="container">
        <div className="section-badge-header reveal">
          <div className="section-badge section-badge--dark">
            <span className="section-badge__icon" aria-hidden="true"><SectionIcon type="faq" /></span>
            <h2 id="faq-heading" className="section-badge__title">FAQ</h2>
          </div>
          <p className="section-desc section-desc--dark">Direct answers on availability, technical focus, working style, and project delivery.</p>
        </div>

        <div className="faq-list reveal reveal-delay-1">
          {list.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div key={faq.question} className={`faq-item${isOpen ? ' open' : ''}`} data-index={`0${index + 1}`}>
                <button type="button" className="faq-trigger" onClick={() => setOpenIndex(isOpen ? -1 : index)} aria-expanded={isOpen} aria-controls={`faq-answer-${index}`}>
                  <span>{faq.question}</span>
                  <span className="faq-icon" aria-hidden="true">{isOpen ? 'Collapse ↑' : 'Expand ↓'}</span>
                </button>
                {isOpen && <div id={`faq-answer-${index}`} className="faq-content"><div className="faq-content-inner"><p>{faq.answer}</p></div></div>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
