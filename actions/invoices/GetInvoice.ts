'use server'

import prisma from "@/lib/prisma";
import { retrieveSession } from "@/lib/sessions";
import { AppInvoice } from "@/types/invoices";

export async function GetInvoice(invoiceId: string): Promise<AppInvoice | null> {
  const session = await retrieveSession();

  if (!session?.sessionId) {
    throw new Error("Unauthorized");
  }

  const invoice = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      customer: {
        accountId: session.userId
      }
    },
    include: {
      customer: true,
    }
  }) as AppInvoice;

  return invoice;
}