"use client"

import { useState } from "react"
import { format } from "date-fns"
import Link from "next/link"
import {
  ArrowLeft,
  CircleDollarSign,
  Clock,
  Download,
  Edit,
  FileText,
  Plus,
  Upload,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppCustomer, YearlyRevenue } from "@/types/customers"
import { INVOICE_STATUS } from "@/types/invoices"
import { PROJECT_STATUS } from "@/types/projects"
import OverviewTab from "./overview-tab"
import ProjectsTab from "./projects-tab"
import InvoicesTab from "./invoices-tab"

// Sample files data
const files = [
  {
    id: "1",
    name: "wireframes.pdf",
    type: "pdf",
    size: "2.4 MB",
    project: "E-commerce Website Redesign",
    uploadedBy: "You",
    uploadedAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    name: "homepage-design-v2.fig",
    type: "figma",
    size: "8.7 MB",
    project: "E-commerce Website Redesign",
    uploadedBy: "Alex Chen",
    uploadedAt: new Date("2024-01-25"),
  },
  {
    id: "3",
    name: "product-photos.zip",
    type: "zip",
    size: "15.2 MB",
    project: "Product Photography",
    uploadedBy: "You",
    uploadedAt: new Date("2024-02-15"),
  },
  {
    id: "4",
    name: "seo-report.pdf",
    type: "pdf",
    size: "1.8 MB",
    project: "SEO Audit",
    uploadedBy: "You",
    uploadedAt: new Date("2023-12-10"),
  },
  {
    id: "5",
    name: "keyword-analysis.xlsx",
    type: "excel",
    size: "0.9 MB",
    project: "SEO Audit",
    uploadedBy: "Sarah Johnson",
    uploadedAt: new Date("2023-11-20"),
  },
]

// Sample activity data
const activities = [
  {
    id: "1",
    type: "invoice_paid",
    description: "Paid invoice #INV-2024-002",
    time: "2 days ago",
    date: new Date("2024-03-10"),
  },
  {
    id: "2",
    type: "project_update",
    description: "Updated progress on 'E-commerce Website Redesign'",
    time: "1 week ago",
    date: new Date("2024-03-05"),
  },
  {
    id: "3",
    type: "invoice_sent",
    description: "Sent invoice #INV-2024-006",
    time: "2 weeks ago",
    date: new Date("2024-02-20"),
  },
  {
    id: "4",
    type: "project_started",
    description: "Started project 'Product Photography'",
    time: "1 month ago",
    date: new Date("2024-02-10"),
  },
  {
    id: "5",
    type: "customer_added",
    description: "Added as a customer",
    time: "5 months ago",
    date: new Date("2023-10-15"),
  },
]

interface Props {
  customer: AppCustomer;
  revenue: YearlyRevenue;
}

