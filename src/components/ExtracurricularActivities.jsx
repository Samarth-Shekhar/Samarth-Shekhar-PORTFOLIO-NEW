import { useState, useMemo } from 'react'
import SectionIcon from './SectionIcon.jsx'
import { activities as defaultActivities } from '../data/extracurricular.js'

function ExtracurricularActivities({ activities: propActivities }) {
  const items = propActivities && propActivities.length > 0 ? propActivities : defaultActivities

  // Guarantee chronological ordering: latest on top, oldest at the bottom
  const sortedActivities = useMemo(() => {
    return [...items].sort((a, b) => {
      const endA = a.end_date || a.endDate || a.start_date || a.startDate || ''
      const endB = b.end_date || b.endDate || b.start_date || b.startDate || ''
      return endB.localeCompare(endA)
    })
  }, [items])

  const [openId, setOpenId] = useState(() => sortedActivities[0]?.id ?? 1)
  const toggle = (id) => setOpenId((previous) => (previous === id ? null : id))

  return (
    <section id="extracurricular" className="experience experience--light" aria-labelledby="extracurricular-heading">
      <div className="container">
        <div className="section-badge-header reveal">
          <div className="section-badge section-badge--dark">
            <span className="section-badge__icon" aria-hidden="true"><SectionIcon type="extracurricular" /></span>
            <h2 id="extracurricular-heading" className="section-badge__title">EXTRA-CURRICULAR ACTIVITIES</h2>
          </div>
          <p className="section-desc section-desc--dark">Community, outreach, and independent contributions alongside my professional experience.</p>
        </div>

        <div className="exp-list reveal reveal-delay-1" role="list">
          {sortedActivities.map((activity, index) => {
            const isOpen = openId === activity.id
            return (
              <div key={activity.id} className={`exp-item${isOpen ? ' open' : ''}`} role="listitem">
                <div
                  className="exp-item__trigger"
                  onClick={() => toggle(activity.id)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  aria-controls={`activity-body-${activity.id}`}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      toggle(activity.id)
                    }
                  }}
                >
                  <span className="exp-num">0{index + 1}</span>
                  <div className="exp-main">
                    <h3 className="exp-role">{activity.role}</h3>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                      <span className="exp-company">{activity.company}</span>
                      {activity.duration && <span className="exp-duration">· {activity.duration}</span>}
                    </div>
                  </div>
                  <span className="exp-toggle" aria-hidden="true">+</span>
                </div>

                <div id={`activity-body-${activity.id}`} className="exp-body" aria-hidden={!isOpen}>
                  <div className="exp-body__inner">
                    <ul className="exp-resp-list">
                      <li className="exp-resp"><span className="exp-resp-bullet" aria-hidden="true">→</span><span>{activity.description}</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ExtracurricularActivities
