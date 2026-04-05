"use client";

import Link from "next/link";
import DashboardLogoutButton from "@/components/dashboard/DashboardLogoutButton";
import { useEffect, useState } from "react";
import Spinner from "../spinner";

function EditIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16.862 4.487a2.5 2.5 0 113.536 3.536L8.5 19.92 4 21l1.08-4.5 11.782-12.013z"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 6h18m-2 0-1 14H6L5 6m4 0V4h6v2m-8 0h8"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

function SearchIcon({ className = "" }) {
  return (
    <svg
      className={`h-4 w-4 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      className="h-5 w-5 text-cyan-300"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 3l7 4v5c0 5-3.2 8.4-7 9-3.8-.6-7-4-7-9V7l7-4z"
      />
    </svg>
  );
}

function normalizeUser(user) {
  return {
    id: String(user.id ?? user._id ?? ""),
    name: user.name ?? "—",
    email: user.email ?? "",
    role: user.role ?? "user",
    lastLogin: user.lastLogin ?? null,
    lastLoginRelative: user.lastLoginRelative ?? null,
    lastLoginNever:
      typeof user.lastLoginNever === "boolean"
        ? user.lastLoginNever
        : user.lastLogin == null,
    createdAt: user.createdAt ?? "—",
  };
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/6 p-4 backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 wrap-break-word text-sm font-medium text-slate-100">
        {value}
      </p>
    </div>
  );
}

export default function AdminUserListPage({
  users: initialUsers,
  currentUserId = null,
}) {
  const hasInitialUsers = Array.isArray(initialUsers);
  const [pending, setPending] = useState(!hasInitialUsers);
  const [users, setUsers] = useState(() =>
    hasInitialUsers ? initialUsers.map(normalizeUser) : [],
  );
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    role: "user",
  });
  const [savingId, setSavingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (hasInitialUsers) {
      setUsers(initialUsers.map(normalizeUser));
      setPending(false);
      return;
    }

    let active = true;

    async function getUsers() {
      try {
        setPending(true);
        const res = await fetch("/api/users", {
          credentials: "include",
        });
        const data = await res.json().catch(() => ({}));

        if (!active) return;

        if (!res.ok) {
          setError(data.error || "Failed to load users");
          setUsers([]);
          return;
        }

        setUsers(
          Array.isArray(data.users) ? data.users.map(normalizeUser) : [],
        );
      } catch {
        if (active) {
          setError("Failed to load users");
          setUsers([]);
        }
      } finally {
        if (active) setPending(false);
      }
    }

    getUsers();

    return () => {
      active = false;
    };
  }, [hasInitialUsers, initialUsers]);

  const filteredUsers = users.filter((user) => {
    const haystack = `${user.name} ${user.email} ${user.role}`.toLowerCase();
    return haystack.includes(query.trim().toLowerCase());
  });
  const adminCount = users.filter((user) => user.role === "admin").length;
  const userCount = users.filter((user) => user.role === "user").length;

  function startEdit(user) {
    setError("");
    setEditingId(user.id);
    setEditForm({
      name: user.name === "—" ? "" : user.name,
      email: user.email,
      role: user.role || "user",
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm({
      name: "",
      email: "",
      role: "user",
    });
  }

  async function handleSave(userId) {
    setError("");
    setSavingId(userId);

    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(editForm),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || "Unable to update user");
        return;
      }

      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? normalizeUser(data.user ?? user) : user,
        ),
      );
      cancelEdit();
    } catch {
      setError("Unable to update user");
    } finally {
      setSavingId(null);
    }
  }

  async function handleDelete(userId) {
    if (!window.confirm("Delete this user? This action cannot be undone.")) {
      return;
    }

    setError("");
    setDeletingId(userId);

    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || "Unable to delete user");
        return;
      }

      setUsers((prev) => prev.filter((user) => user.id !== userId));
      if (editingId === userId) cancelEdit();
    } catch {
      setError("Unable to delete user");
    } finally {
      setDeletingId(null);
    }
  }

  const actionDisabled = (userId) =>
    savingId === userId || deletingId === userId;

  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-6 font-body text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.22),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.18),transparent_28%),radial-gradient(circle_at_50%_85%,rgba(14,165,233,0.14),transparent_35%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[64px_64px] opacity-25" />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-6">
        <section className="overflow-hidden rounded-3xl border border-white/12 bg-slate-950/60 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
                <ShieldIcon />
                Admin console
              </div>
              <div className="space-y-2">
                <h1 className="font-headline text-3xl font-semibold tracking-tight sm:text-4xl">
                  Users, simplified.
                </h1>
                <p className="max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                  Review accounts, adjust roles, and keep the user base tidy
                  from one clean workspace.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/dashboard"
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/10 bg-white/8 px-4 text-sm font-semibold text-white transition-colors hover:bg-white/12"
              >
                Back to dashboard
              </Link>
              <DashboardLogoutButton className="mt-0 h-11 w-full rounded-full border border-white/10 bg-white/8 px-5 text-sm font-semibold text-white hover:bg-white/12 sm:w-auto" />
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <StatCard label="Total users" value={users.length} />
            <StatCard label="Admins" value={adminCount} />
            <StatCard label="Standard users" value={userCount} />
          </div>
        </section>

        <section className="rounded-3xl border border-white/12 bg-slate-950/60 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-6">
          <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">
                Account directory
              </h2>
              <p className="text-sm text-slate-400">
                Search, edit, and remove users without leaving the page.
              </p>
            </div>

            <label className="relative w-full lg:max-w-sm">
              <span className="sr-only">Search users</span>
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, email, or role"
                className="h-11 w-full rounded-full border border-white/10 bg-white/8 pl-10 pr-4 text-sm text-white outline-none transition-shadow placeholder:text-slate-500 focus:border-cyan-300/40 focus:ring-4 focus:ring-cyan-300/15"
              />
            </label>
          </div>

          {error ? (
            <p
              className="mb-4 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200"
              role="alert"
            >
              {error}
            </p>
          ) : null}

          {pending ? (
            <div className="flex min-h-64 items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/6">
              <div className="overflow-x-auto">
                <table className="w-full min-w-180 border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/6">
                      <th className="px-5 py-4 font-semibold text-slate-300">
                        Name
                      </th>
                      <th className="px-5 py-4 font-semibold text-slate-300">
                        Email
                      </th>
                      <th className="px-5 py-4 font-semibold text-slate-300">
                        Role
                      </th>
                      <th className="min-w-50 px-5 py-4 font-semibold text-slate-300">
                        Last sign-in
                      </th>
                      <th className="px-5 py-4 font-semibold text-slate-300">
                        Joined
                      </th>
                      <th className="px-5 py-4 font-semibold text-slate-300">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/8">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-5 py-12 text-center text-slate-400"
                        >
                          {query
                            ? "No users match your search."
                            : "No users yet."}
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((user) => {
                        const isEditing = editingId === user.id;
                        const isCurrentUser = currentUserId === user.id;

                        return (
                          <tr
                            key={user.id}
                            className="align-top transition-colors hover:bg-white/5"
                          >
                            <td className="px-5 py-4 font-medium text-white">
                              {isEditing ? (
                                <input
                                  value={editForm.name}
                                  onChange={(e) =>
                                    setEditForm((prev) => ({
                                      ...prev,
                                      name: e.target.value,
                                    }))
                                  }
                                  className="w-full rounded-full border border-white/10 bg-white/8 px-3 py-2 text-sm text-white outline-none transition-shadow focus:border-cyan-300/40 focus:ring-4 focus:ring-cyan-300/15"
                                />
                              ) : (
                                user.name
                              )}
                            </td>
                            <td className="px-5 py-4 text-slate-300">
                              {isEditing ? (
                                <input
                                  type="email"
                                  value={editForm.email}
                                  onChange={(e) =>
                                    setEditForm((prev) => ({
                                      ...prev,
                                      email: e.target.value,
                                    }))
                                  }
                                  className="w-full rounded-full border border-white/10 bg-white/8 px-3 py-2 text-sm text-white outline-none transition-shadow focus:border-cyan-300/40 focus:ring-4 focus:ring-cyan-300/15"
                                />
                              ) : (
                                user.email
                              )}
                            </td>
                            <td className="px-5 py-4">
                              {isEditing ? (
                                <div className="space-y-2">
                                  <select
                                    value={editForm.role}
                                    onChange={(e) =>
                                      setEditForm((prev) => ({
                                        ...prev,
                                        role: e.target.value,
                                      }))
                                    }
                                    className="w-full rounded-full border border-white/10 bg-white/8 px-3 py-2 text-sm text-white outline-none transition-shadow focus:border-cyan-300/40 focus:ring-4 focus:ring-cyan-300/15"
                                  >
                                    <option
                                      value="user"
                                      disabled={user.role === "admin"}
                                    >
                                      User
                                    </option>
                                    <option value="admin">Admin</option>
                                  </select>
                                  {user.role === "admin" ? (
                                    <p className="text-xs text-slate-400">
                                      Admin users cannot be demoted.
                                    </p>
                                  ) : null}
                                </div>
                              ) : (
                                <span
                                  className={
                                    user.role === "admin"
                                      ? "inline-flex rounded-full bg-blue-400/10 px-2.5 py-1 text-xs font-semibold capitalize text-blue-300"
                                      : "inline-flex rounded-full bg-slate-400/10 px-2.5 py-1 text-xs font-semibold capitalize text-slate-200"
                                  }
                                >
                                  {user.role}
                                </span>
                              )}
                            </td>
                            <td className="whitespace-nowrap px-5 py-4 text-slate-300">
                              {user.lastLoginNever || !user.lastLogin ? (
                                <span className="italic text-slate-500">
                                  Never logged in
                                </span>
                              ) : (
                                <span className="flex flex-col gap-0.5">
                                  <span className="font-medium text-slate-100">
                                    {user.lastLogin}
                                  </span>
                                  {user.lastLoginRelative ? (
                                    <span className="text-xs text-slate-400">
                                      {user.lastLoginRelative}
                                    </span>
                                  ) : null}
                                </span>
                              )}
                            </td>
                            <td className="px-5 py-4 text-slate-400">
                              {user.createdAt}
                            </td>
                            <td className="px-5 py-4">
                              {isEditing ? (
                                <div className="flex flex-wrap gap-2">
                                  <button
                                    type="button"
                                    onClick={() => handleSave(user.id)}
                                    disabled={actionDisabled(user.id)}
                                    className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-slate-950 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                                  >
                                    {savingId === user.id ? (
                                      <Spinner size="sm" color="gray" />
                                    ) : (
                                      <CheckIcon />
                                    )}
                                    Save
                                  </button>
                                  <button
                                    type="button"
                                    onClick={cancelEdit}
                                    disabled={actionDisabled(user.id)}
                                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/12 disabled:cursor-not-allowed disabled:opacity-60"
                                  >
                                    <XIcon />
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <div className="flex flex-wrap gap-2">
                                  <button
                                    type="button"
                                    onClick={() => startEdit(user)}
                                    disabled={actionDisabled(user.id)}
                                    className="inline-flex h-9 items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 text-xs font-semibold text-white transition-colors hover:bg-white/12 disabled:cursor-not-allowed disabled:opacity-60"
                                    title="Edit user"
                                  >
                                    <EditIcon />
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDelete(user.id)}
                                    disabled={
                                      actionDisabled(user.id) || isCurrentUser
                                    }
                                    className="inline-flex h-9 items-center gap-2 rounded-full bg-red-400/10 px-3 text-xs font-semibold text-red-300 transition-colors hover:bg-red-400/20 disabled:cursor-not-allowed disabled:opacity-60"
                                    title={
                                      isCurrentUser
                                        ? "You cannot delete your own account"
                                        : "Delete user"
                                    }
                                  >
                                    {deletingId === user.id ? (
                                      <Spinner size="sm" color="gray" />
                                    ) : (
                                      <TrashIcon />
                                    )}
                                    Delete
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
