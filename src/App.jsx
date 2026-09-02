import { useState, useEffect, useRef } from 'react'

import About from './components/About'
import Experience from './components/Experience'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Tools from './components/Tools'
import Contact from './components/Contact'

import cv from './cv.json'

const profile = cv;
console.log('data: ', profile);

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved) return saved
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    } catch {
      return 'dark'
    }
  })

  useEffect(() => {
    const html = document.documentElement
    if (theme === 'light') {
      html.setAttribute('data-theme', 'light')
    } else {
      html.removeAttribute('data-theme')
    }
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // ignore
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  // Active nav section tracking
  const [activeSection, setActiveSection] = useState('main')
  const sectionsRef = useRef({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.6 }
    )

    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
      />
      <Hero pi={profile.personal_info}/>
      <About me={profile.about_me}/>
      <Projects projects={profile.projects}/>
      <Experience experience={profile.experience} />
      <Tools skills ={profile.skills} theme={theme}/>
      <Contact contact={profile.personal_info.contact}/>
    </>
  )
}

export default App
