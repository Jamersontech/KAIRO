import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");

const priceMap: Record<string, string | undefined> = {
  starter: process.env.STRIPE_PRICE_STARTER,
  growth: process.env.STRIPE_PRICE_GROWTH,
  "full-stack": process.env.STRIPE_PRICE_FULL_STACK,
};

export async function POST(req: NextRequest) {
  const { tierId } = await req.json().catch(() => ({}));

  if (!tierId || !priceMap[tierId]) {
    return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
  }

  const stripeKeySet =
    process.env.STRIPE_SECRET_KEY &&
    !process.env.STRIPE_SECRET_KEY.includes("REPLACE");

  if (!stripeKeySet) {
    return NextResponse.json(
      { error: "Stripe not configured. Add STRIPE_SECRET_KEY to .env.local." },
      { status: 503 }
    );
  }

  const priceId = priceMap[tierId]!;

  if (priceId.includes("REPLACE")) {
    return NextResponse.json(
      { error: `Price ID for "${tierId}" not set. Add it to .env.local.` },
      { status: 503 }
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${siteUrl}/pricing?success=1`,
    cancel_url: `${siteUrl}/pricing`,
    allow_promotion_codes: true,
    billing_address_collection: "required",
  });

  return NextResponse.json({ url: session.url });
}
