'use client'

import { AppProject, PROJECT_STATUS } from "@/types/projects";
import ProjectCard from "./project-card";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  projects: AppProject[]
}

export default function ProjectsList({ projects }: Props) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const isSearchMatch = (!search || search === '') || project.name.toLowerCase().includes(search.toLowerCase())
      const isStatusMatch = status === 'all' || project.status === status;
      return isSearchMatch && isStatusMatch;
    });
  }, [search, projects, status])

  return (
    <div className="space-y-5">
      <Tabs value={status} onValueChange={setStatus}>
        <TabsList className="grid w-full grid-cols-4 text-sm">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value={PROJECT_STATUS.CREATED}>Created</TabsTrigger>
          <TabsTrigger value={PROJECT_STATUS.IN_PROGRESS}>In progress</TabsTrigger>
          <TabsTrigger value={PROJECT_STATUS.COMPLETED}>Completed</TabsTrigger>
        </TabsList>
      </Tabs>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for projects..."
      />
      <div className="flex flex-col gap-4 w-full">
        {filteredProjects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <ProjectCard project={project} />
          </Link>
        ))}
      </div>
    </div>
  )
}