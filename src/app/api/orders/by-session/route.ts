import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connect } from "@/lib/db";
import Order from "@/lib/modals/order.modal";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ error: "session_id required" }, { status: 400 });
  }

  await connect();
  const order = await Order.findOne({
    stripeSessionId: sessionId,
    userId: session.user.id,
  }).lean<{
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
  }>();

  if (!order) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    order: {
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
    },
  });
}
