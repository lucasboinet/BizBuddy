"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  FileText,
  Grid,
  ImageIcon,
  List,
  MoreHorizontal,
  Music,
  PlusCircle,
  Search,
  Settings,
  Video,
} from "lucide-react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

// Task component with drag-and-drop functionality
function SortableTask({ task }: { task: any }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id.toString() })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-background border rounded-lg p-3 mb-2 cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start">
        <h3 className="font-medium">{task.name}</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit Task</DropdownMenuItem>
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete Task</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="text-sm text-muted-foreground mt-1">Due: {task.dueDate}</div>
    </div>
  )
}

// Column component for Kanban board
function TaskColumn({ title, tasks, status }: { title: string; tasks: any[]; status: string }) {
  return (
    <div className="flex flex-col bg-muted/40 rounded-lg p-3 min-h-[300px] w-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium">{title}</h3>
        <Badge variant="outline">{tasks.length}</Badge>
      </div>
      <SortableContext items={tasks.map((t) => t.id.toString())} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <SortableTask key={task.id} task={task} />
        ))}
      </SortableContext>
      <Button variant="ghost" className="mt-2 justify-start text-muted-foreground">
        <PlusCircle className="h-4 w-4 mr-2" />
        Add Task
      </Button>
    </div>
  )
}

