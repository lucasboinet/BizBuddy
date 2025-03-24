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

export function CreateInvoiceModal({ customers, selectedCustomer, children }: { customers?: AppCustomer[], selectedCustomer?: AppCustomer, children: React.ReactNode }) {
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
        <CreateInvoiceForm customers={customers} selectedCustomer={selectedCustomer} />
      </DialogContent>
    </Dialog>
  )
}
