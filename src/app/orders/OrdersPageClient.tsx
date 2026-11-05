"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";

type OrderSummary = {
  id: string;
  status: string;
  items: {
    productId: number;
    name: string;
    image: string;
    quantity: number;
    lineTotal: number;
  }[];
  total: number;
  purchasedAt: string | null;
  estimatedDeliveryDate: string | null;
  createdAt: string;
};

function formatLongDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function OrdersPageClient() {
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then((data) => {
        setOrders(data.orders ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-[calc(100dvh-22rem)]">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
          My orders
        </h1>

        {loading && (
          <p className="text-center text-gray-500">Loading orders…</p>
        )}

        {!loading && orders.length === 0 && (
          <p className="text-center text-gray-500">
            No orders yet.{" "}
            <Link href="/shopall" className="underline">
              Start shopping
            </Link>
          </p>
        )}

        <ul className="space-y-4">
          {orders.map((order) => {
            const open = expandedId === order.id;
            return (
              <li
                key={order.id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
              >
                <button
                  type="button"
                  className="flex w-full flex-col gap-2 px-4 py-4 text-left sm:flex-row sm:items-center sm:justify-between"
                  onClick={() => setExpandedId(open ? null : order.id)}
                >
                  <div>
                    <p className="font-semibold text-gray-900">
                      Order #{order.id.slice(-8)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatLongDate(order.purchasedAt ?? order.createdAt)} ·{" "}
                      {order.items.length} item
                      {order.items.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="text-sm sm:text-right">
                    <p className="font-bold text-gray-900">
                      ${order.total.toFixed(2)}
                    </p>
                    <p className="text-gray-600">
                      Est. delivery{" "}
                      {formatLongDate(order.estimatedDeliveryDate)}
                    </p>
                  </div>
                </button>

                {open && (
                  <div className="border-t border-gray-100 bg-[#F9FAFA] px-4 py-4">
                    <ul className="space-y-3">
                      {order.items.map((item) => (
                        <li key={`${order.id}-${item.productId}`} className="flex gap-3">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={56}
                              height={56}
                              className="rounded object-cover"
                            />
                          ) : null}
                          <div className="text-sm">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-gray-600">
                              Qty {item.quantity} · ${item.lineTotal.toFixed(2)}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
