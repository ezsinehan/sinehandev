import { useEffect, useRef, useState } from 'react'
import './Projects.css'
import placeholderImage from '../assets/project-placeholder.svg'

const PROJECTS = [
  { id: 'p1', title: 'project 01', summary: 'short description goes here' },
  { id: 'p2', title: 'project 02', summary: 'short description goes here' },
  { id: 'p3', title: 'project 03', summary: 'short description goes here' },
  { id: 'p4', title: 'project 04', summary: 'short description goes here' },
  { id: 'p5', title: 'project 05', summary: 'short description goes here' },
  { id: 'p6', title: 'project 06', summary: 'short description goes here' },
]

const VIEW_MODE_KEY = 'projects-view-mode'

export default function Projects() {
  const [viewMode, setViewMode] = useState(() => {
    const stored =
      typeof window !== 'undefined'
        ? window.localStorage.getItem(VIEW_MODE_KEY)
        : null
    return stored === 'grid' || stored === 'swipe' ? stored : 'swipe'
  })
  const [activeIndex, setActiveIndex] = useState(0)
  const touchStartYRef = useRef(null)
  const wheelLockRef = useRef(false)

  useEffect(() => {
    window.localStorage.setItem(VIEW_MODE_KEY, viewMode)
  }, [viewMode])

  const isSwipeView = viewMode === 'swipe'
  const activeProject = PROJECTS[activeIndex]

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % PROJECTS.length)
  }

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length)
  }

  const handleWheel = (event) => {
    if (viewMode !== 'swipe') return
    if (wheelLockRef.current) return
    if (Math.abs(event.deltaY) < 24) return

    wheelLockRef.current = true
    if (event.deltaY > 0) {
      goToNext()
    } else {
      goToPrev()
    }

    window.setTimeout(() => {
      wheelLockRef.current = false
    }, 280)
  }

  const handleTouchStart = (event) => {
    touchStartYRef.current = event.touches[0].clientY
  }

  const handleTouchEnd = (event) => {
    const startY = touchStartYRef.current
    if (startY == null) return
    const deltaY = event.changedTouches[0].clientY - startY
    touchStartYRef.current = null

    if (Math.abs(deltaY) < 44) return
    if (deltaY < 0) {
      goToNext()
    } else {
      goToPrev()
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      goToNext()
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      goToPrev()
    }
  }

  return (
    <main className={`projects-page projects-page--${viewMode}`} aria-label="Projects list">
      <div className="projects-toolbar">
        <button
          type="button"
          className="projects-view-toggle"
          onClick={() => setViewMode(isSwipeView ? 'grid' : 'swipe')}
          aria-pressed={!isSwipeView}
        >
          {isSwipeView ? 'switch to 2-column view' : 'switch to swipe view'}
        </button>
      </div>

      {isSwipeView ? (
        <section className="projects-swipe" aria-label="Swipe through projects">
          <article
            className="projects-swipe-card"
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <img
              src={placeholderImage}
              alt={`${activeProject.title} preview`}
              className="projects-swipe-card__image"
            />
            <div className="projects-swipe-card__overlay" aria-hidden="true" />
            <div className="projects-swipe-card__content">
              <h2 className="projects-swipe-card__title">{activeProject.title}</h2>
              <p className="projects-swipe-card__summary">{activeProject.summary}</p>
            </div>
          </article>

          <div className="projects-swipe-meta">
            <p className="projects-swipe-hint">swipe up/down to browse</p>
            <p className="projects-swipe-count">
              {activeIndex + 1} / {PROJECTS.length}
            </p>
          </div>

          <div className="projects-swipe-progress" aria-hidden="true">
            <span style={{ width: `${((activeIndex + 1) / PROJECTS.length) * 100}%` }} />
          </div>
        </section>
      ) : (
        <section className="projects-grid projects-grid--grid">
          {PROJECTS.map((project) => (
            <article key={project.id} className="project-tile">
              <img
                src={placeholderImage}
                alt={`${project.title} preview`}
                className="project-tile__image"
              />
              <div className="project-tile__overlay">
                <div className="project-tile__overlay-content">
                  <h2 className="project-tile__title">{project.title}</h2>
                  <p className="project-tile__summary">{project.summary}</p>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  )
}
