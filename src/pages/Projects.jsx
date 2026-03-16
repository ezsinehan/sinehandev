import { Link } from 'react-router-dom'
import { motion as Motion } from 'motion/react'
import './Projects.css'
import { PROJECTS } from '../data/projects'

function TileInner({ project }) {
  return (
    <>
      <img
        src={project.image}
        alt={`${project.title} preview`}
        className="project-tile__image"
      />
      <div className="project-tile__overlay">
        <div className="project-tile__overlay-content">
          <h2 className="project-tile__title">{project.title}</h2>
        </div>
      </div>
    </>
  )
}

export default function Projects() {
  return (
    <main className="projects-page" aria-label="Projects list">
      <section className="projects-grid">
        {PROJECTS.map((project, i) =>
          project.link ? (
            <Motion.a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-tile"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <TileInner project={project} />
            </Motion.a>
          ) : (
            <Motion.div
              key={project.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link to={`/projects/${project.id}`} className="project-tile">
                <TileInner project={project} />
              </Link>
            </Motion.div>
          )
        )}
      </section>
    </main>
  )
}
