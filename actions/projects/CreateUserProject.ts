import prisma from "@/lib/primsa";
import { retrieveSession } from "@/lib/sessions";
import { createUserProjectSchema, CreateUserProjectSchemaType } from "@/schema/projects";
import { PROJECT_STATUS } from "@/types/projects";
import { redirect } from "next/navigation";

export async function CreateUserProject(form: CreateUserProjectSchemaType) {
  const session = await retrieveSession();

  if (!session?.sessionId) {
    throw new Error("Unauthorized");
  }

  const { success, data } = createUserProjectSchema.safeParse(form);

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