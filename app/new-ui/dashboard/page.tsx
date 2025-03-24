"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { ArrowRight, Calendar, CheckCircle2, DollarSign, FileText, Plus, Users } from "lucide-react"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
// Change this line
// import { DashboardLayout } from "@/components/dashboard-layout"

// To this:
// No need to import DashboardLayout since we're using the layout.tsx file

// Sample data for the dashboard
const revenueData = [
  { month: "Jan", revenue: 4200 },
  { month: "Feb", revenue: 3800 },
  { month: "Mar", revenue: 5100 },
  { month: "Apr", revenue: 4800 },
  { month: "May", revenue: 5600 },
  { month: "Jun", revenue: 6200 },
  { month: "Jul", revenue: 5900 },
  { month: "Aug", revenue: 6800 },
  { month: "Sep", revenue: 7200 },
  { month: "Oct", revenue: 6500 },
  { month: "Nov", revenue: 7800 },
  { month: "Dec", revenue: 8500 },
]

const quarterlyData = [
  { quarter: "Q1", revenue: 13100 },
  { quarter: "Q2", revenue: 16600 },
  { quarter: "Q3", revenue: 19900 },
  { quarter: "Q4", revenue: 22800 },
]

const revenueByProjectType = [
  { name: "Web Development", value: 45 },
  { name: "Design", value: 25 },
  { name: "Marketing", value: 15 },
  { name: "Consulting", value: 15 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const recentProjects = [
  {
    id: 1,
    name: "E-commerce Website Redesign",
    client: "Tech Corp",
    progress: 75,
    dueDate: "Mar 30, 2024",
    status: "in-progress",
  },
  {
    id: 2,
    name: "Mobile App Development",
    client: "FitLife Inc",
    progress: 30,
    dueDate: "May 15, 2024",
    status: "in-progress",
  },
  {
    id: 3,
    name: "Brand Identity Design",
    client: "Startup Hub",
    progress: 100,
    dueDate: "Feb 15, 2024",
    status: "completed",
  },
]

const recentInvoices = [
  {
    id: "INV-2024-001",
    client: "Tech Corp",
    amount: 4500,
    status: "paid",
    date: "Feb 10, 2024",
  },
  {
    id: "INV-2024-002",
    client: "FitLife Inc",
    amount: 8500,
    status: "pending",
    date: "Feb 20, 2024",
  },
  {
    id: "INV-2024-003",
    client: "Startup Hub",
    amount: 3200,
    status: "overdue",
    date: "Jan 25, 2024",
  },
]

const topCustomers = [
  {
    id: 1,
    name: "Tech Corp",
    avatar: "/placeholder.svg?height=40&width=40",
    totalSpent: 16500,
    projects: 3,
  },
  {
    id: 2,
    name: "FitLife Inc",
    avatar: "/placeholder.svg?height=40&width=40",
    totalSpent: 8500,
    projects: 1,
  },
  {
    id: 3,
    name: "Startup Hub",
    avatar: "/placeholder.svg?height=40&width=40",
    totalSpent: 5200,
    projects: 2,
  },
]

const upcomingDeadlines = [
  {
    id: 1,
    task: "Homepage Design Approval",
    project: "E-commerce Website Redesign",
    dueDate: "Mar 15, 2024",
    daysLeft: 3,
  },
  {
    id: 2,
    task: "User Authentication Implementation",
    project: "Mobile App Development",
    dueDate: "Mar 20, 2024",
    daysLeft: 8,
  },
  {
    id: 3,
    task: "Invoice Payment Reminder",
    project: "Brand Identity Design",
    dueDate: "Mar 25, 2024",
    daysLeft: 13,
  },
]

// Status badge styling
const statusStyles: Record<string, string> = {
  "paid": "bg-green-100 text-green-700 hover:bg-green-100",
  "pending": "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  "overdue": "bg-red-100 text-red-700 hover:bg-red-100",
  "draft": "bg-gray-100 text-gray-700 hover:bg-gray-100",
  "completed": "bg-green-100 text-green-700 hover:bg-green-100",
  "in-progress": "bg-blue-100 text-blue-700 hover:bg-blue-100",
  "not-started": "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
}

export default function DashboardOverviewPage() {
  const [period, setPeriod] = useState("year")

  // Calculate total revenue for the current year
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0)

  // Calculate total invoices amount
  // const totalInvoicesAmount = recentInvoices.reduce((sum, invoice) => sum + invoice.amount, 0)

  // Calculate pending invoices amount
  const pendingInvoicesAmount = recentInvoices
    .filter((invoice) => invoice.status === "pending" || invoice.status === "overdue")
    .reduce((sum, invoice) => sum + invoice.amount, 0)

  // Calculate active projects count
  const activeProjectsCount = recentProjects.filter((project) => project.status === "in-progress").length

  // Calculate total customers count
  const totalCustomersCount = topCustomers.length

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your freelance business performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-green-300 hover:bg-green-400 text-green-900">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
        <Card className="relative overflow-hidden rounded-xl bg-white shadow-sm border border-green-50">
          <div className="flex items-center p-6">
            <div className="flex-1">
              <div className="text-3xl font-semibold text-gray-800">${totalRevenue.toLocaleString()}</div>
              <div className="text-sm text-gray-500 mt-1">Total Revenue</div>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-500">
              <DollarSign className="h-6 w-6" />
            </div>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-green-300 to-green-100"></div>
        </Card>

        <Card className="relative overflow-hidden rounded-xl bg-white shadow-sm border border-green-50">
          <div className="flex items-center p-6">
            <div className="flex-1">
              <div className="text-3xl font-semibold text-gray-800">${pendingInvoicesAmount.toLocaleString()}</div>
              <div className="text-sm text-gray-500 mt-1">Pending Invoices</div>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-500">
              <FileText className="h-6 w-6" />
            </div>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-green-300 to-green-100"></div>
        </Card>

        <Card className="relative overflow-hidden rounded-xl bg-white shadow-sm border border-green-50">
          <div className="flex items-center p-6">
            <div className="flex-1">
              <div className="text-3xl font-semibold text-gray-800">{activeProjectsCount}</div>
              <div className="text-sm text-gray-500 mt-1">Active Projects</div>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-500">
              <CheckCircle2 className="h-6 w-6" />
            </div>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-green-300 to-green-100"></div>
        </Card>

        <Card className="relative overflow-hidden rounded-xl bg-white shadow-sm border border-green-50">
          <div className="flex items-center p-6">
            <div className="flex-1">
              <div className="text-3xl font-semibold text-gray-800">{totalCustomersCount}</div>
              <div className="text-sm text-gray-500 mt-1">Total Customers</div>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-500">
              <Users className="h-6 w-6" />
            </div>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-green-300 to-green-100"></div>
        </Card>
      </div>

      {/* Revenue Charts */}
      <div className="grid gap-4 md:grid-cols-7 mt-6">
        <Card className="md:col-span-4 border-green-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue for the current year</CardDescription>
            </div>
            <Tabs defaultValue={period} className="w-[200px]" onValueChange={setPeriod}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="year">Monthly</TabsTrigger>
                <TabsTrigger value="quarter">Quarterly</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[300px]">
              {period === "year" ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                    <Tooltip
                      formatter={(value) => [`$${value}`, "Revenue"]}
                      contentStyle={{
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Bar dataKey="revenue" fill="#86efac" radius={[4, 4, 0, 0]} barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={quarterlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="quarter" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                    <Tooltip
                      formatter={(value) => [`$${value}`, "Revenue"]}
                      contentStyle={{
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Bar dataKey="revenue" fill="#86efac" radius={[4, 4, 0, 0]} barSize={60} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 border-green-100">
          <CardHeader>
            <CardTitle>Revenue by Project Type</CardTitle>
            <CardDescription>Distribution of revenue sources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueByProjectType}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {revenueByProjectType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects and Invoices */}
      <div className="grid gap-4 md:grid-cols-2 mt-6">
        <Card className="border-green-100">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Projects</CardTitle>
            <Link href="/dashboard/projects">
              <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <Link
                        href={`/dashboard/projects/${project.id}`}
                        className="font-medium hover:text-green-600 transition-colors"
                      >
                        {project.name}
                      </Link>
                      <span className="text-sm text-muted-foreground">Client: {project.client}</span>
                    </div>
                    <Badge className={statusStyles[project.status]}>
                      {project.status === "completed"
                        ? "Completed"
                        : project.status === "in-progress"
                          ? "In Progress"
                          : "Not Started"}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  <div className="text-xs text-muted-foreground">Due: {project.dueDate}</div>
                  {project.id !== recentProjects[recentProjects.length - 1].id && (
                    <div className="border-b border-green-100 pt-2"></div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-100">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Invoices</CardTitle>
            <Link href="/dashboard/invoices">
              <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInvoices.map((invoice) => (
                <div key={invoice.id} className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/dashboard/invoices/${invoice.id}`}
                      className="font-medium hover:text-green-600 transition-colors"
                    >
                      {invoice.id}
                    </Link>
                    <Badge className={statusStyles[invoice.status]}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Client: {invoice.client}</span>
                    <span className="font-medium">${invoice.amount.toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Date: {invoice.date}</div>
                  {invoice.id !== recentInvoices[recentInvoices.length - 1].id && (
                    <div className="border-b border-green-100 pt-2"></div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t border-green-100 bg-green-50/50 px-6 py-3">
            <div className="flex justify-between items-center w-full">
              <span className="text-sm font-medium">Total Pending</span>
              <span className="text-sm font-bold text-green-600">${pendingInvoicesAmount.toLocaleString()}</span>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Customers and Deadlines */}
      <div className="grid gap-4 md:grid-cols-2 mt-6">
        <Card className="border-green-100">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Top Customers</CardTitle>
            <Link href="/dashboard/customers">
              <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCustomers.map((customer) => (
                <div key={customer.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={customer.avatar} alt={customer.name} />
                      <AvatarFallback className="bg-green-200 text-green-700">
                        {customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Link
                        href={`/dashboard/customers/${customer.id}`}
                        className="font-medium hover:text-green-600 transition-colors"
                      >
                        {customer.name}
                      </Link>
                      <div className="text-xs text-muted-foreground">{customer.projects} projects</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${customer.totalSpent.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Total spent</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-100">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Upcoming Deadlines</CardTitle>
            <Link href="/dashboard/calendar">
              <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                View Calendar
                <Calendar className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline) => (
                <div key={deadline.id} className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">{deadline.task}</div>
                    <div className="text-sm text-muted-foreground">Project: {deadline.project}</div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-sm font-medium">{deadline.dueDate}</div>
                    <div className={`text-xs ${deadline.daysLeft <= 3 ? "text-red-500" : "text-muted-foreground"}`}>
                      {deadline.daysLeft} days left
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mt-6 border-green-100">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="flex flex-col h-auto py-4 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200">
              <Plus className="h-5 w-5 mb-1" />
              <span>New Project</span>
            </Button>
            <Button className="flex flex-col h-auto py-4 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200">
              <FileText className="h-5 w-5 mb-1" />
              <span>Create Invoice</span>
            </Button>
            <Button className="flex flex-col h-auto py-4 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200">
              <Users className="h-5 w-5 mb-1" />
              <span>Add Customer</span>
            </Button>
            <Button className="flex flex-col h-auto py-4 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200">
              <Calendar className="h-5 w-5 mb-1" />
              <span>Schedule Meeting</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

