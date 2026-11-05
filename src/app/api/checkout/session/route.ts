import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connect } from "@/lib/db";
import {
  buildCheckoutFromRequestItems,
  resolveCheckoutOrigin,
} from "@/lib/checkout-helpers";
import { getStripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { items?: { id: number; quantity: number }[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    await connect();
    const origin = resolveCheckoutOrigin(req);
    const { lineItems } = await buildCheckoutFromRequestItems(
      body.items ?? [],
      origin
    );

    const stripe = getStripe();
    const checkoutSession = await stripe.checkout.sessions.create({
      ui_mode: "embedded_page",
      mode: "payment",
      line_items: lineItems.map((li) => li.stripeLineItem),
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "AU"],
      },
      metadata: {
        userId: session.user.id,
      },
      return_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    });

    if (!checkoutSession.client_secret) {
      return NextResponse.json(
        { error: "Failed to create checkout session" },
        { status: 500 }
      );
    }

    return NextResponse.json({ clientSecret: checkoutSession.client_secret });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Checkout session failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
