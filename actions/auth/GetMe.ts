'use server'

import { retrieveSession } from "@/lib/sessions";
import prisma from "@/lib/prisma";
import { AuthSafeUser } from "@/types/auth";
import { UserLogout } from "./UserLogout";

export async function GetMe(): Promise<AuthSafeUser> {
  const authSession = await retrieveSession();
  const sessionId = authSession?.sessionId as string;

  if (!sessionId) {
    throw new Error('Unauthorized');
  }

  const user = await prisma.user.findUnique({
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,

      password: false,
      refreshToken: false,

      createdAt: true,
      updatedAt: true,
      settings: true,
      boards: true,
    },
    where: {
      id: authSession.userId
    }
  }) as AuthSafeUser;

  if (!user) {
    await UserLogout();
  }
  
  return user;
}