'use server'

import prisma from "@/lib/prisma";
import { retrieveSession } from "@/lib/sessions";
import { Project } from "@prisma/client";
import { redirect } from "next/navigation";

export async function UpdateProject(projectId: string, changes: Partial<Project>, path: string = "/projects") {
  const session = await retrieveSession();

  if (!session?.sessionId) {
    throw new Error("Unauthorized");
  }

  const projet = await prisma.project.findUnique({ where: { id: projectId } });

  if (!projet) {
    throw new Error("Project not found");
  }

  if (projet.userId !== session.userId) {
    throw new Error("Unauthorized");
  }

  await prisma.project.update({
    where: {
      id: projectId
    },
    data: {
      ...changes,
    }
  });

  redirect(path);
}