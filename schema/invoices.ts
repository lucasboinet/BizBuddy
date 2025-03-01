import { ZodFloatSchema } from '@/lib/zod';
import { INVOICE_STATUS } from '@/types/invoices';
import { z } from 'zod';

export const invoiceItemsSchema = z.object({
  label: z.string(),
  quantity: z.number().min(1),
  amount: ZodFloatSchema,
})

export const createInvoiceSchema = z.object({
  name: z.string().max(100),
  projectId: z.string(),
  customerId: z.string(),
  status: z.nativeEnum(INVOICE_STATUS).default(INVOICE_STATUS.CREATED),
  amount: ZodFloatSchema,
  items: z.array(invoiceItemsSchema).default([{ label: '', amount: 0, quantity: 1 }]),
  dueDate: z.date(),
})

export type CreateInvoiceSchemaType = z.infer<typeof createInvoiceSchema>;

export const updateInvoiceSchema = z.object({
  invoiceId: z.string(),
  name: z.string().max(100),
  customer: z.object({
    name: z.string(),
    id: z.string(),
    email: z.string(),
    phone: z.string().nullable(),
    address: z.object({
      line1: z.string(),
      line2: z.string().optional(),
      postalCode: z.number(),
      city: z.string(),
    }),
    siret: z.string(),
    accountId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date()
  }),
  status: z.nativeEnum(INVOICE_STATUS),
  amount: ZodFloatSchema,
  items: z.array(invoiceItemsSchema),
  createdAt: z.date(),
  dueDate: z.date(),
  note: z.string().nullable(),
})

export type UpdateInvoiceSchemaType = z.infer<typeof updateInvoiceSchema>;