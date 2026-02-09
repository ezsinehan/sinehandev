import { useState } from 'react'
import '../App.css'

const EMAIL = 'ezsinehan@gmail.com'

export default function Home() {
  const [showCopied, setShowCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL)
    setShowCopied(true)
    setTimeout(() => setShowCopied(false), 2000)
  }

  return (
    <>
      <div className="corner-links">
        <a
          href="https://legacy.sinehan.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="corner-link"
          aria-label="View my old portfolio"
        >
          here's my old portfolio
        </a>
        <a
          href="https://studybox.sinehan.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="corner-link"
          aria-label="View Studybox"
        >
          studybox if you were looking for that
        </a>
      </div>
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div className='portfolio-box'>
          <p className="portfolio-text">sinehan's portfolio is under renovation</p>
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
          {showCopied && (
            <p className="copy-toast" role="status" aria-live="polite">
              Email copied to clipboard
            </p>
          )}
        </div>
      </div>
    </>
  )
}
