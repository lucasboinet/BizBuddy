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
import CustomerSelect from "./customer-select";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { capitalize } from "@/lib/helper/texts";
import ItemSelect from "./items-select";
import { Customer } from "@prisma/client";
import { useAuthSession } from "@/components/context/AuthSessionContext";
import { Skeleton } from "@/components/ui/skeleton";
import InvoicePdfViewer from "./invoice-pdf-viewer";

export default function UpdateInvoiceForm({ invoice, customers }: { invoice: AppInvoice, customers: Customer[] }) {
  const isDisabled = invoice.status === INVOICE_STATUS.PAID;
  const { user, loading } = useAuthSession();

  const form = useForm<UpdateInvoiceSchemaType>({
    resolver: zodResolver(updateInvoiceSchema),
    defaultValues: {
      customerId: invoice.project?.customer?.id as string,
      name: invoice.name,
      invoiceId: invoice.id,
      projectId: invoice.projectId,
      status: invoice.status,
      amount: invoice.amount,
      items: invoice.items as InvoiceItem[],
      dueDate: invoice.dueDate,
    },
  });

  const { mutate, isPending } = useMutation({
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
    <div className="h-full flex flex-col-reverse xl:flex-row xl:justify-between gap-6">
      <div className="w-full xl:w-2/5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between h-full">
            <div className="grid gap-8">
              <div className="bg-primary-foreground p-4 rounded-md border">
                <span className="text-sm mb-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex gap-1 items-center">
                  Bill from
                </span>

                <div>
                  {!loading && (
                    <div className="flex flex-row items-center gap-1.5">
                      <span>{user?.firstname}</span> <span>{user?.lastname}</span>
                    </div>
                  )}

                  {loading && (
                    <div className="flex flex-row items-center gap-1.5">
                      <Skeleton className="max-w-20 w-full h-6" /> <Skeleton className="max-w-20 w-full h-6" />
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-8">
                  <FormField
                    control={form.control}
                    name='customerId'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='flex gap-1 items-center'>
                          Bill to
                        </FormLabel>
                        <FormControl>
                          <CustomerSelect
                            onValueChange={field.onChange}
                            value={field.value}
                            items={customers}
                            disabled={isDisabled}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-4">
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

              <FormField
                control={form.control}
                name='items'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex gap-1 items-center'>
                      Items
                    </FormLabel>
                    <FormControl>
                      <ItemSelect
                        value={field.value}
                        onValueChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {!isPending && "Save"}
              {isPending && <Loader2Icon className='animate-spin' />}
            </Button>
          </form>
        </Form>
      </div>

      <div className="w-full xl:w-3/5 flex justify-center bg-primary-foreground p-6">
        <InvoicePdfViewer invoice={(form.getValues() as unknown) as AppInvoice} />
      </div>
    </div>
  )
}