import prisma from "@/lib/primsa";
import { retrieveSession } from "@/lib/sessions";

export async function getSession(sessionId: string) {
  const authSession = await retrieveSession();

  if (!authSession?.sessionId) {
    throw new Error("Unauthorized");
  }

  const session = await prisma.session.findUnique({
    where: {
      id: sessionId,
    }
  });

  return session;
}