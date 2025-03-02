'use server'

import prisma from "@/lib/prisma";
import { encrypt } from "@/lib/sessions";
import { cookies } from "next/headers";

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
 
  const session = await prisma.session.create({
    data: {
      userId,
      expiresAt,
    }
  });
 
  const sessionId = session.id;
  const encryptedId = await encrypt({ userId, sessionId, expiresAt });
 
  const cookieStore = await cookies()
  cookieStore.set('session', encryptedId, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}