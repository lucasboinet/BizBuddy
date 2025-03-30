'use client'

import { EmptyState } from "@/components/empty-state";
import KanbanBoard from "@/components/kanban/kanban-board";
import { ClipboardList, PlusCircle } from "lucide-react";
import { CreateTaskModal } from "./create-task-modal";
import { AppProject } from "@/types/projects";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  project: AppProject;
}

export default function ProjectTabTasks({ project }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {project.board && (project.board.tasks?.length || 0) > 0 && <KanbanBoard project={project} />}
      {!project.board || (project.board.tasks?.length || 0) === 0 && (
        <>
          <CreateTaskModal project={project} open={open} handleOpenChange={setOpen} />
          <EmptyState
            icon={ClipboardList}
            title="No tasks yet"
            description="Start by adding tasks to organize your project workflow"
          >
            <Button onClick={() => setOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add first task
            </Button>
          </EmptyState>
        </>
      )}
    </>
  )
}