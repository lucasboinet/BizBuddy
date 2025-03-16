'use server'

import { generateId } from "@/lib/boards";
import prisma from "@/lib/prisma";
import { retrieveSession } from "@/lib/sessions";

export async function CreateProjectsKanbanBoard(userId: string) {
  const authSession = await retrieveSession();
  const sessionId = authSession?.sessionId as string;

  if (!sessionId) {
    throw new Error('Unauthorized');
  }

  if (authSession?.userId !== userId) {
    throw new Error('Unauthorized');
  }

  await prisma.board.create({
    data: {
      userId,
      columns: [
        { id: generateId('column'), title: "Not started" },
        { id: generateId('column'), title: "In progress" },
        { id: generateId('column'), title: "Waiting validation" },
        { id: generateId('column'), title: "Completed" },
      ]
    }
  })
}