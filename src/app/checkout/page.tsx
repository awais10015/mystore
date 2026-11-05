import Navbar from "@/app/components/Navbar";
import CheckoutClient from "./CheckoutClient";

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
          Checkout
        </h1>
        <CheckoutClient />
      </main>
    </>
  );
}
