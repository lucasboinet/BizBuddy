'use server'

import { retrieveSession } from "@/lib/sessions";
import prisma from "@/lib/primsa";
import { AuthSafeUser } from "@/types/auth";

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
    },
    where: {
      id: authSession.userId
    }
  })

  if (!user) {
    throw new Error('User do not exist');
  }
  
  return user;
}