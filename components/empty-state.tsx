"use client"

import type { LucideIcon } from "lucide-react"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  children: React.ReactNode
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  children
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 my-4">
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-4">{description}</p>
      {children}
    </div>
  )
}

