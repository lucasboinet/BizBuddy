'use server'

import prisma from "@/lib/prisma";
import { retrieveSession } from "@/lib/sessions";
import { updateCompanySettingsSchema, UpdateCompanySettingsSchemaType } from "@/schema/settings";
import { AppSettings } from "@/types/settings";
import { redirect } from "next/navigation";

export async function UpdateCompanySettings(form: UpdateCompanySettingsSchemaType) {
  const session = await retrieveSession();
      
  if (!session?.sessionId) {
    throw new Error("Unauthorized");
  }

  const { success, data } = updateCompanySettingsSchema.safeParse(form);

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

  await prisma.setting.update({
    where: {
      userId: session.userId
    },
    data: { ...settingsData }
  }) as AppSettings;

  redirect('/settings?tab=company')
}