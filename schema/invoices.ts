import { ZodFloatSchema } from '@/lib/zod';
import { INVOICE_STATUS } from '@/types/invoices';
import { z } from 'zod';
import { appCustomerSchema } from './customers';
import { appProjectSchema } from './projects';

export const invoiceItemsSchema = z.object({
  label: z.string(),
  quantity: z.number().min(1),
  amount: ZodFloatSchema,
})

export const updateInvoiceSchema = z.object({
  id: z.string(),
  name: z.string().max(100),
  project: appProjectSchema.optional(),
  customer: appCustomerSchema,
  status: z.nativeEnum(INVOICE_STATUS),
  items: z.array(invoiceItemsSchema),
  dueDate: z.date(),
  vat: z.number().min(0),
  note: z.string().nullable(),
})

export type UpdateInvoiceSchemaType = z.infer<typeof updateInvoiceSchema>;

export const createInvoiceSchema = z.object({
  name: z.string().max(100),
  project: appProjectSchema.optional(),
  customer: appCustomerSchema,
  items: z.array(invoiceItemsSchema),
  dueDate: z.date(),
  vat: z.number().min(0),
  note: z.string().nullable(),
})

export type CreateInvoiceSchemaType = z.infer<typeof createInvoiceSchema>;