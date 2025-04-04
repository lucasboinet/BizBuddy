import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CreateInvoiceForm from "./create-invoice-form"
import { AppCustomer } from "@/types/customers"
import { AppProject } from "@/types/projects"

interface Props {
  customers?: AppCustomer[],
  projects?: AppProject[],
  selectedCustomer?: AppCustomer,
  selectedProject?: AppProject,
  children: React.ReactNode,
}

export function CreateInvoiceModal({ customers, projects, selectedCustomer, selectedProject, children }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[50%]">
        <DialogHeader>
          <DialogTitle>Create Invoice</DialogTitle>
          <DialogDescription>
            Start creating a new invoice. Click create when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <CreateInvoiceForm
          customers={customers}
          projects={projects}
          selectedCustomer={selectedCustomer}
          selectedProject={selectedProject}
        />
      </DialogContent>
    </Dialog>
  )
}
