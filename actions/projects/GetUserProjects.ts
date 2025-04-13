'use server'

import prisma from "@/lib/prisma";
import { retrieveSession } from "@/lib/sessions";
import { AppProject } from "@/types/projects";

export async function GetUserProjects(): Promise<AppProject[]> {
  const session = await retrieveSession();

  if (!session?.sessionId) {
    throw new Error("Unauthorized");
  }

  const projects = await prisma.project.findMany({
    where: {
      userId: session.userId,
      deletedAt: null,
    },
    include: {
      customer: true,
      tags: {
        include: {
          tag: true,
        }
      }
    },
    orderBy: {
      createdAt: 'asc'
    }
  }) as AppProject[];

  return projects;
}