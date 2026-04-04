import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

/** @returns {Promise<import("jose").JWTPayload | null>} */
export async function getSession() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;
  try {
    return await verifyToken(token);
  } catch {
    return null;
  }
}
