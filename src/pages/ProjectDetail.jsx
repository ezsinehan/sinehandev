import { useEffect, useRef, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { motion as Motion } from 'motion/react'
import { PROJECTS } from '../data/projects'
import './About.css'

export default function ProjectDetail() {
  const { id } = useParams()
  const project = PROJECTS.find((p) => p.id === id)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const [activeId, setActiveId] = useState(project?.sections[0]?.id ?? '')
  const [isAutoScrolling, setIsAutoScrolling] = useState(false)
  const scrollTimerRef = useRef(null)

  useEffect(() => {
    if (!project) return
    const onScroll = () => {
      if (isAutoScrolling) return
      let closest = project.sections[0].id
      let closestDist = Infinity
      for (const { id: sId } of project.sections) {
        const el = document.getElementById(sId)
        if (!el) continue
        const dist = Math.abs(el.getBoundingClientRect().top - 200)
        if (dist < closestDist) {
          closestDist = dist
          closest = sId
        }
      }
      setActiveId(closest)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isAutoScrolling, project])

  useEffect(() => {
    return () => { if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current) }
  }, [])

  const scrollTo = (sId) => {
    const el = document.getElementById(sId)
    if (!el) return
    setActiveId(sId)
    setIsAutoScrolling(true)
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 200, behavior: 'smooth' })
    scrollTimerRef.current = setTimeout(() => {
      setIsAutoScrolling(false)
      scrollTimerRef.current = null
    }, 800)
  }

  if (!project) return <Navigate to="/projects" replace />

  return (
    <div className="about-layout">
      <nav className="about-toc" aria-label="Project sections">
        {project.sections.map(({ id: sId, label }, i) => (
          <Motion.button
            key={sId}
            className={`about-toc__item${activeId === sId ? ' about-toc__item--active' : ''}`}
            onClick={() => scrollTo(sId)}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.5 + i * 0.12 }}
          >
            {label}
          </Motion.button>
        ))}
      </nav>

      <Motion.div
        className="about-page"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
      >
        <h1 className="about-heading">{project.title}</h1>

        {project.sections.map((section, i) => (
          <section
            key={section.id}
            id={section.id}
            className={i === 0 ? undefined : 'about-section'}
          >
            <h2 className="about-subheading">{section.label}</h2>
            {section.body && <p className="about-text">{section.body}</p>}
            {section.links && (
              <ul className="about-contact-list">
                {section.links.map(({ label, href }) => (
                  <li key={href}>
                    <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </Motion.div>
    </div>
  )
}
