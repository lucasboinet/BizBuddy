import prisma from "@/lib/primsa";
import { retrieveSession } from "@/lib/sessions";
import { createUserCustomerSchema, CreateUserCustomerSchemaType } from "@/schema/customers";
import { redirect } from "next/navigation";

export async function CreateUserCustomer(form: CreateUserCustomerSchemaType) {
  const session = await retrieveSession();

  if (!session?.sessionId) {
    throw new Error("Unauthorized");
  }

  const { success, data } = createUserCustomerSchema.safeParse(form);

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