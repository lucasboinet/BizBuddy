import { User } from "@prisma/client";
import { AppSettings } from "./settings";

export interface AppUser extends User {
  settings: AppSettings,
}

export type AuthSafeUser = Omit<AppUser, 'password' | 'refreshToken'>;

export type SessionPayload = {
  sessionId: string;
  userId: string;
  expiresAt: Date;
}

export type UserAddress = {
  line1: string,
  line2?: string,
  postalCode: string,
  city: string,
}