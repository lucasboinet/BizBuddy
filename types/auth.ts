import { User } from "@prisma/client";

export type AuthSafeUser = Omit<User, 'password' | 'refreshToken'>;