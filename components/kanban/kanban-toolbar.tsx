'use client'

import { PlusCircle, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CreateTaskModal } from "@/app/(dashboard)/projects/[projectId]/_components/create-task-modal";
import { useState } from "react";
import { AppProject } from "@/types/projects";

interface Props {
  project: AppProject;
}

export default function KanbanToolbar({ project }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="Search tasks..." className="pl-8 w-[200px] md:w-[300px]" />
      </div>
      <Button onClick={() => setOpen(true)}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Task
      </Button>
      <CreateTaskModal project={project} open={open} handleOpenChange={setOpen} />
    </div>
  )
}