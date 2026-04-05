import Link from "next/link";

import DashboardLogoutButton from "./DashboardLogoutButton";

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

function ArrowIcon() {
  return (
    <svg
      className="h-4 w-4 transition-transform group-hover:translate-x-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7l5 5m0 0l-5 5m5-5H6"
      />
    </svg>
  );
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

export default function ArchitectDashboardPage({
  name,
  email,
  role = "user",
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 p-6 font-body text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.22),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.18),transparent_28%),radial-gradient(circle_at_50%_85%,rgba(14,165,233,0.14),transparent_35%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[64px_64px] opacity-25" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center">
        <div className="grid w-full gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <section className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-200 backdrop-blur">
              <ShieldIcon />
              Dashboard
            </div>

            <div className="space-y-4">
              <h1 className="font-headline text-4xl font-semibold tracking-tight sm:text-5xl">
                Welcome back, {name}.
              </h1>
              <p className="max-w-lg text-base leading-7 text-slate-300 sm:text-lg">
                Your account overview is ready. Check your role, jump to admin
                tools if needed, or log out when you’re done.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {role === "admin" ? (
                <Link
                  href="/admin"
                  className="group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5"
                >
                  View all users
                  <ArrowIcon />
                </Link>
              ) : null}

              <DashboardLogoutButton className="mt-0 h-11 rounded-full border border-white/10 bg-white/8! px-5 text-sm font-semibold text-white! backdrop-blur hover:bg-white/12!" />
            </div>
          </section>

          <aside className="relative">
            <div className="absolute -inset-6 rounded-4xl bg-linear-to-br from-cyan-400/20 via-transparent to-violet-400/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-4xl border border-white/12 bg-slate-950/60 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Account details
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    Profile snapshot
                  </h2>
                </div>
                <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Active
                </div>
              </div>

              <div className="grid gap-3">
                <StatCard label="Role" value={role} />
                <StatCard label="Name" value={name} />
                <StatCard label="Email" value={email} />
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/6 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Quick note
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  This dashboard is intentionally simple, so you can focus on the
                  flows you want to test.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
