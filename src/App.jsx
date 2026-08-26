import { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import WhatIWorkAcross from './components/WhatIWorkAcross.jsx'
import SelectedWork from './components/SelectedWork.jsx'
import ExperienceEditorial from './components/ExperienceEditorial.jsx'
import ToolsIUse from './components/ToolsIUse.jsx'
import HowIThink from './components/HowIThink.jsx'
import Learning from './components/Learning.jsx'
import EducationEditorial from './components/EducationEditorial.jsx'
import FAQSection from './components/FAQSection.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import CaseStudyOverlay from './components/CaseStudyOverlay.jsx'

function App() {
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    const observerOptions = {
      threshold: 0.06,
      rootMargin: '0px 0px -40px 0px',
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll('.reveal-on-scroll')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedProject])

  return (
    <div className="app ed-theme">
      <Navbar />
      <main role="main">
        <Hero />
        <About />
        <WhatIWorkAcross />
        <SelectedWork onProjectClick={setSelectedProject} />
        <ExperienceEditorial />
        <ToolsIUse />
        <HowIThink />
        <Learning />
        <EducationEditorial />
        <FAQSection />
        <Contact />
      </main>
      <Footer />
      {selectedProject && (
        <CaseStudyOverlay
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  )
}

export default App
