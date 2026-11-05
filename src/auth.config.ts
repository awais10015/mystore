import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  trustHost: true,
  pages: {
    signIn: "/sign-in",
  },
  session: { strategy: "jwt" },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role ?? "user";
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as "user" | "admin") ?? "user";
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
