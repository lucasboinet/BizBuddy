import prisma from "@/lib/primsa";
import { retrieveSession } from "@/lib/sessions";
import { Customer } from "@prisma/client";

export async function GetCustomers(): Promise<Customer[]> {
  const session = await retrieveSession();

  if (!session?.sessionId) {
    throw new Error("Unauthorized");
  }

  const customers = await prisma.customer.findMany({
    where: {
      accountId: session.userId
    }
  });

  return customers;
}