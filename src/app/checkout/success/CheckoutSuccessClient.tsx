"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import { useCart } from "@/app/context/CartContext";
import { normalizeProductImage } from "@/lib/product-image";

type OrderItem = {
  productId: number;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
};

type OrderPayload = {
  id: string;
  items: OrderItem[];
  total: number;
  purchasedAt: string | null;
  estimatedDeliveryDate: string | null;
  shippingAddress?: {
    name?: string;
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  };
};

function formatLongDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function CheckoutSuccessClient() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();
  const clearedRef = useRef(false);
  const [order, setOrder] = useState<OrderPayload | null>(null);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setPending(false);
      setError("Missing checkout session.");
      return;
    }

    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 8;

    async function loadOrder() {
      attempts += 1;
      const res = await fetch(
        `/api/orders/by-session?session_id=${encodeURIComponent(sessionId!)}`
      );
      if (res.ok) {
        const data = await res.json();
        if (!cancelled) {
          setOrder(data.order);
          setPending(false);
          if (!clearedRef.current) {
            clearedRef.current = true;
            clearCart();
          }
        }
        return;
      }

      if (attempts < maxAttempts && !cancelled) {
        window.setTimeout(loadOrder, 2000);
      } else if (!cancelled) {
        setPending(false);
        setError(
          "We are still confirming your payment. Check My orders in a moment."
        );
      }
    }

    loadOrder();
    return () => {
      cancelled = true;
    };
  }, [sessionId, clearCart]);

  return (
    <div className="min-h-[calc(100dvh-22rem)]">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        {pending && (
          <p className="text-center text-gray-600">Confirming your order…</p>
        )}

        {error && !order && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-center">
            <p className="text-gray-800">{error}</p>
            <Link
              href="/orders"
              className="mt-4 inline-block rounded-full bg-black px-6 py-2 text-sm text-white"
            >
              View orders
            </Link>
          </div>
        )}

        {order && (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">
                Thank you for your order
              </h1>
              <p className="mt-2 text-gray-600">Order #{order.id.slice(-8)}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-[#F1F3F2] p-4">
                <p className="text-sm text-gray-600">Purchase date</p>
                <p className="font-semibold text-gray-900">
                  {formatLongDate(order.purchasedAt)}
                </p>
              </div>
              <div className="rounded-xl bg-[#F1F3F2] p-4">
                <p className="text-sm text-gray-600">Estimated delivery</p>
                <p className="font-semibold text-gray-900">
                  {formatLongDate(order.estimatedDeliveryDate)}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Estimate only — not guaranteed
                </p>
              </div>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-semibold">Items purchased</h2>
              <ul className="space-y-3">
                {order.items.map((item) => {
                  const imageSrc = normalizeProductImage(item.image);
                  return (
                  <li
                    key={`${item.productId}-${item.name}`}
                    className="flex gap-4 rounded-xl border border-gray-100 p-3"
                  >
                    {imageSrc ? (
                      <Image
                        src={imageSrc}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="rounded object-cover"
                      />
                    ) : null}
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-gray-600">
                        Qty {item.quantity} · ${item.lineTotal.toFixed(2)}
                      </p>
                    </div>
                  </li>
                  );
                })}
              </ul>
              <p className="mt-4 text-right text-lg font-bold">
                Total: ${order.total.toFixed(2)}
              </p>
            </div>

            {order.shippingAddress?.line1 && (
              <div className="rounded-xl bg-[#F1F3F2] p-4 text-sm text-gray-800">
                <p className="mb-1 font-semibold">Shipping to</p>
                <p>{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.line1}</p>
                {order.shippingAddress.line2 && (
                  <p>{order.shippingAddress.line2}</p>
                )}
                <p>
                  {[
                    order.shippingAddress.city,
                    order.shippingAddress.state,
                    order.shippingAddress.postal_code,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/orders"
                className="rounded-full bg-black px-6 py-2 text-sm text-white"
              >
                My orders
              </Link>
              <Link
                href="/shopall"
                className="rounded-full border border-gray-300 px-6 py-2 text-sm text-gray-800"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
