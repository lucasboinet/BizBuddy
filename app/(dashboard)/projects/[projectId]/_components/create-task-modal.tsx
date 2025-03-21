'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import CreateTaskForm from "./create-task-form"
import { AppProject } from "@/types/projects"

interface Props {
  project: AppProject;
  open: boolean;
  handleOpenChange: (value: boolean) => void;
}

export function CreateTaskModal({ project, open, handleOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[50%]">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription>
            Start creating a new task. Click create when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 overflow-auto">
          <CreateTaskForm project={project} handleSubmit={() => handleOpenChange(false)} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
