import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles.css'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Stats from './components/Stats.jsx'
import CaseStudies from './components/CaseStudies.jsx'
import ExperienceEditorial from './components/ExperienceEditorial.jsx'
import ExtracurricularActivities from './components/ExtracurricularActivities.jsx'
import ToolsIUse from './components/ToolsIUse.jsx'
import EducationCerts from './components/EducationCerts.jsx'
import FAQSection from './components/FAQSection.jsx'
import ContactCTA from './components/ContactCTA.jsx'
import Footer from './components/Footer.jsx'
import { Suspense, lazy } from 'react'
import DynamicSection from './components/DynamicSection.jsx'
import { fetchPublicContent } from './utils/api.js'
import { initAnalytics } from './utils/analytics.js'

const AdminLogin = lazy(() => import('./admin/AdminLogin.jsx'))
const AdminDashboard = lazy(() => import('./admin/AdminDashboard.jsx'))

function PublicPortfolio() {
  const [data, setData] = useState(null)
  const [selectedProjectId, setSelectedProjectId] = useState(null)

  useEffect(() => {
    // 1. Initialize visitor tracking
    initAnalytics()

    // 2. Fetch published content from database
    fetchPublicContent()
      .then((content) => {
        if (content) {
          setData(content)
          if (content.settings?.siteTitle) {
            document.title = content.settings.siteTitle
          }
          if (content.settings?.metaDescription) {
            const meta = document.querySelector('meta[name="description"]')
            if (meta) meta.setAttribute('content', content.settings.metaDescription)
          }
        }
      })
      .catch((err) => {
        console.warn('Using embedded portfolio data:', err)
      })

    // 3. Reveal on scroll animations observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal,.reveal-left,.reveal-up').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleSelectProject = (projectId) => {
    setSelectedProjectId(projectId)
    // Smooth scroll down to the targeted project card
    setTimeout(() => {
      const targetElement = document.getElementById(`project-card-${projectId}`)
      if (targetElement) {
        const top = targetElement.getBoundingClientRect().top + window.scrollY - 80
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }, 50)
  }

  const settings = data?.settings || {}
  const projects = data?.projects
  const experiences = data?.experiences
  const extracurricular = data?.extracurricular
  const skills = data?.skills
  const education = data?.education
  const certifications = data?.certifications
  const faqs = data?.faqs
  const customSections = data?.customSections || []

  return (
    <div>
      <Navbar settings={settings} customSections={customSections} />
      <main>
        <Hero settings={settings} projects={projects} onSelectProject={handleSelectProject} />
        <Stats />
        <CaseStudies
          projects={projects}
          selectedProjectId={selectedProjectId}
          onSelectProject={setSelectedProjectId}
        />
        <ExperienceEditorial experiences={experiences} />
        <ExtracurricularActivities activities={extracurricular} />
        <EducationCerts education={education} certifications={certifications} />
        <ToolsIUse skills={skills} />
        <FAQSection faqs={faqs} />

        {/* Dynamic Sections created in Section Manager */}
        {customSections.map((section) => (
          <DynamicSection key={section.id} section={section} />
        ))}

        <ContactCTA settings={settings} />
      </main>
      <Footer settings={settings} />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ background: '#0d0f12', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b949e' }}>Loading...</div>}>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="*" element={<PublicPortfolio />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
