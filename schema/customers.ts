import { z } from 'zod';

export const createUserCustomerSchema = z.object({
  name: z.string().max(50),
  email: z.string().email(),
  phone: z.string().length(10),
  address: z.string(),
  siret: z.string().length(14),
  accountId: z.string()
})

export type CreateUserCustomerSchemaType = z.infer<typeof createUserCustomerSchema>;