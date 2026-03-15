import { Link } from 'react-router-dom'
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
        {PROJECTS.map((project) =>
          project.link ? (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-tile"
            >
              <TileInner project={project} />
            </a>
          ) : (
            <Link key={project.id} to={`/projects/${project.id}`} className="project-tile">
              <TileInner project={project} />
            </Link>
          )
        )}
      </section>
    </main>
  )
}
