'use server'

import { redirect } from "next/navigation";
import { retrieveSession } from "@/lib/sessions";
import { getSession } from "../sessions/GetSession";
import { deleteSession } from "../sessions/DeleteSession";
import { cookies } from "next/headers";

export async function UserLogout() {
  const authSession = await retrieveSession();

  if (!authSession) {
    redirect(`/signin`);
  }

  const exisingSession = await getSession(authSession.sessionId);

  if (!exisingSession) {
    const cookieStore = await cookies();
    cookieStore.delete('session');
    redirect(`/signin`);
  }

  await deleteSession(exisingSession.id);

  redirect(`/signin`);
}