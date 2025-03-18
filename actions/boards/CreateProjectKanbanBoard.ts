'use server'

import { generateId } from "@/lib/boards";
import prisma from "@/lib/prisma";
import { retrieveSession } from "@/lib/sessions";
import { redirect } from "next/navigation";

export async function CreateProjectKanbanBoard(projectId: string) {
  const authSession = await retrieveSession();
  const sessionId = authSession?.sessionId as string;

  if (!sessionId) {
    throw new Error('Unauthorized');
  }

  await prisma.board.create({
    data: {
      userId: authSession.userId,
      projectId,
      columns: [
        { id: generateId('column'), title: "Not started" },
        { id: generateId('column'), title: "In progress" },
        { id: generateId('column'), title: "Waiting validation" },
        { id: generateId('column'), title: "Completed" },
      ]
    }
  })

  redirect(`/projects/${projectId}`)
}