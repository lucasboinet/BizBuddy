'use server'

import prisma from "@/lib/prisma";
import { retrieveSession } from "@/lib/sessions";
import { cookies } from "next/headers";

export async function deleteSession(id: string) {
  const session = await retrieveSession();
  
  if (!session?.sessionId) {
    throw new Error("Unauthorized");
  }

  await prisma.session.delete({
    where: {
      id,
    }
  });
 
 
  const cookieStore = await cookies();
  cookieStore.delete('session');
}