import { SignJWT, jwtVerify } from "jose";
import { requiredEnv } from "@/lib/env";

/** JWT string passed to jose (e.g. "1h", "7d") */
const JWT_EXPIRES_IN = "1h";

/** Cookie `maxAge` in seconds — keep in sync with JWT_EXPIRES_IN */
export const JWT_COOKIE_MAX_AGE = 60 * 60;

function secretKey() {
  return new TextEncoder().encode(requiredEnv("JWT_SECRET"));
}

/**
 * @param {{ id: string, email: string, name?: string, role?: string }} payload
 */
export async function signToken(payload) {
  return await new SignJWT({
    id: payload.id,
    email: payload.email,
    name: payload.name ?? "",
    role: payload.role ?? "user",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(JWT_EXPIRES_IN)
    .setIssuedAt()
    .sign(secretKey());
}

export async function verifyToken(token) {
  const { payload } = await jwtVerify(token, secretKey());
  return payload;
}
