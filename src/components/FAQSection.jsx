import { useState } from 'react'

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      question: "Are you available for immediate full-time or internship opportunities?",
      answer:
        "Yes! As a final-year B.Tech IT student graduating in 2026, I am actively seeking full-time roles, internship opportunities, and collaborative technical projects.",
    },
    {
      question: "What technical roles are you open for?",
      answer:
        "I am actively applying for roles across Software Development Engineer (SDE), SDE Intern, Full Stack Developer, Frontend Developer, AI Engineer, Generative AI Developer, Data & Python roles, and Product / Project Management.",
    },
    {
      question: "What is your hands-on experience in AI and Multi-Agent systems?",
      answer:
        "I have built multi-agent AI orchestration platforms using LangGraph, FastAPI, Python, RAG, Llama, and Pydantic. My experience includes designing Planner, Retriever, Executor, and Evaluator agents, managing shared context, and deploying containerized workflows.",
    },
    {
      question: "How do you combine Full-Stack development with Product thinking?",
      answer:
        "I approach software by first understanding the core user problem and requirement scope. From there, I structure backlog tasks (MoSCoW prioritization, User Stories) and build performant frontend interfaces in React.js/Next.js backed by robust REST APIs and database schemas.",
    },
    {
      question: "What was your responsibility across your 4 internships?",
      answer:
        "My internships include AI & Automation at Marksman Technologies, React.js development at Celebal Technologies, IT Operations & Data workflows at Airports Authority of India, and Software Development at Essentia — gaining experience in SDLC, API integration, debugging, and cross-functional coordination.",
    },
    {
      question: "What tech stack and tools do you work with daily?",
      answer:
        "Frontend: React.js, Next.js, JavaScript, HTML, CSS, Tailwind CSS. Backend & Database: Node.js, Express.js, FastAPI, REST APIs, MongoDB, Firebase, SQL. AI & Data: LangChain, LangGraph, Python, Pandas, NumPy, Prompt Engineering. PM & Tools: JIRA, Notion, Miro, Git, GitHub, Docker.",
    },
  ]

  return (
    <section className="faq-section section" aria-labelledby="faq-heading">
      <div className="section__container">
        <div className="section__header reveal-on-scroll">
          <div className="section__badge">
            <span className="section__badge-icon">❓</span>
            <span className="section__badge-text">FAQ</span>
          </div>
          <h2 id="faq-heading" className="section__title">FREQUENTLY ASKED</h2>
        </div>

        <p className="faq-section__subtitle reveal-on-scroll">
          Answers to the most common questions about my technical background, capabilities, and availability.
        </p>

        <div className="faq-section__list reveal-on-scroll">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <div className="faq-item__header">
                  <h3 className="faq-item__question">{faq.question}</h3>
                  <button
                    className={`faq-item__pill-btn ${isOpen ? 'faq-item__pill-btn--open' : ''}`}
                    aria-label={isOpen ? 'Collapse answer' : 'Expand answer'}
                  >
                    <span>{isOpen ? 'Collapse −' : 'Expand +'}</span>
                  </button>
                </div>
                {isOpen && (
                  <div className="faq-item__body">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
