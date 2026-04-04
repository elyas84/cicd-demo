"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    <main className="bg-surface text-on-surface font-body flex min-h-screen items-center justify-center p-6">
      <div className="border-outline-variant/30 w-full max-w-sm rounded-lg border bg-white p-8 shadow-sm">
        
        {/* Back to Home Button */}
        <Link 
          href="/" 
          className="group mb-6 inline-flex items-center text-sm font-medium text-slate-500 transition-colors hover:text-primary"
          testdata-id="back-to-home"
        >
          <svg 
            className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        <h1 className="font-headline mb-6 text-center text-2xl font-bold">
          Log in
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error ? (
            <p
              className="text-error text-center text-sm"
              role="alert"
              testdata-id="login-error-message"
            >
              {error}
            </p>
          ) : null}
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              disabled={pending}
              className="border-outline-variant/40 focus:border-primary focus:ring-primary/20 w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 disabled:opacity-60"
              required
            />
          </div>
          <div>
            <label
              className="mb-1 block text-sm font-medium"
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
              className="border-outline-variant/40 focus:border-primary focus:ring-primary/20 w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 disabled:opacity-60"
              required
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="bg-primary text-on-primary hover:opacity-90 w-full rounded-md py-2.5 text-sm font-semibold transition-opacity disabled:opacity-60"
          >
            {pending ? "Signing in…" : "Log in"}
          </button>
        </form>
        
        <p className="text-on-surface-variant mt-6 text-center text-sm">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-primary font-medium hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}