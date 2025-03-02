'use server'

import prisma from "@/lib/prisma";
import { retrieveSession } from "@/lib/sessions";
import { updateAccountSettingsSchema, UpdateAccountSettingsSchemaType } from "@/schema/settings";
import { AppSettings } from "@/types/settings";
import { redirect } from "next/navigation";

export async function UpdateAccountSettings(form: UpdateAccountSettingsSchemaType, tab?: string) {
  const session = await retrieveSession();
      
  if (!session?.sessionId) {
    throw new Error("Unauthorized");
  }

  const { success, data } = updateAccountSettingsSchema.safeParse(form);

  if (!success) {
    throw new Error('Invalid form data');
  }

  const settings = await prisma.setting.findUnique({ where: { userId: session.userId } });

  if (!settings) {
    await prisma.setting.create({
      data: {
        userId: session.userId
      }
    })
  }

  const settingsData = {
    address: data.address,
  }

  const userData = {
    firstname: data.firstname,
    lastname: data.lastname,
  }

  await prisma.setting.update({
    where: {
      userId: session.userId
    },
    data: { ...settingsData }
  }) as AppSettings;

  await prisma.user.update({
    where: {
      id: session.userId,
    },
    data: {
      ...userData
    }
  })

  redirect(`/settings${tab ? '?tab=' + tab : ''}`)
}