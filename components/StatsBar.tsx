"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { EASE, VIEWPORT } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { SectionKicker } from "./SectionKicker";

interface StatItem {
  prefix?: string;
  value: number;
  suffix: string;
  label: string;
  // When set, this text is shown verbatim instead of a counted-up number
  // (for values that aren't a single number, e.g. a "3–5" range).
  staticText?: string;
}

const stats: StatItem[] = [
  { staticText: "3–5", value: 5, suffix: "days", label: "Average website launch time" },
  { value: 40,  suffix: "%",    label: "Average lead increase in 90 days" },
  { value: 200, suffix: "+",    label: "Google reviews generated" },
  { value: 50,  suffix: "+",    label: "Local businesses served" },
  { prefix: "24/", value: 7, suffix: "", label: "Automation running in background" },
];

function CountUp({ item }: { item: StatItem }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (item.staticText) return;
    if (!inView) return;
    if (reduced) {
      setDisplay(item.value);
      return;
    }
    const end = item.value;
    const duration = 1600;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, item.value, reduced, item.staticText]);

  return (
    <span ref={ref} className="tabular-nums">
      {item.staticText ?? `${item.prefix ?? ""}${display}`}
    </span>
  );
}

export function StatsBar() {
  return (
    <section className="relative bg-[#0D0D0F] py-20 overflow-hidden">
      {/* Accent orbs */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-64 h-64 bg-[#0F5132]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-48 h-48 bg-[#C9A24B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionKicker index="04" eyebrow="By the Numbers" className="mb-14" />

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-x-8 gap-y-12 xl:gap-0 xl:divide-x xl:divide-white/[0.06]">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              className="xl:px-8 xl:first:pl-0"
            >
              <div className="inline-flex items-baseline">
                <span
                  className="font-black text-white/90 leading-none tracking-[-0.03em]"
                  style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.75rem)" }}
                >
                  <CountUp item={stat} />
                </span>
                {stat.suffix && (
                  <span
                    className="font-serif-accent text-[#C9A24B] leading-none"
                    style={{ fontSize: "clamp(1.15rem, 2.4vw, 2.1rem)" }}
                  >
                    {stat.suffix}
                  </span>
                )}
              </div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-white/30 mt-3 leading-relaxed">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
