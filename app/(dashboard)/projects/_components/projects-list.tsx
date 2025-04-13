'use client'

import { AppProject, PROJECT_STATUS, projectStatusLabels } from "@/types/projects";
import ProjectCard from "./project-card";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { Select } from "@/components/ui/select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger>
          <SelectValue placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All status</SelectItem>
          {Object.keys(projectStatusLabels).map((statusKey) => (
            <SelectItem
              key={statusKey}
              value={statusKey as string}>
              {projectStatusLabels[statusKey as PROJECT_STATUS]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for projects..."
      />
      <div className="flex flex-col gap-4 w-full">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}