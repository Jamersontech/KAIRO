"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease },
  }),
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0F5132]/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C9A24B]/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/4" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#1C1C1E 1px, transparent 1px), linear-gradient(90deg, #1C1C1E 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0F5132]/10 border border-[#0F5132]/20 mb-8"
          >
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={11}
                  className="fill-[#C9A24B] text-[#C9A24B]"
                />
              ))}
            </div>
            <span className="text-xs font-medium text-[#0F5132]">
              Trusted by 50+ local businesses
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-[#1C1C1E] mb-6"
          >
            Your local business
            <br />
            deserves to{" "}
            <span className="relative inline-block">
              <span className="text-[#0F5132]">compete</span>
              <span
                className="absolute bottom-1 left-0 right-0 h-0.5 bg-[#C9A24B]"
                style={{ bottom: "2px" }}
              />
            </span>{" "}
            like
            <br />
            an enterprise.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-lg sm:text-xl text-[#1C1C1E]/60 leading-relaxed mb-10 max-w-2xl"
          >
            Kairo builds AI-powered websites, automates your client follow-up, and
            puts your Google reviews on autopilot — so you can focus on doing the
            work you love.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-[#0F5132] text-white font-semibold text-base hover:bg-[#16733f] transition-all duration-200 shadow-lg shadow-[#0F5132]/20 hover:shadow-[#0F5132]/30 hover:-translate-y-0.5"
            >
              Get a Free Website Audit
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-[#1C1C1E] font-semibold text-base hover:bg-[#1C1C1E]/5 transition-colors duration-200"
            >
              See How It Works
            </Link>
          </motion.div>

          {/* Social proof strip */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-16 pt-8 border-t border-[#1C1C1E]/8 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            {[
              { stat: "2-day", label: "website launch" },
              { stat: "40%", label: "more leads on avg." },
              { stat: "200+", label: "reviews generated" },
              { stat: "24/7", label: "automation running" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className="text-xl font-bold text-[#0F5132]">
                  {item.stat}
                </span>
                <span className="text-sm text-[#1C1C1E]/50">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
