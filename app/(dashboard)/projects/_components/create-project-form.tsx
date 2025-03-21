'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomerSelect from "@/components/customer-select";
import { CalendarIcon, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppCustomer } from "@/types/customers";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { createProjectSchema, CreateProjectSchemaType } from "@/schema/projects";
import { CreateProject } from "@/actions/projects/CreateUserProject";

export default function CreateInvoiceForm({ customers }: { customers: AppCustomer[] }) {

  const form = useForm<CreateProjectSchemaType>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: '',
      customer: undefined,
      dueAt: new Date(),
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: CreateProject,
    onSuccess: () => {
      toast.success('Project created', { id: "create-project" });
    },
    onError: (error: any) => {
      toast.error(error.message, { id: "create-project" });
    },
  });

  const onSubmit = useCallback((values: CreateProjectSchemaType) => {
    toast.loading("Creating project...", { id: "create-project" });
    mutate(values);
  }, [mutate])


  return (
    <div className="w-full h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between h-full relative">
          <div className="grid gap-8 overflow-y-auto flex-grow">
            <div className="grid grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name='customer'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex gap-1 items-center'>
                      Customer
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
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex gap-1 items-center'>
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., Create CRM application" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='dueAt'
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

          </div>
          <Button type="submit" className="w-full mt-6 sticky bottom-0" disabled={isPending}>
            {!isPending && "Save"}
            {isPending && <Loader2Icon className='animate-spin' />}
          </Button>
        </form>
      </Form>
    </div>
  )
}