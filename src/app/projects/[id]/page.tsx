// app/projects/[id]/page.tsx

interface Project {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  githubUrl?: string;
  demoUrl?: string;
}

type Props = {
  params: {
    id: string;
  };
};

export default async function ProjectDetailPage({ params }: Props) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/projects/${params.id}`, {
    cache: "no-store",
  });
  const project: Project = await res.json();

  if (!project) {
    return <div className="p-8">Project not found.</div>;
  }

  // Check if URLs are valid (not empty and not default placeholder)
  const hasGithubUrl = project.githubUrl && project.githubUrl !== "sinehan.dev";
  const hasDemoUrl = project.demoUrl && project.demoUrl !== "sinehan.dev";

  return (
    <section className="p-8">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <p className="mb-4">{project.description}</p>

      {/* Project Links */}
      <div className="flex flex-wrap gap-4 mb-4">
        {hasGithubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        ) : (
          <div className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-600 rounded-md cursor-not-allowed">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub Coming Soon
          </div>
        )}

        {hasDemoUrl ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Live Demo
          </a>
        ) : (
          <div className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-600 rounded-md cursor-not-allowed">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Demo Coming Soon
          </div>
        )}
      </div>

      {/* Debug information */}
      {/* <div className="mt-8 p-4 bg-gray-100 rounded-md">
        <h3 className="text-lg font-semibold mb-2">Debug Info:</h3>
        <p>GitHub URL: {project.githubUrl || "Not provided"}</p>
        <p>Demo URL: {project.demoUrl || "Not provided"}</p>
        <p>Has valid GitHub URL: {hasGithubUrl ? "Yes" : "No"}</p>
        <p>Has valid Demo URL: {hasDemoUrl ? "Yes" : "No"}</p>
      </div> */}

      <p className="text-sm text-gray-500 mt-4">
        Created at: {new Date(project.createdAt).toLocaleDateString()}
      </p>
    </section>
  );
}
