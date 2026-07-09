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
  calendarUrl: "https://calendly.com/capombassisjames/30min",
  // Public "write a review" link for your Google Business Profile.
  // Override with NEXT_PUBLIC_GOOGLE_REVIEW_URL in .env.local.
  googleReviewUrl: "",
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

export interface PricingFeature {
  icon: string; // maps to a lucide icon in PricingCard
  name: string;
  benefit: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  setup: string;
  period: string;
  purpose: string;
  tagline: string;
  inherits: string | null; // "Everything in X, plus…"
  highlight: boolean;
  features: PricingFeature[];
  mainResult: string;
  cta: string;
}

export const pricingConfig: { tiers: PricingTier[] } = {
  tiers: [
    {
      id: "starter",
      name: "Starter",
      price: "$297",
      setup: "$647",
      period: "/mo",
      purpose: "Get online and start winning customers.",
      tagline: "A professional website and a simple system to capture every inquiry.",
      inherits: null,
      highlight: false,
      features: [
        { icon: "Globe", name: "Professional website (up to 5 pages)", benefit: "A modern, mobile-friendly site that turns visitors into calls." },
        { icon: "ClipboardList", name: "Contact forms", benefit: "Capture every lead the moment they're interested." },
        { icon: "Mail", name: "Automatic email follow-up", benefit: "Every inquiry gets an instant reply, so none slip away." },
        { icon: "Star", name: "Google review requests", benefit: "Turn happy customers into 5-star reviews, automatically." },
        { icon: "BarChart3", name: "Monthly performance report", benefit: "See exactly how many leads your website brought in." },
        { icon: "MessageCircle", name: "Email support", benefit: "We handle your website changes and questions." },
      ],
      mainResult: "A professional website that captures leads and builds trust.",
      cta: "Get Started",
    },
    {
      id: "growth",
      name: "Growth",
      price: "$397",
      setup: "$947",
      period: "/mo",
      purpose: "Turn more calls and clicks into booked customers.",
      tagline: "Everything that captures a lead — and the automation that converts it.",
      inherits: "Starter",
      highlight: true,
      features: [
        { icon: "PhoneMissed", name: "Missed-call text back", benefit: "Miss a call? They get a text in seconds — before they try a competitor." },
        { icon: "Headphones", name: "24/7 AI receptionist", benefit: "Answers every call, day or night, and books the appointment." },
        { icon: "ClipboardCheck", name: "Lead qualification", benefit: "Know what each customer needs before you call them back." },
        { icon: "MessagesSquare", name: "Text + email follow-up", benefit: "Automatic reminders that fill your calendar and cut no-shows." },
        { icon: "CalendarCheck", name: "Online appointment booking", benefit: "Customers book themselves — no more phone tag." },
        { icon: "ShieldCheck", name: "Feedback recovery", benefit: "Catch unhappy customers privately, before they post a bad review." },
        { icon: "Bell", name: "Review monitoring", benefit: "Get alerted the moment a new review comes in." },
        { icon: "Video", name: "Monthly strategy call", benefit: "We review your results and plan your next win." },
        { icon: "Zap", name: "Priority support", benefit: "Faster answers whenever you need them." },
      ],
      mainResult: "Capture more leads, recover missed calls, and book more customers.",
      cta: "Start Growing",
    },
    {
      id: "full-stack",
      name: "Full Stack",
      price: "$697",
      setup: "$1,447",
      period: "/mo",
      purpose: "Your complete AI growth team.",
      tagline: "We don't just build the system — we improve it for you every month.",
      inherits: "Growth",
      highlight: false,
      features: [
        { icon: "Megaphone", name: "Monthly marketing campaigns", benefit: "New promotions built for you every month to drive bookings." },
        { icon: "Repeat", name: "Customer win-back campaigns", benefit: "Bring past customers back automatically." },
        { icon: "TrendingUp", name: "Ongoing website improvements", benefit: "We keep improving your site to convert more visitors." },
        { icon: "Sparkles", name: "Advanced AI receptionist", benefit: "Handles longer, more detailed customer conversations." },
        { icon: "CalendarClock", name: "Weekly growth reviews", benefit: "We review and improve your results every single week." },
        { icon: "Headset", name: "Dedicated priority support", benefit: "Our fastest response and a direct line to us." },
      ],
      mainResult: "A complete AI growth system, actively managed and improved every month.",
      cta: "Talk to Us",
    },
  ],
};
