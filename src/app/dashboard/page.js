import { redirect } from "next/navigation";
import ArchitectDashboardPage from "@/components/dashboard/ArchitectDashboardPage";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { getSession } from "@/lib/session";

export const metadata = {
  title: "Dashboard",
  description: "Account overview",
};

export default async function DashboardPage() {
  const session = await getSession();
  if (!session?.id) {
    redirect("/login");
  }

  await connectDB();
  const user = await User.findById(String(session.id)).select("name email role");

  if (!user) {
    redirect("/login");
  }

  return (
    <ArchitectDashboardPage
      name={user.name?.trim() ? user.name : "—"}
      email={user.email}
      role={user.role ?? "user"}
    />
  );
}
