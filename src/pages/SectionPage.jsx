import './SectionPage.css'

export default function SectionPage() {
  return (
    <main className="section-renovation" aria-labelledby="section-renovation-title">
      <div className="section-renovation__card">
        <div className="section-renovation__tape" aria-hidden="true" />
        <h1 id="section-renovation-title" className="section-renovation__status">UNDER RENOVATION</h1>
        <div className="section-renovation__tape" aria-hidden="true" />
      </div>
    </main>
  )
}
