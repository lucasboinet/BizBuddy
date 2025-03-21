'use server'

import prisma from "@/lib/prisma";
import { retrieveSession } from "@/lib/sessions";
import { AppCustomer } from "@/types/customers";

export async function GetCustomer(customerId: string): Promise<AppCustomer> {
  const session = await retrieveSession();

  if (!session?.sessionId) {
    throw new Error("Unauthorized");
  }

  const customer = await prisma.customer.findUnique({
    where: {
      id: customerId,
      accountId: session.userId
    },
    include: {
      invoices: true,
      projects: true,
    }
  });

  return (customer as unknown) as AppCustomer;
}