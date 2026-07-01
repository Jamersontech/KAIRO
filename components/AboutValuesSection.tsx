"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Users, Award } from "lucide-react";
import { AnimatedDotGrid } from "./AnimatedDotGrid";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const values = [
  {
    icon: Zap,
    title: "Speed as a feature",
    body: "We don't do six-week website builds. Local businesses can't afford to wait — which is why we've built a process that launches in 48 hours without sacrificing quality.",
    color: "#C9A24B",
    accent: "#C9A24B",
    stat: "48hrs",
    statLabel: "to launch",
  },
  {
    icon: Users,
    title: "Built for real businesses",
    body: "We work with dentists, contractors, and salon owners — not Fortune 500 companies. Everything we build is designed for the realities of running a local business.",
    color: "#6B8FE0",
    accent: "#6B8FE0",
    stat: "50+",
    statLabel: "businesses served",
  },
  {
    icon: Shield,
    title: "Transparent and accountable",
    body: "No vanity metrics. No inflated promises. We show you exactly what's working with plain-English monthly reports and give you honest assessments when something needs to change.",
    color: "#0F5132",
    accent: "#0F5132",
    stat: "98%",
    statLabel: "retention rate",
  },
  {
    icon: Award,
    title: "Outcomes, not outputs",
    body: "We're not an agency that delivers a website and disappears. We measure our success by your leads, your reviews, and your revenue — and we stay to make it happen.",
    color: "#C9A24B",
    accent: "#C9A24B",
    stat: "200+",
    statLabel: "reviews generated",
  },
];

export function AboutValuesSection() {
  return (
    <section className="relative py-28 bg-[#0D0D0F] overflow-hidden">
      <AnimatedDotGrid isDark />

      {/* Ambient orbs */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#0F5132]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[380px] h-[380px] bg-[#C9A24B]/6 rounded-full blur-[120px] pointer-events-none" />

      {/* Watermark */}
      <div className="absolute right-0 bottom-0 text-[20rem] font-black leading-none text-white/[0.02] select-none pointer-events-none">
        4
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-14"
        >
          <span className="text-[10px] font-black tracking-widest uppercase text-[#C9A24B] mb-3 block">
            How We Work
          </span>
          <h2
            className="text-5xl font-black leading-[0.92] tracking-tight"
            style={{
              background: "linear-gradient(135deg, #ffffff 55%, #C9A24B 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            What we believe
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {values.map((value, idx) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: idx * 0.1, ease }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="group relative rounded-3xl p-8 border border-white/[0.06] bg-[#111113] overflow-hidden cursor-default"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 30% 20%, ${value.color}10 0%, transparent 65%)` }}
                />

                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] rounded-t-3xl"
                  style={{ background: `linear-gradient(90deg, ${value.color}60, transparent 70%)` }}
                />

                {/* Large stat in corner */}
                <div
                  className="absolute top-6 right-7 text-5xl font-black leading-none select-none pointer-events-none tabular-nums"
                  style={{ color: `${value.color}18` }}
                >
                  {value.stat}
                </div>

                <div className="relative">
                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${value.color}18` }}
                  >
                    <Icon size={20} style={{ color: value.color }} />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl font-black mb-3 leading-tight"
                    style={{
                      background: `linear-gradient(135deg, #ffffff 60%, ${value.color} 100%)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {value.title}
                  </h3>

                  {/* Body */}
                  <p className="text-sm text-white/48 leading-relaxed">
                    {value.body}
                  </p>

                  {/* Stat pill at bottom */}
                  <div className="flex items-center gap-2 mt-6">
                    <div
                      className="px-3 py-1 rounded-full text-xs font-black"
                      style={{ backgroundColor: `${value.color}15`, color: value.color }}
                    >
                      {value.stat}
                    </div>
                    <span className="text-[11px] text-white/25">{value.statLabel}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
