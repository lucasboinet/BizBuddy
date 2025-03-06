import { Button } from "@/components/ui/button"
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

export function CreateInvoiceModal({ customers }: { customers: AppCustomer[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create invoice</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[50%] overflow-auto">
        <DialogHeader>
          <DialogTitle>Create Invoice</DialogTitle>
          <DialogDescription>
            Start creating a new invoice. Click create when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <CreateInvoiceForm customers={customers} />
      </DialogContent>
    </Dialog>
  )
}
