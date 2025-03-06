'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createInvoiceSchema, CreateInvoiceSchemaType } from "@/schema/invoices";
import { CreateInvoice } from "@/actions/invoices/CreateInvoice";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AppInvoice } from "@/types/invoices";
import CustomerSelect from "./customer-select";
import { CalendarIcon, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ItemSelect from "./items-select";
import { useAuthSession } from "@/components/context/AuthSessionContext";
import { Skeleton } from "@/components/ui/skeleton";
import InvoicePdfViewer from "./invoice-pdf-viewer";
import { useDebounce } from "@/hooks/use-debounce";
import { AppCustomer } from "@/types/customers";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function CreateInvoiceForm({ customers }: { customers: AppCustomer[] }) {
  const { user, loading } = useAuthSession();

  const form = useForm<CreateInvoiceSchemaType>({
    resolver: zodResolver(createInvoiceSchema),
    defaultValues: {
      customer: undefined,
      name: '',
      items: [{ label: '', quantity: 1, amount: 0 }],
      dueDate: new Date(),
      note: '',
    },
  });

  const debounceFormValues: unknown = useDebounce(form.getValues(), 2000);

  const { mutate, isPending } = useMutation({
    mutationFn: CreateInvoice,
    onSuccess: () => {
      toast.success('Invoice created', { id: "create-invoice" });
    },
    onError: (error: any) => {
      toast.error(error.message, { id: "create-invoice" });
    },
  });

  const onSubmit = useCallback((values: CreateInvoiceSchemaType) => {
    toast.loading("Creating invoice...", { id: "create-invoice" });
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                      <Input {...field} />
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