import 'server-only'

import { SignJWT, jwtVerify } from 'jose'
import { SessionPayload } from '@/types/auth'
import { cookies } from 'next/headers'

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}
 
export async function decrypt(session: string | undefined = '') {
  try {
    if (!session) {
      return undefined;
    }
    
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch {
    console.error('Failed to verify session')
  }
}

export async function retrieveSession(): Promise<SessionPayload> {
  const cookie = (await cookies()).get('session')?.value;
  const session = await decrypt(cookie) as SessionPayload;

  return session;
}