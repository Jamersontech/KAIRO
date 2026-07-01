"use client";

import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const problems = [
  "A potential client calls — you miss it. They move on to your competitor in minutes.",
  "Your website looks like it was built in 2015. Visitors leave before they read a word.",
  "You have 12 Google reviews. The shop next door has 340. They win every search.",
  "You follow up manually — when you remember — and half the time it's too late.",
];

const solutions = [
  "Our AI voice agent answers every call 24/7, qualifies the lead, and books the appointment — even when you're unavailable.",
  "A conversion-focused website built by AI and refined by our team — live in 48 hours.",
  "Review requests go out automatically after every appointment. Your reputation builds itself.",
  "Nurture sequences run in the background, following up for weeks without you lifting a finger.",
];

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease },
  }),
};

export function ProblemSolution() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A24B] mb-3 block">
            The Problem
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1C1C1E] leading-tight mb-4">
            Great businesses lose clients
            <br />
            to faster, louder competitors.
          </h2>
          <p className="text-lg text-[#1C1C1E]/60 leading-relaxed">
            It's not about being better. It's about being{" "}
            <em>present</em> — online, responsive, and trusted. Most local
            businesses aren't, and leads slip away every day.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Problems */}
          <div className="bg-[#FAF9F6] rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-6">
              <AlertCircle size={18} className="text-red-400" />
              <span className="text-sm font-semibold text-[#1C1C1E]/60 uppercase tracking-wider">
                Without Kairo
              </span>
            </div>
            <div className="space-y-4">
              {problems.map((p, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-100"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                  <p className="text-sm text-[#1C1C1E]/70 leading-relaxed">{p}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div className="bg-[#0F5132] rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle2 size={18} className="text-[#C9A24B]" />
              <span className="text-sm font-semibold text-white/60 uppercase tracking-wider">
                With Kairo
              </span>
            </div>
            <div className="space-y-4">
              {solutions.map((s, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/10 border border-white/10"
                >
                  <CheckCircle2
                    size={16}
                    className="text-[#C9A24B] mt-0.5 flex-shrink-0"
                  />
                  <p className="text-sm text-white/80 leading-relaxed">{s}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Stat callout */}
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <div className="bg-[#1C1C1E] rounded-2xl p-6 flex items-center gap-5">
            <span className="text-4xl font-bold text-[#C9A24B]">78%</span>
            <p className="text-sm text-white/60 leading-snug">
              of customers choose the{" "}
              <strong className="text-white">first business to respond</strong>{" "}
              to their inquiry.
            </p>
          </div>
          <div className="bg-[#1C1C1E] rounded-2xl p-6 flex items-center gap-5">
            <span className="text-4xl font-bold text-[#C9A24B]">50%</span>
            <p className="text-sm text-white/60 leading-snug">
              more inbound calls go to businesses with{" "}
              <strong className="text-white">4.5+ star Google ratings</strong>{" "}
              vs. competitors.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
