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
import { ScrollArea } from "@/components/ui/scroll-area"

export function CreateInvoiceModal({ customers }: { customers: AppCustomer[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create invoice</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[50%]">
        <DialogHeader>
          <DialogTitle>Create Invoice</DialogTitle>
          <DialogDescription>
            Start creating a new invoice. Click create when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[70vh] p-4">
          <CreateInvoiceForm customers={customers} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
