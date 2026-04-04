import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-linear-to-br from-slate-50 via-white to-slate-100 p-6 text-center font-body">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.05),transparent_50%)]" />

      <div className="relative z-10 w-full max-w-3xl space-y-12">
        {/* Header Section */}
        <header className="space-y-6">
          <div className="inline-block rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 ring-1 ring-indigo-100">
            QA Testing Environment
          </div>

          <h1
            className="font-headline text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl md:text-7xl"
            testdata-id="homepage-title"
          >
            Test Automation
            <span className="block bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Sandbox
            </span>
          </h1>

          <p className="mx-auto max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            Practice your test automation skills in a real-world environment.
            Compatible with{" "}
            <span className="font-semibold text-slate-900">Playwright</span>,
            <span className="font-semibold text-slate-900"> Selenium</span>, and
            <span className="font-semibold text-slate-900"> Cypress</span>.
          </p>
        </header>

        {/* CTA Section */}
        <div className="flex flex-col items-center gap-4 pt-2">
          <Link
            href="/login"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-linear-to-r from-indigo-600 to-violet-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 active:scale-100"
            testdata-id="get-started-button"
          >
            <span className="relative">Get Started</span>
            <svg
              className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>

          <p className="text-sm text-slate-500">
            No signup required • Start testing immediately
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-4 pt-8 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white/60 p-6 backdrop-blur-sm transition-all hover:border-indigo-200 hover:shadow-md">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
              <svg
                className="h-5 w-5 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mb-1 text-sm font-semibold text-slate-900">
              Cross-Browser
            </h3>
            <p className="text-xs text-slate-600">
              Test across all major browsers
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white/60 p-6 backdrop-blur-sm transition-all hover:border-indigo-200 hover:shadow-md">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100">
              <svg
                className="h-5 w-5 text-violet-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <h3 className="mb-1 text-sm font-semibold text-slate-900">
              CI/CD Ready
            </h3>
            <p className="text-xs text-slate-600">
              Integrate with your pipeline
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white/60 p-6 backdrop-blur-sm transition-all hover:border-indigo-200 hover:shadow-md">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
              <svg
                className="h-5 w-5 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
            <h3 className="mb-1 text-sm font-semibold text-slate-900">
              Edge Cases
            </h3>
            <p className="text-xs text-slate-600">
              Real-world scenarios included
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
