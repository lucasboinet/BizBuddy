'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createTaskSchema, CreateTaskSchemaType } from "@/schema/tasks";
import { CreateTask } from "@/actions/tasks/CreateTask";
import { AppProject } from "@/types/projects";
import { Textarea } from "@/components/ui/textarea";
import { TASK_STATE } from "@/types/tasks";

export default function CreateTaskForm({ project, handleSubmit }: { project: AppProject, handleSubmit: () => void }) {
  const form = useForm<CreateTaskSchemaType>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      projectId: project.id,
      boardId: project.board?.id,
      columnId: TASK_STATE.TODO,
      name: '',
      description: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: CreateTask,
    onSuccess: () => {
      toast.success('Task created', { id: "create-task" });
      handleSubmit();
    },
    onError: (error: any) => {
      toast.error(error.message, { id: "create-task" });
    },
  });

  const onSubmit = useCallback((values: CreateTaskSchemaType) => {
    toast.loading("Creating task...", { id: "create-task" });
    mutate(values);
  }, [mutate])


  return (
    <div className="w-full h-full px-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between h-full relative">
          <div className="grid gap-8 overflow-y-auto flex-grow p-1">
            <div className="grid grid-cols-1 gap-8">
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex gap-1 items-center'>
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., Setup authentification" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex gap-1 items-center'>
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="e.g., Long text to describe project sub task's context" className="resize-none min-h-72" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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