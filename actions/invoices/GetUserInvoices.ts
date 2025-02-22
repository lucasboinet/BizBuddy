import prisma from "@/lib/primsa";
import { retrieveSession } from "@/lib/sessions";
import { Invoice } from "@prisma/client";

export async function GetUserInvoices(): Promise<Invoice[]> {
  const session = await retrieveSession();

  if (!session?.sessionId) {
    throw new Error("Unauthorized");
  }

  const customers = await prisma.invoice.findMany({
    where: {
      project: {
        accountId: session.userId
      }
    }
  });

  return customers;
}