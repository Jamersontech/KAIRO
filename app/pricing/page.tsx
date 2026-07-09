import type { Metadata } from "next";
import { PricingCard } from "@/components/PricingCard";
import { pricingConfig } from "@/config/site";
import { FinalCTA } from "@/components/FinalCTA";
import { PricingFAQ } from "@/components/PricingFAQ";
import { RevenueLeakCalculator } from "@/components/RevenueLeakCalculator";
import { AnimatedDotGrid } from "@/components/AnimatedDotGrid";
import {
  Check, Minus, PhoneMissed, Headphones, ClipboardCheck,
  MessagesSquare, ShieldCheck, CalendarCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, all-in-one pricing for local businesses. A professional website, an AI receptionist that answers every call, automatic follow-up, and more Google reviews — done for you.",
};

// ── Plain-English explainers for the features that drive upgrades ──
const explainers = [
  {
    icon: PhoneMissed,
    title: "Missed-Call Text Back",
    what: "If nobody answers, the caller instantly gets a friendly text.",
    why: "Most people won't leave a voicemail — they just call the next business. This keeps them talking to you.",
    example: "“Sorry we missed your call! How can we help?” — sent seconds after a missed call.",
  },
  {
    icon: Headphones,
    title: "24/7 AI Receptionist",
    what: "An AI assistant answers your calls when your team can't.",
    why: "Every call gets picked up — after hours, weekends, or when you're on the tools. No lost jobs.",
    example: "A customer calls at 9pm. Instead of voicemail, the AI answers and books them in.",
  },
  {
    icon: ClipboardCheck,
    title: "Lead Qualification",
    what: "The AI asks a few quick questions before the lead reaches you.",
    why: "You already know what they need and how urgent it is — so you close more, faster.",
    example: "You get: “Roof leak, Springfield, needs it this week” — not just “I need help.”",
  },
  {
    icon: MessagesSquare,
    title: "Automatic Follow-Up",
    what: "Texts and emails that go out on their own to keep customers moving.",
    why: "Fewer no-shows, more re-bookings — without your team remembering to chase anyone.",
    example: "“Reminder: your appointment is tomorrow at 2 PM.” Sent automatically.",
  },
  {
    icon: ShieldCheck,
    title: "Feedback Recovery",
    what: "Unhappy customers reach you privately — before they post publicly.",
    why: "You protect your star rating and get the chance to fix problems quietly.",
    example: "Happy customers → asked for a Google review. Unhappy ones → sent straight to you.",
  },
  {
    icon: CalendarCheck,
    title: "Online Booking",
    what: "Customers pick a time and book themselves — no phone tag.",
    why: "You fill your calendar even when the phone lines are busy or closed.",
    example: "Customer taps Tuesday, 2:00 PM — booked and confirmed in seconds.",
  },
];

// ── Compare Plans matrix. Cell = true | false | string ──
type Cell = boolean | string;
const groups: { title: string; rows: { label: string; s: Cell; g: Cell; f: Cell }[] }[] = [
  {
    title: "Website & Leads",
    rows: [
      { label: "Professional website", s: "5 pages", g: "10 pages", f: "Unlimited" },
      { label: "Contact forms", s: true, g: true, f: true },
      { label: "Automatic email follow-up", s: true, g: true, f: true },
      { label: "Text (SMS) follow-up", s: false, g: true, f: true },
      { label: "Online appointment booking", s: false, g: true, f: true },
    ],
  },
  {
    title: "Phone & Calls",
    rows: [
      { label: "Missed-call text back", s: false, g: true, f: true },
      { label: "24/7 AI receptionist", s: false, g: "Standard", f: "Advanced" },
      { label: "Lead qualification", s: false, g: true, f: true },
    ],
  },
  {
    title: "Reputation",
    rows: [
      { label: "Google review requests", s: true, g: true, f: true },
      { label: "Private feedback recovery", s: false, g: true, f: true },
      { label: "Review monitoring & alerts", s: false, g: true, f: true },
    ],
  },
  {
    title: "Growth & Marketing",
    rows: [
      { label: "Monthly marketing campaigns", s: false, g: false, f: true },
      { label: "Customer win-back campaigns", s: false, g: false, f: true },
      { label: "Ongoing website improvements", s: false, g: false, f: true },
    ],
  },
  {
    title: "Reporting & Support",
    rows: [
      { label: "Monthly performance report", s: true, g: true, f: true },
      { label: "Strategy reviews", s: false, g: "Monthly", f: "Weekly" },
      { label: "Support", s: "Email", g: "Priority", f: "Dedicated" },
    ],
  },
];

function CellValue({ value, highlight }: { value: Cell; highlight?: boolean }) {
  if (value === true) {
    return (
      <span className="inline-flex w-6 h-6 rounded-full bg-[#0F5132]/25 items-center justify-center">
        <Check size={13} className="text-[#C9A24B]" />
      </span>
    );
  }
  if (value === false) {
    return <Minus size={15} className="text-white/15" />;
  }
  return (
    <span className={`text-xs font-semibold ${highlight ? "text-[#E8C87A]" : "text-white/70"}`}>
      {value}
    </span>
  );
}

