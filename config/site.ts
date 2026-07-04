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
      price: "$XXX",
      period: "/mo",
      description: "Perfect for getting your digital foundation right.",
      highlight: false,
      features: [
        "AI-built conversion website (up to 5 pages)",
        "Mobile-first, SEO-optimized design",
        "AI voice agent (after-hours answering)",
        "1 automated SMS follow-up sequence",
        "Google review request automation",
        "Monthly performance report",
        "Email support",
      ],
      cta: "Get Started",
    },
    {
      id: "growth",
      name: "Growth",
      price: "$XXX",
      period: "/mo",
      description: "The full automation stack for businesses ready to scale.",
      highlight: true,
      features: [
        "Everything in Starter",
        "Up to 10 pages + landing pages",
        "AI voice agent (24/7 + lead qualification)",
        "SMS & email nurture sequences (3 flows)",
        "Appointment reminder automation",
        "Review monitoring & response templates",
        "Bi-weekly strategy calls",
        "Priority support",
      ],
      cta: "Most Popular — Start Here",
    },
    {
      id: "full-stack",
      name: "Full Stack",
      price: "$XXX",
      period: "/mo",
      description:
        "Done-for-you everything. We run your digital growth engine.",
      highlight: false,
      features: [
        "Everything in Growth",
        "Unlimited pages & revisions",
        "Full CRM automation build-out",
        "Custom lead follow-up playbooks",
        "Google Ads & retargeting setup",
        "Dedicated account manager",
        "Weekly reporting & calls",
      ],
      cta: "Let's Talk",
    },
  ],
};
