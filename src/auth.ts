import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import validator from "validator";
import User from "@/lib/modals/user.modal";
import { connect } from "@/lib/db";
import { authConfig } from "@/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email?.toString().trim().toLowerCase();
        const password = credentials?.password?.toString();

        if (!email || !validator.isEmail(email) || !password) {
          throw new CredentialsSignin("Invalid email or password");
        }

        await connect();
        const user = await User.findOne({ email }).select("+password");

        if (!user?.password) {
          throw new CredentialsSignin("Invalid email or password");
        }

        const isMatch = await compare(password, user.password);
        if (!isMatch) {
          throw new CredentialsSignin("Invalid email or password");
        }

        const name = [user.firstName, user.lastName].filter(Boolean).join(" ");

        return {
          id: user._id.toString(),
          email: user.email,
          name: name || user.email,
          role: user.role as "user" | "admin",
        };
      },
    }),
  ],
});
