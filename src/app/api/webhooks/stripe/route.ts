import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { connect } from "@/lib/db";
import Order from "@/lib/modals/order.modal";
import {
  addCalendarDays,
  getDeliveryDays,
  getStripe,
} from "@/lib/stripe";
import { normalizeProductImage } from "@/lib/product-image";

export const runtime = "nodejs";

function mapShippingAddress(session: Stripe.Checkout.Session) {
  const shipping = session.collected_information?.shipping_details;
  const addr = shipping?.address ?? session.customer_details?.address;
  if (!addr) return undefined;

  return {
    name: shipping?.name ?? session.customer_details?.name ?? undefined,
    line1: addr.line1 ?? undefined,
    line2: addr.line2 ?? undefined,
    city: addr.city ?? undefined,
    state: addr.state ?? undefined,
    postal_code: addr.postal_code ?? undefined,
    country: addr.country ?? undefined,
  };
}

async function buildOrderItemsFromSession(sessionId: string) {
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items.data.price.product"],
  });

  const lineItems = session.line_items?.data ?? [];
  const items: {
    productId: number;
    name: string;
    image: string;
    unitPrice: number;
    quantity: number;
    lineTotal: number;
  }[] = [];

  for (const li of lineItems) {
    const qty = li.quantity ?? 1;
    const amount = li.amount_total ?? 0;
    const unitPrice = qty > 0 ? amount / 100 / qty : 0;
    const product = li.price?.product;
    let productId = 0;
    let name = li.description ?? "Item";
    let image = "";

    if (product && typeof product === "object" && !("deleted" in product && product.deleted)) {
      const metaId = product.metadata?.productId;
      if (metaId) productId = Number(metaId);
      if (product.name) name = product.name;
      if (product.images?.[0]) image = normalizeProductImage(product.images[0]);
    }

    items.push({
      productId,
      name,
      image,
      unitPrice,
      quantity: qty,
      lineTotal: amount / 100,
    });
  }

  const subtotal = items.reduce((s, i) => s + i.lineTotal, 0);
  const total =
    session.amount_total != null ? session.amount_total / 100 : subtotal;

  return { session, items, subtotal, total };
}

export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const checkoutSession = event.data.object as Stripe.Checkout.Session;
  const sessionId = checkoutSession.id;
  const userId = checkoutSession.metadata?.userId;

  if (!userId) {
    return NextResponse.json({ error: "Missing userId in metadata" }, { status: 400 });
  }

  try {
    await connect();

    const existing = await Order.findOne({ stripeSessionId: sessionId });
    if (existing) {
      return NextResponse.json({ received: true, duplicate: true });
    }

    const { session, items, subtotal, total } =
      await buildOrderItemsFromSession(sessionId);

    const purchasedAt = new Date();
    const estimatedDeliveryDate = addCalendarDays(
      purchasedAt,
      getDeliveryDays()
    );

    try {
      await Order.create({
        userId,
        stripeSessionId: sessionId,
        status: "paid",
        items,
        currency: session.currency ?? "usd",
        subtotal,
        total,
        shippingAddress: mapShippingAddress(session),
        purchasedAt,
        estimatedDeliveryDate,
      });
    } catch (createErr: unknown) {
      const code =
        createErr &&
        typeof createErr === "object" &&
        "code" in createErr &&
        (createErr as { code?: number }).code;
      if (code === 11000) {
        return NextResponse.json({ received: true, duplicate: true });
      }
      throw createErr;
    }
  } catch (err) {
    console.error("Stripe webhook order create failed:", err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
