import ProjectCard, { Project } from "@/components/ProjectCard";

export default async function ProjectsPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/projects`);
  const data = await res.json();

  return (
    <section>
      <h1 className="text-2xl font-bold mb-6">projects</h1>

      <div className="grid grid-cols-2 gap-4">
        {data.projects.map((project: Project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
