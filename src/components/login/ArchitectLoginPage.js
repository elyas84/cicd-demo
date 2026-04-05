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

export default function ArchitectLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");

    setPending(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.22),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.18),transparent_28%),radial-gradient(circle_at_50%_85%,rgba(14,165,233,0.14),transparent_35%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[64px_64px] opacity-25" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center">
        <div className="grid w-full gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <section className="space-y-6">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
              testdata-id="back-to-home"
            >
              <ArrowLeftIcon />
              Back to Home
            </Link>

            <div className="max-w-xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-200 backdrop-blur">
                <ShieldIcon />
                Secure entry
              </div>

              <h1 className="font-headline text-4xl font-semibold tracking-tight sm:text-5xl">
                Log in and keep moving.
              </h1>

              <p className="max-w-lg text-base leading-7 text-slate-300 sm:text-lg">
                Pick up where you left off and jump into the dashboard with a
                clean, fast sign-in flow.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/6 p-4 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Protected access
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  Admin and dashboard routes stay behind a real login.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/6 p-4 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Quick session
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  Fast entry, lightweight forms, and immediate navigation.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/10 p-4 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
                Test credentials
              </p>
              <div className="mt-3 grid gap-3 text-sm text-slate-100 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-slate-950/30 p-3">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                    Admin
                  </p>
                  <p className="mt-1 font-mono text-xs text-slate-200">
                    admin@test.com / 123456E
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-slate-950/30 p-3">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                    User
                  </p>
                  <p className="mt-1 font-mono text-xs text-slate-200">
                    john@test.com / 123456J
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs leading-5 text-slate-300">
                These accounts are seeded for the sandbox, so you can jump
                straight into testing.
              </p>
            </div>
          </section>

          <section className="relative">
            <div className="absolute -inset-6 rounded-4xl bg-linear-to-br from-cyan-400/20 via-transparent to-violet-400/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-4xl border border-white/12 bg-slate-950/60 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Welcome back
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    Sign in
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
                    testdata-id="login-error-message"
                  >
                    {error}
                  </p>
                ) : null}

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
                    autoComplete="current-password"
                    disabled={pending}
                    className="w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-white outline-none transition-shadow placeholder:text-slate-500 focus:border-cyan-300/40 focus:ring-4 focus:ring-cyan-300/15 disabled:opacity-60"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  disabled={pending}
                  className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-white px-4 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {pending ? <Spinner /> : "Log in"}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-300">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
