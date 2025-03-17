'use client'

import { AppProject } from "@/types/projects"
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import ProjectStatus from "./project-status";
import { Separator } from "@/components/ui/separator";
import CircularProgressBar from "@/components/ui/circular-progress-bar";

interface Props {
  project: AppProject;
}

export default function ProjectCard({ project }: Props) {
  return (
    <div className="flex w-full flex-col gap-3 border rounded-md p-3 hover:shadow transition-shadow">
      <div className="flex flex-col gap-2">
        <h4 className="font-semibold">{project.name}</h4>
        <ProjectStatus status={project.status} />
      </div>

      <Separator />

      <div className="flex flex-row justify-between items-center gap-1 text-sm">
        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-200">
          <div className="flex items-center gap-1">
            <Calendar size={15} />
            {format(project.createdAt, 'dd.MM.yyy')}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <CircularProgressBar
              percentage={63}
              size={16}
              color="rgb(79 70 229)"
              backgroundColor="rgba(0, 0, 0, 0.1)"
            />
            <span>3/4</span>
          </div>
        </div>
      </div>
    </div>
  )
}