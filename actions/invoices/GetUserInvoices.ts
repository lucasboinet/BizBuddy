import { waitFor } from "@/lib/helper/waitFor";
import prisma from "@/lib/primsa";
import { retrieveSession } from "@/lib/sessions";
import { Invoice } from "@prisma/client";

export async function GetUserInvoices(): Promise<Invoice[]> {
  const session = await retrieveSession();

  await waitFor(3000);

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