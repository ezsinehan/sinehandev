import './Projects.css'

const PROJECT_TITLES = [
  'project 01',
  'project 02',
  'project 03',
  'project 04',
  'project 05',
  'project 06',
  'project 07',
  'project 08',
  'project 09',
  'project 10',
]

export default function Projects() {
  return (
    <main className="projects-page" aria-label="Projects list">
      <section className="projects-grid">
        {PROJECT_TITLES.map((title) => (
          <h2 key={title} className="projects-title-item">
            {title}
          </h2>
        ))}
      </section>
    </main>
  )
}
