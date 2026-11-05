import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

import Footer from "@/app/components/Footer";
import { ProductProvider } from "@/app/context/ProductContext";
import { CartProvider } from "@/app/context/CartContext";
import AuthSessionProvider from "@/components/providers/SessionProvider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Furniture Shop",
  description: "A place to buy Furniture",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <NextTopLoader color="#000000" height={3} showSpinner={false} />
        <AuthSessionProvider>
          <CartProvider>
            <ProductProvider>
              {children}
              <Toaster />
            </ProductProvider>
          </CartProvider>
          <div className="relative z-10 bg-white">
            <Footer />
          </div>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
