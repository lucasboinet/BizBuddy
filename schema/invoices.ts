import { ZodFloatSchema } from '@/lib/zod';
import { INVOICE_STATUS } from '@/types/invoices';
import { z } from 'zod';

export const invoiceItemsSchema = z.object({
  label: z.string(),
  quantity: z.number().min(1),
  amount: ZodFloatSchema,
})

export const updateInvoiceSchema = z.object({
  id: z.string(),
  name: z.string().max(100),
  customer: z.object({
    name: z.string(),
    id: z.string(),
    email: z.string(),
    phone: z.string().nullable(),
    address: z.object({
      line1: z.string(),
      line2: z.string().optional(),
      postalCode: z.string(),
      city: z.string(),
    }),
    projects: z.array(z.any()),
    invoices: z.array(z.any()),
    siret: z.string(),
    accountId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date()
  }),
  status: z.nativeEnum(INVOICE_STATUS),
  items: z.array(invoiceItemsSchema),
  dueDate: z.date(),
  note: z.string().nullable(),
})

export type UpdateInvoiceSchemaType = z.infer<typeof updateInvoiceSchema>;

export const createInvoiceSchema = z.object({
  name: z.string().max(100),
  projectId: z.string().optional(),
  customer: z.object({
    name: z.string(),
    id: z.string(),
    email: z.string(),
    phone: z.string().nullable(),
    address: z.object({
      line1: z.string(),
      line2: z.string().optional(),
      postalCode: z.string(),
      city: z.string(),
    }),
    projects: z.array(z.any()).optional(),
    invoices: z.array(z.any()).optional(),
    siret: z.string(),
    accountId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date()
  }),
  items: z.array(invoiceItemsSchema),
  dueDate: z.date(),
  note: z.string().nullable(),
})

export type CreateInvoiceSchemaType = z.infer<typeof createInvoiceSchema>;