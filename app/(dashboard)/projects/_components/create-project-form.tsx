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
import { TagsInput } from "@/components/tags-input";
import { Tag } from "@prisma/client";

export default function CreateProjectForm({ customers, tags, selectedCustomer }: { customers?: AppCustomer[], tags?: Tag[], selectedCustomer?: AppCustomer }) {
  const form = useForm<CreateProjectSchemaType>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: '',
      tags: [],
      customer: selectedCustomer ?? undefined,
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
          <div className="grid gap-8 px-1 pb-1 overflow-y-auto flex-grow">
            <div className={cn("grid gap-8", !!selectedCustomer ? "grid-cols-1" : "grid-cols-2")}>
              {!selectedCustomer && (
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
                          items={customers || []}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

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
                  <Popover modal>
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
                        className="z-50"
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
              name='tags'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex gap-1 items-center'>
                    Tags
                  </FormLabel>
                  <FormControl>
                    <TagsInput
                      placeholder="Add tags..."
                      onChange={field.onChange}
                      defaultTags={field.value}
                      suggestedTags={tags}
                      maxTags={5}
                    />
                  </FormControl>
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