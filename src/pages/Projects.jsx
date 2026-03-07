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

export default function Projects() {
  return (
    <main className="projects-page" aria-label="Projects list">
      <section className="projects-grid">
        {PROJECTS.map((project) => (
          <article key={project.id} className="project-tile">
            <img
              src={placeholderImage}
              alt={`${project.title} preview`}
              className="project-tile__image"
            />
            <div className="project-tile__body">
              <h2 className="project-tile__title">{project.title}</h2>
              <p className="project-tile__summary">{project.summary}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
