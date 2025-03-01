import prisma from "@/lib/prisma";
import { retrieveSession } from "@/lib/sessions";
import { createProjectSchema, CreateProjectSchemaType } from "@/schema/projects";
import { PROJECT_STATUS } from "@/types/projects";
import { redirect } from "next/navigation";

export async function CreateProject(form: CreateProjectSchemaType) {
  const session = await retrieveSession();

  if (!session?.sessionId) {
    throw new Error("Unauthorized");
  }

  const { success, data } = createProjectSchema.safeParse(form);

  if (!success) {
    throw new Error('Invalid form data');
  }

  await prisma.project.create({
    data: {
      name: data.name,
      accountId: session.userId,
      customerId: data.customerId,
      status: PROJECT_STATUS.CREATED,
    }
  });

  redirect("/projects");
}