"use client"

import { useState } from "react"
import { Calendar, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AppProject, PROJECT_STATUS } from "@/types/projects"
import { format } from "date-fns"
import ProjectTabOverview from "./project-tab-overview"
import ProjectTabFiles from "./project-tab-files"
import ProjectTabFinancials from "./project-tab-financials"
import ProjectTabActivities from "./project-tab-activities"
import ProjectTabTasks from "./project-tab-tasks"
import { AppActivity } from "@/types/activities"

interface Props {
  project: AppProject,
}

export default function ProjectPageDetails({ project }: Props) {
  const [activeTab, setActiveTab] = useState("overview")

  const files: any[] = []

  const activities: AppActivity[] = [
    {
      id: '1',
      type: "task_completed",
      label: "Wireframe Design completed",
      createdAt: new Date(),
      projectId: project.id,
      project,
    },
    {
      id: '2',
      type: "invoice_paid",
      label: "Invoice INV-2023-001 paid by Acme Corporation",
      createdAt: new Date(),
      projectId: project.id,
      project,
    },
    {
      id: '3',
      type: "file_uploaded",
      label: "Brand Guidelines.pdf uploaded",
      createdAt: new Date(),
      projectId: project.id,
      project,
    },
    {
      id: '4',
      type: "task_started",
      label: "Frontend Development started",
      createdAt: new Date(),
      projectId: project.id,
      project,
    },
    {
      id: '5',
      type: "task_started",
      label: "Content Migration started",
      createdAt: new Date(),
      projectId: project.id,
      project,
    },
  ]

  return (
    <div className="flex flex-col">
      <main className="flex-1">
        <div className="px-4">
          {/* Project Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="px-3 py-1 text-sm font-normal">
                  {project.id}
                </Badge>
                <Badge variant={project.status === PROJECT_STATUS.COMPLETED ? "default" : "secondary"} className="px-3 py-1">
                  {project.status}
                </Badge>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Button size="sm" className="hidden md:flex">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
                <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                  <span className="font-medium">{project.customer?.name}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Expected due at {format(project.dueAt, "dd/MM/yyyy")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Tabs className="space-y-6" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="financials">Financials</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <ProjectTabOverview
                project={project}
                activities={activities}
                files={files}
                setActiveTab={setActiveTab}
              />
            </TabsContent>

            <TabsContent value="tasks" className="space-y-4">
              <ProjectTabTasks project={project} />
            </TabsContent>

            <TabsContent value="financials" className="space-y-4">
              <ProjectTabFinancials project={project} />
            </TabsContent>

            <TabsContent value="files" className="space-y-4">
              <ProjectTabFiles files={files} />
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <ProjectTabActivities activities={activities} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

