'use client'

import { AppProject } from "@/types/projects"
import { Calendar, CheckCircle, ChevronRight, Clock } from "lucide-react";
import ProjectStatus from "./project-status";
import { Badge } from "@/components/ui/badge";

interface Props {
  project: AppProject;
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export default function ProjectCard({ project }: Props) {
  return (
    <div key={project.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
          <p className="text-sm text-gray-600">Client: {project.customer?.name}</p>
          <div className="flex items-center gap-2 mt-1">
            {project.tags.map((projectTag) => (
              <Badge
                key={projectTag.tagId}
                variant="secondary"
                className={`bg-primary text-secondary hover:bg-primary/80 hover:text-secondary flex items-center gap-1 px-2 py-1`}
              >
                {projectTag.tag.name}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <ProjectStatus status={project.status} />
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm text-gray-500">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1 text-gray-400" />
          <span>Created: {formatDate(project.createdAt)}</span>
        </div>
        <div className="mx-3 text-gray-300">•</div>
        {project.completedAt ? (
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
            <span>Completed: {formatDate(project.completedAt)}</span>
          </div>
        ) : (
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1 text-blue-500" />
            <span>Due: {formatDate(project.dueAt)}</span>
          </div>
        )}
      </div>
    </div>
  )
}