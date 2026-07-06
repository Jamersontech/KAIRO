"use client";

import { motion } from "framer-motion";
import { Phone, Globe, Star, MessageSquare } from "lucide-react";
import { AnimatedDotGrid } from "./AnimatedDotGrid";
import { SectionKicker } from "./SectionKicker";
import { RevealLines } from "./RevealLines";

const pairs = [
  {
    icon: Phone,
    problem:
      "A client calls at 7pm. No answer. They book with your competitor instead.",
    solution:
      "Your AI agent answers every call, 24/7 — and books the appointment while you sleep.",
    stat: "78%",
    statNote: "of buyers choose whoever responds first",
  },
  {
    icon: Globe,
    problem:
      "Your website looks dated, loads slowly, and quietly sends visitors elsewhere.",
    solution:
      "A conversion-focused site built by AI, refined by our team — live in 48 hours.",
    stat: "48hrs",
    statNote: "from brief to fully live site",
  },
  {
    icon: Star,
    problem:
      "You have 24 reviews. Your competitor has 340 — and wins local search on reputation alone.",
    solution:
      "Review requests go out automatically after every job. Your rating climbs weekly.",
    stat: "200+",
    statNote: "reviews generated for our clients",
  },
  {
    icon: MessageSquare,
    problem:
      "Manual follow-up happens late or never. Leads go cold and money is lost.",
    solution:
      "Every new lead gets a text in under 60 seconds — then nurtured for weeks, hands-free.",
    stat: "60s",
    statNote: "average lead response time",
  },
];

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function ProblemSolution() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#0D0D0F] overflow-hidden">
      <AnimatedDotGrid isDark />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] bg-[#0F5132]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[200px] bg-[#C9A24B]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionKicker index="02" eyebrow="The Reality" className="mb-12" />
        <div className="max-w-3xl mb-16">
          <RevealLines
            label="Great businesses lose clients to faster, louder competitors."
            className="text-4xl lg:text-5xl font-black text-white leading-tight tracking-[-0.02em] mb-5"
            lines={[
              <>Great businesses lose clients to</>,
              <>
                <span className="font-serif-accent text-gold-gradient">faster, louder</span>{" "}
                competitors.
              </>,
            ]}
          />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35, ease }}
            className="text-lg text-white/45 leading-relaxed"
          >
            It's not about being better. It's about being{" "}
            <em className="text-white/65 not-italic font-medium">present</em> — online,
            responsive, and trusted. Here's what changes the moment you add Kairo.
          </motion.p>
        </div>

        {/* Column labels — desktop only */}
        <div className="hidden md:grid md:grid-cols-[1fr_52px_1fr] gap-0 mb-3 px-1">
          <div className="flex items-center gap-2 pl-5">
            <div className="w-2 h-2 rounded-full bg-red-500/70" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-red-400/60">
              Without Kairo
            </span>
          </div>
          <div />
          <div className="flex items-center gap-2 pl-5">
            <div className="w-2 h-2 rounded-full bg-[#0F5132]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#4CAF80]/70">
              With Kairo
            </span>
          </div>
        </div>

        {/* Transformation rows */}
        <div className="space-y-2.5">
          {pairs.map((pair, i) => {
            const Icon = pair.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.52, delay: i * 0.07, ease }}
                className="grid md:grid-cols-[1fr_52px_1fr] overflow-hidden rounded-2xl"
              >
                {/* Problem */}
                <div className="group flex items-start gap-4 bg-[#150E0E] hover:bg-[#1A1010] border border-red-900/20 hover:border-red-900/35 transition-all duration-300 p-6 md:rounded-l-2xl rounded-t-2xl md:rounded-tr-none">
                  <div className="w-[3px] self-stretch bg-red-500/25 rounded-full flex-shrink-0 group-hover:bg-red-500/55 transition-colors duration-300" />
                  <div>
                    <div className="flex items-center gap-2 mb-2.5 md:hidden">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-red-400/50">
                        Without Kairo
                      </span>
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed">{pair.problem}</p>
                  </div>
                </div>

                {/* Center connector — desktop */}
                <div className="hidden md:flex flex-col items-center justify-center bg-[#111113] border-y border-white/4 gap-2.5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "#C9A24B14" }}
                  >
                    <Icon size={15} className="text-[#C9A24B]" />
                  </div>
                  <div className="w-px h-4 bg-white/10 rounded-full" />
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
                    <path d="M1 4h10M7 1l4 3-4 3" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Solution */}
                <div className="group flex items-start gap-4 bg-[#0A140E] hover:bg-[#0D1A11] border border-[#0F5132]/20 hover:border-[#0F5132]/45 transition-all duration-300 p-6 md:rounded-r-2xl rounded-b-2xl md:rounded-bl-none">
                  <div className="w-[3px] self-stretch bg-[#0F5132]/35 rounded-full flex-shrink-0 group-hover:bg-[#0F5132]/75 transition-colors duration-300" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2.5 md:hidden">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0F5132]" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#4CAF80]/60">
                        With Kairo
                      </span>
                    </div>
                    <p className="text-sm text-white/72 leading-relaxed mb-4">{pair.solution}</p>
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl font-black text-[#C9A24B] leading-none">
                        {pair.stat}
                      </span>
                      <span className="text-[10px] text-white/30 leading-snug">{pair.statNote}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA nudge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#111113] rounded-2xl p-6 border border-white/5"
        >
          <p className="text-sm text-white/45 text-center sm:text-left">
            Every one of these problems has a solution that's already running for our clients.
          </p>
          <a
            href="/pricing"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-[#0F5132] hover:bg-[#1a6b44] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors duration-200"
          >
            See how it works
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
