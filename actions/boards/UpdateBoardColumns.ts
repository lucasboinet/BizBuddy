'use server'

import prisma from "@/lib/prisma";
import { retrieveSession } from "@/lib/sessions";
import { KanbanColumn } from "@/types/kanban";

export async function UpdateBoardColumns(boardId: string, columns: KanbanColumn[]) {
  const authSession = await retrieveSession();
  const sessionId = authSession?.sessionId as string;

  if (!sessionId) {
    throw new Error('Unauthorized');
  }

  await prisma.board.update({
    where: {
      id: boardId,
    },
    data: {
      columns,
    }
  })
}