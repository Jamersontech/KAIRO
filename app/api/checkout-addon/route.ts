import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { addonServicesConfig } from "@/config/site";

let stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripe) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  }
  return stripe;
}

function findPlan(planId: string) {
  for (const service of addonServicesConfig.services) {
    const plan = service.plans.find((p) => p.id === planId);
    if (plan) return { service, plan };
  }
  return null;
}

// À la carte prices aren't pre-created in Stripe — they're built inline via
// price_data from config/site.ts, so adding/editing a service never needs
// dashboard changes. Mirrors /api/checkout's subscription + 30-day trial
// pattern (setup fee due now, first monthly charge ~30 days out).
export async function POST(req: NextRequest) {
  const { planId } = await req.json().catch(() => ({}));

  const found = planId ? findPlan(planId) : null;
  if (!found) {
    return NextResponse.json({ error: "Invalid service" }, { status: 400 });
  }
  const { service, plan } = found;

  const stripeKeySet =
    process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.includes("REPLACE");

  if (!stripeKeySet) {
    return NextResponse.json(
      { error: "Stripe not configured. Add STRIPE_SECRET_KEY to .env.local." },
      { status: 503 }
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";
  const productName =
    service.plans.length > 1 ? `${service.name} — ${plan.label}` : service.name;

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    {
      price_data: {
        currency: "usd",
        product_data: { name: productName },
        unit_amount: Math.round(plan.monthly * 100),
        recurring: { interval: "month" },
      },
      quantity: 1,
    },
  ];

  if (plan.setup > 0) {
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: { name: `${productName} — Setup` },
        unit_amount: Math.round(plan.setup * 100),
      },
      quantity: 1,
    });
  }

  const session = await getStripe().checkout.sessions.create({
    mode: "subscription",
    line_items: lineItems,
    success_url: `${siteUrl}/pricing?success=1`,
    cancel_url: `${siteUrl}/pricing`,
    allow_promotion_codes: true,
    billing_address_collection: "required",
    subscription_data: {
      trial_period_days: 30,
    },
  });

  return NextResponse.json({ url: session.url });
}
