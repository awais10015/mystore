"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signup } from "@/lib/actions/auth.action";
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

export default function SignupForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const result = await signup(formData);

    setSubmitting(false);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success("Account created — welcome!");
    router.push("/shopall");
    router.refresh();
  }

  return (
    <Card className="border-gray-200/80 bg-white/95 shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl">Create account</CardTitle>
        <CardDescription>
          Join Furniture Shop to save your cart and checkout faster.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                name="firstName"
                autoComplete="given-name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                name="lastName"
                autoComplete="family-name"
                required
              />
            </div>
          </div>
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
              autoComplete="new-password"
              required
              minLength={8}
              placeholder="At least 8 characters"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="new-password"
              required
              minLength={8}
            />
          </div>
          <Button
            type="submit"
            disabled={submitting}
            className="mt-2 h-11 w-full rounded-full bg-black text-white hover:bg-neutral-800"
          >
            {submitting ? "Creating account…" : "Sign up"}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-gray-900 underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
