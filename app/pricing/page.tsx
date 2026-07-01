import type { Metadata } from "next";
import { PricingCard } from "@/components/PricingCard";
import { pricingConfig } from "@/config/site";
import { FinalCTA } from "@/components/FinalCTA";
import { Check } from "lucide-react";

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
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A24B] mb-3 block">
            Pricing
          </span>
          <h1 className="text-5xl lg:text-6xl font-bold text-[#1C1C1E] leading-tight mb-5">
            Simple, transparent pricing.
            <br />
            No surprises.
          </h1>
          <p className="text-xl text-[#1C1C1E]/60 leading-relaxed max-w-2xl mx-auto">
            Every plan includes setup, onboarding, and ongoing support. Pick the
            level that matches where your business is today — upgrade anytime.
          </p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {pricingConfig.tiers.map((tier, i) => (
              <PricingCard key={tier.id} tier={tier} index={i} />
            ))}
          </div>

          <p className="text-center text-sm text-[#1C1C1E]/40 mt-8">
            All prices are monthly retainers. Setup fees may apply depending on scope.
            Contact us to discuss your specific situation.
          </p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1C1C1E] mb-3">
              What's included in each plan
            </h2>
            <p className="text-[#1C1C1E]/60">
              A detailed breakdown so you can choose with confidence.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#1C1C1E]/6 overflow-hidden shadow-sm">
            {/* Table header */}
            <div className="grid grid-cols-4 border-b border-[#1C1C1E]/6">
              <div className="p-5 col-span-1" />
              {pricingConfig.tiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`p-5 text-center ${
                    tier.highlight ? "bg-[#0F5132]/5" : ""
                  }`}
                >
                  <div
                    className={`text-sm font-bold ${
                      tier.highlight ? "text-[#0F5132]" : "text-[#1C1C1E]"
                    }`}
                  >
                    {tier.name}
                  </div>
                  <div className="text-lg font-bold text-[#1C1C1E] mt-1">
                    {tier.price}
                    <span className="text-sm font-normal text-[#1C1C1E]/40">
                      {tier.period}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Rows */}
            {comparison.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-4 border-b border-[#1C1C1E]/4 last:border-0 ${
                  i % 2 === 0 ? "bg-white" : "bg-[#FAF9F6]/50"
                }`}
              >
                <div className="p-4 text-sm text-[#1C1C1E]/70 col-span-1">
                  {row.feature}
                </div>
                {[row.starter, row.growth, row.fullstack].map((val, j) => (
                  <div
                    key={j}
                    className={`p-4 flex items-center justify-center ${
                      pricingConfig.tiers[j].highlight ? "bg-[#0F5132]/5" : ""
                    }`}
                  >
                    {val ? (
                      <Check size={16} className="text-[#0F5132]" />
                    ) : (
                      <span className="w-4 h-px bg-[#1C1C1E]/20 block" />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
