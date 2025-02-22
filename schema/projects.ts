import { PROJECT_STATUS } from '@/types/projects';
import { z } from 'zod';

export const createUserProjectSchema = z.object({
  name: z.string().max(50),
  customerId: z.string().max(50),
  status: z.nativeEnum(PROJECT_STATUS).default(PROJECT_STATUS.CREATED),
})

export type CreateUserProjectSchemaType = z.infer<typeof createUserProjectSchema>;