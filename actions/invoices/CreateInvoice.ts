'use server'

import prisma from "@/lib/primsa";
import { retrieveSession } from "@/lib/sessions";
import { createInvoiceSchema, CreateInvoiceSchemaType } from "@/schema/invoices";
import { INVOICE_STATUS } from "@/types/invoices";
import { redirect } from "next/navigation";

export async function CreateInvoice(form: CreateInvoiceSchemaType) {
  const session = await retrieveSession();

  if (!session?.sessionId) {
    throw new Error("Unauthorized");
  }

  const { success, data } = createInvoiceSchema.safeParse(form);

  if (!success) {
    throw new Error('Invalid form data');
  }

  // TODO: generate invoice id
  const invoiceId = 'INV-X';

  await prisma.invoice.create({
    data: {
      id: invoiceId,
      name: data.name,
      projectId: data.projectId, 
      status: INVOICE_STATUS.CREATED,
      amount: data.amount,
      items: data.items,
      dueDate: data.dueDate,
    }
  });

  redirect("/invoices");
}