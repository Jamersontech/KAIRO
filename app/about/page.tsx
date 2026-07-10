import type { Metadata } from "next";
import { FinalCTA } from "@/components/FinalCTA";
import { AboutValuesSection } from "@/components/AboutValuesSection";
import { AnimatedDotGrid } from "@/components/AnimatedDotGrid";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Kairo — the AI automation agency helping local businesses compete and grow.",
};

const trustSignals = [
  { value: "50+", label: "Local businesses served" },
  { value: "98%", label: "Client retention rate" },
  { value: "200+", label: "Reviews generated for clients" },
  { value: "3–5 days", label: "Average time to launch" },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 bg-[#FAF9F6] kairo-pattern">
        <AnimatedDotGrid />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      <section className="relative overflow-hidden py-24 bg-[#FAF9F6] kairo-pattern">
        <AnimatedDotGrid />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              The dentist who&apos;s been in your neighborhood for 20 years shouldn&apos;t
              lose a new patient to a corporate chain just because they have a
              better website and more Google reviews. The contractor who does
              beautiful work shouldn&apos;t watch leads go cold because they couldn&apos;t
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

      {/* Values — client component for animations */}
      <AboutValuesSection />

      <FinalCTA />
    </div>
  );
}
