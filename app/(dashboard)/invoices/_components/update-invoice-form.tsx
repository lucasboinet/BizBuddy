'use client'

import { UpdateInvoice } from "@/actions/invoices/UpdateInvoice";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateInvoiceSchema, UpdateInvoiceSchemaType } from "@/schema/invoices";
import { AppInvoice, INVOICE_STATUS, INVOICE_STATUS_KEYS, InvoiceItem } from "@/types/invoices";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import CustomerSelect from "../[invoiceId]/_components/customer-select";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { capitalize } from "@/lib/helper/texts";

export default function UpdateInvoiceForm({ invoice }: { invoice: AppInvoice }) {
  const isDisabled = invoice.status === INVOICE_STATUS.PAID;

  const form = useForm<UpdateInvoiceSchemaType>({
    resolver: zodResolver(updateInvoiceSchema),
    defaultValues: {
      customerId: invoice.project?.customerId as string,
      name: invoice.name,
      projectId: invoice.projectId,
      status: invoice.status,
      amount: invoice.amount,
      items: invoice.items as InvoiceItem[],
      dueDate: invoice.dueDate,
    },
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: UpdateInvoice,
    onSuccess: () => {
      toast.success('Invoice updated', { id: "update-invoice" });
    },
    onError: (error: any) => {
      toast.error(error.message, { id: "update-invoice" });
    },
  });

  const onSubmit = useCallback((values: UpdateInvoiceSchemaType) => {
    toast.loading("Updating invoice...", { id: "update-invoice" });
    mutate(values);
  }, [mutate])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-9 gap-6">
          <div className="grid gap-6 col-span-4">
            <div className="grid grid-cols-2 gap-6">
              <CustomerSelect form={form} />
              <div>projectId selector based on customerId</div>
            </div>

            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-9">
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex gap-1 items-center'>
                        Subject
                      </FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isDisabled} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {error && JSON.stringify(error)}

              <div className="col-span-3">
                <FormField
                  control={form.control}
                  name='status'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex gap-1 items-center'>
                        Status
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isDisabled}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Set status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            {INVOICE_STATUS_KEYS.map((status) => (
                              <SelectItem key={status} value={status}>{capitalize(status)}</SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div>items list</div>


            <Button type="submit" className="w-full" disabled={isPending}>
              {!isPending && "Save"}
              {isPending && <Loader2Icon className='animate-spin' />}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}