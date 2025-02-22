import prisma from "@/lib/primsa";

export async function getSession(sessionId: string) { 
  const session = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      user: {
        select: {
          id: true,
          firstname: true,
          lastname: true,
          email: true,
          password: false,
          refreshToken: false,
          createdAt: true,
          updatedAt: true,
        }
      }
    }
  });

  return session;
}