import { PROJECT_STATUS } from '@/types/projects';
import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z.string().max(50).min(1, { message: "Name is required" }),
  tags: z.array(z.object({
    id: z.string(),
    name: z.string(),
    userId: z.string(),
  })),
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
  }, { message: "Customer is required" }),
  status: z.nativeEnum(PROJECT_STATUS).default(PROJECT_STATUS.CREATED).optional(),
  dueAt: z.date(),
})

export type CreateProjectSchemaType = z.infer<typeof createProjectSchema>;