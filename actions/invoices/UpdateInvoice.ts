'use server'

import { roundNumber } from "@/lib/helper/number";
import prisma from "@/lib/prisma";
import { retrieveSession } from "@/lib/sessions";
import { updateInvoiceSchema, UpdateInvoiceSchemaType } from "@/schema/invoices";
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

  const invoiceSubtotal = roundNumber(data.items.reduce((acc, item) => acc + (item.quantity * item.amount), 0));
  const invoiceVAT = roundNumber(invoiceSubtotal * ((data.vat / 100) + 1));

  await prisma.invoice.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
      customerId: data.customer.id, 
      projectId: data.project.id,
      status: data.status,
      amount: invoiceVAT,
      items: data.items,
      dueDate: data.dueDate,
      note: data.note,
      vat: data.vat,
    }
  });

  redirect(`/invoices/${data.id}`);
}