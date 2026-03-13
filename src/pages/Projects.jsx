import { Link } from 'react-router-dom'
import './Projects.css'
import placeholderImage from '../assets/project-placeholder.svg'
import { PROJECTS } from '../data/projects'

export default function Projects() {
  return (
    <main className="projects-page" aria-label="Projects list">
      <section className="projects-grid">
        {PROJECTS.map((project) => (
          <Link key={project.id} to={`/projects/${project.id}`} className="project-tile">
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
          </Link>
        ))}
      </section>
    </main>
  )
}
