import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connect } from "@/lib/db";
import Order from "@/lib/modals/order.modal";

type LeanOrder = {
  _id: { toString(): string };
  stripeSessionId: string;
  status: string;
  items: unknown[];
  currency: string;
  subtotal: number;
  total: number;
  shippingAddress?: unknown;
  purchasedAt?: Date;
  estimatedDeliveryDate?: Date;
  createdAt: Date;
};

function serializeOrder(order: LeanOrder) {
  return {
    id: order._id.toString(),
    stripeSessionId: order.stripeSessionId,
    status: order.status,
    items: order.items,
    currency: order.currency,
    subtotal: order.subtotal,
    total: order.total,
    shippingAddress: order.shippingAddress,
    purchasedAt: order.purchasedAt?.toISOString() ?? null,
    estimatedDeliveryDate: order.estimatedDeliveryDate?.toISOString() ?? null,
    createdAt: order.createdAt.toISOString(),
  };
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connect();
  const orders = await Order.find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .lean<LeanOrder[]>();

  return NextResponse.json({
    orders: orders.map(serializeOrder),
  });
}
