'use server'

import prisma from "@/lib/prisma";
import { retrieveSession } from "@/lib/sessions";
import { KanbanColumn, KanbanId } from "@/types/kanban";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

export async function UpdateBoardColumn(boardId: string, columnId: KanbanId, title: string) {
  const authSession = await retrieveSession();
  const sessionId = authSession?.sessionId as string;

  if (!sessionId) {
    throw new Error('Unauthorized');
  }

  const board = await prisma.board.findUnique({ where: { id: boardId }});

  if (!board) {
    throw Error("Board not found")
  }

  const newColumns = (board.columns as KanbanColumn[]).map((col) => {
    if (col.id !== columnId) return col;
    return { ...col, title }
  });

  await prisma.board.update({
    where: {
      id: boardId,
    },
    data: {
      columns: newColumns as Prisma.InputJsonValue,
    }
  })

  redirect('/projects')
}