'use client'

import { AppProject } from "@/types/projects"
import { Calendar, CheckCircle, ChevronRight, Clock, Archive } from "lucide-react";
import ProjectStatus from "./project-status";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArchiveProject } from "@/actions/projects/ArchiveProject";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

interface Props {
  project: AppProject;
  archived?: boolean;
  onArchive?: (projectId: string) => void;
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export default function ProjectCard({ project, archived, onArchive }: Props) {
  const [isArchived, setIsArchived] = useState(archived || false);

  const handleArchive = async () => {
    if (isArchived) return;
    try {
      await ArchiveProject(project.id);
      setIsArchived(true);
      toast.success("Project archived successfully.");

      if (onArchive) {
        onArchive(project.id);
      }
    } catch {
      toast.error("Failed to archive project.");
    }
  };

  return (
    <div
      key={project.id}
      className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow relative"
    >
      {isArchived && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 bg-opacity-75 rounded-lg">
          <span className="text-gray-500 font-semibold">Archived</span>
        </div>
      )}
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="mb-3">
            <Link href={`/projects/${project.id}`} className="hover:underline">
              <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
              {project.deletedAt?.toLocaleString()}
            </Link>
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
          <div className="mt-2 flex items-center text-sm text-gray-500">
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
        <div className="flex items-center space-x-2">
          <Button disabled={isArchived} onClick={handleArchive} variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
            <Archive className="w-5 h-5" />
          </Button>
          <ProjectStatus status={project.status} />
          <Link href={`/projects/${project.id}`}>
            <ChevronRight className="w-5 h-5 text-gray-400 mt-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}