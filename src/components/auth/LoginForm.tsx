"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordInput from "@/components/auth/PasswordInput";

export default function LoginForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString().trim().toLowerCase() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setSubmitting(false);

    if (result?.error) {
      toast.error("Invalid email or password");
      return;
    }

    toast.success("Welcome back!");
    const next = new URLSearchParams(window.location.search).get("callbackUrl");
    const dest =
      next && next.startsWith("/") && !next.startsWith("//") ? next : "/shopall";
    router.push(dest);
    router.refresh();
  }

  return (
    <Card className="border-gray-200/80 bg-white/95 shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl">Sign in</CardTitle>
        <CardDescription>
          Enter your email and password to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              name="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
            />
          </div>
          <Button
            type="submit"
            disabled={submitting}
            className="mt-2 h-11 w-full rounded-full bg-black text-white hover:bg-neutral-800"
          >
            {submitting ? "Signing in…" : "Sign in"}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-gray-900 underline-offset-4 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
