import { PROJECT_STATUS } from '@/types/projects';
import { z } from 'zod';
import { appCustomerSchema } from './customers';

export const appProjectSchema =  z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  userId: z.string(),
  customerId: z.string(),
  status: z.nativeEnum(PROJECT_STATUS),
  startedAt: z.date().nullable(),
  completedAt: z.date().nullable(),
  dueAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
  tags: z.array(z.any()),
  customer: appCustomerSchema,
  board: z.any().optional(),
  invoices: z.array(z.any()),
  activities: z.array(z.any()).optional(),
})

export const createProjectSchema = z.object({
  name: z.string().max(50).min(1, { message: "Name is required" }),
  tags: z.array(z.object({
    id: z.string(),
    name: z.string(),
    userId: z.string(),
  })),
  customer: appCustomerSchema,
  status: z.nativeEnum(PROJECT_STATUS).default(PROJECT_STATUS.CREATED).optional(),
  dueAt: z.date(),
})

export type CreateProjectSchemaType = z.infer<typeof createProjectSchema>;