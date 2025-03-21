'use server'

import prisma from "@/lib/prisma";
import { retrieveSession } from "@/lib/sessions";
import { createTaskSchema, CreateTaskSchemaType } from "@/schema/tasks";
import { redirect } from "next/navigation";

export async function CreateTask(form: CreateTaskSchemaType) {
  const session = await retrieveSession();

  if (!session?.sessionId) {
    throw new Error("Unauthorized");
  }

  const { success, data } = createTaskSchema.safeParse(form);

  if (!success) {
    throw new Error('Invalid form data');
  }

  await prisma.task.create({
    data: {
      boardId: data.boardId,
      name: data.name,
      description: data.description,
      columnId: data.columnId,
    }
  });

  redirect(`/projects/${data.projectId}`);
}