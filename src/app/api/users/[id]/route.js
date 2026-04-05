import { authenticate } from "@/lib/authMiddleware";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import mongoose from "mongoose";
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

function normalizeName(name) {
  if (typeof name !== "string") return undefined;
  const trimmed = name.trim();
  return trimmed ? trimmed : undefined;
}

function normalizeEmail(email) {
  if (typeof email !== "string") return undefined;
  const trimmed = email.trim().toLowerCase();
  return trimmed ? trimmed : undefined;
}

function normalizeRole(role) {
  if (typeof role !== "string") return undefined;
  const trimmed = role.trim().toLowerCase();
  return ["admin", "user"].includes(trimmed) ? trimmed : null;
}

export async function PUT(req, { params }) {
  const { error, user: authUser } = await authenticate(req);
  if (error) return error;

  if (!isAdmin(authUser)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    await connectDB();

    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
    }

    const body = await req.json().catch(() => ({}));

    const name = normalizeName(body.name);
    const email = normalizeEmail(body.email);
    const role = body.role === undefined ? undefined : normalizeRole(body.role);

    if (role === null) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const updates = {};
    if (name !== undefined) updates.name = name;
    if (email !== undefined) updates.email = email;
    if (role !== undefined) updates.role = role;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "No valid fields provided" },
        { status: 400 },
      );
    }

    const existing = email
      ? await User.findOne({ email, _id: { $ne: id } }).select("_id")
      : null;

    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 },
      );
    }

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.role === "admin" && updates.role === "user") {
      return NextResponse.json(
        { error: "Admin users cannot be demoted to user" },
        { status: 400 },
      );
    }

    Object.assign(user, updates);
    await user.save();

    return NextResponse.json({ user: formatUser(user) }, { status: 200 });
  } catch (err) {
    console.error("Update user error:", err);
    if (err?.code === 11000) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req, { params }) {
  const { error, user: authUser } = await authenticate(req);
  if (error) return error;

  if (!isAdmin(authUser)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    await connectDB();

    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
    }

    if (String(authUser?.id) === id) {
      return NextResponse.json(
        { error: "You cannot delete your own account" },
        { status: 400 },
      );
    }

    const user = await User.findById(id).select("_id role");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await User.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "User deleted successfully", id },
      { status: 200 },
    );
  } catch (err) {
    console.error("Delete user error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
