import { Button } from "@/components/ui/button"
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

export function CreateProjectModal({ customers }: { customers: AppCustomer[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="text-xs">Create project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[50%]">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Start creating a new project. Click create when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 overflow-auto">
          <CreateProjectForm customers={customers} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
