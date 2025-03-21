'use client'

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AppProject } from "@/types/projects"
import { Settings2 } from "lucide-react";
import { CreateTaskModal } from "./create-task-modal";
import { useState } from "react";

interface Props {
  project: AppProject;
}

export default function ProjectDetailsActions({ project }: Props) {
  const [openCreateTaskModal, setOpenCreateTaskModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div>
      <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Settings2 />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                setOpenDropdown(false);
                setOpenCreateTaskModal(true);
              }}
              className="cursor-pointer"
            >
              Create task
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <CreateTaskModal
        project={project}
        open={openCreateTaskModal}
        handleOpenChange={setOpenCreateTaskModal}
      />
    </div>
  )
}