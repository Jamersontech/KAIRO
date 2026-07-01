import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, Zap, Users, Award } from "lucide-react";
import { FinalCTA } from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Kairo — the AI automation agency helping local businesses compete and grow.",
};

const values = [
  {
    icon: Zap,
    title: "Speed as a feature",
    body: "We don't do six-week website builds. Local businesses can't afford to wait — which is why we've built a process that launches in 48 hours without sacrificing quality.",
  },
  {
    icon: Users,
    title: "Built for real businesses",
    body: "We work with dentists, contractors, and salon owners — not Fortune 500 companies. Everything we build is designed for the realities of running a local business.",
  },
  {
    icon: Shield,
    title: "Transparent and accountable",
    body: "No vanity metrics. No inflated promises. We show you exactly what's working with plain-English monthly reports and give you honest assessments when something needs to change.",
  },
  {
    icon: Award,
    title: "Outcomes, not outputs",
    body: "We're not an agency that delivers a website and disappears. We measure our success by your leads, your reviews, and your revenue — and we stay to make it happen.",
  },
];

const trustSignals = [
  { value: "50+", label: "Local businesses served" },
  { value: "98%", label: "Client retention rate" },
  { value: "200+", label: "Reviews generated for clients" },
  { value: "48hrs", label: "Average time to launch" },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A24B] mb-3 block">
                Our Story
              </span>
              <h1 className="text-5xl lg:text-6xl font-bold text-[#1C1C1E] leading-tight mb-5">
                We built Kairo because
                <br />
                local businesses deserve better.
              </h1>
              <p className="text-lg text-[#1C1C1E]/60 leading-relaxed">
                We started Kairo after watching great local businesses lose clients
                to competitors who were technically worse — but faster to respond,
                better looking online, and swimming in Google reviews.
              </p>
            </div>
            <div className="bg-[#1C1C1E] rounded-3xl p-10 text-white">
              <div className="grid grid-cols-2 gap-8">
                {trustSignals.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-3xl font-bold text-[#C9A24B] mb-1">
                      {s.value}
                    </div>
                    <div className="text-xs text-white/50 leading-snug">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A24B] mb-3 block">
            Our Mission
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1C1C1E] leading-tight mb-6">
            Level the playing field for
            <br />
            the businesses that run our communities.
          </h2>
          <div className="space-y-5 text-lg text-[#1C1C1E]/60 leading-relaxed">
            <p>
              The dentist who's been in your neighborhood for 20 years shouldn't
              lose a new patient to a corporate chain just because they have a
              better website and more Google reviews. The contractor who does
              beautiful work shouldn't watch leads go cold because they couldn't
              respond in the first 5 minutes.
            </p>
            <p>
              AI has made it possible to deploy the same marketing infrastructure
              that large companies use — at a price point that makes sense for a
              local business. Kairo is how we put that technology to work for the
              people who deserve it most.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A24B] mb-3 block">
              How We Work
            </span>
            <h2 className="text-4xl font-bold text-[#1C1C1E]">
              What we believe
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="bg-white rounded-2xl p-8 border border-[#1C1C1E]/6 shadow-sm"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#0F5132]/10 flex items-center justify-center mb-5">
                    <Icon size={20} className="text-[#0F5132]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1C1C1E] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-[#1C1C1E]/60 leading-relaxed">
                    {value.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#1C1C1E] mb-4">
            Ready to work together?
          </h2>
          <p className="text-lg text-[#1C1C1E]/60 mb-8">
            Start with a free website audit — no strings attached.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-[#0F5132] text-white font-bold text-base hover:bg-[#16733f] transition-colors shadow-lg shadow-[#0F5132]/20"
          >
            Get a Free Website Audit
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
