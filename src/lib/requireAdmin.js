import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { getSession } from "@/lib/session";

/** Ensures the visitor is logged in and has role `admin`. */
export async function requireAdmin() {
  const session = await getSession();
  if (!session?.id) {
    redirect("/login");
  }

  await connectDB();
  const user = await User.findById(String(session.id)).select("role email");

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "admin") {
    redirect("/dashboard");
  }

  return { session, user };
}
