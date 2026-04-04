import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

const noStoreHeaders = { "Cache-Control": "no-store, max-age=0" };

/**
 * @param {import("next/server").NextRequest} req
 * @returns {Promise<{ error: NextResponse | null, user: import("jose").JWTPayload | null }>}
 */
export async function authenticate(req) {
  const token = req.cookies.get("token")?.value ?? null;

  if (!token) {
    return {
      error: NextResponse.json(
        { error: "Unauthorized" },
        { status: 401, headers: noStoreHeaders },
      ),
      user: null,
    };
  }

  try {
    const payload = await verifyToken(token);
    return { error: null, user: payload };
  } catch {
    return {
      error: NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401, headers: noStoreHeaders },
      ),
      user: null,
    };
  }
}
