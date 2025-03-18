'use server'

import prisma from "@/lib/prisma";
import { retrieveSession } from "@/lib/sessions";
import { Project } from "@prisma/client";
import { redirect } from "next/navigation";

export async function UpdateTimelineProject(projectId: string, changes: Partial<Project>) {
  const session = await retrieveSession();

  if (!session?.sessionId) {
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

  redirect("/projects");
}