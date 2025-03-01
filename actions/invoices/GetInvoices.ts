'use server'

import prisma from "@/lib/prisma";
import { retrieveSession } from "@/lib/sessions";
import { Invoice } from "@prisma/client";

export async function GetInvoices(): Promise<Invoice[]> {
  const session = await retrieveSession();

  if (!session?.sessionId) {
    throw new Error("Unauthorized");
  }

  const invoices = await prisma.invoice.findMany({
    where: {
      customer: {
        accountId: session.userId,
      }
    },
    include: {
      customer: {
        select: {
          id: true,
          name: true,
        }
      }
    }
  });

  return invoices;
}