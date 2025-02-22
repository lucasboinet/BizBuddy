'use server'

import { cookies } from "next/headers";
import { decrypt } from "@/lib/sessions";
import { getSession } from "../sessions/getSession";
import { User } from "@/types/auth";

export async function GetMe(): Promise<User> {
  const cookie = (await cookies()).get('session')?.value;
  const localSession = await decrypt(cookie);
  const sessionId = localSession?.sessionId as string;

  if (!sessionId) {
    throw new Error('Unauthorized');
  }

  const session = await getSession(sessionId);

  if (!session) {
    throw new Error('Unauthorized');
  }
  
  return session.user as User;
}