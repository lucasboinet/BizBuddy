import { z } from 'zod';

export const userSignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const userSignUpSchema = z.object({
  firstname: z.string().max(20),
  lastname: z.string().max(20),
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
});

export type UserSignUpSchemaType = z.infer<typeof userSignUpSchema>;

export type UserSignInSchemaType = z.infer<typeof userSignInSchema>;