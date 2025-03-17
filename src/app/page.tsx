// app/page.tsx
import ProjectsPage from "./projects/page";
import Hero from "@/components/Hero";
import GitHubContributions from "@/components/GitHubContributions";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="mb-8">
        <Hero />
      </div>

      {/* GitHub Contributions Section */}
      <div className="mb-8 mx-auto max-w-7xl px-4">
        <GitHubContributions />
      </div>

      {/* Projects Section */}
      <ProjectsPage />
    </div>
  );
}
