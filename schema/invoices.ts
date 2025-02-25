import { INVOICE_STATUS } from '@/types/invoices';
import { z } from 'zod';

export const invoiceItemsSchema = z.object({

})

export const createUserInvoiceSchema = z.object({
  name: z.string().max(100),
  projectId: z.string().max(50), 
  status: z.nativeEnum(INVOICE_STATUS).default(INVOICE_STATUS.CREATED),
  amount: z.number().min(0),
  items: z.array(invoiceItemsSchema).default([]),
  dueDate: z.date(),
})

export type CreateUserInvoiceSchemaType = z.infer<typeof createUserInvoiceSchema>;