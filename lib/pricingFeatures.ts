// ─────────────────────────────────────────────
//  One derived source of truth for every feature.
//  The pricing cards, the "Every feature explained" explorer, and the
//  "See exactly what's included" compare table all read from here, so a
//  feature is named identically everywhere — no drift, no confusion.
// ─────────────────────────────────────────────

import { pricingConfig, type PricingFeature } from "@/config/site";

export const PLANS = ["Starter", "Growth", "Full Stack"] as const;

// Categories group features for the explorer nav and the compare table.
export const CATEGORY_ORDER = [
  "Website & Online",
  "Calls & Reception",
  "Follow-Up & Booking",
  "Reviews & Reputation",
  "Marketing & Growth",
  "Support",
] as const;
export type Category = (typeof CATEGORY_ORDER)[number];

const FEATURE_CATEGORY: Record<string, Category> = {
  website: "Website & Online",
  "contact-forms": "Website & Online",
  "email-reply": "Website & Online",
  "results-report": "Website & Online",
  "website-improvements": "Website & Online",

  "missed-call-text": "Calls & Reception",
  "call-answering": "Calls & Reception",
  "caller-needs": "Calls & Reception",
  "advanced-call-answering": "Calls & Reception",

  "reminders-followup": "Follow-Up & Booking",
  "online-booking": "Follow-Up & Booking",
  "win-back": "Follow-Up & Booking",

  "review-requests": "Reviews & Reputation",
  "reputation-protection": "Reviews & Reputation",
  "review-alerts": "Reviews & Reputation",

  "marketing-campaigns": "Marketing & Growth",
  "strategy-call": "Marketing & Growth",
  "weekly-reviews": "Marketing & Growth",

  "email-support": "Support",
  "priority-support": "Support",
  "dedicated-support": "Support",
};

export interface DerivedFeature extends PricingFeature {
  introTier: string; // tier that introduces it
  introIndex: number; // 0 = Starter, 1 = Growth, 2 = Full Stack
  avail: boolean[]; // [starter, growth, fullStack] — included from introIndex up
  category: Category;
}

// A feature introduced in tier i is included in every plan >= i.
export const ALL_FEATURES: DerivedFeature[] = pricingConfig.tiers.flatMap(
  (tier, ti) =>
    tier.features.map((f) => ({
      ...f,
      introTier: tier.name,
      introIndex: ti,
      avail: PLANS.map((_, pi) => pi >= ti),
      category: FEATURE_CATEGORY[f.slug] ?? "Website & Online",
    }))
);

export function featuresInCategory(cat: Category): DerivedFeature[] {
  return ALL_FEATURES.filter((f) => f.category === cat);
}
