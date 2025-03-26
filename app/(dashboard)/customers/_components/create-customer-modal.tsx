'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CreateCustomerForm from "./create-customer-form";

export default function CreateCustomerModal() {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="text-xs">Add customer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[50%]">
        <DialogHeader>
          <DialogTitle>Create Customer</DialogTitle>
          <DialogDescription>
            Start creating a new customer. Click create when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <CreateCustomerForm />
      </DialogContent>
    </Dialog>
  )
}