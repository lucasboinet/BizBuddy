import prisma from "@/lib/primsa";
import { retrieveSession } from "@/lib/sessions";
import { createUserInvoiceSchema, CreateUserInvoiceSchemaType } from "@/schema/invoices";
import { INVOICE_STATUS } from "@/types/invoices";
import { redirect } from "next/navigation";

export async function CreateUserInvoice(form: CreateUserInvoiceSchemaType) {
  const session = await retrieveSession();

  if (!session?.sessionId) {
    throw new Error("Unauthorized");
  }

  const { success, data } = createUserInvoiceSchema.safeParse(form);

  if (!success) {
    throw new Error('Invalid form data');
  }

  await prisma.invoice.create({
    data: {
      name: data.name,
      projectId: data.projectId, 
      status: INVOICE_STATUS.CREATED,
      amount: data.amount,
      items: data.items,
      dueDate: data.dueDate,
    }
  });

  redirect("/projects");
}