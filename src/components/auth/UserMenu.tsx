"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BarChart3, LogOut, Package, Shield } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

export function getInitials(name?: string | null, email?: string | null) {
  if (name?.trim()) {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  }
  if (email?.trim()) {
    return email.trim()[0].toUpperCase();
  }
  return "?";
}

type UserMenuProps = {
  isAdmin?: boolean;
  onAction?: () => void;
  className?: string;
  variant?: "dropdown" | "stacked";
};

export default function UserMenu({
  isAdmin = false,
  onAction,
  className,
  variant = "dropdown",
}: UserMenuProps) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const name = session?.user?.name;
  const email = session?.user?.email;
  const initials = getInitials(name, email);

  useEffect(() => {
    if (!open || variant === "stacked") return;

    function handlePointerDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open, variant]);

  function handleSignOut() {
    onAction?.();
    setOpen(false);
    signOut({ callbackUrl: "/" });
  }

  const menuItems = (
    <>
      <div className="border-b border-gray-100 px-3 py-2.5">
        <p className="truncate text-sm font-semibold text-gray-900">
          {name || "Account"}
        </p>
        {email ? (
          <p className="truncate text-xs text-gray-500">{email}</p>
        ) : null}
      </div>
      {isAdmin && (
        <Link
          href="/admin"
          onClick={() => {
            onAction?.();
            setOpen(false);
          }}
          className="flex w-full items-center gap-2 px-3 py-2.5 text-sm text-gray-800 hover:bg-gray-50"
        >
          <Shield className="h-4 w-4" />
          Admin panel
        </Link>
      )}
      <Link
        href="/dashboard"
        onClick={() => {
          onAction?.();
          setOpen(false);
        }}
        className="flex w-full items-center gap-2 px-3 py-2.5 text-sm text-gray-800 hover:bg-gray-50"
      >
        <BarChart3 className="h-4 w-4" />
        Sales dashboard
      </Link>
      <Link
        href="/orders"
        onClick={() => {
          onAction?.();
          setOpen(false);
        }}
        className="flex w-full items-center gap-2 px-3 py-2.5 text-sm text-gray-800 hover:bg-gray-50"
      >
        <Package className="h-4 w-4" />
        My orders
      </Link>
      <button
        type="button"
        onClick={handleSignOut}
        className="flex w-full items-center gap-2 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50"
      >
        <LogOut className="h-4 w-4" />
        Sign out
      </button>
    </>
  );

  if (variant === "stacked") {
    return (
      <div className={cn("flex w-full flex-col items-center gap-3", className)}>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
          {initials}
        </div>
        <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white text-left shadow-sm">
          {menuItems}
        </div>
      </div>
    );
  }

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-xs font-semibold text-white ring-2 ring-transparent transition hover:ring-black/20 focus-visible:outline-none focus-visible:ring-black/30"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Account menu"
      >
        {initials}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-[70] mt-2 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-lg"
        >
          {menuItems}
        </div>
      )}
    </div>
  );
}
