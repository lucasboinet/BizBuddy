export type User = {
  id: string;
  email: string;
  firstname: string;
  lastname:  string;

  password: string;
  refreshToken?: string;

  createdAt: Date;
  updatedAt: Date;
}

export type SessionPayload = {
  sessionId: string;
  expiresAt: Date;
}