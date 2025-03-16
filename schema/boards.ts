import { z } from "zod";

export const createBoardColumnSchema = z.object({
  boardId: z.string(),
  column: z.object({
    id: z.string(),
    name: z.string(),
  }),
})

export type CreateBoardColumnSchemaType = z.infer<typeof createBoardColumnSchema>;