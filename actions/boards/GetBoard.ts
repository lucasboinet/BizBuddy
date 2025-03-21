'use server'

import prisma from "@/lib/prisma";
import { retrieveSession } from "@/lib/sessions";
import { AppBoard } from "@/types/board";

export async function GetBoard(boardId: string): Promise<AppBoard | undefined> {
  const authSession = await retrieveSession();
  const sessionId = authSession?.sessionId as string;

  if (!sessionId) {
    throw new Error('Unauthorized');
  }

  const board = await prisma.board.findUnique({
    where: {
      id: boardId
    },
    include: {
      tasks: true
    }
  });

  if (authSession?.userId !== board?.userId) {
    throw new Error('Not found');
  }

  return (board as unknown) as AppBoard;
}