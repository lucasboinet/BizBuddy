'use client'

import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AppProject } from "@/types/projects"
import { Settings2, Archive } from "lucide-react";
import { CreateTaskModal } from "./create-task-modal";
import { useState } from "react";
import { archiveProject } from "@/actions/projects/ArchiveProject";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface Props {
  project: AppProject;
  archived?: boolean;
}

export default function ProjectDetailsActions({ project, archived }: Props) {
  const [openCreateTaskModal, setOpenCreateTaskModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isArchived, setIsArchived] = useState(archived || false);
  const { toast } = useToast();
  const router = useRouter();

  const handleArchive = async () => {
    if (isArchived) return;
    const archivedProject = await archiveProject(project.id);

    if (archivedProject) {
      setIsArchived(true);
      toast({
        title: "Success",
        description: "Project archived successfully.",
        type: "success",
      });
      router.push("/projects");
    } else {
      toast({
        title: "Error",
        description: "Failed to archive project.",
        type: "error",
      });
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {isArchived && <span className="text-gray-500">Archived</span>}
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

      <IconButton disabled={isArchived} onClick={handleArchive} variant="outline" size="icon">
        <Archive />
      </IconButton>
      <CreateTaskModal
        project={project}
        open={openCreateTaskModal}
        handleOpenChange={setOpenCreateTaskModal}
      />
    </div>
  )
}