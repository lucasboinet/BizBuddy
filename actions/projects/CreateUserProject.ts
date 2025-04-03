'use server'

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

  const tagsToCreate = data.tags.filter((tag) => !tag.userId);
  const tagsToAdd = data.tags.filter((tag) => !!tag.userId);

  const project = await prisma.project.create({
    data: {
      name: data.name,
      userId: session.userId,
      dueAt: data.dueAt,
      customerId: data.customer.id,
      status: PROJECT_STATUS.CREATED,
      tags: {
        create: [
          ...tagsToCreate.map((tag) => ({ tag: { create: { name: tag.name, userId: session.userId } } })),
          ...tagsToAdd.map((tag) => ({ tag: { connect: { id: tag.id } } })),
        ]
      }
    }
  });
  

  redirect(`/projects/${project.id}`);
}