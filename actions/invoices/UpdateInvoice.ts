'use server'

import prisma from "@/lib/primsa";
import { updateInvoiceSchema, UpdateInvoiceSchemaType } from "@/schema/invoices";
import { INVOICE_STATUS } from "@/types/invoices";
import { redirect } from "next/navigation";

export async function UpdateInvoice(form: UpdateInvoiceSchemaType) {
  const { success, data } = updateInvoiceSchema.safeParse(form);

  if (!success) {
    throw new Error('Invalid form data');
  }

  await prisma.invoice.update({
    where: {
      id: data.invoiceId,
    },
    data: {
      name: data.name,
      projectId: data.projectId, 
      status: INVOICE_STATUS.CREATED,
      amount: data.amount,
      items: data.items,
      dueDate: data.dueDate,
    }
  });

  redirect(`/invoices/${data.invoiceId}`);
}