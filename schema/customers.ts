import { z } from 'zod';

export const appCustomerSchema = z.object({
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
}, { message: "Customer is required" });

export const createCustomerSchema = z.object({
  name: z.string().max(50).min(1, { message: 'Name is required' }),
  email: z.string().email(),
  phone: z.string().length(10).optional(),
  address: z.object({
    line1: z.string().min(1, { message: 'Line 1 is required' }),
    line2: z.string().optional(),
    postalCode: z.string().min(1, { message: 'Postal code is required' }),
    city: z.string().min(1, { message: 'City is required' }),
  }),
  siret: z.string().length(14).min(1, { message: 'Siret is required' }),
})

export type CreateCustomerSchemaType = z.infer<typeof createCustomerSchema>;
