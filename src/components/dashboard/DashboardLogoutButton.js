"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "../spinner";

export default function DashboardLogoutButton({ className = "mt-8 w-full" }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleLogout() {
    setPending(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      disabled={pending}
      onClick={handleLogout}
      className={`bg-primary text-on-primary hover:opacity-90 rounded-md py-2.5 text-sm font-semibold transition-opacity disabled:opacity-60 ${className}`}
    >
      {pending ?  <Spinner /> : "Log out"}
    </button>
  );
}
