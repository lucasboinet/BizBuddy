'use server'

import prisma from "@/lib/prisma";
import { retrieveSession } from "@/lib/sessions";
import { AppProject } from "@/types/projects";

export async function GetProject(projectId: string): Promise<AppProject | null> {
  const session = await retrieveSession();

  if (!session?.sessionId) {
    throw new Error("Unauthorized");
  }

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
      userId: session.userId,
    },
    include: {
      customer: true,
      tags: true,
      board: {
        include: {
          tasks: true,
        }
      },
      invoices: true,
    }
  });

  return (project as unknown) as AppProject;
}