'use server'

import prisma from "@/lib/prisma";
import { retrieveSession } from "@/lib/sessions";
import { createInvoiceSchema, CreateInvoiceSchemaType } from "@/schema/invoices";
import { INVOICE_STATUS } from "@/types/invoices";
import { endOfMonth, getMonth, getYear, startOfMonth } from "date-fns";
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

  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const invoiceCountMonth = await prisma.invoice.count({
    where: {
      AND: [
        {
          createdAt: {
            gte: monthStart,
          }
        },
        {
          createdAt: {
            lte: monthEnd,
          }
        }
      ]
    }
  })

  const month = getMonth(today);
  const invoiceId = `INV-${getYear(today)}${month > 9 ? month : `0${month}`}-${invoiceCountMonth + 1}`;

  await prisma.invoice.create({
    data: {
      id: invoiceId,
      name: data.name,
      customerId: data.customer.id, 
      status: INVOICE_STATUS.CREATED,
      amount: data.items.reduce((acc, item) => acc + (item.quantity * item.amount), 0),
      items: data.items,
      dueDate: data.dueDate,
      note: data.note,
    }
  });

  redirect("/invoices");
}