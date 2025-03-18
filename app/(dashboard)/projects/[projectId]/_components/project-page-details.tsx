'use client'

import { AppProject } from "@/types/projects"
import ProjectStatus from "../../_components/project-status"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import ProjectTabInfos from "./project-tab-infos"
import KanbanBoard from "@/components/kanban/kanban-board"
import { Button } from "@/components/ui/button"
import { Loader2Icon } from "lucide-react"
import { CreateProjectKanbanBoard } from "@/actions/boards/CreateProjectKanbanBoard"
import { toast } from "sonner"

interface Props {
  project: AppProject,
}

export default function ProjectPageDetails({ project }: Props) {
  const [tab, setTab] = useState('tasks');
  const [isPending, setIsPending] = useState(false);

  const tabs = [
    { name: 'Infos', key: 'infos' },
    { name: 'Tasks', key: 'tasks', count: 3 },
  ]

  async function handleCreateBoard() {
    try {
      toast.loading("Creating project board...", { id: "create-project-board" })
      setIsPending(true);
      await CreateProjectKanbanBoard(project.id);
      setIsPending(false);
      toast.success("Project board created", { id: "create-project-board" })
    } catch {
      toast.error("Error when creating the board", { id: "create-project-board" })
    }
  }

  return (
    <div className="h-full space-y-6">
      <div className="flex gap-3 justify-start items-center">
        <span className="size-20 bg-secondary border rounded-md"></span>

        <div className="flex flex-col gap-2 justify-between items-start">
          <h1 className="text-3xl font-semibold">{project.name}</h1>
          <div className="flex items-center gap-2">
            <ProjectStatus status={project.status} />
            <span className="text-sm">{project.customer?.name}</span>
          </div>
        </div>
      </div>

      <Tabs
        value={tab}
        onValueChange={setTab}
        className="w-full h-full"
      >
        <TabsList className="w-full p-0 bg-background justify-start border-b rounded-none gap-1">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.key}
              value={tab.key}
              className="rounded-none bg-background h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              {tab.name}{" "}
              {!!tab.count && (
                <Badge
                  variant="secondary"
                  className="ml-2 px-1 py-0 text-xs rounded-full"
                >
                  {tab.count}
                </Badge>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="infos">
          <ProjectTabInfos project={project} />
        </TabsContent>
        <TabsContent value="tasks" className="h-full">
          {project.board && (
            <KanbanBoard board={project.board} />
          )}
          {!project.board && (
            <div className="flex justify-center items-center h-full">
              <Button
                type="button"
                className="mt-6"
                disabled={isPending}
                onClick={handleCreateBoard}
              >
                {!isPending && "Create tasks board"}
                {isPending && <Loader2Icon className='animate-spin' />}
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}