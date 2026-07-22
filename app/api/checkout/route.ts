import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

let stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripe) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  }
  return stripe;
}

const priceMap: Record<string, { monthly: string | undefined; setup: string | undefined }> = {
  starter: {
    monthly: process.env.STRIPE_PRICE_STARTER,
    setup: process.env.STRIPE_PRICE_STARTER_SETUP,
  },
  growth: {
    monthly: process.env.STRIPE_PRICE_GROWTH,
    setup: process.env.STRIPE_PRICE_GROWTH_SETUP,
  },
  "full-stack": {
    monthly: process.env.STRIPE_PRICE_FULL_STACK,
    setup: process.env.STRIPE_PRICE_FULL_STACK_SETUP,
  },
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

  const { monthly, setup } = priceMap[tierId];

  if (!monthly || monthly.includes("REPLACE")) {
    return NextResponse.json(
      { error: `Price ID for "${tierId}" not set. Add it to .env.local.` },
      { status: 503 }
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    { price: monthly, quantity: 1 },
  ];

  if (setup && !setup.includes("REPLACE")) {
    lineItems.push({ price: setup, quantity: 1 });
  }

  const session = await getStripe().checkout.sessions.create({
    mode: "subscription",
    line_items: lineItems,
    success_url: `${siteUrl}/pricing?success=1`,
    cancel_url: `${siteUrl}/pricing`,
    // No allow_promotion_codes here: Stripe's native promo-code field
    // discounts the WHOLE first invoice — including one-time line items
    // like the setup fee above — with no way to exempt just the setup fee
    // (Checkout Session line items don't expose a `discountable` flag; only
    // raw Invoice/Subscription line items do, confirmed against the live API).
    // Packages already get the 30-day-free trial unconditionally below, so
    // there's nothing a promo code would add here anyway.
    billing_address_collection: "required",
    // One-time line items (the setup fee) are still invoiced immediately at
    // checkout regardless of trial — only the recurring monthly price is
    // deferred. This gives customers: pay setup fee today, first monthly
    // charge ~30 days later.
    subscription_data: {
      trial_period_days: 30,
    },
  });

  return NextResponse.json({ url: session.url });
}
