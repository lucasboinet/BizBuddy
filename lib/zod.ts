import { z } from "zod";

export const ZodFloatSchema = z.number().min(0).or(z.string()).pipe(z.coerce.number().min(0));