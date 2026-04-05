import Link from "next/link";

function ArrowIcon() {
  return (
    <svg
      className="h-5 w-5 transition-transform group-hover:translate-x-1"
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

function SparkIcon() {
  return (
    <svg
      className="h-5 w-5 text-indigo-600"
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

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 p-6 font-body text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.22),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.2),transparent_28%),radial-gradient(circle_at_50%_85%,rgba(14,165,233,0.14),transparent_35%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[64px_64px] opacity-25" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center">
        <div className="grid w-full gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <section className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-200 backdrop-blur">
              <SparkIcon />
              QA Testing Environment
            </div>

            <div className="space-y-5">
              <h1
                className="max-w-3xl font-headline text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl"
                testdata-id="homepage-title"
              >
                Test automation,
                <span className="block bg-linear-to-r from-cyan-300 via-sky-300 to-violet-300 bg-clip-text text-transparent">
                  but make it fun.
                </span>
              </h1>

              <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                A lightweight sandbox for practicing real browser flows, login
                journeys, admin actions, and edge cases with Playwright, Selenium,
                or Cypress.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/login"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_12px_40px_rgba(255,255,255,0.12)] transition-transform hover:-translate-y-0.5"
                testdata-id="get-started-button"
              >
                Get Started
                <ArrowIcon />
              </Link>

              <div className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm text-slate-300 backdrop-blur">
                No signup required
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/6 p-4 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Cross-browser
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  Test flows across modern browser stacks.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/6 p-4 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  CI friendly
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  Built for pipelines, smoke runs, and repeatable checks.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/6 p-4 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Real auth
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  Practice login, admin access, and protected routes.
                </p>
              </div>
            </div>
          </section>

          <aside className="relative">
            <div className="absolute -inset-6 rounded-4xl bg-linear-to-br from-cyan-400/20 via-transparent to-violet-400/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-4xl border border-white/12 bg-slate-950/60 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Live preview
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-white">
                    Testing playground
                  </h2>
                </div>
                <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Ready
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-slate-300">Homepage</span>
                    <span className="text-slate-500">fast</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div className="h-2 w-3/4 rounded-full bg-linear-to-r from-cyan-400 to-violet-400" />
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-slate-300">Login flow</span>
                    <span className="text-slate-500">protected</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div className="h-2 w-5/6 rounded-full bg-linear-to-r from-sky-400 to-cyan-300" />
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-slate-300">Admin tools</span>
                    <span className="text-slate-500">editable</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div className="h-2 w-2/3 rounded-full bg-linear-to-r from-violet-400 to-fuchsia-300" />
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Suggested next step
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  Open the login page and start a full journey through the app.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
