import prisma from "@/lib/primsa";
import { Customer } from "@prisma/client";

export async function SearchCustomers(search: string): Promise<Customer[]> {

  const customers = await prisma.customer.findMany({
    where: {
      OR: [
        {
          name: {
            contains: search
          }
        },
        {
          email: {
            contains: search
          }
        }
      ]
    }
  });

  console.log({ customers })

  return customers;
}