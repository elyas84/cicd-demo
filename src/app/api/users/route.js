import { authenticate } from "@/lib/authMiddleware";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";

function isAdmin(payload) {
  return payload?.role === "admin";
}

const dateFmt = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeStyle: "short",
});

const dateOnlyFmt = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
});

function lastLoginRelative(isoDate) {
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return null;
  const ms = Date.now() - d.getTime();
  if (ms < 0) return null;
  const minutes = Math.floor(ms / 60_000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 14) return `${days}d ago`;
  return null;
}

function formatUser(user) {
  const raw = user.lastLogin;
  const hasLogin = raw != null && !Number.isNaN(new Date(raw).getTime());

  return {
    id: user._id.toString(),
    name: user.name?.trim() ? user.name : "—",
    email: user.email,
    role: user.role ?? "user",
    lastLogin: hasLogin ? dateFmt.format(new Date(raw)) : null,
    lastLoginRelative: hasLogin ? lastLoginRelative(raw) : null,
    lastLoginNever: !hasLogin,
    createdAt: user.createdAt ? dateOnlyFmt.format(new Date(user.createdAt)) : "—",
  };
}

export async function GET(req) {
  const { error, user } = await authenticate(req);
  if (error) return error;

  if (!isAdmin(user)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    await connectDB();
    const users = await User.find()
      .select("name email role lastLogin createdAt")
      .sort({ createdAt: -1 });

    return NextResponse.json(
      { users: users.map(formatUser) },
      { status: 200 },
    );
  } catch (err) {
    console.error("List users error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
