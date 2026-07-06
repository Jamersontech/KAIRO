"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, animate } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { EASE, VIEWPORT } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

const JOB_PRESETS = [150, 300, 500, 1000, 1500, 2500];
const WEEKS_PER_YEAR = 52;
const WEEKS_PER_MONTH = WEEKS_PER_YEAR / 12; // 52 weeks ÷ 12 months ≈ 4.33
const BOOKING_RATE = 0.25;

export function RevenueLeakCalculator() {
  const [missedCalls, setMissedCalls] = useState(6);
  const [preset, setPreset] = useState<number | "custom">(500);
  const [customValue, setCustomValue] = useState("");
  const [display, setDisplay] = useState(0);
  const reduced = usePrefersReducedMotion();
  const prevRef = useRef(0);
  const customRef = useRef<HTMLInputElement>(null);

  const jobValue =
    preset === "custom" ? Math.max(0, Number(customValue) || 0) : preset;
  // Base everything on the weekly figure so week → month → year stay consistent
  const weekly = missedCalls * jobValue * BOOKING_RATE;
  const monthly = Math.round(weekly * WEEKS_PER_MONTH);

  // Derived from the single animated `display` (monthly) to keep all three in sync
  const displayMonth = display;
  const displayWeek = Math.round(display / WEEKS_PER_MONTH);
  const displayYear = Math.round(display * 12);

  useEffect(() => {
    if (reduced) {
      setDisplay(monthly);
      prevRef.current = monthly;
      return;
    }
    const controls = animate(prevRef.current, monthly, {
      duration: 0.6,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    prevRef.current = monthly;
    return () => controls.stop();
  }, [monthly, reduced]);

  const selectCustom = () => {
    setPreset("custom");
    // Focus after the input renders
    requestAnimationFrame(() => customRef.current?.focus());
  };

  return (
    <section className="py-24 bg-[#0D0D0F]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative bg-[#111113] border border-white/[0.06] rounded-2xl p-8 lg:p-12 overflow-hidden"
        >
          {/* Corner glow */}
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#C9A24B]/8 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.28em] text-[#C9A24B] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B] animate-pulse" />
              Revenue Leak Check
            </span>
            <h3 className="text-3xl lg:text-4xl font-black text-white tracking-[-0.02em] mb-8">
              How much are missed calls{" "}
              <span className="font-serif-accent text-gold-gradient">costing you?</span>
            </h3>

            {/* Missed calls slider */}
            <div className="mb-8">
              <div className="flex items-baseline justify-between mb-4">
                <label htmlFor="missed-calls" className="text-sm font-semibold text-white/60">
                  Missed calls per week
                </label>
                <span className="text-lg font-black text-white tabular-nums">{missedCalls}</span>
              </div>
              <input
                id="missed-calls"
                type="range"
                min={0}
                max={25}
                value={missedCalls}
                onChange={(e) => setMissedCalls(Number(e.target.value))}
                className="leak-slider"
              />
            </div>

            {/* Job value chips */}
            <div className="mb-10">
              <div className="text-sm font-semibold text-white/60 mb-4">Average job value</div>
              <div className="flex flex-wrap gap-2.5">
                {JOB_PRESETS.map((v) => (
                  <button
                    key={v}
                    onClick={() => setPreset(v)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-bold border transition-all duration-200 ${
                      preset === v
                        ? "bg-[#0F5132] border-[#0F5132] text-white"
                        : "bg-transparent border-white/10 text-white/50 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    ${v.toLocaleString()}
                  </button>
                ))}
                <button
                  onClick={selectCustom}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold border transition-all duration-200 ${
                    preset === "custom"
                      ? "bg-[#C9A24B]/15 border-[#C9A24B]/60 text-[#E8C87A]"
                      : "bg-transparent border-white/10 text-white/50 hover:border-white/25 hover:text-white"
                  }`}
                >
                  Custom
                </button>
              </div>

              {preset === "custom" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 flex items-center gap-2 max-w-[220px] px-4 py-3 rounded-xl bg-[#0D0D0F] border border-white/10 focus-within:border-[#C9A24B]/60 transition-colors duration-200">
                    <span className="text-sm font-bold text-[#C9A24B]">$</span>
                    <input
                      ref={customRef}
                      type="number"
                      min={0}
                      step={50}
                      inputMode="numeric"
                      placeholder="e.g. 750"
                      value={customValue}
                      onChange={(e) => setCustomValue(e.target.value)}
                      className="w-full bg-transparent text-sm font-bold text-white placeholder:text-white/25 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      aria-label="Custom average job value in dollars"
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Output */}
            <div className="pt-8 border-t border-white/[0.06]">
              <p className="text-sm text-white/40 mb-5">
                Here&apos;s what those missed calls quietly cost you:
              </p>
              <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-6">
                {[
                  { label: "Per week", value: displayWeek, hero: false },
                  { label: "Per month", value: displayMonth, hero: false },
                  { label: "Per year", value: displayYear, hero: true },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-2">
                      {row.label}
                    </div>
                    <div
                      className={`font-black tabular-nums leading-none ${
                        row.hero
                          ? "text-gold-gradient text-3xl sm:text-5xl"
                          : "text-white/85 text-2xl sm:text-3xl"
                      }`}
                    >
                      ${row.value.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-white/25 mb-8 leading-relaxed">
                Assumes 25% of answered calls become booked jobs. Monthly and yearly
                figures use 52 weeks ÷ 12 ≈ 4.3 weeks per month, so the annual total
                reflects a full 52-week year — not 48.
              </p>

              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-[#0F5132] text-white font-bold text-sm hover:bg-[#16733f] transition-colors duration-200"
              >
                Stop the leak — get your free audit
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
