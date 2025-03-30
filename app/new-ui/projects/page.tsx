"use client"

import { useState } from "react"
import { format } from "date-fns"
import Link from "next/link"
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Clock,
  Download,
  Edit,
  FileText,
  GripVertical,
  LinkIcon,
  Mail,
  MessageSquare,
  MoreHorizontal,
  Phone,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample project data
const project = {
  id: "1",
  name: "E-commerce Website Redesign",
  description:
    "Complete redesign of client's e-commerce platform with focus on user experience, mobile responsiveness, and conversion optimization. The project includes new visual design, improved checkout flow, and integration with their inventory management system.",
  customer: {
    id: "1",
    name: "Tech Corp",
    contactPerson: "Sarah Johnson",
    email: "contact@techcorp.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  completion: 75,
  startDate: new Date("2024-01-15"),
  dueDate: new Date("2024-03-30"),
  status: "in-progress",
  priority: "high",
  budget: 12000,
  spent: 9000,
  team: [
    {
      id: "1",
      name: "You",
      role: "Project Manager",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Alex Chen",
      role: "UI Designer",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "Maria Garcia",
      role: "Frontend Developer",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ],
}

// Sample invoices data
const invoices = [
  {
    id: "INV-2024-001",
    type: "invoice",
    amount: 4500,
    status: "paid",
    issueDate: new Date("2024-01-15"),
    dueDate: new Date("2024-02-15"),
    paidDate: new Date("2024-02-10"),
    description: "Initial payment for website redesign",
  },
  {
    id: "INV-2024-002",
    type: "invoice",
    amount: 6000,
    status: "paid",
    issueDate: new Date("2024-02-15"),
    dueDate: new Date("2024-03-15"),
    paidDate: new Date("2024-03-10"),
    description: "Second milestone payment",
  },
  {
    id: "QUO-2024-001",
    type: "quotation",
    amount: 1500,
    status: "pending",
    issueDate: new Date("2024-03-01"),
    dueDate: new Date("2024-04-01"),
    paidDate: null,
    description: "Additional features quotation",
  },
]

// Sample files data
const files = [
  {
    id: "1",
    name: "wireframes.pdf",
    type: "pdf",
    size: "2.4 MB",
    uploadedBy: "Alex Chen",
    uploadedAt: new Date("2024-01-20"),
    category: "Design",
  },
  {
    id: "2",
    name: "homepage-design-v2.fig",
    type: "figma",
    size: "8.7 MB",
    uploadedBy: "Alex Chen",
    uploadedAt: new Date("2024-01-25"),
    category: "Design",
  },
  {
    id: "3",
    name: "tech-requirements.docx",
    type: "word",
    size: "1.2 MB",
    uploadedBy: "You",
    uploadedAt: new Date("2024-01-15"),
    category: "Documentation",
  },
  {
    id: "4",
    name: "project-timeline.xlsx",
    type: "excel",
    size: "0.8 MB",
    uploadedBy: "You",
    uploadedAt: new Date("2024-01-15"),
    category: "Planning",
  },
  {
    id: "5",
    name: "logo-assets.zip",
    type: "zip",
    size: "5.3 MB",
    uploadedBy: "Sarah Johnson",
    uploadedAt: new Date("2024-01-18"),
    category: "Assets",
  },
]

// Sample activity data
const activities = [
  {
    id: "1",
    type: "task_completed",
    description: "Completed homepage design",
    user: "Alex Chen",
    time: "2 hours ago",
    date: new Date("2024-03-15T14:30:00"),
    icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
  },
  {
    id: "2",
    type: "file_upload",
    description: "Uploaded wireframes.pdf",
    user: "Alex Chen",
    time: "Yesterday, 3:45 PM",
    date: new Date("2024-03-14T15:45:00"),
    icon: <Upload className="h-5 w-5 text-blue-500" />,
  },
  {
    id: "3",
    type: "comment",
    description: "Left a comment on 'Product Page Layout'",
    user: "Maria Garcia",
    time: "Yesterday, 11:30 AM",
    date: new Date("2024-03-14T11:30:00"),
    icon: <MessageSquare className="h-5 w-5 text-purple-500" />,
    comment:
      "I've implemented the product gallery with zoom functionality as requested. Please review when you have a chance.",
  },
  {
    id: "4",
    type: "deadline_approaching",
    description: "Milestone deadline approaching: 'Frontend Implementation'",
    user: "System",
    time: "Yesterday, 9:00 AM",
    date: new Date("2024-03-14T09:00:00"),
    icon: <AlertCircle className="h-5 w-5 text-yellow-500" />,
  },
  {
    id: "5",
    type: "task_created",
    description: "Created task 'Implement payment gateway'",
    user: "You",
    time: "2 days ago",
    date: new Date("2024-03-13T10:15:00"),
    icon: <Plus className="h-5 w-5 text-green-500" />,
  },
  {
    id: "6",
    type: "client_message",
    description: "Client sent a message",
    user: "Sarah Johnson (Tech Corp)",
    time: "3 days ago",
    date: new Date("2024-03-12T14:20:00"),
    icon: <Mail className="h-5 w-5 text-blue-500" />,
    comment:
      "The designs look great! I have a few minor suggestions for the checkout page that I'd like to discuss in our next meeting.",
  },
]

// Sample tasks data for Kanban board
const tasks = {
  "to-do": [
    {
      id: "task-1",
      title: "Implement payment gateway",
      description: "Integrate Stripe payment processing with order system",
      priority: "high",
      dueDate: new Date("2024-03-25"),
      assignee: "Maria Garcia",
      tags: ["backend", "feature"],
    },
    {
      id: "task-2",
      title: "Create admin dashboard",
      description: "Design and implement admin interface for managing products",
      priority: "medium",
      dueDate: new Date("2024-03-28"),
      assignee: "You",
      tags: ["frontend", "design"],
    },
  ],
  "in-progress": [
    {
      id: "task-3",
      title: "Product page redesign",
      description: "Implement new product page layout with gallery",
      priority: "high",
      dueDate: new Date("2024-03-20"),
      assignee: "Maria Garcia",
      tags: ["frontend", "design"],
    },
    {
      id: "task-4",
      title: "Mobile navigation",
      description: "Create responsive navigation menu for mobile devices",
      priority: "medium",
      dueDate: new Date("2024-03-18"),
      assignee: "Alex Chen",
      tags: ["frontend", "responsive"],
    },
    {
      id: "task-5",
      title: "User testing",
      description: "Conduct user testing sessions for checkout flow",
      priority: "medium",
      dueDate: new Date("2024-03-22"),
      assignee: "You",
      tags: ["testing", "ux"],
    },
  ],
  review: [
    {
      id: "task-6",
      title: "Homepage design",
      description: "Final review of homepage design before implementation",
      priority: "high",
      dueDate: new Date("2024-03-16"),
      assignee: "Alex Chen",
      tags: ["design", "review"],
    },
  ],
  completed: [
    {
      id: "task-7",
      title: "Wireframes",
      description: "Create wireframes for all main pages",
      priority: "high",
      dueDate: new Date("2024-01-25"),
      assignee: "Alex Chen",
      completedAt: new Date("2024-01-24"),
      tags: ["design", "planning"],
    },
    {
      id: "task-8",
      title: "Project setup",
      description: "Initialize repository and set up development environment",
      priority: "medium",
      dueDate: new Date("2024-01-20"),
      assignee: "Maria Garcia",
      completedAt: new Date("2024-01-18"),
      tags: ["setup", "development"],
    },
    {
      id: "task-9",
      title: "Requirements gathering",
      description: "Document all project requirements and specifications",
      priority: "high",
      dueDate: new Date("2024-01-18"),
      assignee: "You",
      completedAt: new Date("2024-01-15"),
      tags: ["planning", "documentation"],
    },
  ],
}

// Priority styling
const priorityStyles = {
  high: "bg-red-100 text-red-700",
  medium: "bg-orange-100 text-orange-700",
  low: "bg-blue-100 text-blue-700",
}

// Status badge styling
const statusStyles = {
  completed: "bg-green-100 text-green-700",
  "in-progress": "bg-blue-100 text-blue-700",
  "not-started": "bg-yellow-100 text-yellow-700",
}

// Invoice status badge styling
const invoiceStatusStyles = {
  paid: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  overdue: "bg-red-100 text-red-700",
  draft: "bg-gray-100 text-gray-700",
}

// File type icons
const fileTypeIcons = {
  pdf: <FileText className="h-8 w-8 text-red-500" />,
  figma: <FileText className="h-8 w-8 text-purple-500" />,
  word: <FileText className="h-8 w-8 text-blue-500" />,
  excel: <FileText className="h-8 w-8 text-green-500" />,
  zip: <FileText className="h-8 w-8 text-yellow-500" />,
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [newComment, setNewComment] = useState("")
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    assignee: "",
    column: "to-do",
  })
  const [showNewTaskForm, setShowNewTaskForm] = useState(false)

  // Calculate total invoiced amount
  const totalInvoiced = invoices.reduce((sum, invoice) => sum + invoice.amount, 0)

  // Calculate paid amount
  const paidAmount = invoices
    .filter((invoice) => invoice.status === "paid")
    .reduce((sum, invoice) => sum + invoice.amount, 0)

  // Calculate pending amount
  const pendingAmount = invoices
    .filter((invoice) => invoice.status === "pending")
    .reduce((sum, invoice) => sum + invoice.amount, 0)

  // Calculate remaining budget
  const remainingBudget = project.budget - project.spent

  // Calculate days left until deadline
  const daysLeft = Math.ceil((project.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  // Calculate total tasks and completed tasks
  const totalTasks = Object.values(tasks).flat().length
  const completedTasks = tasks.completed.length

  const handleAddComment = () => {
    if (newComment.trim()) {
      // In a real app, you would add the comment to the database
      alert("Comment added: " + newComment)
      setNewComment("")
    }
  }

  const handleAddTask = () => {
    if (newTask.title && newTask.dueDate && newTask.assignee) {
      // In a real app, you would add the task to the database
      alert("Task added: " + newTask.title)
      setNewTask({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
        assignee: "",
        column: "to-do",
      })
      setShowNewTaskForm(false)
    }
  }

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/projects">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Project Details</h1>
        <Badge className={statusStyles[project.status as keyof typeof statusStyles]}>
          {project.status === "completed"
            ? "Completed"
            : project.status === "in-progress"
              ? "In Progress"
              : "Not Started"}
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-10 bg-transparent p-0">
          <TabsTrigger
            value="overview"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-green-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="tasks"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-green-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Tasks
          </TabsTrigger>
          <TabsTrigger
            value="invoices"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-green-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Invoices
          </TabsTrigger>
          <TabsTrigger
            value="files"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-green-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Files
          </TabsTrigger>
          <TabsTrigger
            value="activity"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-green-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Activity
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="pt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <Card className="border-green-100">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">{project.name}</CardTitle>
                      <CardDescription>Project for {project.customer.name}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-green-200">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <CircleDollarSign className="mr-2 h-4 w-4" />
                            Create Invoice
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Message Client
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Project
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
                    <p className="text-sm">{project.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Timeline</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm font-medium">Start Date</div>
                            <div className="text-sm">{format(project.startDate, "MMMM d, yyyy")}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Due Date</div>
                            <div className="text-sm">{format(project.dueDate, "MMMM d, yyyy")}</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Budget</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm font-medium">Total Budget</div>
                            <div className="text-sm">${project.budget.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Spent</div>
                            <div className="text-sm">${project.spent.toLocaleString()}</div>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Budget Usage</span>
                            <span>{Math.round((project.spent / project.budget) * 100)}%</span>
                          </div>
                          <Progress value={(project.spent / project.budget) * 100} className="h-2 mt-1" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Status</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm font-medium">Priority</div>
                            <Badge className={priorityStyles[project.priority as keyof typeof priorityStyles]}>
                              {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
                            </Badge>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Days Left</div>
                            <div className={`text-sm ${daysLeft < 7 ? "text-red-600 font-medium" : ""}`}>
                              {daysLeft} days
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Progress</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Overall Completion</span>
                            <span>{project.completion}%</span>
                          </div>
                          <Progress value={project.completion} className="h-2" />
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          {completedTasks} of {totalTasks} tasks completed
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-2" />

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-4">Project Team</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {project.team.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center gap-3 p-3 rounded-md border border-green-100 hover:bg-green-50 transition-colors"
                        >
                          <Avatar>
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback className="bg-green-200 text-green-700">
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-xs text-muted-foreground">{member.role}</div>
                          </div>
                        </div>
                      ))}
                      <div className="flex items-center justify-center p-3 rounded-md border border-dashed border-green-200 hover:bg-green-50 transition-colors cursor-pointer">
                        <div className="flex flex-col items-center gap-1 text-muted-foreground">
                          <Plus className="h-5 w-5" />
                          <span className="text-xs">Add Team Member</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle>Client Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={project.customer.avatar} alt={project.customer.name} />
                      <AvatarFallback className="bg-green-200 text-green-700 text-xl">
                        {project.customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Link
                        href={`/dashboard/customers/${project.customer.id}`}
                        className="text-lg font-medium hover:text-green-600 transition-colors"
                      >
                        {project.customer.name}
                      </Link>
                      <div className="text-sm text-muted-foreground">Contact: {project.customer.contactPerson}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="text-sm font-medium">Email</div>
                        <a
                          href={`mailto:${project.customer.email}`}
                          className="text-sm text-muted-foreground hover:text-green-600"
                        >
                          {project.customer.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="text-sm font-medium">Phone</div>
                        <a
                          href={`tel:${project.customer.phone}`}
                          className="text-sm text-muted-foreground hover:text-green-600"
                        >
                          {project.customer.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button className="flex-1 bg-green-300 hover:bg-green-400 text-green-900">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                  <Button variant="outline" className="flex-1 border-green-200">
                    <CircleDollarSign className="mr-2 h-4 w-4" />
                    Create Invoice
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle>Project Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground">Completion</div>
                      <div className="text-2xl font-bold text-green-600">{project.completion}%</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground">Days Left</div>
                      <div className={`text-2xl font-bold ${daysLeft < 7 ? "text-red-600" : "text-green-600"}`}>
                        {daysLeft}
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground">Budget Left</div>
                      <div className="text-2xl font-bold text-green-600">${remainingBudget.toLocaleString()}</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground">Tasks</div>
                      <div className="text-2xl font-bold text-green-600">
                        {completedTasks}/{totalTasks}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Quick Actions</h3>
                    <div className="grid grid-cols-1 gap-2">
                      <Button
                        className="bg-green-300 hover:bg-green-400 text-green-900 w-full"
                        onClick={() => {
                          setActiveTab("tasks")
                          setShowNewTaskForm(true)
                        }}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Task
                      </Button>
                      <Button className="bg-green-300 hover:bg-green-400 text-green-900 w-full">
                        <CircleDollarSign className="mr-2 h-4 w-4" />
                        Create Invoice
                      </Button>
                      <Button variant="outline" className="border-green-200 w-full">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Files
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-100">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Upcoming Tasks</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-green-600 hover:text-green-700 hover:bg-green-50"
                    onClick={() => setActiveTab("tasks")}
                  >
                    View All
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[...tasks["to-do"], ...tasks["in-progress"]]
                      .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
                      .slice(0, 3)
                      .map((task) => (
                        <div key={task.id} className="border-b border-green-100 pb-4 last:border-0 last:pb-0">
                          <div className="flex justify-between items-start">
                            <div className="font-medium">{task.title}</div>
                            <Badge className={priorityStyles[task.priority as keyof typeof priorityStyles]}>
                              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Due {format(task.dueDate, "MMM d, yyyy")}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Avatar className="h-5 w-5">
                              <AvatarFallback className="text-[10px] bg-green-200 text-green-700">
                                {task.assignee
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground">{task.assignee}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-100">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Activity</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-green-600 hover:text-green-700 hover:bg-green-50"
                    onClick={() => setActiveTab("activity")}
                  >
                    View All
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities.slice(0, 3).map((activity) => (
                      <div key={activity.id} className="border-b border-green-100 pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center">
                            {activity.icon}
                          </div>
                          <div>
                            <div className="text-sm">{activity.description}</div>
                            <div className="text-xs text-muted-foreground">
                              {activity.user} • {activity.time}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Tasks Tab (Kanban Board) */}
        <TabsContent value="tasks" className="pt-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold">Project Tasks</h2>
              <p className="text-sm text-muted-foreground">
                {completedTasks} of {totalTasks} tasks completed
              </p>
            </div>
            <Button
              className="bg-green-300 hover:bg-green-400 text-green-900"
              onClick={() => setShowNewTaskForm(!showNewTaskForm)}
            >
              {showNewTaskForm ? (
                <>
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Task
                </>
              )}
            </Button>
          </div>

          {showNewTaskForm && (
            <Card className="border-green-100 mb-6">
              <CardHeader>
                <CardTitle>New Task</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Task Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter task title"
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                      className="border-green-200"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Enter task description"
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                      className="border-green-200"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select
                        value={newTask.priority}
                        onValueChange={(value) => setNewTask({ ...newTask, priority: value })}
                      >
                        <SelectTrigger id="priority" className="border-green-200">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                        className="border-green-200"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="assignee">Assignee</Label>
                      <Select
                        value={newTask.assignee}
                        onValueChange={(value) => setNewTask({ ...newTask, assignee: value })}
                      >
                        <SelectTrigger id="assignee" className="border-green-200">
                          <SelectValue placeholder="Select assignee" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="You">You</SelectItem>
                          <SelectItem value="Alex Chen">Alex Chen</SelectItem>
                          <SelectItem value="Maria Garcia">Maria Garcia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" className="border-green-200" onClick={() => setShowNewTaskForm(false)}>
                  Cancel
                </Button>
                <Button className="bg-green-300 hover:bg-green-400 text-green-900" onClick={handleAddTask}>
                  Create Task
                </Button>
              </CardFooter>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* To Do Column */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500 mr-2"></div>
                  To Do
                </h3>
                <Badge variant="outline" className="bg-muted">
                  {tasks["to-do"].length}
                </Badge>
              </div>
              <div className="space-y-3">
                {tasks["to-do"].map((task) => (
                  <Card key={task.id} className="border-green-100">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-start gap-2">
                        <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{task.title}</h4>
                            <Badge className={priorityStyles[task.priority as keyof typeof priorityStyles]}>
                              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{task.description}</p>
                          <div className="flex justify-between items-center text-xs text-muted-foreground mt-2">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{format(task.dueDate, "MMM d")}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Avatar className="h-5 w-5">
                                <AvatarFallback className="text-[10px] bg-green-200 text-green-700">
                                  {task.assignee
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span>{task.assignee}</span>
                            </div>
                          </div>
                          {task.tags && task.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {task.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs px-1 py-0 h-5">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button variant="outline" className="w-full border-dashed border-green-200">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </div>
            </div>

            {/* In Progress Column */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-blue-500 mr-2"></div>
                  In Progress
                </h3>
                <Badge variant="outline" className="bg-muted">
                  {tasks["in-progress"].length}
                </Badge>
              </div>
              <div className="space-y-3">
                {tasks["in-progress"].map((task) => (
                  <Card key={task.id} className="border-green-100">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-start gap-2">
                        <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{task.title}</h4>
                            <Badge className={priorityStyles[task.priority as keyof typeof priorityStyles]}>
                              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{task.description}</p>
                          <div className="flex justify-between items-center text-xs text-muted-foreground mt-2">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{format(task.dueDate, "MMM d")}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Avatar className="h-5 w-5">
                                <AvatarFallback className="text-[10px] bg-green-200 text-green-700">
                                  {task.assignee
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span>{task.assignee}</span>
                            </div>
                          </div>
                          {task.tags && task.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {task.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs px-1 py-0 h-5">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button variant="outline" className="w-full border-dashed border-green-200">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </div>
            </div>

            {/* Review Column */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-purple-500 mr-2"></div>
                  Review
                </h3>
                <Badge variant="outline" className="bg-muted">
                  {tasks["review"].length}
                </Badge>
              </div>
              <div className="space-y-3">
                {tasks["review"].map((task) => (
                  <Card key={task.id} className="border-green-100">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-start gap-2">
                        <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{task.title}</h4>
                            <Badge className={priorityStyles[task.priority as keyof typeof priorityStyles]}>
                              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{task.description}</p>
                          <div className="flex justify-between items-center text-xs text-muted-foreground mt-2">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{format(task.dueDate, "MMM d")}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Avatar className="h-5 w-5">
                                <AvatarFallback className="text-[10px] bg-green-200 text-green-700">
                                  {task.assignee
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span>{task.assignee}</span>
                            </div>
                          </div>
                          {task.tags && task.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {task.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs px-1 py-0 h-5">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button variant="outline" className="w-full border-dashed border-green-200">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </div>
            </div>

            {/* Completed Column */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                  Completed
                </h3>
                <Badge variant="outline" className="bg-muted">
                  {tasks["completed"].length}
                </Badge>
              </div>
              <div className="space-y-3">
                {tasks["completed"].map((task) => (
                  <Card key={task.id} className="border-green-100 bg-green-50/50">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-start gap-2">
                        <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{task.title}</h4>
                            <Badge className={priorityStyles[task.priority as keyof typeof priorityStyles]}>
                              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{task.description}</p>
                          <div className="flex justify-between items-center text-xs text-muted-foreground mt-2">
                            <div className="flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3 text-green-500" />
                              <span>Completed {format(task.completedAt!, "MMM d")}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Avatar className="h-5 w-5">
                                <AvatarFallback className="text-[10px] bg-green-200 text-green-700">
                                  {task.assignee
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span>{task.assignee}</span>
                            </div>
                          </div>
                          {task.tags && task.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {task.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs px-1 py-0 h-5">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Invoices Tab */}
        <TabsContent value="invoices" className="pt-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold">Invoices & Quotations</h2>
              <p className="text-sm text-muted-foreground">
                {invoices.length} documents ({invoices.filter((i) => i.type === "invoice").length} invoices,{" "}
                {invoices.filter((i) => i.type === "quotation").length} quotations)
              </p>
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-green-300 hover:bg-green-400 text-green-900">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <FileText className="mr-2 h-4 w-4" />
                    New Invoice
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileText className="mr-2 h-4 w-4" />
                    New Quotation
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Card className="border-green-100">
            <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Total Invoiced</div>
                  <div className="text-2xl font-bold text-green-600">${totalInvoiced.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {invoices.filter((i) => i.type === "invoice").length} invoices
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Paid</div>
                  <div className="text-2xl font-bold text-green-600">${paidAmount.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {invoices.filter((i) => i.status === "paid").length} invoices
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Pending</div>
                  <div className="text-2xl font-bold text-yellow-600">${pendingAmount.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {invoices.filter((i) => i.status === "pending").length} documents
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 space-y-4">
            {invoices.map((invoice) => (
              <Card key={invoice.id} className="border-green-100">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-green-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/dashboard/invoices/${invoice.id}`}
                            className="font-medium text-lg hover:text-green-600 transition-colors"
                          >
                            {invoice.id}
                          </Link>
                          <Badge className={invoiceStatusStyles[invoice.status as keyof typeof invoiceStatusStyles]}>
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          </Badge>
                          <Badge variant="outline">
                            {invoice.type.charAt(0).toUpperCase() + invoice.type.slice(1)}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">{invoice.description}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Issued: {format(invoice.issueDate, "MMMM d, yyyy")} • Due:{" "}
                          {format(invoice.dueDate, "MMMM d, yyyy")}
                          {invoice.paidDate && ` • Paid: ${format(invoice.paidDate, "MMMM d, yyyy")}`}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-xl font-bold">${invoice.amount.toLocaleString()}</div>
                      <div className="flex gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="icon" className="h-8 w-8 border-green-200">
                                <Download className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Download PDF</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="icon" className="h-8 w-8 border-green-200">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <Link href={`/dashboard/invoices/${invoice.id}`}>
                          <Button className="bg-green-300 hover:bg-green-400 text-green-900">
                            View
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Files Tab */}
        <TabsContent value="files" className="pt-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold">Project Files</h2>
              <p className="text-sm text-muted-foreground">{files.length} files uploaded</p>
            </div>
            <Button className="bg-green-300 hover:bg-green-400 text-green-900">
              <Upload className="mr-2 h-4 w-4" />
              Upload File
            </Button>
          </div>

          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex flex-col rounded-lg border border-green-100 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="bg-green-50 p-6 flex items-center justify-center">
                      {fileTypeIcons[file.type as keyof typeof fileTypeIcons]}
                    </div>
                    <div className="p-4">
                      <div className="font-medium truncate">{file.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {file.size} • Uploaded on {format(file.uploadedAt, "MMMM d, yyyy")}
                      </div>
                      <div className="text-xs text-muted-foreground">By: {file.uploadedBy}</div>
                      <div className="flex justify-between items-center mt-3">
                        <Badge variant="outline" className="text-xs">
                          {file.category}
                        </Badge>
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm" className="text-xs h-8 border-green-200">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <LinkIcon className="h-4 w-4 mr-2" />
                                Copy Link
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Rename
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-green-200 p-6 hover:bg-green-50 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 text-green-500 mb-2" />
                  <p className="text-sm font-medium">Upload New File</p>
                  <p className="text-xs text-muted-foreground mt-1">Drag and drop or click to browse</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="pt-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold">Project Activity</h2>
              <p className="text-sm text-muted-foreground">All actions and updates for this project</p>
            </div>
          </div>

          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="relative space-y-6 before:absolute before:inset-y-0 before:left-6 before:w-[1px] before:bg-green-100">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex gap-4 relative">
                    <div className="absolute left-[18px] top-1.5 h-3 w-3 rounded-full border-2 border-green-200 bg-background"></div>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-50">
                      {activity.icon}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{activity.user}</span>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                      <p className="text-sm">{activity.description}</p>
                      {activity.comment && (
                        <div className="mt-2 rounded-md bg-muted p-3 text-sm">{activity.comment}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t border-green-100 pt-6">
                <h3 className="text-sm font-medium mb-2">Add Comment</h3>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Type your comment here..."
                    className="min-h-[100px] border-green-200"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button
                      className="bg-green-300 hover:bg-green-400 text-green-900"
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Post Comment
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}

