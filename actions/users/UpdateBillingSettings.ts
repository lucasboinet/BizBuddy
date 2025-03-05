'use server'

import prisma from "@/lib/prisma";
import { retrieveSession } from "@/lib/sessions";
import { updateBillingSettingsSchema, UpdateBillingSettingsSchemaType } from "@/schema/settings";
import { AppSettings } from "@/types/settings";
import { redirect } from "next/navigation";

export async function UpdateBillingSettings(form: UpdateBillingSettingsSchemaType) {
  const session = await retrieveSession();
      
  if (!session?.sessionId) {
    throw new Error("Unauthorized");
  }

  const { success, data } = updateBillingSettingsSchema.safeParse(form);

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
    bic: data.bic.toUpperCase(),
    iban: data.iban.toUpperCase(),
  }

  await prisma.setting.update({
    where: {
      userId: session.userId
    },
    data: { ...settingsData }
  }) as AppSettings;

  redirect('/settings?tab=billing')
}