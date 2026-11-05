"use client";

import { useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import { getStripePromise } from "@/components/providers/StripeProvider";

export default function CheckoutClient() {
  const { cart, total } = useCart();
  const router = useRouter();
  const stripePromise = useMemo(() => getStripePromise(), []);

  useEffect(() => {
    if (cart.length === 0) {
      router.replace("/cart");
    }
  }, [cart.length, router]);

  const fetchClientSecret = useCallback(async () => {
    const res = await fetch("/api/checkout/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cart.map((item: { id: number; quantity: number }) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Could not start checkout");
    }
    return data.clientSecret as string;
  }, [cart]);

  if (cart.length === 0 || !stripePromise) {
    return (
      <p className="text-center text-gray-600">
        {!stripePromise
          ? "Stripe is not configured. Add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY."
          : "Loading…"}
      </p>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div>
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Order summary</h2>
        <ul className="space-y-4">
          {cart.map(
            (item: {
              id: number;
              name: string;
              image: string;
              price: string;
              quantity: number;
            }) => (
              <li
                key={item.id}
                className="flex gap-4 rounded-xl bg-[#F1F3F2] p-4"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={72}
                  height={72}
                  className="rounded object-cover"
                />
                <div className="flex-1 text-sm text-gray-800">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-600">Qty: {item.quantity}</p>
                  <p className="text-gray-600">
                    ${parseInt(item.price) * item.quantity}
                  </p>
                </div>
              </li>
            )
          )}
        </ul>
        <p className="mt-6 text-lg font-bold text-gray-900">
          Total: ${total}
        </p>
      </div>

      <div className="min-h-[480px] rounded-xl border border-gray-200 p-2">
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ fetchClientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
}
