import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/app/components/Footer";
import { ProductProvider } from "@/app/context/ProductContext";
import { CartProvider } from "@/app/context/CartContext";
import { ClerkProvider } from "@clerk/nextjs";

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
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen">
          <CartProvider>
            <ProductProvider>{children}</ProductProvider>
          </CartProvider>
          <div className="z-10 relative bg-white">
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
