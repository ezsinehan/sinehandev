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

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-4">
            <GitHubContributions />
          </div>

          {/* Projects Section */}
          <div className="lg:col-span-7">
            <ProjectsPage />
          </div>
        </div>
      </div>
    </div>
  );
}