// File card component with preview
function FileCard({ file }: { file: any }) {
  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-8 w-8 text-red-500" />
      case "docx":
        return <FileText className="h-8 w-8 text-blue-500" />
      case "sketch":
        return <ImageIcon className="h-8 w-8 text-amber-500" />
      case "jpg":
      case "png":
        return <ImageIcon className="h-8 w-8 text-green-500" />
      case "mp4":
        return <Video className="h-8 w-8 text-purple-500" />
      case "mp3":
        return <Music className="h-8 w-8 text-pink-500" />
      default:
        return <FileText className="h-8 w-8 text-gray-500" />
    }
  }

  return (
    <div className="group relative bg-background border rounded-lg overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-square flex items-center justify-center bg-muted/50 p-6">{getFileIcon(file.type)}</div>
      <div className="p-3">
        <h3 className="font-medium text-sm truncate">{file.name}</h3>
        <p className="text-xs text-muted-foreground">
          {file.size} • {file.date}
        </p>
      </div>
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
        <Button size="icon" variant="secondary" className="h-8 w-8">
          <Eye className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="secondary" className="h-8 w-8">
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default function ProjectDetailPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [viewMode, setViewMode] = useState("grid")

  // Mock data - in a real app, this would come from an API or database
  const project = {
    id: "PRJ-2023-001",
    name: "Website Redesign",
    client: "Acme Corporation",
    startDate: "Jan 15, 2023",
    dueDate: "Apr 30, 2023",
    status: "In Progress",
    progress: 65,
    description: "Complete redesign of the corporate website with new branding and improved user experience.",
  }

  // Task data organized by status
  const [tasks, setTasks] = useState({
    todo: [
      { id: 4, name: "User Testing", status: "todo", dueDate: "Apr 15, 2023" },
      { id: 5, name: "Launch Preparation", status: "todo", dueDate: "Apr 25, 2023" },
    ],
    inProgress: [
      { id: 2, name: "Frontend Development", status: "inProgress", dueDate: "Mar 15, 2023" },
      { id: 3, name: "Content Migration", status: "inProgress", dueDate: "Apr 01, 2023" },
    ],
    completed: [{ id: 1, name: "Wireframe Design", status: "completed", dueDate: "Jan 30, 2023" }],
  })

  const financials = [
    { id: "QT-2023-001", type: "quotation", amount: "$12,500", status: "approved", date: "Jan 10, 2023" },
    { id: "INV-2023-001", type: "invoice", amount: "$6,250", status: "paid", date: "Feb 15, 2023" },
    { id: "INV-2023-002", type: "invoice", amount: "$6,250", status: "pending", date: "Apr 01, 2023" },
  ]

  const files = [
    { id: 1, name: "Project Brief.pdf", type: "pdf", size: "2.4 MB", date: "Jan 12, 2023" },
    { id: 2, name: "Wireframes.sketch", type: "sketch", size: "8.7 MB", date: "Jan 28, 2023" },
    { id: 3, name: "Content Plan.docx", type: "docx", size: "1.2 MB", date: "Feb 10, 2023" },
    { id: 4, name: "Brand Guidelines.pdf", type: "pdf", size: "5.1 MB", date: "Feb 15, 2023" },
    { id: 5, name: "Homepage Mockup.jpg", type: "jpg", size: "3.2 MB", date: "Feb 20, 2023" },
    { id: 6, name: "Product Demo.mp4", type: "mp4", size: "24.8 MB", date: "Mar 05, 2023" },
    { id: 7, name: "Jingle.mp3", type: "mp3", size: "1.8 MB", date: "Mar 10, 2023" },
    { id: 8, name: "Logo Assets.png", type: "png", size: "4.5 MB", date: "Mar 15, 2023" },
  ]

  const activities = [
    { id: 1, type: "task_completed", description: "Wireframe Design completed", date: "Jan 30, 2023", time: "2:45 PM" },
    {
      id: 2,
      type: "invoice_paid",
      description: "Invoice INV-2023-001 paid by Acme Corporation",
      date: "Feb 15, 2023",
      time: "10:30 AM",
    },
    {
      id: 3,
      type: "file_uploaded",
      description: "Brand Guidelines.pdf uploaded",
      date: "Feb 15, 2023",
      time: "11:15 AM",
    },
    { id: 4, type: "task_started", description: "Frontend Development started", date: "Feb 20, 2023", time: "9:00 AM" },
    { id: 5, type: "task_started", description: "Content Migration started", date: "Mar 05, 2023", time: "1:30 PM" },
  ]

  // Setup sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  // Handle drag end for tasks
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    const activeId = active.id.toString()
    const overId = over.id.toString()

    if (activeId === overId) return

    // Find which column the task is in
    let sourceColumn: "todo" | "inProgress" | "completed" | null = null
    let taskToMove: any = null

    for (const [column, columnTasks] of Object.entries(tasks) as [keyof typeof tasks, any[]][]) {
      const taskIndex = columnTasks.findIndex((task) => task.id.toString() === activeId)
      if (taskIndex !== -1) {
        sourceColumn = column
        taskToMove = columnTasks[taskIndex]
        break
      }
    }

    if (!sourceColumn || !taskToMove) return

    // Find which column the task is being dropped into
    let targetColumn: "todo" | "inProgress" | "completed" | null = null

    for (const [column, columnTasks] of Object.entries(tasks) as [keyof typeof tasks, any[]][]) {
      const taskIndex = columnTasks.findIndex((task) => task.id.toString() === overId)
      if (taskIndex !== -1) {
        targetColumn = column
        break
      }
    }

    // If dropping onto another task in the same column, reorder
    if (sourceColumn === targetColumn) {
      const sourceIndex = tasks[sourceColumn].findIndex((task: any) => task.id.toString() === activeId)
      const targetIndex = tasks[sourceColumn].findIndex((task: any) => task.id.toString() === overId)

      setTasks({
        ...tasks,
        [sourceColumn]: arrayMove(tasks[sourceColumn], sourceIndex, targetIndex),
      })
    }
    // If dropping onto a task in a different column, move to that column
    else if (targetColumn) {
      const sourceIndex = tasks[sourceColumn].findIndex((task: any) => task.id.toString() === activeId)
      const targetIndex = tasks[targetColumn].findIndex((task: any) => task.id.toString() === overId)

      const newSourceTasks = [...tasks[sourceColumn]]
      newSourceTasks.splice(sourceIndex, 1)

      const newTargetTasks = [...tasks[targetColumn]]
      // Update the task status to match the new column
      taskToMove.status = targetColumn
      newTargetTasks.splice(targetIndex, 0, taskToMove)

      setTasks({
        ...tasks,
        [sourceColumn]: newSourceTasks,
        [targetColumn]: newTargetTasks,
      })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 py-6">
        <div className="container px-4">
          {/* Project Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Link href="/projects">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Back to projects</span>
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="px-3 py-1 text-sm font-normal">
                  {project.id}
                </Badge>
                <Badge variant={project.status === "Completed" ? "default" : "secondary"} className="px-3 py-1">
                  {project.status}
                </Badge>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Button variant="outline" size="sm" className="hidden md:flex">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <Button size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Task
                </Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
                <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                  <span className="font-medium">{project.client}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {project.startDate} - {project.dueDate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-sm text-muted-foreground">Progress</div>
                <div className="w-48 flex items-center gap-3">
                  <Progress value={project.progress} className="h-2 flex-1" />
                  <span className="font-medium text-sm">{project.progress}%</span>
                </div>
              </div>
            </div>

            <Separator />
          </div>

          <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="financials">Financials</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Project Summary Card */}
                <Card className="md:col-span-2 lg:col-span-2 overflow-hidden">
                  <CardHeader className="pb-0">
                    <CardTitle>Project Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="flex-1">
                        <div className="space-y-1 mb-4">
                          <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                          <p className="text-sm">{project.description}</p>
                        </div>

                        <div className="space-y-1">
                          <h3 className="text-sm font-medium text-muted-foreground">Timeline</h3>
                          <div className="relative pt-2">
                            <div className="absolute left-0 right-0 h-1 bg-muted rounded-full">
                              <div
                                className="absolute h-1 bg-primary rounded-full"
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                            <div className="flex justify-between mt-2 text-xs">
                              <div>
                                <p className="font-medium">{project.startDate}</p>
                                <p className="text-muted-foreground">Start Date</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{project.dueDate}</p>
                                <p className="text-muted-foreground">Due Date</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full md:w-[180px]">
                        <div className="relative h-[180px] w-[180px] mx-auto">
                          <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="none"
                              stroke="hsl(var(--primary))"
                              strokeWidth="10"
                              strokeDasharray={`${(2 * Math.PI * 40 * project.progress) / 100} ${(2 * Math.PI * 40 * (100 - project.progress)) / 100}`}
                              strokeDashoffset={(2 * Math.PI * 40 * 25) / 100}
                              transform="rotate(-90 50 50)"
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold">{project.progress}%</span>
                            <span className="text-sm text-muted-foreground">Completed</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Project Status Card */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Project Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {Math.floor(
                            (new Date(project.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                          )}{" "}
                          days left
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Tasks</span>
                          <span className="font-medium">
                            {tasks.completed.length}/
                            {tasks.todo.length + tasks.inProgress.length + tasks.completed.length}
                          </span>
                        </div>
                        <Progress
                          value={
                            (tasks.completed.length /
                              (tasks.todo.length + tasks.inProgress.length + tasks.completed.length)) *
                            100
                          }
                          className="h-2"
                        />
                      </div>

                      <div className="pt-2 space-y-2">
                        <h3 className="text-sm font-medium">Task Breakdown</h3>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="bg-muted/40 rounded-lg p-2">
                            <div className="text-lg font-medium">{tasks.todo.length}</div>
                            <div className="text-xs text-muted-foreground">To Do</div>
                          </div>
                          <div className="bg-muted/40 rounded-lg p-2">
                            <div className="text-lg font-medium">{tasks.inProgress.length}</div>
                            <div className="text-xs text-muted-foreground">In Progress</div>
                          </div>
                          <div className="bg-muted/40 rounded-lg p-2">
                            <div className="text-lg font-medium">{tasks.completed.length}</div>
                            <div className="text-xs text-muted-foreground">Completed</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Financial Summary */}
                <Card className="md:col-span-1">
                  <CardHeader className="pb-2">
                    <CardTitle>Financial Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Total Budget</span>
                        <span className="font-medium">$12,500</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Invoiced</span>
                        <span className="font-medium">$12,500</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Paid</span>
                        <span className="font-medium">$6,250</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Outstanding</span>
                        <span className="font-medium">$6,250</span>
                      </div>

                      <div className="pt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Payment Progress</span>
                          <span>50%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "50%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Files */}
                <Card className="md:col-span-1">
                  <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                    <CardTitle>Recent Files</CardTitle>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="#" onClick={() => setActiveTab("files")}>
                        View all
                      </Link>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {files.slice(0, 4).map((file) => (
                        <div key={file.id} className="flex items-center gap-3 group">
                          {file.type === "pdf" && <FileText className="h-5 w-5 text-red-500" />}
                          {file.type === "docx" && <FileText className="h-5 w-5 text-blue-500" />}
                          {file.type === "sketch" && <ImageIcon className="h-5 w-5 text-amber-500" />}
                          {file.type === "jpg" && <ImageIcon className="h-5 w-5 text-green-500" />}
                          {file.type === "png" && <ImageIcon className="h-5 w-5 text-green-500" />}
                          {file.type === "mp4" && <Video className="h-5 w-5 text-purple-500" />}
                          {file.type === "mp3" && <Music className="h-5 w-5 text-pink-500" />}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{file.date}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="md:col-span-2 lg:col-span-1">
                  <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                    <CardTitle>Recent Activity</CardTitle>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="#" onClick={() => setActiveTab("activity")}>
                        View all
                      </Link>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activities.slice(0, 4).map((activity, index) => (
                        <div key={activity.id} className="flex gap-3 relative">
                          {index !== 0 && (
                            <div className="absolute top-0 left-[11px] h-full w-px bg-border -translate-y-4"></div>
                          )}
                          <div
                            className={`rounded-full p-1.5 ${activity.type === "task_completed"
                                ? "bg-green-100 text-green-600"
                                : activity.type === "invoice_paid"
                                  ? "bg-blue-100 text-blue-600"
                                  : activity.type === "file_uploaded"
                                    ? "bg-amber-100 text-amber-600"
                                    : "bg-gray-100 text-gray-600"
                              }`}
                          >
                            {activity.type === "task_completed" && <CheckCircle2 className="h-4 w-4" />}
                            {activity.type === "invoice_paid" && <FileText className="h-4 w-4" />}
                            {activity.type === "file_uploaded" && <FileText className="h-4 w-4" />}
                            {activity.type === "task_started" && <Clock className="h-4 w-4" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">{activity.description}</p>
                            <p className="text-xs text-muted-foreground">
                              {activity.date} at {activity.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="tasks" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle>Kanban Board</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input type="search" placeholder="Search tasks..." className="pl-8 w-[200px] md:w-[300px]" />
                    </div>
                    <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Task
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <TaskColumn title="To Do" tasks={tasks.todo} status="todo" />
                      </div>
                      <div>
                        <TaskColumn title="In Progress" tasks={tasks.inProgress} status="inProgress" />
                      </div>
                      <div>
                        <TaskColumn title="Completed" tasks={tasks.completed} status="completed" />
                      </div>
                    </div>
                  </DndContext>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="financials" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle>Quotations & Invoices</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      New Quotation
                    </Button>
                    <Button>
                      <FileText className="mr-2 h-4 w-4" />
                      New Invoice
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {financials.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <FileText
                            className={`h-5 w-5 ${item.type === "quotation" ? "text-blue-500" : "text-green-500"}`}
                          />
                          <div>
                            <p className="font-medium">{item.id}</p>
                            <p className="text-sm text-muted-foreground capitalize">{item.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-sm">
                            <p className="font-medium">{item.amount}</p>
                            <p className="text-sm text-muted-foreground">{item.date}</p>
                          </div>
                          <Badge
                            variant={
                              item.status === "paid" ? "default" : item.status === "approved" ? "secondary" : "outline"
                            }
                          >
                            {item.status === "paid" ? "Paid" : item.status === "approved" ? "Approved" : "Pending"}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">More options</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Download PDF</DropdownMenuItem>
                              <DropdownMenuItem>Send to Client</DropdownMenuItem>
                              <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="files" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle>Project Files</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant={viewMode === "grid" ? "secondary" : "ghost"}
                        size="sm"
                        className="px-3 rounded-r-none"
                        onClick={() => setViewMode("grid")}
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "secondary" : "ghost"}
                        size="sm"
                        className="px-3 rounded-l-none"
                        onClick={() => setViewMode("list")}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Upload File
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {viewMode === "grid" ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {files.map((file) => (
                        <FileCard key={file.id} file={file} />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {files.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/20 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {file.type === "pdf" && <FileText className="h-5 w-5 text-red-500" />}
                            {file.type === "docx" && <FileText className="h-5 w-5 text-blue-500" />}
                            {file.type === "sketch" && <ImageIcon className="h-5 w-5 text-amber-500" />}
                            {file.type === "jpg" && <ImageIcon className="h-5 w-5 text-green-500" />}
                            {file.type === "png" && <ImageIcon className="h-5 w-5 text-green-500" />}
                            {file.type === "mp4" && <Video className="h-5 w-5 text-purple-500" />}
                            {file.type === "mp3" && <Music className="h-5 w-5 text-pink-500" />}
                            <div>
                              <p className="font-medium">{file.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {file.size} • {file.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">Preview file</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download file</span>
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">More options</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Preview</DropdownMenuItem>
                                <DropdownMenuItem>Download</DropdownMenuItem>
                                <DropdownMenuItem>Share</DropdownMenuItem>
                                <DropdownMenuItem>Rename</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Project Activity</CardTitle>
                  <CardDescription>A chronological history of all project activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {activities.map((activity) => (
                      <div key={activity.id} className="flex gap-4">
                        <div className="relative mt-1">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          {activity.id !== activities[activities.length - 1].id && (
                            <div className="absolute top-2 bottom-0 left-1 -ml-px w-px bg-border" />
                          )}
                        </div>
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">{activity.description}</p>
                            <div className="text-xs text-muted-foreground whitespace-nowrap">
                              {activity.date} at {activity.time}
                            </div>
                          </div>
                          <div className="rounded-md bg-muted p-3 text-sm">
                            {activity.type === "task_completed" && (
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                <span>Task marked as completed</span>
                              </div>
                            )}
                            {activity.type === "invoice_paid" && (
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-green-500" />
                                <span>Payment received and recorded</span>
                              </div>
                            )}
                            {activity.type === "file_uploaded" && (
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-blue-500" />
                                <span>New file added to project</span>
                              </div>
                            )}
                            {activity.type === "task_started" && (
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-blue-500" />
                                <span>Task work has begun</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

