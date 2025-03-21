'use server'

import prisma from "@/lib/prisma";
import { retrieveSession } from "@/lib/sessions";
import { AppCustomer } from "@/types/customers";

export async function GetCustomers(): Promise<AppCustomer[]> {
  const session = await retrieveSession();

  if (!session?.sessionId) {
    throw new Error("Unauthorized");
  }

  const customers = await prisma.customer.findMany({
    where: {
      accountId: session.userId
    },
  }) as AppCustomer[];

  return customers;
}