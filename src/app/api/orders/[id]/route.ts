import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connect } from "@/lib/db";
import Order from "@/lib/modals/order.modal";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_req: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  await connect();
  const order = await Order.findById(id).lean<{
    _id: { toString(): string };
    userId: { toString(): string };
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

  if (!order || order.userId.toString() !== session.user.id) {
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
