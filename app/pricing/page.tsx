import type { Metadata } from "next";
import { PricingCard } from "@/components/PricingCard";
import { pricingConfig } from "@/config/site";
import { FinalCTA } from "@/components/FinalCTA";
import { PricingFAQ } from "@/components/PricingFAQ";
import { PricingFeatureExplorer } from "@/components/PricingFeatureExplorer";
import { RevenueLeakCalculator } from "@/components/RevenueLeakCalculator";
import { AnimatedDotGrid } from "@/components/AnimatedDotGrid";
import { Check, Minus } from "lucide-react";
import { CATEGORY_ORDER, featuresInCategory } from "@/lib/pricingFeatures";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, all-in-one pricing for local businesses. A professional website, an AI receptionist that answers every call, automatic follow-up, and more Google reviews — done for you.",
};

// The compare table derives from the same feature list as the cards and the
// explorer (via lib/pricingFeatures), so every feature is named identically.
function AvailCell({ on, highlight }: { on: boolean; highlight?: boolean }) {
  return on ? (
    <span
      className={`inline-flex w-6 h-6 rounded-full items-center justify-center ${
        highlight ? "bg-[#0F5132]/35" : "bg-[#0F5132]/25"
      }`}
    >
      <Check size={13} className="text-[#C9A24B]" />
    </span>
  ) : (
    <Minus size={15} className="text-white/15" />
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

      {/* ── Every feature, explained (interactive) ── */}
      <PricingFeatureExplorer />

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

              {CATEGORY_ORDER.map((cat) => {
                const rows = featuresInCategory(cat);
                if (!rows.length) return null;
                return (
                  <div key={cat}>
                    <div className="bg-[#111113]/60 border-b border-white/[0.05]">
                      <div className="px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#C9A24B]">
                        {cat}
                      </div>
                    </div>
                    {rows.map((f, i) => (
                      <div
                        key={f.slug}
                        className={`grid grid-cols-[1.6fr_1fr_1fr_1fr] border-b border-white/[0.04] last:border-0 ${
                          i % 2 === 0 ? "bg-[#0D0D0F]" : "bg-[#0F0F11]"
                        }`}
                      >
                        <div className="px-5 py-4 text-sm text-white/70">{f.name}</div>
                        <div className="px-5 py-4 flex items-center justify-center">
                          <AvailCell on={f.avail[0]} />
                        </div>
                        <div className="px-5 py-4 flex items-center justify-center bg-[#0F5132]/8">
                          <AvailCell on={f.avail[1]} highlight />
                        </div>
                        <div className="px-5 py-4 flex items-center justify-center">
                          <AvailCell on={f.avail[2]} />
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
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
