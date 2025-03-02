'use server'

import prisma from "@/lib/prisma";
import { retrieveSession } from "@/lib/sessions";
import { AppSettings } from "@/types/settings";

export async function GetSettings(): Promise<AppSettings | null> {
  const session = await retrieveSession();

  if (!session?.sessionId) {
    throw new Error("Unauthorized");
  }

  const settings = await prisma.setting.findUnique({
    where: {
      userId: session.userId
    }
  }) as AppSettings;

  return settings;
}