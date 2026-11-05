"use client";

import Image from "next/image";
import Link from "next/link";

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export default function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: AuthLayoutProps) {
  return (
    <div className="grid min-h-[calc(100vh-12rem)] w-full grow items-center bg-[#d4e8e0] px-4 py-12 sm:justify-center">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <Link href="/">
            <Image src="/logo.png" alt="Furniture Shop" width={100} height={70} />
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            {title}
          </h1>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
        {children}
        {footer ? (
          <p className="text-center text-sm text-gray-600">{footer}</p>
        ) : null}
        <p className="text-center text-sm">
          <Link
            href="/shopall"
            className="font-medium text-gray-900 underline-offset-4 hover:underline"
          >
            Continue shopping
          </Link>
        </p>
      </div>
    </div>
  );
}
