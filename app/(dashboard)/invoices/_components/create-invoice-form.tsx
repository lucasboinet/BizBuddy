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
import CustomerSelect from "@/components/customer-select";
import { CalendarIcon, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ItemSelect from "./items-select";
import { useAuthSession } from "@/components/context/AuthSessionContext";
import { Skeleton } from "@/components/ui/skeleton";
import { AppCustomer } from "@/types/customers";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { AppProject } from "@/types/projects";
import Link from "next/link";
import { Label } from "@/components/ui/label";

interface Props {
  customers?: AppCustomer[],
  selectedCustomer?: AppCustomer,
  selectedProjectId?: AppProject["id"],
}

export default function CreateInvoiceForm({ customers, selectedCustomer, selectedProjectId }: Props) {
  const { user, loading } = useAuthSession();

  const form = useForm<CreateInvoiceSchemaType>({
    resolver: zodResolver(createInvoiceSchema),
    defaultValues: {
      customer: selectedCustomer ?? undefined,
      projectId: selectedProjectId,
      name: '',
      items: [{ label: '', quantity: 1, amount: 0 }],
      dueDate: new Date(),
      note: '',
      vat: 0,
    },
  });

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
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between overflow-hidden h-[70vh]">
          <div className="space-y-8 overflow-y-auto p-4">
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
                    {user?.settings?.address && <span>{user?.settings?.address?.line1}{user?.settings?.address?.line2 && `, ${user?.settings?.address?.line2}`}</span>}
                    {user?.settings?.address && <span>{user?.settings?.address?.city}, {user?.settings?.address?.postalCode}</span>}
                    {!user?.settings?.address && (
                      <p>Go to your <Link href="/settings?tab=company" className="font-bold underline">company settings</Link> to define company address</p>
                    )}
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

            {!selectedCustomer && <FormField
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
                      items={customers || []}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />}

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

            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-4">
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex gap-1 items-center'>
                        Subject
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter invoice subject" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-1">
                <FormField
                  control={form.control}
                  name='vat'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex gap-1 items-center'>
                        VAT
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input {...field} type="number" placeholder="0" min={0} className="pr-6" />
                          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 leading-none">%</span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

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
                      placeholder="Additional note here"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label>IBAN</Label>
                  <Input value={user?.settings?.iban || ''} disabled placeholder="Your IBAN here" />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>BIC</Label>
                  <Input value={user?.settings?.bic || ''} disabled placeholder="Your BIC here" />
                </div>
              </div>
              {!user?.settings?.iban && (
                <p className="text-sm">Go to your <Link href="/settings?tab=billing" className="font-bold underline">billing settings</Link> to define billing informations</p>
              )}
            </div>
          </div>
          <Button type="submit" className="w-full mt-6" disabled={isPending}>
            {!isPending && "Save"}
            {isPending && <Loader2Icon className='animate-spin' />}
          </Button>
        </form>
      </Form>
    </div>
  )
}