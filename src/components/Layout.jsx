import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion as Motion } from 'motion/react'
import '../App.css'

const EMAIL = 'ezsinehan@gmail.com'

const SECTION_TITLES = {
  '/about': 'about',
  '/projects': 'projects',
  '/blog': 'blog',
  '/chat': 'chat',
}

export default function Layout({ children }) {
  const [showGrid, setShowGrid] = useState(false)
  const [showCopied, setShowCopied] = useState(false)
  const location = useLocation()

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL)
    setShowCopied(true)
    setTimeout(() => setShowCopied(false), 2000)
  }

  const [scrolled, setScrolled] = useState(false)
  const isHome = location.pathname === '/'
  
  const sectionTitle =
    SECTION_TITLES[location.pathname] ??
    (location.pathname.startsWith('/projects/') ? 'projects' : undefined) ??
    (location.pathname.startsWith('/blog/') ? 'blog' : undefined)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {showGrid && <div className="debug-grid" aria-hidden="true" />}
      <button
        className={`debug-grid-toggle${showGrid ? ' debug-grid-toggle--active' : ''}`}
        onClick={() => setShowGrid(g => !g)}
        aria-label={showGrid ? 'Hide alignment grid' : 'Show alignment grid'}
        title={showGrid ? 'hide grid' : 'show grid'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="portfolio-icon" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" fill="currentColor" />
          <rect x="6" y="6" width="5" height="5" fill="#fff" />
          <rect x="13" y="6" width="5" height="5" fill="#fff" />
          <rect x="6" y="13" width="5" height="5" fill="#fff" />
          <rect x="13" y="13" width="5" height="5" fill="#fff" />
        </svg>
      </button>

      <div className="nav-box">
        <AnimatePresence mode="wait">
          {isHome ? (
            <Motion.nav
              key="tabs"
              className="nav-tabs"
              aria-label="Main navigation"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <Link to="/about" className="nav-tab" id="nav-about">about</Link>
              <Link to="/projects" className="nav-tab" id="nav-projects">projects</Link>
              <Link to="/blog" className="nav-tab" id="nav-blog">blog</Link>
              <Link to="/chat" className="nav-tab" id="nav-chat">chat</Link>
            </Motion.nav>
          ) : (
            <Motion.div
              key="breadcrumb"
              className="section-breadcrumb"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: scrolled ? 0 : 1, y: scrolled ? -8 : 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <span className="section-breadcrumb__title">sinehan's {sectionTitle}</span>
            </Motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="portfolio-socials-box" id="social-bar">
        <nav className="portfolio-socials" aria-label="Social links">
          <a href="https://github.com/ezsinehan" target="_blank" rel="noopener noreferrer" aria-label="My GitHub" title="here's my github">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="portfolio-icon" aria-hidden="true">
              <g fill="currentColor">
                <polygon points="4,4 6.5,0 9,4"/>
                <polygon points="15,4 17.5,0 20,4"/>
                <rect x="4" y="4" width="16" height="16"/>
                <rect x="6" y="9" width="12" height="6" fill="#fff"/>
                <rect x="7" y="10" width="3" height="4"/>
                <rect x="14" y="10" width="3" height="4"/>
              </g>
            </svg>
          </a>
          <button type="button" className="portfolio-socials__copy" onClick={copyEmail} aria-label="Copy my email" title="copy my email">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="portfolio-icon" aria-hidden="true">
              <rect x="4" y="4" width="16" height="16" fill="currentColor"/>
              <polyline
                points="4,4 12,12 20,4"
                fill="none"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinejoin="miter"
                strokeLinecap="square"
              />
            </svg>
          </button>
          <a href="https://www.linkedin.com/in/sinehanezhilmuthu/" target="_blank" rel="noopener noreferrer" aria-label="My LinkedIn" title="here's my linkedin">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="portfolio-icon" aria-hidden="true">
              <rect x="4" y="4" width="16" height="16" fill="currentColor"/>
              <rect x="6.5" y="6.5" width="2" height="2" fill="#fff"/>
              <rect x="6.5" y="10" width="2" height="7" fill="#fff"/>
              <rect x="11" y="10" width="2" height="7" fill="#fff"/>
              <rect x="13" y="10" width="4" height="2" fill="#fff"/>
              <rect x="15" y="12" width="2" height="5" fill="#fff"/>
            </svg>
          </a>
          <a href="/ezhilmuthu_sinehan_resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="My resume" title="here's my resume">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="portfolio-icon" aria-hidden="true">
              <rect x="4" y="4" width="16" height="16" fill="currentColor"/>
              <rect x="6" y="6.75" width="12" height="1.5" fill="#fff"/>
              <rect x="6" y="9.75" width="12" height="1.5" fill="#fff"/>
              <rect x="6" y="12.75" width="12" height="1.5" fill="#fff"/>
              <rect x="6" y="15.75" width="7" height="1.5" fill="#fff"/>
            </svg>
          </a>
        </nav>
      </div>
      <AnimatePresence>
        {showCopied && (
          <Motion.p
            className="copy-toast"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            Email copied to clipboard
          </Motion.p>
        )}
      </AnimatePresence>

      {!isHome && (
        <Motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.5 }}
        >
          {location.pathname.startsWith('/projects/') ? (
            <Link to="/projects" className="home-button" aria-label="Back to projects">
              back
            </Link>
          ) : (
            <Link
              to="/"
              className={`home-button${location.pathname === '/projects' && scrolled ? ' home-button--frosted' : ''}`}
              aria-label="Back to home"
            >
              home
            </Link>
          )}
        </Motion.div>
      )}

      {children}
    </>
  )
}
