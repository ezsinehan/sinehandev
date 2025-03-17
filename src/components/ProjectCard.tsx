import Image from "next/image";
import Link from "next/link";

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  githubUrl: string;
  demoUrl: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`} className="block group">
      <div className="h-full border border-gray-300 hover:border-gray-500 rounded-lg p-3 transition-all duration-300 hover:shadow-md bg-white bg-opacity-50 relative overflow-hidden">
        {/* Philosophy-styled decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-gray-200 to-transparent"></div>
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-gray-200 to-transparent"></div>
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent to-gray-200"></div>

        <div className="flex flex-col h-full">
          <div className="flex gap-3">
            <Image
              src={project.imageUrl}
              alt={`${project.title} image`}
              width={60}
              height={60}
              className="rounded-md shadow-sm object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                <h2 className="text-lg font-medium group-hover:text-gray-700 transition-colors">
                  {project.title}
                </h2>
                <p className="text-xs text-gray-500 sm:ml-2">
                  {new Date(project.createdAt).toLocaleDateString()}
                </p>
              </div>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {project.description}
              </p>
            </div>
          </div>

          <div className="mt-2 text-right">
            <span className="text-xs text-gray-500 italic group-hover:text-gray-700">
              View details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
