'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CreateProjectForm from "./create-project-form"
import { AppCustomer } from "@/types/customers"
import { Tag } from "@prisma/client"

export function CreateProjectModal({ customers, tags, selectedCustomer, children }: { customers?: AppCustomer[], tags?: Tag[], selectedCustomer?: AppCustomer, children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[50%]">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Start creating a new project. Click create when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 overflow-auto">
          <CreateProjectForm customers={customers} tags={tags} selectedCustomer={selectedCustomer} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
