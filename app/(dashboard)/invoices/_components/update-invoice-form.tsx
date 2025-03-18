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
import CustomerSelect from "../../../../components/customer-select";
import { CalendarIcon, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { capitalize } from "@/lib/helper/texts";
import ItemSelect from "./items-select";
import { useAuthSession } from "@/components/context/AuthSessionContext";
import { Skeleton } from "@/components/ui/skeleton";
import InvoicePdfViewer from "./invoice-pdf-viewer";
import { useDebounce } from "@/hooks/use-debounce";
import { AppCustomer } from "@/types/customers";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

export default function UpdateInvoiceForm({ invoice, customers }: { invoice: AppInvoice, customers: AppCustomer[] }) {
  const isDisabled = invoice.status === INVOICE_STATUS.PAID;
  const { user, loading } = useAuthSession();

  const form = useForm<UpdateInvoiceSchemaType>({
    resolver: zodResolver(updateInvoiceSchema),
    defaultValues: {
      id: invoice.id,
      customer: invoice.customer,
      name: invoice.name,
      status: invoice.status,
      items: invoice.items as InvoiceItem[],
      dueDate: invoice.dueDate,
      note: invoice.note,
    },
  });

  const debounceFormValues = useDebounce(form.getValues(), 2000);

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
                    <div className="flex flex-col text-sm">
                      <span className="flex flex-row items-center gap-1.5">
                        {user?.firstname} {user?.lastname}
                      </span>
                      <span>{user?.email}</span>
                      <span>{user?.settings?.address?.line1}, {user?.settings?.address?.line2 && user?.settings?.address?.line2}</span>
                      <span>{user?.settings?.address?.city}, {user?.settings?.address?.postalCode}</span>
                    </div>
                  )}

                  {loading && (
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-row items-center gap-1.5">
                        <Skeleton className="max-w-20 w-full h-6" /> <Skeleton className="max-w-20 w-full h-6" />
                      </div>
                      <Skeleton className="max-w-60 w-full h-6" />
                      <Skeleton className="max-w-72 w-full h-6" />
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-8">
                  <FormField
                    control={form.control}
                    name='customer'
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
                name='dueDate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex gap-1 items-center'>
                      Due date
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date()
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              <FormField
                control={form.control}
                name='note'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex gap-1 items-center'>
                      Note
                      <span className="text-xs">(optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        value={field.value || undefined}
                        className="resize-none"
                        disabled={isDisabled}
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

      <div className="w-full xl:w-3/5 flex items-start justify-center bg-primary-foreground p-6">
        <InvoicePdfViewer invoice={debounceFormValues as AppInvoice} />
      </div>
    </div>
  )
}