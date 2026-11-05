import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

const publicRoutes = [
  "/",
  "/sign-in",
  "/sign-up",
  "/shopall",
  "/decor",
  "/office",
  "/livingroom",
  "/bedroom",
  "/story",
  "/contact",
  "/help",
  "/cart",
  "/login",
  "/dashboard",
];

function isPublicPath(pathname: string) {
  if (publicRoutes.includes(pathname)) return true;
  if (pathname.startsWith("/product")) return true;
  if (pathname.startsWith("/api/auth")) return true;
  if (pathname === "/api/products" || pathname.startsWith("/api/products/")) {
    return true;
  }
  if (pathname === "/api/webhooks/stripe") return true;
  return false;
}

function requiresAuth(pathname: string) {
  if (pathname === "/checkout" || pathname.startsWith("/checkout/")) {
    return true;
  }
  if (pathname === "/orders" || pathname.startsWith("/orders/")) {
    return true;
  }
  if (pathname.startsWith("/api/checkout")) return true;
  if (pathname.startsWith("/api/orders")) return true;
  return false;
}

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  if (isPublicPath(pathname)) {
    if (
      req.method === "POST" &&
      /^\/api\/products\/[^/]+\/reviews$/.test(pathname) &&
      !isLoggedIn
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  if (requiresAuth(pathname) && !isLoggedIn) {
    const signIn = new URL("/sign-in", req.nextUrl.origin);
    signIn.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signIn);
  }

  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api/users")
  ) {
    if (!isLoggedIn) {
      const signIn = new URL("/sign-in", req.nextUrl.origin);
      signIn.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signIn);
    }

    if (req.auth?.user?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
