"use server";

import { hash } from "bcryptjs";
import validator from "validator";
import User from "@/lib/modals/user.modal";
import { connect } from "@/lib/db";
import { signIn } from "@/auth";

export type SignupResult =
  | { success: true }
  | { success: false; error: string };

export async function signup(formData: FormData): Promise<SignupResult> {
  const firstName = formData.get("firstName")?.toString().trim() ?? "";
  const lastName = formData.get("lastName")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim().toLowerCase() ?? "";
  const password = formData.get("password")?.toString() ?? "";
  const confirmPassword = formData.get("confirmPassword")?.toString() ?? "";

  if (!firstName || !lastName) {
    return { success: false, error: "Please enter your first and last name." };
  }

  if (!email || !validator.isEmail(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  if (password.length < 8) {
    return {
      success: false,
      error: "Password must be at least 8 characters.",
    };
  }

  if (password !== confirmPassword) {
    return { success: false, error: "Passwords do not match." };
  }

  try {
    await connect();

    const existing = await User.findOne({ email });
    if (existing) {
      return {
        success: false,
        error: "An account with this email already exists.",
      };
    }

    const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const role =
      adminEmail && email === adminEmail ? ("admin" as const) : ("user" as const);

    const hashed = await hash(password, 12);
    const baseUsername =
      email
        .split("@")[0]
        .replace(/[^a-z0-9._-]/gi, "")
        .slice(0, 24) || "user";
    const username = `${baseUsername}-${Date.now().toString(36)}`;

    await User.create({
      firstName,
      lastName,
      email,
      username,
      password: hashed,
      role,
    });

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: true };
  } catch (err) {
    console.error("Signup error:", err);
    return {
      success: false,
      error: "Could not create account. Please try again.",
    };
  }
}