export default function PricingPage() {
  const tiers = pricingConfig.tiers;

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 bg-[#0D0D0F] overflow-hidden">
        <AnimatedDotGrid isDark />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#0F5132]/12 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[200px] bg-[#C9A24B]/6 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#C9A24B] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B] animate-pulse" />
            Simple, All-In Pricing
          </span>
          <h1 className="text-5xl lg:text-6xl font-black text-white leading-[0.95] tracking-tight mb-6">
            One flat price.{" "}
            <span className="font-serif-accent text-gold-gradient">More customers.</span>
          </h1>
          <p className="text-xl text-white/50 leading-relaxed max-w-2xl mx-auto mb-10">
            Pick the plan that fits where your business is today. Setup, support, and
            everything you see below is included — no surprise fees, cancel anytime.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {["No lock-in contracts", "Setup included", "Live in 3–5 days", "Cancel anytime"].map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/50"
              >
                <span className="w-1 h-1 rounded-full bg-[#C9A24B]" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cards ── */}
      <section className="pb-24 bg-[#0D0D0F]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 items-start pt-6">
            {tiers.map((tier, i) => (
              <PricingCard key={tier.id} tier={tier} index={i} />
            ))}
          </div>
          <p className="text-center text-sm text-white/30 mt-10">
            All plans are month-to-month. The setup fee is a one-time charge collected at onboarding.
          </p>
        </div>
      </section>

      {/* ── Plain-English feature explainers ── */}
      <section className="py-24 bg-[#111113] border-y border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <h2 className="text-4xl font-black text-white tracking-[-0.02em] mb-4">
              What this actually does{" "}
              <span className="font-serif-accent text-gold-gradient">for you.</span>
            </h2>
            <p className="text-white/45 leading-relaxed">
              No tech talk. Here's what the features that win you customers really mean —
              in plain English.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {explainers.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="group rounded-2xl p-7 bg-[#0D0D0F] border border-white/[0.07] hover:border-white/15 transition-colors duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#C9A24B]/12 flex items-center justify-center mb-5">
                    <Icon size={20} className="text-[#C9A24B]" />
                  </div>
                  <h3 className="text-lg font-black text-white mb-3">{f.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed mb-3">{f.what}</p>
                  <p className="text-sm text-white/45 leading-relaxed mb-4">
                    <span className="font-semibold text-[#C9A24B]">Why it matters: </span>
                    {f.why}
                  </p>
                  <p className="text-xs text-white/40 leading-relaxed italic border-t border-white/[0.06] pt-4">
                    {f.example}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Compare Plans ── */}
      <section className="py-24 bg-[#0D0D0F]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#C9A24B] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B]" />
              Compare Plans
            </span>
            <h2 className="text-3xl lg:text-4xl font-black text-white mb-3">
              See exactly what's included
            </h2>
            <p className="text-white/40">Everything, side by side — so you can choose with confidence.</p>
          </div>

          <div className="rounded-2xl border border-white/[0.08] overflow-x-auto">
            <div className="min-w-[640px]">
              {/* Header */}
              <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr] border-b border-white/[0.08] bg-[#111113]">
                <div className="p-5" />
                {tiers.map((tier) => (
                  <div key={tier.id} className={`p-5 text-center ${tier.highlight ? "bg-[#0F5132]/15" : ""}`}>
                    <div className={`text-sm font-black ${tier.highlight ? "text-[#C9A24B]" : "text-white/80"}`}>
                      {tier.name}
                    </div>
                    <div className="text-lg font-black text-white mt-1">
                      {tier.price}
                      <span className="text-xs font-normal text-white/35">{tier.period}</span>
                    </div>
                  </div>
                ))}
              </div>

              {groups.map((group) => (
                <div key={group.title}>
                  <div className="bg-[#111113]/60 border-b border-white/[0.05]">
                    <div className="px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#C9A24B]">
                      {group.title}
                    </div>
                  </div>
                  {group.rows.map((row, i) => (
                    <div
                      key={row.label}
                      className={`grid grid-cols-[1.6fr_1fr_1fr_1fr] border-b border-white/[0.04] last:border-0 ${
                        i % 2 === 0 ? "bg-[#0D0D0F]" : "bg-[#0F0F11]"
                      }`}
                    >
                      <div className="px-5 py-4 text-sm text-white/70">{row.label}</div>
                      <div className="px-5 py-4 flex items-center justify-center">
                        <CellValue value={row.s} />
                      </div>
                      <div className="px-5 py-4 flex items-center justify-center bg-[#0F5132]/8">
                        <CellValue value={row.g} highlight />
                      </div>
                      <div className="px-5 py-4 flex items-center justify-center">
                        <CellValue value={row.f} />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Revenue leak calculator ── */}
      <RevenueLeakCalculator />

      {/* ── FAQ ── */}
      <section className="py-24 bg-[#111113] border-t border-white/[0.05]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#C9A24B] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B] animate-pulse" />
              Common Questions
            </span>
            <h2 className="text-3xl lg:text-4xl font-black text-white">
              Everything you're wondering
            </h2>
          </div>
          <PricingFAQ />
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
