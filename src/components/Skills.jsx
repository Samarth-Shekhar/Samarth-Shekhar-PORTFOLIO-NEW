import { skillCategories } from '../data/skills.js'

function Skills() {
  return (
    <section id="skills" className="skills section" aria-labelledby="skills-heading">
      <div className="section__container">
        <div className="section__header reveal-on-scroll">
          <span className="section__number" aria-hidden="true">09</span>
          <h2 id="skills-heading" className="section__title">SKILLS</h2>
        </div>

        <div className="skills__grid">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className="skills__category reveal-on-scroll"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <h3 className="skills__category-title">{category.title}</h3>
              <div className="skills__tags">
                {category.skills.map((skill) => (
                  <span key={skill} className="skills__tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
