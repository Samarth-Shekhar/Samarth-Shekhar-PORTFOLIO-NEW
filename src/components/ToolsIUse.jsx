import SectionIcon from './SectionIcon.jsx'

const defaultSkillGroups = [
  { name: 'Programming', items: ['Python', 'JavaScript (ES6+)', 'SQL', 'TypeScript basics'] },
  { name: 'Frontend', items: ['React.js', 'Next.js', 'HTML5 & CSS3', 'Tailwind CSS', 'Responsive UI'] },
  { name: 'Backend & APIs', items: ['Node.js', 'FastAPI', 'Express.js', 'RESTful API Architecture'] },
  { name: 'AI & GenAI', items: ['LangGraph', 'LangChain', 'RAG Pipelines', 'Llama-3', 'OpenAI API', 'Pydantic'] },
  { name: 'Databases & Storage', items: ['MongoDB', 'Firebase', 'SQL / PostgreSQL', 'Vector Stores'] },
  { name: 'DevOps & Tooling', items: ['Git & GitHub', 'Docker', 'Vite', 'Postman'] },
  { name: 'Product & Agile', items: ['Agile / Scrum', 'Sprint Planning', 'User Stories & Backlogs', 'SDLC'] },
  { name: 'Execution Mindset', items: ['Requirement Analysis', 'Architecture Design', 'Technical Documentation'] },
]

function ToolsIUse({ skills: propSkills }) {
  const groups = propSkills && propSkills.length > 0 ? propSkills : defaultSkillGroups

  return (
    <section id="skills" className="skills" aria-labelledby="skills-heading">
      <div className="container">
        <div className="section-badge-header reveal">
          <div className="section-badge section-badge--light">
            <span className="section-badge__icon" aria-hidden="true"><SectionIcon type="skills" /></span>
            <h2 id="skills-heading" className="section-badge__title">SKILLS</h2>
          </div>
          <p className="section-desc">The tools I use to turn product ideas into considered, reliable digital experiences.</p>
        </div>
        <div className="skills__grid reveal reveal-delay-1">
          {groups.map((group) => {
            const name = group.category || group.name
            const items = Array.isArray(group.items) ? group.items : []
            return (
              <div key={name} className="skill-group">
                <div className="skill-group__name">{name}</div>
                <ul className="skill-list">{items.map((item) => <li key={item} className="skill-item">{item}</li>)}</ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ToolsIUse
