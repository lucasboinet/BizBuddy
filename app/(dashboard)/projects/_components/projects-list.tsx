'use client'

import { AppProject } from "@/types/projects";
import ProjectCard from "./project-card";
import Link from "next/link";

interface Props {
  projects: AppProject[]
}

export default function ProjectsList({ projects }: Props) {
  return (
    <div className="flex flex-col gap-4 w-full">
      {projects.map((project) => (
        <Link key={project.id} href={`/projects/${project.id}`}>
          <ProjectCard project={project} />
        </Link>
      ))}
    </div>
  )
}