"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Frame,
  LifeBuoy,
  Loader2Icon,
  PieChart,
  Send,
  SquareKanban,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
// import { ModeToggle } from '@/components/ThemeModeToggle'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuthSession } from "./context/AuthSessionContext"
import Link from "next/link"

const data = {
  navMain: [
    {
      title: "Overview",
      url: "/",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Projects",
      url: "/projects",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Customers",
      url: "/customers",
      icon: Bot,
    },
    {
      title: "Invoices",
      url: "/invoices",
      icon: BookOpen,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Statistics",
      url: "#",
      icon: Frame,
    },
    {
      name: "Tags",
      url: "#",
      icon: PieChart,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, loading } = useAuthSession();

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <SquareKanban className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">BizBuddy</span>
                  <span className="truncate text-xs">Free tier</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {/* <ModeToggle /> */}
        {!loading && user && <NavUser user={user} />}
        {loading && (
          <div className="h-12 flex items-center justify-center">
            <Loader2Icon className='animate-spin' />
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
