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

// Confirms `code` is a real, currently-active Stripe promotion code. We deliberately
// do NOT pass this to Checkout via `allow_promotion_codes` — Stripe's native
// promo-code field discounts the ENTIRE first invoice (including one-time line
// items like the setup fee) with no way to exempt just the setup fee: Checkout
// Session line items don't expose a `discountable` flag (only raw
// Invoice/Subscription line items do — confirmed directly against the live API,
// where the same coupon zeroed out a $97 setup fee alongside the $29 monthly).
// Instead, a valid code just grants `trial_period_days`, the same mechanism
// that already correctly protects the packages' setup fees (trials defer the
// subscription's recurring billing only; one-time items are still invoiced today).
async function isActivePromoCode(code: string): Promise<boolean> {
  const trimmed = code.trim();
  if (!trimmed) return false;
  const result = await getStripe().promotionCodes.list({ code: trimmed, active: true, limit: 1 });
  return result.data.length > 0;
}

// À la carte prices aren't pre-created in Stripe — they're built inline via
// price_data from config/site.ts, so adding/editing a service never needs
// dashboard changes. Unlike the packages, à la carte has no automatic trial —
// the monthly price(s) and setup fee(s) are all billed today, UNLESS a valid
// promo code is supplied, which grants 30 days free on the recurring price
// only (setup fees are always billed today regardless).
//
// Accepts one or several services in a single build: pass `planIds: string[]`
// (or a single `planId`). All monthly prices become one multi-item
// subscription; all setup fees land on the first invoice (due now).
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const requested: string[] = Array.isArray(body.planIds)
    ? body.planIds
    : body.planId
    ? [body.planId]
    : [];
  const promoCode: string = typeof body.promoCode === "string" ? body.promoCode : "";

  // Dedupe while preserving order.
  const planIds = [...new Set(requested.filter((p) => typeof p === "string"))];

  if (planIds.length === 0) {
    return NextResponse.json({ error: "No services selected" }, { status: 400 });
  }

  const resolved = planIds.map(findPlan);
  if (resolved.some((r) => r === null)) {
    return NextResponse.json({ error: "Invalid service" }, { status: 400 });
  }

  const stripeKeySet =
    process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.includes("REPLACE");

  if (!stripeKeySet) {
    return NextResponse.json(
      { error: "Stripe not configured. Add STRIPE_SECRET_KEY to .env.local." },
      { status: 503 }
    );
  }

  let grantFreeTrial = false;
  if (promoCode.trim()) {
    grantFreeTrial = await isActivePromoCode(promoCode);
    if (!grantFreeTrial) {
      return NextResponse.json({ error: "That promo code isn't valid or has expired." }, { status: 400 });
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  for (const entry of resolved) {
    const { service, plan } = entry!;
    const productName =
      service.plans.length > 1 ? `${service.name} — ${plan.label}` : service.name;

    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: { name: productName },
        unit_amount: Math.round(plan.monthly * 100),
        recurring: { interval: "month" },
      },
      quantity: 1,
    });

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
  }

  const session = await getStripe().checkout.sessions.create({
    mode: "subscription",
    line_items: lineItems,
    success_url: `${siteUrl}/pricing?success=1`,
    cancel_url: `${siteUrl}/pricing`,
    billing_address_collection: "required",
    ...(grantFreeTrial ? { subscription_data: { trial_period_days: 30 } } : {}),
  });

  return NextResponse.json({ url: session.url });
}
