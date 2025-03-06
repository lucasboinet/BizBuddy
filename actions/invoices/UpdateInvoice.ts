'use server'

import prisma from "@/lib/prisma";
import { retrieveSession } from "@/lib/sessions";
import { updateInvoiceSchema, UpdateInvoiceSchemaType } from "@/schema/invoices";
import { INVOICE_STATUS } from "@/types/invoices";
import { redirect } from "next/navigation";

export async function UpdateInvoice(form: UpdateInvoiceSchemaType) {
  const session = await retrieveSession();
    
  if (!session?.sessionId) {
    throw new Error("Unauthorized");
  }

  const { success, data } = updateInvoiceSchema.safeParse(form);

  if (!success) {
    throw new Error('Invalid form data');
  }

  await prisma.invoice.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
      customerId: data.customer.id, 
      status: INVOICE_STATUS.CREATED,
      amount: data.items.reduce((acc, item) => acc + (item.quantity * item.amount), 0),
      items: data.items,
      dueDate: data.dueDate,
      note: data.note,
    }
  });

  redirect(`/invoices/${data.id}`);
}