import { User } from "@prisma/client";

export type AuthSafeUser = Omit<User, 'password' | 'refreshToken'>;

export type SessionPayload = {
  sessionId: string;
  userId: string;
  expiresAt: string;
}