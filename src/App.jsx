import { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import StatsSection from './components/StatsSection.jsx'
import WhatIBuild from './components/WhatIBuild.jsx'
import CaseStudySection from './components/CaseStudySection.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import ProjectModal from './components/ProjectModal.jsx'
import AISection from './components/AISection.jsx'
import SoftwareSection from './components/SoftwareSection.jsx'
import DataSection from './components/DataSection.jsx'
import ProductSection from './components/ProductSection.jsx'
import Skills from './components/Skills.jsx'
import TechStack from './components/TechStack.jsx'
import Certifications from './components/Certifications.jsx'
import Education from './components/Education.jsx'
import FAQSection from './components/FAQSection.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    const observerOptions = {
      threshold: 0.08,
      rootMargin: '0px 0px -50px 0px',
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
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <About />
        <StatsSection />
        <WhatIBuild />
        <CaseStudySection onProjectClick={setSelectedProject} />
        <Projects onProjectClick={setSelectedProject} />
        <Experience />
        <AISection />
        <SoftwareSection />
        <DataSection />
        <ProductSection />
        <Skills />
        <TechStack />
        <Certifications />
        <Education />
        <FAQSection />
        <Contact />
      </main>
      <Footer />
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  )
}

export default App
