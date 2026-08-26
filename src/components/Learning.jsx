function Learning() {
  const certs = [
    { issuer: 'Google', title: 'Project Management Professional Certificate', platform: 'Coursera' },
    { issuer: 'Google', title: 'Generative AI & Large Language Models', platform: 'Google Cloud' },
    { issuer: 'NVIDIA', title: 'Fundamentals of Deep Learning', platform: 'NVIDIA Deep Learning Institute' },
    { issuer: 'Microsoft', title: 'Career Essentials in Software Development', platform: 'LinkedIn Learning' },
    { issuer: 'Cisco', title: 'Python Essentials', platform: 'Cisco Networking Academy' },
    { issuer: 'Oracle', title: 'AI Foundations Associate', platform: 'Oracle University' },
    { issuer: 'IBM', title: 'Data Fundamentals', platform: 'IBM SkillsBuild' },
    { issuer: 'AWS Academy', title: 'Cloud Foundations', platform: 'AWS' },
  ]

  return (
    <section className="ed-learning section" aria-labelledby="learning-heading">
      <div className="section__container">
        <div className="ed-section-num reveal-on-scroll">06</div>
        <div className="ed-learning__header reveal-on-scroll">
          <span className="ed-section-label">CERTIFICATIONS</span>
          <h2 id="learning-heading" className="ed-section-title">LEARNING</h2>
        </div>

        <div className="ed-learning__list reveal-on-scroll">
          {certs.map((cert, idx) => (
            <div key={idx} className="ed-learning-row">
              <span className="row-num">0{idx + 1}</span>
              <span className="row-issuer">{cert.issuer}</span>
              <span className="row-title">{cert.title}</span>
              <span className="row-platform">{cert.platform}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Learning
