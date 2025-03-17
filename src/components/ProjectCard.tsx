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
      <div className="h-full border border-gray-200 rounded-lg p-3 transition-all duration-300 hover:border-gray-300 hover:shadow-sm bg-white">
        <div className="flex gap-3">
          <Image
            src={project.imageUrl}
            alt={`${project.title} image`}
            width={48}
            height={48}
            className="rounded object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-medium truncate group-hover:text-gray-700 transition-colors">
              {project.title}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(project.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
