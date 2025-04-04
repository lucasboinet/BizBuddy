'use server'

import prisma from "@/lib/prisma";
import { retrieveSession } from "@/lib/sessions";
import { AppInvoice } from "@/types/invoices";

export async function GetLastInvoices(): Promise<AppInvoice[]> {
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
    },
    take: 5,
    orderBy: {
      createdAt: 'desc',
    }
  }) as AppInvoice[];

  return invoices;
}