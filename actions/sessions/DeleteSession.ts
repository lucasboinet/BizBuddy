import prisma from "@/lib/primsa";
import { cookies } from "next/headers";

export async function deleteSession(id: string) { 
  await prisma.session.delete({
    where: {
      id,
    }
  });
 
 
  const cookieStore = await cookies();
  cookieStore.delete('session');
}