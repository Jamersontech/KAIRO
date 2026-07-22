"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedDotGrid } from "@/components/AnimatedDotGrid";
import { EASE, VIEWPORT } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

interface Stat {
  value?: number;
  text?: string;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 50, suffix: "+", label: "Local businesses served" },
  { value: 98, suffix: "%", label: "Client retention rate" },
  { value: 200, suffix: "+", label: "Reviews generated" },
  { text: "3–5", suffix: " days", label: "Average time to launch" },
];

const industries = [
  "Dentists", "Chiropractors", "Roofers", "HVAC", "Plumbers",
  "Electricians", "Contractors", "Med Spas", "Lawyers", "Real Estate",
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = usePrefersReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setN(value);
      return;
    }
    const duration = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value, reduced]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      <span className="text-[#1C1C1E]/35 text-2xl lg:text-3xl align-top">{suffix}</span>
    </span>
  );
}

export function AboutIntro() {
  return (
    <>
      {/* ── Hero + stats ── */}
      <section className="relative overflow-hidden pt-16 pb-20 bg-[#FAF9F6] kairo-pattern">
        <AnimatedDotGrid />
        {/* Ambient wash */}
        <div className="absolute -top-24 right-0 w-[520px] h-[420px] bg-[#0F5132]/[0.06] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.28em] uppercase text-[#C9A24B] mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B] animate-pulse" />
            Our Story
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
            className="text-5xl lg:text-7xl font-black text-[#1C1C1E] leading-[0.95] tracking-[-0.02em] max-w-4xl"
          >
            Local businesses{" "}
            <span className="font-serif-accent text-[#0F5132]">deserve better.</span>{" "}
            So we built it.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
            className="mt-6 text-lg lg:text-xl text-[#1C1C1E]/55 leading-relaxed max-w-2xl"
          >
            We started Kairo after watching great local businesses lose clients to
            competitors who were technically worse — but faster to respond, better
            looking online, and swimming in Google reviews.
          </motion.p>

          {/* Stats band — replaces the old flat box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
            className="mt-16 pt-10 border-t border-[#1C1C1E]/10 grid grid-cols-2 lg:grid-cols-4 gap-y-10 lg:divide-x lg:divide-[#1C1C1E]/10"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center lg:px-8 lg:first:pl-0">
                <div className="text-4xl lg:text-5xl font-black text-[#C9A24B] mb-2 leading-none">
                  {s.text !== undefined ? (
                    <span className="tabular-nums">
                      {s.text}
                      <span className="text-[#1C1C1E]/35 text-2xl lg:text-3xl">{s.suffix}</span>
                    </span>
                  ) : (
                    <CountUp value={s.value!} suffix={s.suffix} />
                  )}
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1C1C1E]/45">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="relative overflow-hidden py-24 bg-[#FAF9F6] kairo-pattern border-t border-[#1C1C1E]/[0.06]">
        <AnimatedDotGrid />
        {/* Giant decorative quote mark */}
        <div
          aria-hidden
          className="absolute -top-6 left-4 sm:left-10 text-[#C9A24B]/10 select-none pointer-events-none"
          style={{ fontSize: "16rem", lineHeight: 1, fontFamily: "var(--font-serif)" }}
        >
          &ldquo;
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.28em] uppercase text-[#C9A24B] mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B]" />
            Our Mission
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
            className="text-4xl lg:text-5xl font-black text-[#1C1C1E] leading-[1.02] tracking-[-0.02em] mb-8"
          >
            Level the playing field for the businesses that{" "}
            <span className="font-serif-accent text-[#0F5132]">run our communities.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
            className="space-y-5 text-lg text-[#1C1C1E]/60 leading-relaxed border-l-2 border-[#0F5132]/25 pl-6"
          >
            <p>
              The dentist who&apos;s been in your neighborhood for 20 years shouldn&apos;t
              lose a new patient to a corporate chain just because they have a better
              website and more Google reviews. The contractor who does beautiful work
              shouldn&apos;t watch leads go cold because they couldn&apos;t respond in the
              first 5 minutes.
            </p>
            <p>
              AI has made it possible to deploy the same marketing infrastructure that
              large companies use — at a price that makes sense for a local business.
              Kairo is how we put that technology to work for the people who deserve it
              most.
            </p>
          </motion.div>

          {/* Who we serve */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="mt-12"
          >
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1C1C1E]/35 mb-4">
              Who we build for
            </div>
            <div className="flex flex-wrap gap-2">
              {industries.map((industry) => (
                <span
                  key={industry}
                  className="px-3.5 py-1.5 rounded-full bg-[#1C1C1E]/[0.04] border border-[#1C1C1E]/10 text-sm font-medium text-[#1C1C1E]/60 hover:border-[#C9A24B]/40 hover:text-[#1C1C1E] transition-colors duration-200"
                >
                  {industry}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