export default function CustomerDetailsPage({ customer, revenue }: Props) {
  const [activeTab, setActiveTab] = useState("overview")

  const totalRevenue = customer.invoices.reduce((sum, invoice) => sum + invoice.amount, 0)

  const paidRevenue = customer.invoices
    .filter((invoice) => invoice.status === INVOICE_STATUS.PAID)
    .reduce((sum, invoice) => sum + invoice.amount, 0)

  const pendingRevenue = customer.invoices
    .filter((invoice) => invoice.status === INVOICE_STATUS.SENT || invoice.status === INVOICE_STATUS.REFUSED)
    .reduce((sum, invoice) => sum + invoice.amount, 0)

  const activeProjects = customer.projects.filter((project) => project.status === PROJECT_STATUS.IN_PROGRESS).length
  const completedProjects = customer.projects.filter((project) => project.status === PROJECT_STATUS.COMPLETED).length

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/customers">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Customer Details</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-10 bg-transparent p-0">
          <TabsTrigger
            value="overview"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="projects"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Projects
          </TabsTrigger>
          <TabsTrigger
            value="invoices"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Invoices
          </TabsTrigger>
          <TabsTrigger
            value="files"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Files
          </TabsTrigger>
          <TabsTrigger
            value="activity"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Activity
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="pt-6">
          <OverviewTab
            customer={customer}
            revenue={revenue}
            totalRevenue={totalRevenue}
            pendingRevenue={pendingRevenue}
            activeProjects={activeProjects}
            completedProjects={completedProjects}
          />
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects" className="pt-6">
          <ProjectsTab
            customer={customer}
            activeProjects={activeProjects}
            completedProjects={completedProjects}
          />
        </TabsContent>

        {/* Invoices Tab */}
        <TabsContent value="invoices" className="pt-6">
          <InvoicesTab
            customer={customer}
            totalRevenue={totalRevenue}
            paidRevenue={paidRevenue}
            pendingRevenue={pendingRevenue}
          />
        </TabsContent>

        {/* Files Tab */}
        <TabsContent value="files" className="pt-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold">Files</h2>
              <p className="text-sm text-muted-foreground">
                {files.length} files across {customer.projects.length} projects
              </p>
            </div>
            <Button className="bg-green-300 hover:bg-green-400 text-green-900">
              <Upload className="mr-2 h-4 w-4" />
              Upload File
            </Button>
          </div>

          {/* Group files by project */}
          {customer.projects.map((project) => {
            const projectFiles = files.filter((file) => file.project === project.name)
            if (projectFiles.length === 0) return null

            return (
              <Card key={project.id} className="border-green-100 mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">
                    <Link href={`/dashboard/projects/${project.id}`} className="hover:text-green-600 transition-colors">
                      {project.name}
                    </Link>
                  </CardTitle>
                  <CardDescription>{projectFiles.length} files</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projectFiles.map((file) => (
                      <div
                        key={file.id}
                        className="flex flex-col rounded-lg border border-green-100 overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="bg-green-50 p-6 flex items-center justify-center">
                          <FileIcon type={file.type} />
                        </div>
                        <div className="p-4">
                          <div className="font-medium truncate">{file.name}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {file.size} • Uploaded on {format(file.uploadedAt, "MMMM d, yyyy")}
                          </div>
                          <div className="text-xs text-muted-foreground">By: {file.uploadedBy}</div>
                          <div className="flex justify-between items-center mt-3">
                            <Button variant="outline" size="sm" className="text-xs h-8 border-green-200">
                              <Download className="h-3 w-3 mr-1" />
                              Download
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="pt-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold">Activity History</h2>
              <p className="text-sm text-muted-foreground">All actions and updates for this customer</p>
            </div>
          </div>

          <Card className="border-green-100">
            <CardContent className="p-6">
              <div className="relative space-y-6 before:absolute before:inset-y-0 before:left-6 before:w-[1px] before:bg-green-100">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex gap-4 relative">
                    <div className="absolute left-[18px] top-1.5 h-3 w-3 rounded-full border-2 border-green-200 bg-background"></div>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-50">
                      <ActivityIcon type={activity.type} />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{activity.description}</span>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {format(activity.date, "MMMM d, yyyy 'at' h:mm a")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}

function FileIcon({ type }: { type: string }) {
  switch (type) {
    case "pdf":
      return <FileText className="h-8 w-8 text-red-500" />
    case "figma":
      return <FileText className="h-8 w-8 text-purple-500" />
    case "excel":
      return <FileText className="h-8 w-8 text-green-500" />
    case "zip":
      return <FileText className="h-8 w-8 text-yellow-500" />
    default:
      return <FileText className="h-8 w-8 text-blue-500" />
  }
}

function ActivityIcon({ type }: { type: string }) {
  switch (type) {
    case "invoice_paid":
      return <CircleDollarSign className="h-5 w-5 text-green-500" />
    case "project_update":
      return <Edit className="h-5 w-5 text-blue-500" />
    case "invoice_sent":
      return <FileText className="h-5 w-5 text-purple-500" />
    case "project_started":
      return <Plus className="h-5 w-5 text-blue-500" />
    case "customer_added":
      return <Users className="h-5 w-5 text-green-500" />
    default:
      return <Clock className="h-5 w-5 text-gray-500" />
  }
}

