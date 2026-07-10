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
  slug: string; // anchor id, used to deep-link from a card to the explorer
  icon: string; // maps to a lucide icon in PricingCard
  name: string;
  benefit: string; // one-liner shown on the pricing card
  what: string; // "What it is" — plain description in the explorer
  why: string; // "Why it matters" — the benefit, spelled out
  example: string; // a simple real-world example
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
        { slug: "website", icon: "Globe", name: "Professional website (up to 5 pages)", benefit: "A modern, mobile-friendly site that turns visitors into phone calls.",
          what: "A modern, mobile-friendly website that shows off your business and makes it easy for people to contact you.",
          why: "Most customers check you out online before they call. A site that looks great and loads fast turns those visitors into phone calls.",
          example: "Someone searches “plumber near me,” lands on your site, sees your work, and taps to call." },
        { slug: "contact-forms", icon: "ClipboardList", name: "Contact forms", benefit: "Capture customer details the moment they reach out.",
          what: "A simple form where visitors leave their name, phone, and what they need.",
          why: "You capture the customer's details even when they're not ready to call — so no inquiry ever gets lost.",
          example: "A visitor types their name, number, and “leaky faucet.” It lands in your inbox instantly." },
        { slug: "email-reply", icon: "Mail", name: "Automatic reply to new inquiries", benefit: "Every inquiry gets an instant email reply, so none slip away.",
          what: "An instant email that goes out the moment someone contacts you.",
          why: "A fast reply makes you look on top of things and keeps the customer from drifting to a competitor while they wait.",
          example: "“Thanks for reaching out — we'll be in touch shortly!” sent the second they hit send." },
        { slug: "review-requests", icon: "Star", name: "Automatic Google review requests", benefit: "Turn happy customers into 5-star reviews, automatically.",
          what: "After a job, we automatically ask happy customers to leave a Google review.",
          why: "More 5-star reviews means you rank higher on Google and win the trust of new customers.",
          example: "A day after the job: “Thanks for choosing us! Mind leaving a quick review?”" },
        { slug: "results-report", icon: "BarChart3", name: "Monthly results report", benefit: "See exactly how many customers your website brought in.",
          what: "A simple monthly summary of what your website and system brought in.",
          why: "You see exactly what you're paying for — visitors, new inquiries, and reviews — in plain numbers.",
          example: "“This month: 320 visitors, 18 new inquiries, 6 new reviews.”" },
        { slug: "email-support", icon: "MessageCircle", name: "Email support", benefit: "We handle your website changes and questions for you.",
          what: "Email us any time for website changes, questions, or small updates.",
          why: "Your site stays current without you touching any tech — just send a note and we handle it.",
          example: "“Can you add our new holiday hours?” — done the same day." },
      ],
      mainResult: "A professional website that brings in customers and builds trust.",
      cta: "Get Started",
    },
    {
      id: "growth",
      name: "Growth",
      price: "$397",
      setup: "$947",
      period: "/mo",
      purpose: "Turn more calls and clicks into booked customers.",
      tagline: "Everything that brings customers in — and the automation that books them.",
      inherits: "Starter",
      highlight: true,
      features: [
        { slug: "missed-call-text", icon: "PhoneMissed", name: "Text back missed calls", benefit: "Can't answer? The caller gets a text in seconds — before they try someone else.",
          what: "When you can't answer, the caller instantly gets a friendly text.",
          why: "Most people won't leave a voicemail — they just call the next business. This keeps them talking to you.",
          example: "“Sorry we missed your call! How can we help?” — sent seconds after a missed call." },
        { slug: "call-answering", icon: "Headphones", name: "24/7 call answering", benefit: "An AI receptionist answers every call, day or night, and books the appointment.",
          what: "An AI receptionist answers your phone when your team can't.",
          why: "Every call gets picked up — after hours, weekends, or when you're on the job. No lost work.",
          example: "A customer calls at 9pm. Instead of voicemail, it answers and books them in." },
        { slug: "caller-needs", icon: "ClipboardCheck", name: "Know what each caller needs", benefit: "A few quick questions up front, so you know the job before you call back.",
          what: "A few quick questions are asked before the call reaches you.",
          why: "You already know the job and how urgent it is — so you win more work, faster.",
          example: "You get: “Roof leak, Springfield, needs it this week” — not just “I need help.”" },
        { slug: "reminders-followup", icon: "MessagesSquare", name: "Automatic reminders & follow-up", benefit: "Texts and emails that confirm bookings and cut no-shows.",
          what: "Texts and emails that go out on their own to keep customers moving.",
          why: "Fewer no-shows and more repeat visits — without anyone remembering to chase.",
          example: "“Reminder: your appointment is tomorrow at 2 PM.” Sent automatically." },
        { slug: "online-booking", icon: "CalendarCheck", name: "Online booking", benefit: "Customers pick a time and book themselves — no phone tag.",
          what: "Customers pick a time and book themselves, right from your website.",
          why: "You fill your calendar even when the phones are busy or closed.",
          example: "Customer taps Tuesday, 2:00 PM — booked and confirmed in seconds." },
        { slug: "reputation-protection", icon: "ShieldCheck", name: "Reputation protection", benefit: "Unhappy customers reach you privately, before they post a bad review.",
          what: "Unhappy customers are routed to you privately — before they post publicly.",
          why: "You protect your star rating and get the chance to fix problems quietly.",
          example: "Happy customers → asked for a Google review. Unhappy ones → sent straight to you." },
        { slug: "review-alerts", icon: "Bell", name: "New-review alerts", benefit: "Get notified the moment a new review comes in.",
          what: "You're notified the moment a new review is posted anywhere.",
          why: "You can thank happy customers and respond to concerns fast — which Google rewards.",
          example: "“New 5-star review from Maria D.” lands in your inbox." },
        { slug: "strategy-call", icon: "Video", name: "Monthly strategy call", benefit: "We review your results together and plan your next win.",
          what: "A monthly call where we go over your results and plan improvements.",
          why: "You're never on your own — we spot what's working and double down on it.",
          example: "“Calls are up 20% — let's push more booking reminders next month.”" },
        { slug: "priority-support", icon: "Zap", name: "Priority support", benefit: "Faster answers whenever you need them.",
          what: "Your questions and requests move to the front of the line.",
          why: "When something needs changing, you get it handled fast — not days later.",
          example: "Need a new offer added before the weekend? Consider it done." },
      ],
      mainResult: "Catch every call, answer every inquiry, and book more customers.",
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
        { slug: "marketing-campaigns", icon: "Megaphone", name: "Monthly marketing campaigns", benefit: "New promotions built for you every month to bring in more customers.",
          what: "Each month we build a new promotion to bring in more customers.",
          why: "You get fresh marketing without lifting a finger or hiring a marketer.",
          example: "A dentist wants more whitening bookings — we build the landing page, email, and texts." },
        { slug: "win-back", icon: "Repeat", name: "Win back past customers", benefit: "We automatically reach out to old customers to get them booking again.",
          what: "We automatically reach out to past customers to get them booking again.",
          why: "Your easiest sales are people who already know you — this brings them back on autopilot.",
          example: "“It's been a while — we'd love to see you again” sent to last year's customers." },
        { slug: "website-improvements", icon: "TrendingUp", name: "Ongoing website improvements", benefit: "We keep improving your site so more visitors become customers.",
          what: "We keep refining your website to turn more visitors into customers.",
          why: "Small, steady improvements mean more calls from the same traffic — month after month.",
          example: "If few visitors are calling, we rework the page until more of them do." },
        { slug: "advanced-call-answering", icon: "Sparkles", name: "Smarter call answering", benefit: "Handles longer, more detailed customer conversations.",
          what: "A more advanced AI receptionist that handles longer, detailed conversations.",
          why: "It manages complex questions and bookings, so even tricky calls get handled well.",
          example: "A customer with a multi-part question gets clear answers and books — no human needed." },
        { slug: "weekly-reviews", icon: "CalendarClock", name: "Weekly growth reviews", benefit: "We review and improve your results every single week.",
          what: "Every week we review your calls, bookings, and campaigns — and make improvements.",
          why: "Faster feedback means faster growth; we adjust weekly instead of waiting a month.",
          example: "Noticed Tuesday calls spike? We shift more attention there this week." },
        { slug: "dedicated-support", icon: "Headset", name: "Dedicated priority support", benefit: "Our fastest response and a direct line to us.",
          what: "Our fastest response times and a direct line to our team.",
          why: "You get white-glove help whenever you need it — no waiting in a queue.",
          example: "Message your account manager directly and get an answer the same day." },
      ],
      mainResult: "A complete AI growth system, actively managed and improved every month.",
      cta: "Get Started",
    },
  ],
};
