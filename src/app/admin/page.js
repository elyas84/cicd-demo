import AdminUserListPage from "@/components/admin/AdminUserListPage";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { requireAdmin } from "@/lib/requireAdmin";

export const metadata = {
  title: "Admin — Users",
  description: "Manage users",
};

const dateFmt = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeStyle: "short",
});

const dateOnlyFmt = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
});

/** Short relative label for recent last-login times (server-rendered). */
function lastLoginRelative(isoDate) {
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return null;
  const ms = Date.now() - d.getTime();
  if (ms < 0) return null;
  const minutes = Math.floor(ms / 60_000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 14) return `${days}d ago`;
  return null;
}

export default async function AdminPage() {
  const { session } = await requireAdmin();

  await connectDB();
  const users = await User.find()
    .select("name email role lastLogin createdAt")
    .sort({ lastLogin: -1, createdAt: -1 })
    .lean();

  const rows = users.map((u) => {
    const raw = u.lastLogin;
    const hasLogin = raw != null && !Number.isNaN(new Date(raw).getTime());
    const absolute = hasLogin ? dateFmt.format(new Date(raw)) : null;
    const relative = hasLogin ? lastLoginRelative(raw) : null;

    return {
      id: String(u._id),
      name: u.name?.trim() ? u.name : "—",
      email: u.email,
      role: u.role ?? "user",
      lastLogin: absolute,
      lastLoginRelative: relative,
      lastLoginNever: !hasLogin,
      createdAt: u.createdAt
        ? dateOnlyFmt.format(new Date(u.createdAt))
        : "—",
    };
  });

  return <AdminUserListPage users={rows} currentUserId={String(session.id)} />;
}
