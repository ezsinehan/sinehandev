import { useEffect, useRef, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { motion as Motion } from 'motion/react'
import { PROJECTS } from '../data/projects'
import './About.css'

const SECTIONS = [
  { id: 'overview', label: 'overview' },
  { id: 'stack', label: 'stack' },
  { id: 'links', label: 'links' },
]

export default function ProjectDetail() {
  const { id } = useParams()
  const project = PROJECTS.find((p) => p.id === id)

  const [activeId, setActiveId] = useState('overview')
  const [isAutoScrolling, setIsAutoScrolling] = useState(false)
  const scrollTimerRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      if (isAutoScrolling) return
      let closest = SECTIONS[0].id
      let closestDist = Infinity
      for (const { id: sId } of SECTIONS) {
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
  }, [isAutoScrolling])

  useEffect(() => {
    return () => {
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
    }
  }, [])

  const scrollTo = (sId) => {
    const el = document.getElementById(sId)
    if (!el) return
    setActiveId(sId)
    setIsAutoScrolling(true)
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
    const top = el.getBoundingClientRect().top + window.scrollY - 200
    window.scrollTo({ top, behavior: 'smooth' })
    scrollTimerRef.current = setTimeout(() => {
      setIsAutoScrolling(false)
      scrollTimerRef.current = null
    }, 800)
  }

  if (!project) return <Navigate to="/projects" replace />

  return (
    <div className="about-layout">
      <nav className="about-toc" aria-label="Project sections">
        {SECTIONS.map(({ id: sId, label }, i) => (
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
        <section id="overview">
          <h1 className="about-heading">{project.title}</h1>
          <p className="about-text">{project.overview}</p>
        </section>

        <section id="stack" className="about-section">
          <h2 className="about-subheading">stack</h2>
          {project.stack.length > 0 ? (
            <ul className="about-list">
              {project.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="about-text">blah blah blah</p>
          )}
        </section>

        <section id="links" className="about-section">
          <h2 className="about-subheading">links</h2>
          {project.links.length > 0 ? (
            <ul className="about-contact-list">
              {project.links.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="about-text">blah blah blah</p>
          )}
        </section>
      </Motion.div>
    </div>
  )
}
