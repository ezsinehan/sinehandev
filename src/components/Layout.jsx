import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion as Motion } from 'motion/react'
import '../App.css'

const EMAIL = 'ezsinehan@gmail.com'

export default function Layout({ children }) {
  const [showGrid, setShowGrid] = useState(false)
  const [showCopied, setShowCopied] = useState(false)
  const location = useLocation()
  const isFun = location.pathname === '/fun'

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL)
    setShowCopied(true)
    setTimeout(() => setShowCopied(false), 2000)
  }

  return (
    <>
      <div className="not-enough-space" role="status" aria-live="polite">
        <p>not enough space</p>
        <p className="not-enough-space__hint">try a bigger screen</p>
      </div>
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
          <a href="https://substack.com/@sinehan" target="_blank" rel="noopener noreferrer" aria-label="My Substack" title="here's my substack">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="portfolio-icon" aria-hidden="true">
              <rect x="4" y="4" width="16" height="16" fill="currentColor"/>
              <rect x="7.1875" y="6.5" width="9.625" height="1.299" fill="#fff"/>
              <rect x="7.1875" y="8.978" width="9.625" height="1.299" fill="#fff"/>
              <polygon points="7.1875,11.455 7.1875,17.5 12,14.801 16.8125,17.5 16.8125,11.455" fill="#fff"/>
            </svg>
          </a>
          <a href="https://x.com/loveyoursez" target="_blank" rel="noopener noreferrer" aria-label="My X" title="here's my x">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="portfolio-icon" aria-hidden="true">
              <rect x="4" y="4" width="16" height="16" fill="currentColor"/>
              <polygon points="7.5,7 9.5,7 16.5,17 14.5,17" fill="#fff"/>
              <polygon points="14.5,7 16.5,7 9.5,17 7.5,17" fill="#fff"/>
            </svg>
          </a>
          {isFun && (
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="My Instagram" title="here's my instagram">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="portfolio-icon" aria-hidden="true">
                <rect x="4" y="4" width="16" height="16" fill="currentColor"/>
                <rect x="6.5" y="6.5" width="11" height="11" fill="#fff"/>
                <rect x="9" y="9" width="6" height="6" fill="currentColor"/>
                <rect x="14.5" y="7.5" width="1.5" height="1.5" fill="currentColor"/>
              </svg>
            </a>
          )}
          {isFun && (
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="My Threads" title="here's my threads">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="portfolio-icon" aria-hidden="true">
                <rect x="4" y="4" width="16" height="16" fill="currentColor"/>
                <rect x="6.5" y="6.5" width="11" height="1.5" fill="#fff"/>
                <rect x="6.5" y="6.5" width="1.5" height="11" fill="#fff"/>
                <rect x="16" y="6.5" width="1.5" height="8.5" fill="#fff"/>
                <rect x="6.5" y="16" width="9" height="1.5" fill="#fff"/>
                <rect x="9.5" y="9.5" width="5" height="5" fill="#fff"/>
                <rect x="11" y="11" width="2" height="2" fill="currentColor"/>
              </svg>
            </a>
          )}
          {isFun && (
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="My TikTok" title="here's my tiktok">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="portfolio-icon" aria-hidden="true">
                <rect x="4" y="4" width="16" height="16" fill="currentColor"/>
                <rect x="14" y="6" width="2.5" height="2.5" fill="#fff"/>
                <rect x="12" y="6" width="2" height="9" fill="#fff"/>
                <rect x="9" y="12" width="5" height="5" fill="#fff"/>
                <rect x="10.5" y="13.5" width="2" height="2" fill="currentColor"/>
              </svg>
            </a>
          )}
          <a href="https://www.youtube.com/@sinehanwillberich" target="_blank" rel="noopener noreferrer" aria-label="My YouTube" title="here's my youtube">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="portfolio-icon" aria-hidden="true">
              <rect x="4" y="4" width="16" height="16" fill="currentColor"/>
              <polygon points="10,8 10,16 16,12" fill="#fff"/>
            </svg>
          </a>
          {isFun && (
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="My Spotify" title="here's my spotify">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="portfolio-icon" aria-hidden="true">
                <rect x="4" y="4" width="16" height="16" fill="currentColor"/>
                <rect x="6.5" y="8" width="11" height="1.5" fill="#fff"/>
                <rect x="7.5" y="11.25" width="9" height="1.5" fill="#fff"/>
                <rect x="8.5" y="14.5" width="7" height="1.5" fill="#fff"/>
              </svg>
            </a>
          )}
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

      {children}
    </>
  )
}
