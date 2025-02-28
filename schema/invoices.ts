import { INVOICE_STATUS } from '@/types/invoices';
import { z } from 'zod';

export const invoiceItemsSchema = z.object({
  label: z.string(),
  quantity: z.number().min(1),
  amount: z.number().min(0),
})

export const createInvoiceSchema = z.object({
  name: z.string().max(100),
  projectId: z.string(),
  customerId: z.string(),
  status: z.nativeEnum(INVOICE_STATUS).default(INVOICE_STATUS.CREATED),
  amount: z.number().min(0),
  items: z.array(invoiceItemsSchema).default([]),
  dueDate: z.date(),
})

export type CreateInvoiceSchemaType = z.infer<typeof createInvoiceSchema>;

export const updateInvoiceSchema = z.object({
  customerId: z.string(),
  invoiceId: z.string(),
  name: z.string().max(100),
  projectId: z.string(), 
  status: z.nativeEnum(INVOICE_STATUS),
  amount: z.number().min(0),
  items: z.array(invoiceItemsSchema),
  dueDate: z.date(),
})

export type UpdateInvoiceSchemaType = z.infer<typeof updateInvoiceSchema>;