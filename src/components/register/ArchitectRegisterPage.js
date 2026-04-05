"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "../spinner";

function ArrowLeftIcon() {
  return (
    <svg
      className="h-4 w-4 transition-transform group-hover:-translate-x-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg
      className="h-5 w-5 text-violet-300"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 3l1.8 5.4L20 10l-5.2 1.6L13 17l-1.8-5.4L6 10l5.2-1.6L13 3z"
      />
    </svg>
  );
}

export default function ArchitectRegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const fd = new FormData(form);

    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");
    const role = String(fd.get("role") ?? "user");

    setPending(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 p-6 font-body text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.22),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.2),transparent_28%),radial-gradient(circle_at_50%_85%,rgba(14,165,233,0.14),transparent_35%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[64px_64px] opacity-25" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center">
        <div className="grid w-full gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <section className="space-y-6">
            <Link
              href="/login"
              className="group inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              <ArrowLeftIcon />
              Back to login
            </Link>

            <div className="max-w-xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-200 backdrop-blur">
                <SparkIcon />
                Create account
              </div>

              <h1 className="font-headline text-4xl font-semibold tracking-tight sm:text-5xl">
                Set up your access in a minute.
              </h1>

              <p className="max-w-lg text-base leading-7 text-slate-300 sm:text-lg">
                Create a profile, choose a role, and jump straight into the
                sandbox.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/6 p-4 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Flexible roles
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  User and admin accounts are both available for testing.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/6 p-4 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Ready fast
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  Create once, then land directly in the dashboard.
                </p>
              </div>
            </div>
          </section>

          <section className="relative">
            <div className="absolute -inset-6 rounded-4xl bg-linear-to-br from-cyan-400/20 via-transparent to-violet-400/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-4xl border border-white/12 bg-slate-950/60 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    New account
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    Register
                  </h2>
                </div>
                <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Ready
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error ? (
                  <p
                    className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200"
                    role="alert"
                  >
                    {error}
                  </p>
                ) : null}

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-200" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    disabled={pending}
                    className="w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-white outline-none transition-shadow placeholder:text-slate-500 focus:border-cyan-300/40 focus:ring-4 focus:ring-cyan-300/15 disabled:opacity-60"
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-200" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    disabled={pending}
                    className="w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-white outline-none transition-shadow placeholder:text-slate-500 focus:border-cyan-300/40 focus:ring-4 focus:ring-cyan-300/15 disabled:opacity-60"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    className="block text-sm font-medium text-slate-200"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    disabled={pending}
                    className="w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-white outline-none transition-shadow placeholder:text-slate-500 focus:border-cyan-300/40 focus:ring-4 focus:ring-cyan-300/15 disabled:opacity-60"
                    placeholder="••••••••"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-200" htmlFor="role">
                    Account type
                  </label>
                  <select
                    id="role"
                    name="role"
                    disabled={pending}
                    className="w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-white outline-none transition-shadow focus:border-cyan-300/40 focus:ring-4 focus:ring-cyan-300/15 disabled:opacity-60"
                    defaultValue="user"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={pending}
                  className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-white px-4 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {pending ? <Spinner /> : "Sign up"}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-300">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
                >
                  Log in
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
