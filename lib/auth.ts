import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'fallback-secret-change-in-production'
);

const COOKIE_NAME = 'fn_admin_token';
const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours

export async function signToken(payload: Record<string, unknown>): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch {
    return null;
  }
}

export function setAuthCookie(token: string) {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });
}

export function clearAuthCookie() {
  cookies().delete(COOKIE_NAME);
}

export async function getAuthToken(): Promise<string | undefined> {
  return cookies().get(COOKIE_NAME)?.value;
}

export async function validateAdminRequest(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifyToken(token);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const token = await getAuthToken();
  if (!token) return false;
  const payload = await verifyToken(token);
  return payload !== null;
}
