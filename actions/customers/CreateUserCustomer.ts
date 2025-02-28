'use server'

import prisma from "@/lib/primsa";
import { retrieveSession } from "@/lib/sessions";
import { createCustomerSchema, CreateCustomerSchemaType } from "@/schema/customers";
import { redirect } from "next/navigation";

export async function CreateCustomer(form: CreateCustomerSchemaType) {
  const session = await retrieveSession();

  if (!session?.sessionId) {
    throw new Error("Unauthorized");
  }

  const { success, data } = createCustomerSchema.safeParse(form);

  if (!success) {
    throw new Error('Invalid form data');
  }

  await prisma.customer.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      siret: data.siret,
      accountId: data.accountId
    }
  });

  redirect("/projects");
}