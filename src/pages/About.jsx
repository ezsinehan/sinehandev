import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import './About.css'

const SECTIONS = [
  { id: 'intro', label: 'intro' },
  { id: 'currently', label: 'currently' },
  { id: 'contact', label: 'contact' },
]

export default function About() {
  const [activeId, setActiveId] = useState('intro')
  const observerRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      if (clickingRef.current) return
      let closest = SECTIONS[0].id
      let closestDist = Infinity
      for (const { id } of SECTIONS) {
        const el = document.getElementById(id)
        if (!el) continue
        const dist = Math.abs(el.getBoundingClientRect().top - 200)
        if (dist < closestDist) {
          closestDist = dist
          closest = id
        }
      }
      setActiveId(closest)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const clickingRef = useRef(false)

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    setActiveId(id)
    clickingRef.current = true
    const top = el.getBoundingClientRect().top + window.scrollY - 200
    window.scrollTo({ top, behavior: 'smooth' })
    setTimeout(() => { clickingRef.current = false }, 800)
  }

  return (
    <div className="about-layout">
      <nav className="about-toc" aria-label="Page sections">
        {SECTIONS.map(({ id, label }, i) => (
          <motion.button
            key={label}
            className={`about-toc__item${activeId === id ? ' about-toc__item--active' : ''}`}
            onClick={() => scrollTo(id)}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.5 + i * 0.12 }}
          >
            {label}
          </motion.button>
        ))}
      </nav>

      <motion.div
        className="about-page"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
      >
        <section id="intro">
          <h1 className="about-heading">hey, i'm sinehan</h1>
          <p className="about-text">
            I'm a software engineer who enjoys building things for the web.
            I care about clean design, thoughtful user experiences, and writing
            code that's easy to reason about.
          </p>
          <p className="about-text">
            Currently exploring full-stack development, with a focus on React,
            Node.js, and whatever else catches my interest. I like working on
            projects that sit at the intersection of engineering and design.
          </p>
        </section>

        <section id="currently" className="about-section">
          <h2 className="about-subheading">currently</h2>
          <p className="about-text">
            Building out this portfolio, experimenting with RAG-powered chat,
            and looking for opportunities to work on meaningful products.
          </p>
        </section>

        <section id="contact" className="about-section">
          <h2 className="about-subheading">contact</h2>
          <p className="about-text">
            Interested in working together? Feel free to reach out:
          </p>
          <ul className="about-contact-list">
            <li>
              <a href="mailto:ezsinehan@gmail.com">ezsinehan@gmail.com</a>
            </li>
            <li>
              <a href="https://github.com/ezsinehan" target="_blank" rel="noopener noreferrer">
                github
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/sinehanezhilmuthu/" target="_blank" rel="noopener noreferrer">
                linkedin
              </a>
            </li>
          </ul>
        </section>
      </motion.div>
    </div>
  )
}
