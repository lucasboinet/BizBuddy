"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppCustomer, YearlyRevenue } from "@/types/customers"
import { INVOICE_STATUS } from "@/types/invoices"
import { PROJECT_STATUS } from "@/types/projects"
import OverviewTab from "./overview-tab"
import ProjectsTab from "./projects-tab"
import InvoicesTab from "./invoices-tab"
import ActivitiesTab from "./activities-tab"

// Sample activity data
const activities = [
  {
    id: "1",
    type: "invoice_paid",
    description: "Paid invoice #INV-2024-002",
    date: new Date("2025-03-10"),
  },
  {
    id: "2",
    type: "project_update",
    description: "Updated progress on 'E-commerce Website Redesign'",
    date: new Date("2025-03-05"),
  },
  {
    id: "3",
    type: "invoice_sent",
    description: "Sent invoice #INV-2025-006",
    date: new Date("2025-02-20"),
  },
  {
    id: "4",
    type: "project_started",
    description: "Started project 'Product Photography'",
    date: new Date("2025-02-10"),
  },
  {
    id: "5",
    type: "customer_added",
    description: "Added as a customer",
    date: new Date("2024-10-15"),
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
          {/* <TabsTrigger
            value="files"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Files
          </TabsTrigger> */}
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
        {/* <TabsContent value="files" className="pt-6">
          
        </TabsContent> */}

        {/* Activity Tab */}
        <TabsContent value="activity" className="pt-6">
          <ActivitiesTab activities={activities} />
        </TabsContent>
      </Tabs>
    </>
  )
}

// function FileIcon({ type }: { type: string }) {
//   switch (type) {
//     case "pdf":
//       return <FileText className="h-8 w-8 text-red-500" />
//     case "figma":
//       return <FileText className="h-8 w-8 text-purple-500" />
//     case "excel":
//       return <FileText className="h-8 w-8 text-green-500" />
//     case "zip":
//       return <FileText className="h-8 w-8 text-yellow-500" />
//     default:
//       return <FileText className="h-8 w-8 text-blue-500" />
//   }
// }

