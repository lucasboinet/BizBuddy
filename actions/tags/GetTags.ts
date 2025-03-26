'use server'

import prisma from "@/lib/prisma";
import { retrieveSession } from "@/lib/sessions";
import { Tag } from "@prisma/client";

export async function GetTags(): Promise<Tag[]> {
  const session = await retrieveSession();

  if (!session?.sessionId) {
    throw new Error("Unauthorized");
  }

  const tags = await prisma.tag.findMany({
    where: {
      userId: session.userId
    }
  });

  return tags;
}