// ─────────────────────────────────────────────
//  KAIRO — Site Configuration
//  Edit brand info, copy, and pricing here.
// ─────────────────────────────────────────────

export const siteConfig = {
  name: "Kairo",
  tagline: "AI Automation for Local Business",
  description:
    "Kairo helps local businesses grow with AI-built websites, automated follow-up sequences, and Google review generation — all done for you.",
  url: "https://kairoagency.com",
  email: "hello@kairoagency.com",
  phone: "(555) 000-0000",
  location: "Serving businesses nationwide",
  calendarUrl: "https://calendly.com/capombassisjames",
  social: {
    instagram: "https://instagram.com/kairoagency",
    facebook: "https://facebook.com/kairoagency",
    linkedin: "https://linkedin.com/company/kairoagency",
  },
};

// ─────────────────────────────────────────────
//  PRICING — Edit these values when ready.
//  Tiers map to PricingCard components.
// ─────────────────────────────────────────────

export const pricingConfig = {
  tiers: [
    {
      id: "starter",
      name: "Starter",
      price: "$197",
      setup: "$497",
      period: "/mo",
      description: "Just getting started. Everything you need to compete online.",
      highlight: false,
      features: [
        "AI-built website — up to 5 pages",
        "AI voice agent (after-hours answering)",
        "1 automated SMS & email sequence",
        "Google review auto-requests",
        "Monthly performance report",
        "Email & phone support",
      ],
      cta: "Get Started",
    },
    {
      id: "growth",
      name: "Growth",
      price: "$347",
      setup: "$697",
      period: "/mo",
      description: "The complete automation stack for businesses ready to scale.",
      highlight: true,
      features: [
        "Everything in Starter",
        "Website up to 10 pages",
        "AI voice agent — 24/7 + lead qualification",
        "3 SMS & email nurture sequences",
        "Google review auto-request + monitoring",
        "Bi-weekly strategy calls",
        "Priority support",
      ],
      cta: "Most Popular — Start Here",
    },
    {
      id: "full-stack",
      name: "Full Stack",
      price: "$497",
      setup: "$997",
      period: "/mo",
      description: "Done-for-you everything. We run your entire growth engine.",
      highlight: false,
      features: [
        "Everything in Growth",
        "Unlimited pages & revisions",
        "AI voice agent — 24/7 + custom call flows",
        "Unlimited SMS & email sequences",
        "Full reputation management",
        "Weekly reporting & calls",
        "Dedicated support line",
      ],
      cta: "Let's Talk",
    },
  ],
};
