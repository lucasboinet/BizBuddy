'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateCustomer } from "@/actions/customers/CreateCustomer";
import { createCustomerSchema, CreateCustomerSchemaType } from "@/schema/customers";
import { Loader2Icon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

export default function CreateCustomerForm() {
  const form = useForm<CreateCustomerSchemaType>({
    resolver: zodResolver(createCustomerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: {
        line1: '',
        line2: '',
        postalCode: '',
        city: '',
      },
      siret: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: CreateCustomer,
    onSuccess: () => {
      toast.success('Customer added', { id: "add-customer" });
    },
    onError: (error: any) => {
      toast.error(error.message, { id: "add-customer" });
    },
  });

  const onSubmit = useCallback((values: CreateCustomerSchemaType) => {
    toast.loading("Adding customer...", { id: "add-customer" });
    mutate(values);
  }, [mutate])


  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between overflow-hidden h-[70vh]">
          <div className="space-y-8 overflow-y-auto p-4">

            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex gap-1 items-center'>
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Acme Inc." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex gap-1 items-center'>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="acme@inc.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex gap-1 items-center'>
                    Phone
                    <span className="text-xs font-normal">(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="00 00 00 00 00" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <div className="flex flex-col gap-6">
              <Label>Address</Label>
              <Separator />
              <FormField
                control={form.control}
                name='address.line1'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex gap-1 items-center'>
                      Line 1
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Av. Gustave Eiffel" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='address.line2'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex gap-1 items-center'>
                      Line 2
                      <span className="text-xs">(optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="2nd floor" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name='address.postalCode'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex gap-1 items-center'>
                        Postal code
                      </FormLabel>
                      <FormControl>
                        <Input type="text" {...field} placeholder="75007" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='address.city'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex gap-1 items-center'>
                        City
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Paris" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name='siret'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex gap-1 items-center'>
                    Siret
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="739 285 605 146 07" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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