import prisma from "@/lib/primsa";
import { retrieveSession } from "@/lib/sessions";
import { Project } from "@prisma/client";

export async function GetProjects(): Promise<Project[]> {
  const session = await retrieveSession();

  if (!session?.sessionId) {
    throw new Error("Unauthorized");
  }

  const projects = await prisma.project.findMany({
    where: {
      accountId: session.userId
    }
  });

  return projects;
}