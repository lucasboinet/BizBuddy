'use server'

import prisma from "@/lib/prisma";
import { retrieveSession } from "@/lib/sessions";
import { updateAccountSettingsSchema, UpdateAccountSettingsSchemaType } from "@/schema/settings";
import { redirect } from "next/navigation";

export async function UpdateAccountSettings(form: UpdateAccountSettingsSchemaType) {
  const session = await retrieveSession();
      
  if (!session?.sessionId) {
    throw new Error("Unauthorized");
  }

  const { success, data } = updateAccountSettingsSchema.safeParse(form);

  if (!success) {
    throw new Error('Invalid form data');
  }


  const userData = {
    firstname: data.firstname,
    lastname: data.lastname,
  }

  await prisma.user.update({
    where: {
      id: session.userId,
    },
    data: {
      ...userData
    }
  })

  redirect('/settings')
}