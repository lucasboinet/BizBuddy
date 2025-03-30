'use server'

import prisma from "@/lib/prisma";
import { retrieveSession } from "@/lib/sessions";
import { AppTask } from "@/types/tasks";
import { redirect } from "next/navigation";

export async function UpdateTask(taskId: string, changes: Partial<AppTask>) {
  const session = await retrieveSession();
  
  if (!session?.sessionId) {
    throw new Error("Unauthorized");
  }

  const task = await prisma.task.findUnique({
    where: { id: taskId },
    include: { board: true },
  });

  if (!task) {
    throw new Error("Task not found");
  }

  if (task.board.userId !== session.userId) {
    throw new Error("Unauthorized");
  }

  await prisma.task.update({
    where: { id: taskId },
    data: { ...changes },
  });

  redirect(`/projects/${task.board.projectId}`);
}