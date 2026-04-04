import Link from "next/link";

import DashboardLogoutButton from "./DashboardLogoutButton";

export default function ArchitectDashboardPage({
  name,
  email,
  role = "user",
}) {
  return (
    <main className="bg-surface text-on-surface font-body flex min-h-screen items-center justify-center p-6">
      <div className="border-outline-variant/30 w-full max-w-sm rounded-lg border bg-white p-8 shadow-sm">
        <h1 className="font-headline mb-6 text-center text-2xl font-bold">
          Dashboard
        </h1>
        <div className="space-y-4 text-sm">
          <div>
            <p className="text-on-surface-variant mb-0.5 font-medium">Role</p>
            <p className="text-on-surface font-semibold capitalize">{role}</p>
          </div>
          <div>
            <p className="text-on-surface-variant mb-0.5 font-medium">Name</p>
            <p className="text-on-surface font-semibold">{name}</p>
          </div>
          <div>
            <p className="text-on-surface-variant mb-0.5 font-medium">Email</p>
            <p className="text-on-surface font-semibold">{email}</p>
          </div>
        </div>
        {role === "admin" ? (
          <Link
            href="/admin"
            className="bg-surface-container-high text-on-surface hover:bg-surface-container mt-4 block w-full rounded-md py-2.5 text-center text-sm font-semibold transition-colors"
          >
            View all users
          </Link>
        ) : null}
        <DashboardLogoutButton />
      </div>
    </main>
  );
}
