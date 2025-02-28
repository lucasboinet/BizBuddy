'use server'

import prisma from "@/lib/primsa";
import { retrieveSession } from "@/lib/sessions";
import { Invoice } from "@prisma/client";

export async function GetInvoices(): Promise<Invoice[]> {
  const session = await retrieveSession();

  if (!session?.sessionId) {
    throw new Error("Unauthorized");
  }

  const invoices = await prisma.invoice.findMany({
    where: {
      project: {
        accountId: session.userId
      }
    },
    include: {
      project: {
        select: {
          id: true,
          name: true,
          customer: true,
        }
      }
    }
  });

  return invoices;
}