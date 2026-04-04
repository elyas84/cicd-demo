import Link from "next/link";

import DashboardLogoutButton from "@/components/dashboard/DashboardLogoutButton";

/**
 * @param {{ users: Array<{ id: string, name: string, email: string, role: string, lastLogin: string | null, lastLoginRelative: string | null, lastLoginNever?: boolean, createdAt: string }> }} props
 */
export default function AdminUserListPage({ users }) {
  return (
    <main className="bg-surface text-on-surface font-body min-h-screen p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-headline text-2xl font-bold">User management</h1>
            <p className="text-on-surface-variant mt-1 text-sm">
              All registered accounts ({users.length}). Last sign-in is shown for
              each user.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard"
              className="text-primary text-sm font-semibold hover:underline"
            >
              ← Back to dashboard
            </Link>
            <DashboardLogoutButton className="mt-0 w-full sm:w-auto sm:min-w-[7.5rem]" />
          </div>
        </div>

        <div className="border-outline-variant/30 overflow-hidden rounded-lg border bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-surface-container-low border-outline-variant/20 border-b">
                  <th className="text-on-surface-variant px-4 py-3 font-semibold">
                    Name
                  </th>
                  <th className="text-on-surface-variant px-4 py-3 font-semibold">
                    Email
                  </th>
                  <th className="text-on-surface-variant px-4 py-3 font-semibold">
                    Role
                  </th>
                  <th className="text-on-surface-variant min-w-[200px] px-4 py-3 font-semibold">
                    Last sign-in
                  </th>
                  <th className="text-on-surface-variant px-4 py-3 font-semibold">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody className="divide-outline-variant/15 divide-y">
                {users.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-on-surface-variant px-4 py-8 text-center"
                    >
                      No users yet.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id} className="hover:bg-surface-container-low/50">
                      <td className="px-4 py-3 font-medium">{u.name}</td>
                      <td className="px-4 py-3">{u.email}</td>
                      <td className="px-4 py-3">
                        <span
                          className={
                            u.role === "admin"
                              ? "bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-semibold capitalize"
                              : "bg-slate-100 text-slate-700 rounded-full px-2 py-0.5 text-xs font-semibold capitalize"
                          }
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="text-on-surface px-4 py-3 whitespace-nowrap">
                        {u.lastLoginNever || !u.lastLogin ? (
                          <span className="text-on-surface-variant italic">
                            Never logged in
                          </span>
                        ) : (
                          <span className="flex flex-col gap-0.5">
                            <span className="font-medium">{u.lastLogin}</span>
                            {u.lastLoginRelative ? (
                              <span className="text-on-surface-variant text-xs">
                                {u.lastLoginRelative}
                              </span>
                            ) : null}
                          </span>
                        )}
                      </td>
                      <td className="text-on-surface-variant px-4 py-3">
                        {u.createdAt}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
