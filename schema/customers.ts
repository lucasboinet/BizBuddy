import { z } from 'zod';

export const createCustomerSchema = z.object({
  name: z.string().max(50),
  email: z.string().email(),
  phone: z.string().length(10),
  address: z.string(),
  siret: z.string().length(14),
  accountId: z.string()
})

export type CreateCustomerSchemaType = z.infer<typeof createCustomerSchema>;

export const searchCustomersSchema = z.object({
  search: z.string()
})

export type SearchCustomersSchemaType = z.infer<typeof searchCustomersSchema>;