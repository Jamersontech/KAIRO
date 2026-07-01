"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatItem {
  prefix?: string;
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { value: 48,  suffix: "hrs",  label: "Average website launch time" },
  { value: 40,  suffix: "%",    label: "Average lead increase in 90 days" },
  { value: 200, suffix: "+",    label: "Google reviews generated" },
  { value: 50,  suffix: "+",    label: "Local businesses served" },
  { prefix: "24/", value: 7, suffix: "", label: "Automation running in background" },
];

function CountUp({ item }: { item: StatItem }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
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
  }, [inView, item.value]);

  return (
    <span ref={ref} className="tabular-nums">
      {item.prefix ?? ""}{display}{item.suffix}
    </span>
  );
}

export function StatsBar() {
  return (
    <section className="relative bg-[#1C1C1E] py-16 overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Accent orbs */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-64 h-64 bg-[#0F5132]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-48 h-48 bg-[#C9A24B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              className="text-center group"
            >
              <div className="text-3xl font-bold text-[#C9A24B] mb-1 transition-transform duration-300 group-hover:scale-110">
                <CountUp item={stat} />
              </div>
              <div className="text-xs text-white/45 leading-snug">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
