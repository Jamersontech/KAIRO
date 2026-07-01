"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen bg-[#0D0D0F] overflow-hidden flex flex-col">

      {/* ── SVG noise texture ───────────────── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <filter id="hero-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-noise)" opacity="0.038" />
      </svg>

      {/* ── Dot grid ────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── Gradient orbs ───────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/3 w-[560px] h-[560px] bg-[#0F5132]/25 rounded-full blur-[140px] animate-blob-a" />
        <div className="absolute bottom-1/4 left-1/4 w-[420px] h-[420px] bg-[#C9A24B]/12 rounded-full blur-[120px] animate-blob-b" />
        <div className="absolute top-2/3 right-1/5 w-[300px] h-[300px] bg-[#0F5132]/10 rounded-full blur-[100px] animate-blob-a" style={{ animationDelay: "5s" }} />
      </div>

      {/* ── Header spacer ───────────────────── */}
      <div className="h-16 lg:h-20 flex-shrink-0" />

      {/* ── Main content ────────────────────── */}
      <div className="relative flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">

        {/* KAIRO wordmark */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            className="kairo-wordmark font-black leading-[0.88] tracking-[-0.04em] select-none"
            style={{ fontSize: "clamp(5.5rem, 19vw, 20rem)" }}
          >
            KAIRO
          </motion.h1>
        </div>

        {/* Gold divider */}
        <div
          className="origin-left h-px bg-gradient-to-r from-[#C9A24B] via-[#0F5132]/60 to-transparent mb-8 animate-draw-line"
        />

        {/* Tagline + headline */}
        <div className="grid lg:grid-cols-2 gap-8 items-end">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="text-xs font-semibold tracking-[0.22em] uppercase text-[#C9A24B] mb-4"
            >
              AI Automation for Local Business
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-white leading-[1.15] max-w-lg"
            >
              Your local business deserves to{" "}
              <span className="text-[#0F5132]">compete</span> like an
              enterprise.
            </motion.h2>
          </div>

          <div className="lg:pb-2">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="text-base text-white/45 leading-relaxed mb-8 max-w-sm"
            >
              We build AI-powered websites, automate your client follow-up, and
              put your Google reviews on autopilot — done for you.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.88 }}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-[#0F5132] text-white font-bold text-sm transition-all duration-200 animate-glow hover:bg-[#16733f]"
              >
                Get a Free Website Audit
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-white/40 hover:text-white transition-colors duration-200 py-4"
              >
                See How It Works
                <ArrowRight size={13} />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.05 }}
          className="mt-14 pt-6 border-t border-white/8 flex flex-wrap items-center gap-x-10 gap-y-4"
        >
          {[
            { stat: "48hrs", label: "website launch" },
            { stat: "40%",   label: "more leads on avg." },
            { stat: "200+",  label: "reviews generated" },
            { stat: "24/7",  label: "automation running" },
          ].map((item) => (
            <div key={item.label} className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#C9A24B]">{item.stat}</span>
              <span className="text-xs text-white/35">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
