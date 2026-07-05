import type { Metadata } from "next";
import { PricingCard } from "@/components/PricingCard";
import { pricingConfig } from "@/config/site";
import { FinalCTA } from "@/components/FinalCTA";
import { AnimatedDotGrid } from "@/components/AnimatedDotGrid";
import { RevenueLeakCalculator } from "@/components/RevenueLeakCalculator";
import { Check, X } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for Kairo's AI automation services — Starter, Growth, and Full Stack plans for local businesses.",
};

const comparison = [
  { feature: "AI-built website", starter: true, growth: true, fullstack: true },
  { feature: "Up to 5 pages", starter: true, growth: false, fullstack: false },
  { feature: "Up to 10 pages + landing pages", starter: false, growth: true, fullstack: false },
  { feature: "Unlimited pages & revisions", starter: false, growth: false, fullstack: true },
  { feature: "On-page SEO optimization", starter: true, growth: true, fullstack: true },
  { feature: "SMS follow-up (1 sequence)", starter: true, growth: false, fullstack: false },
  { feature: "SMS & email sequences (3 flows)", starter: false, growth: true, fullstack: false },
  { feature: "Full CRM automation build-out", starter: false, growth: false, fullstack: true },
  { feature: "Appointment reminders", starter: false, growth: true, fullstack: true },
  { feature: "Google review automation", starter: true, growth: true, fullstack: true },
  { feature: "Review monitoring & alerts", starter: false, growth: true, fullstack: true },
  { feature: "Response templates", starter: false, growth: true, fullstack: true },
  { feature: "Monthly analytics report", starter: true, growth: true, fullstack: true },
  { feature: "Bi-weekly strategy calls", starter: false, growth: true, fullstack: false },
  { feature: "Dedicated account manager", starter: false, growth: false, fullstack: true },
  { feature: "Weekly reporting & calls", starter: false, growth: false, fullstack: true },
];

export default function PricingPage() {
  return (
    <div>
      {/* ── Dark hero ── */}
      <section className="relative pt-32 pb-20 bg-[#0D0D0F] overflow-hidden">
        <AnimatedDotGrid isDark />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#0F5132]/12 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[200px] bg-[#C9A24B]/6 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#C9A24B] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B] animate-pulse" />
            Transparent Pricing
          </span>
          <h1 className="text-5xl lg:text-6xl font-black text-white leading-[0.95] tracking-tight mb-6">
            Simple pricing.{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #C9A24B, #E8C87A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Serious results.
            </span>
          </h1>
          <p className="text-xl text-white/45 leading-relaxed max-w-2xl mx-auto mb-10">
            Every plan includes setup, onboarding, and ongoing support. Pick the
            level that matches where your business is today — upgrade anytime.
          </p>

          {/* Trust pills */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {["No lock-in contracts", "Setup included", "Cancel any time", "Results in 30 days"].map((item) => (
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

      {/* ── Pricing cards — dark background ── */}
      <section className="py-20 bg-[#0D0D0F]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {pricingConfig.tiers.map((tier, i) => (
              <PricingCard key={tier.id} tier={tier} index={i} />
            ))}
          </div>
          <p className="text-center text-sm text-white/25 mt-8">
            All plans are monthly retainers. Setup fees are one-time and collected at onboarding.
          </p>
        </div>
      </section>

      {/* ── Comparison table ── */}
      <section className="py-24 bg-[#111113]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#C9A24B] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B]" />
              Full Breakdown
            </span>
            <h2 className="text-3xl font-black text-white mb-3">
              What&apos;s included in each plan
            </h2>
            <p className="text-white/40">
              A detailed breakdown so you can choose with confidence.
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.08] overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-4 border-b border-white/[0.08] bg-[#0D0D0F]">
              <div className="p-5 col-span-1" />
              {pricingConfig.tiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`p-5 text-center ${tier.highlight ? "bg-[#0F5132]/15" : ""}`}
                >
                  <div className={`text-sm font-bold ${tier.highlight ? "text-[#C9A24B]" : "text-white/70"}`}>
                    {tier.name}
                  </div>
                  <div className="text-lg font-black text-white mt-1">
                    {tier.price}
                    <span className="text-sm font-normal text-white/35">{tier.period}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Rows */}
            {comparison.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-4 border-b border-white/[0.05] last:border-0 ${
                  i % 2 === 0 ? "bg-[#0D0D0F]" : "bg-[#111113]"
                }`}
              >
                <div className="p-4 text-sm text-white/50 col-span-1">
                  {row.feature}
                </div>
                {[row.starter, row.growth, row.fullstack].map((val, j) => (
                  <div
                    key={j}
                    className={`p-4 flex items-center justify-center ${
                      pricingConfig.tiers[j].highlight ? "bg-[#0F5132]/8" : ""
                    }`}
                  >
                    {val ? (
                      <div className="w-5 h-5 rounded-full bg-[#0F5132]/20 flex items-center justify-center">
                        <Check size={12} className="text-[#C9A24B]" />
                      </div>
                    ) : (
                      <X size={14} className="text-white/15" />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <RevenueLeakCalculator />

      <FinalCTA />
    </div>
  );
}
