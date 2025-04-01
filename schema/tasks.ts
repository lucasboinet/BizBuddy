import { z } from "zod";

export const createTaskSchema = z.object({
  columnId: z.string(),
  projectId: z.string(),
  boardId: z.string().optional(),
  name: z.string().max(50).min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
})

export type CreateTaskSchemaType = z.infer<typeof createTaskSchema>;