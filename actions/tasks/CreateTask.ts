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

  let boardId = data.boardId;
  if (!boardId) {
    const board = await prisma.board.create({
      data: {
        userId: session.userId,
        projectId: data.projectId,
      }
    })

    boardId = board.id;
  }

  await prisma.task.create({
    data: {
      boardId,
      name: data.name,
      description: data.description,
      columnId: data.columnId,
    }
  });

  redirect(`/projects/${data.projectId}`);
}