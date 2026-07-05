"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { CalendlyButton } from "@/components/CalendlyButton";
import { Magnetic } from "@/components/Magnetic";
import { SectionKicker } from "@/components/SectionKicker";
import { RevealLines } from "@/components/RevealLines";
import { KairoMark } from "@/components/KairoMark";
import { AnimatedDotGrid } from "@/components/AnimatedDotGrid";
import { EASE } from "@/lib/motion";

export function FinalCTA() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#0D0D0F] overflow-hidden">
      <AnimatedDotGrid isDark />

      {/* Ambient blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[260px] bg-[#0F5132]/12 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[360px] h-[200px] bg-[#C9A24B]/6 rounded-full blur-[110px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionKicker
          index="06"
          eyebrow="Start Here"
          align="center"
          className="mb-10"
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative rounded-3xl px-8 py-16 lg:px-16 overflow-hidden text-center border border-white/10"
          style={{
            background:
              "linear-gradient(135deg, #10552f 0%, #0F5132 45%, #0A3B24 100%)",
          }}
        >
          {/* Gold hairline across the top */}
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C9A24B] to-transparent" />

          {/* Faint KairoMark watermark */}
          <KairoMark className="absolute -right-8 -bottom-12 w-56 h-72 text-white/[0.04] rotate-[18deg] pointer-events-none" />

          {/* Background shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#C9A24B]/10 rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B] animate-pulse" />
              <span className="text-xs font-semibold text-white/80">
                Free, no-pressure consultation
              </span>
            </div>

            <RevealLines
              label="Ready to stop losing leads to your competitors?"
              className="text-4xl lg:text-5xl font-black text-white leading-tight tracking-[-0.02em] mb-5"
              delay={0.1}
              lines={[
                <>
                  Ready to stop{" "}
                  <span className="font-serif-accent text-gold-gradient">losing leads</span>
                </>,
                <>to your competitors?</>,
              ]}
            />
            <p className="text-lg text-white/70 leading-relaxed mb-10 max-w-2xl mx-auto">
              Book a free website audit and we'll show you exactly where your business
              is leaking revenue online — and how to fix it. No jargon, no pitch decks.
              Just a clear plan.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Magnetic>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white text-[#0F5132] font-bold text-base hover:bg-[#FAF9F6] transition-colors duration-200 shadow-lg"
                >
                  Get a Free Website Audit
                  <span className="relative inline-flex w-[18px] h-[18px] overflow-hidden">
                    <ArrowRight
                      size={18}
                      className="absolute transition-all duration-300 ease-out group-hover:translate-x-[20px] group-hover:opacity-0"
                    />
                    <ArrowRight
                      size={18}
                      className="absolute -translate-x-[20px] opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </span>
                </Link>
              </Magnetic>
              <Magnetic>
                <CalendlyButton className="inline-flex items-center gap-2 px-7 py-4 rounded-xl border border-white/30 text-white font-semibold text-base hover:bg-white/10 transition-colors duration-200">
                  <Calendar size={18} />
                  Book a Call
                </CalendlyButton>
              </Magnetic>
            </div>

            <p className="mt-8 text-xs text-white/30 tracking-wide">
              Free · No commitment · Just clarity.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
