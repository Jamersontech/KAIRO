"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Phone, MessageSquare, Star, ArrowRight, Check } from "lucide-react";
import { AnimatedDotGrid } from "./AnimatedDotGrid";
import { SectionKicker } from "./SectionKicker";
import { RevealLines } from "./RevealLines";

const services = [
  {
    num: "01",
    icon: Globe,
    title: "AI-Built Websites",
    tagline: "Go live in 3–5 days.",
    description:
      "We don't use templates. Every Kairo site is custom-built using AI-assisted design and refined by our team. The result: a conversion machine that looks premium and turns visitors into booked appointments — fast.",
    benefits: [
      "3–5 day turnaround from brief to live site",
      "Mobile-first, SEO-ready from launch day",
      "Conversion-optimized layout, not just pretty",
      "Schema markup, meta tags, and sitemap included",
      "Unlimited revisions until you love every pixel",
    ],
    color: "#0F5132",
    href: "/services#websites",
  },
  {
    num: "02",
    icon: Phone,
    title: "AI Voice Agents",
    tagline: "Every call answered. Every lead captured. 24/7.",
    description:
      "Your AI voice agent picks up every call, qualifies the lead, answers common questions, and books appointments — even at 2am on a Sunday. No missed calls, no lost business. Full transcript delivered after every conversation.",
    benefits: [
      "100% call answer rate, zero hold time",
      "Lead qualification and appointment booking",
      "Full transcripts delivered to your inbox",
      "Custom-trained on your business and FAQs",
      "Escalates complex cases to your team instantly",
    ],
    color: "#2D4B8E",
    href: "/services#voice",
  },
  {
    num: "03",
    icon: MessageSquare,
    title: "SMS & Email Automation",
    tagline: "Follow up instantly. Nurture endlessly. Convert automatically.",
    description:
      "Speed wins leads. Our automation sends the right message at the right moment — from the first inquiry to the 6-month re-engagement — without you touching a keyboard. Every new lead gets a response in under 60 seconds.",
    benefits: [
      "Lead response within 60 seconds, every time",
      "Multi-step SMS + email nurture sequences",
      "Appointment reminders and confirmations",
      "Re-engagement flows for cold leads",
      "CRM sync so nothing slips through",
    ],
    color: "#D97757",
    href: "/services#automation",
  },
  {
    num: "04",
    icon: Star,
    title: "Google Review Generation",
    tagline: "Build a 5-star reputation while you sleep.",
    description:
      "After every completed job, clients automatically receive a perfectly-timed review request. We handle the timing, the message, and the follow-up. Your rating climbs every week without you lifting a finger.",
    benefits: [
      "Automated review requests after every job",
      "Timing optimized for highest conversion rate",
      "Follow-up sequences for non-responders",
      "Reputation monitoring and alert system",
      "Response templates for owner replies",
    ],
    color: "#C9A24B",
    href: "/services#reviews",
  },
];

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const waveAmps = [0.3,0.7,0.5,0.9,0.4,0.8,0.6,1.0,0.3,0.7,0.9,0.5,0.8,0.4,0.6,1.0,0.7,0.3,0.9,0.5,0.8,0.4,0.6,0.7];

function WebsiteVisual() {
  return (
    <div className="w-full max-w-[240px] mx-auto">
      <div className="bg-[#1C1C1E] rounded-2xl overflow-hidden shadow-2xl border border-white/8">
        <div className="bg-[#2A2A2C] px-3 py-2.5 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <div className="flex-1 bg-[#1C1C1E] rounded text-[9px] px-2 py-0.5 text-white/25 font-mono">
            yoursite.com
          </div>
          <motion.div
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-[8px] bg-[#0F5132] text-white px-1.5 py-0.5 rounded font-black"
          >
            LIVE
          </motion.div>
        </div>
        <div className="p-3 space-y-2">
          <div className="h-16 bg-[#0F5132]/20 rounded-xl flex items-center justify-center border border-[#0F5132]/20">
            <span className="text-[#C9A24B] text-[10px] font-black tracking-widest">HERO</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[1, 2, 3].map((n) => (
              <motion.div
                key={n}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: n * 0.18 }}
                className="h-10 bg-white/5 rounded-lg"
              />
            ))}
          </div>
          <motion.div
            animate={{ boxShadow: ["0 0 0px 0px rgba(15,81,50,0)", "0 0 14px 4px rgba(15,81,50,0.45)", "0 0 0px 0px rgba(15,81,50,0)"] }}
            transition={{ repeat: Infinity, duration: 2.4 }}
            className="h-7 bg-[#0F5132] rounded-lg flex items-center justify-center"
          >
            <span className="text-white text-[9px] font-bold">Book Free Consultation →</span>
          </motion.div>
        </div>
      </div>
      <motion.div
        animate={{ y: [-3, 3, -3] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute -top-3 -right-2 bg-[#C9A24B] text-[#1C1C1E] text-[9px] font-black px-2.5 py-1.5 rounded-xl shadow-lg"
      >
        3–5 days ⚡
      </motion.div>
    </div>
  );
}

function VoiceVisual() {
  return (
    <div className="w-full max-w-[240px] mx-auto space-y-2.5">
      <div className="bg-[#1C1C1E] rounded-2xl p-4 border border-white/8 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
              className="w-9 h-9 rounded-full bg-[#2D4B8E]/25 border border-[#2D4B8E]/30 flex items-center justify-center"
            >
              <Phone size={14} className="text-[#6B8FE0]" />
            </motion.div>
            <div>
              <div className="text-white text-[11px] font-semibold">Incoming Call</div>
              <div className="text-white/35 text-[9px]">(555) 821-4490</div>
            </div>
          </div>
          <motion.div
            animate={{ backgroundColor: ["#0F5132", "#1a7044", "#0F5132"] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-8 h-8 rounded-full flex items-center justify-center"
          >
            <Phone size={12} className="text-white" />
          </motion.div>
        </div>
        <div className="flex items-end gap-0.5 h-8 mb-3">
          {waveAmps.map((amp, i) => (
            <motion.div
              key={i}
              animate={{ scaleY: [0.15, amp, 0.15] }}
              transition={{ repeat: Infinity, duration: 0.5 + i * 0.03, delay: i * 0.04 }}
              className="flex-1 bg-[#2D4B8E]/50 rounded-full origin-bottom"
              style={{ height: "100%" }}
            />
          ))}
        </div>
        <div className="text-[9px] text-white/30 italic">AI agent speaking...</div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-[#2A2A2C] rounded-xl p-3 border border-white/5"
      >
        <div className="text-[9px] text-white/30 uppercase tracking-widest mb-2">Live Transcript</div>
        {[
          { who: "👤", text: "Hi, I need to book a cleaning" },
          { who: "🤖", text: "Of course! What day works best?" },
          { who: "👤", text: "Tuesday at 2pm please" },
          { who: "🤖", text: "Booked! See you Tuesday ✓" },
        ].map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 + i * 0.3 }}
            className={`text-[9px] mb-1 ${i % 2 === 0 ? "text-white/50" : "text-[#C9A24B]"}`}
          >
            {line.who} {line.text}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function AutomationVisual() {
  const steps = [
    { icon: "⚡", label: "New lead arrives", time: "0:00", color: "#C9A24B" },
    { icon: "💬", label: "SMS sent instantly", time: "0:45s", color: "#0F5132" },
    { icon: "📧", label: "Email follow-up", time: "+2 hrs", color: "#2D4B8E" },
    { icon: "✓", label: "Appointment booked", time: "+6 hrs", color: "#C9A24B", highlight: true },
  ];
  return (
    <div className="w-full max-w-[230px] mx-auto">
      <div className="space-y-2">
        {steps.map((s, i) => (
          <div key={i} className="relative">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.18, ease }}
              className={`flex items-center gap-3 p-3 rounded-xl border ${
                s.highlight
                  ? "bg-[#0F5132]/15 border-[#0F5132]/30"
                  : "bg-[#1C1C1E] border-white/8"
              }`}
            >
              <span className="text-base leading-none">{s.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-semibold text-white truncate">{s.label}</div>
              </div>
              <span className="text-[9px] font-mono text-white/40 flex-shrink-0">{s.time}</span>
            </motion.div>
            {i < steps.length - 1 && (
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: i * 0.18 + 0.12 }}
                className="absolute left-[18px] -bottom-1.5 w-px h-2 bg-white/12 origin-top"
              />
            )}
          </div>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="mt-3 text-center text-[9px] text-white/35 font-mono"
      >
        Runs for every lead, forever.
      </motion.p>
    </div>
  );
}

function ReviewsVisual() {
  return (
    <div className="w-full max-w-[230px] mx-auto space-y-2.5">
      <div className="bg-white rounded-2xl p-4 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-full bg-[#4285F4]/10 flex items-center justify-center">
            <span className="text-sm font-black text-[#4285F4]">G</span>
          </div>
          <div>
            <div className="text-[10px] font-bold text-[#1C1C1E]">Google Reviews</div>
            <div className="flex items-baseline gap-1.5">
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="text-xl font-black text-[#1C1C1E]"
              >
                4.8
              </motion.span>
              <div className="flex gap-0.5 mt-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <motion.div key={s} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: s * 0.1 }}>
                    <Star size={10} className="fill-[#FBBC04] text-[#FBBC04]" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-1.5">
          {[
            { stars: 5, pct: 82 },
            { stars: 4, pct: 11 },
            { stars: 3, pct: 5 },
            { stars: 2, pct: 1 },
            { stars: 1, pct: 1 },
          ].map((row) => (
            <div key={row.stars} className="flex items-center gap-2">
              <span className="text-[9px] text-[#1C1C1E]/40 w-2.5 text-right">{row.stars}</span>
              <div className="flex-1 h-1.5 bg-[#F2F2F2] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${row.pct}%` }}
                  transition={{ duration: 1.2, delay: 0.4, ease }}
                  className="h-full bg-[#FBBC04] rounded-full"
                />
              </div>
              <span className="text-[9px] text-[#1C1C1E]/35 w-5 text-right">{row.pct}%</span>
            </div>
          ))}
        </div>
      </div>
      <motion.div
        animate={{ y: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="bg-[#1C1C1E] rounded-xl p-3 flex items-center gap-2.5 border border-white/8"
      >
        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-2 h-2 rounded-full bg-[#C9A24B] flex-shrink-0" />
        <span className="text-[10px] text-white/55">Review request sent to 4 clients</span>
      </motion.div>
    </div>
  );
}

const visuals = [WebsiteVisual, VoiceVisual, AutomationVisual, ReviewsVisual];

export function ServicesOverview() {
  const [active, setActive] = useState(0);
  const svc = services[active];
  const Visual = visuals[active];

  return (
    <section className="relative py-24 lg:py-32 bg-[#0D0D0F] overflow-hidden">
      <AnimatedDotGrid isDark />

      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#0F5132]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#C9A24B]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionKicker index="03" eyebrow="What We Do" className="mb-12" />
        <div className="max-w-2xl mb-14">
          <RevealLines
            label="Four systems. One agency. Endless growth."
            className="text-4xl lg:text-5xl font-black text-white leading-tight tracking-[-0.02em] mb-4"
            lines={[
              <>Four systems. One agency.</>,
              <>
                <span className="font-serif-accent text-gold-gradient">Endless growth.</span>
              </>,
            ]}
          />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35, ease }}
            className="text-lg text-white/55 leading-relaxed"
          >
            Kairo bundles the digital infrastructure that enterprise companies pay
            six figures for — and delivers it to local businesses for a fraction of the cost.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-4 lg:gap-6">
          {/* Tabs */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.num}
                  onClick={() => setActive(i)}
                  className={`flex-shrink-0 lg:flex-shrink text-left flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300 ${
                    active === i
                      ? "bg-white/10 border-white/15"
                      : "border-transparent hover:bg-white/5 hover:border-white/8"
                  }`}
                >
                  <div
                    className="w-1 self-stretch rounded-full flex-shrink-0 transition-all duration-300"
                    style={{
                      backgroundColor: active === i ? s.color : "transparent",
                      minHeight: "28px",
                    }}
                  />
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                    style={{
                      backgroundColor: active === i ? `${s.color}25` : "rgba(255,255,255,0.06)",
                    }}
                  >
                    <Icon
                      size={15}
                      style={{ color: active === i ? s.color : "rgba(255,255,255,0.5)" }}
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-bold text-white/25 tabular-nums">{s.num}</span>
                      <span
                        className="text-sm font-bold truncate transition-colors duration-200"
                        style={{ color: active === i ? s.color : "rgba(255,255,255,0.65)" }}
                      >
                        {s.title}
                      </span>
                    </div>
                    <p className="text-xs text-white/40 leading-snug line-clamp-1 hidden lg:block">
                      {s.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div style={{ minHeight: 500 }} className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.32, ease }}
                className="bg-[#111113] rounded-3xl border border-white/[0.08] shadow-2xl overflow-hidden flex flex-col lg:flex-row h-full"
              >
                {/* Left: content */}
                <div className="flex-1 p-8 lg:p-10 flex flex-col">
                  {/* Number + heading */}
                  <div className="mb-5">
                    <div
                      className="text-[5rem] font-black leading-none select-none mb-1"
                      style={{ color: `${svc.color}40` }}
                    >
                      {svc.num}
                    </div>
                    <h3 className="text-2xl font-bold text-white -mt-6">{svc.title}</h3>
                    <p className="text-sm font-semibold mt-1" style={{ color: svc.color }}>
                      {svc.tagline}
                    </p>
                  </div>

                  <p className="text-sm text-white/62 leading-relaxed mb-6">
                    {svc.description}
                  </p>

                  <ul className="space-y-2.5 mb-8 flex-1">
                    {svc.benefits.map((b, i) => (
                      <motion.li
                        key={b}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07, ease }}
                        className="flex items-center gap-2.5 text-sm text-white/72"
                      >
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${svc.color}18` }}
                        >
                          <Check size={10} style={{ color: svc.color }} />
                        </div>
                        {b}
                      </motion.li>
                    ))}
                  </ul>

                  <Link
                    href={svc.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 hover:gap-3 w-fit"
                    style={{ color: svc.color }}
                  >
                    Explore {svc.title} <ArrowRight size={14} />
                  </Link>
                </div>

                {/* Right: visual */}
                <div
                  className="lg:w-[280px] relative flex items-center justify-center p-8 overflow-hidden"
                  style={{ backgroundColor: `${svc.color}07` }}
                >
                  {/* Watermark number */}
                  <div
                    className="absolute inset-0 flex items-center justify-center text-[10rem] font-black select-none pointer-events-none leading-none"
                    style={{ color: `${svc.color}05` }}
                  >
                    {svc.num}
                  </div>
                  <div className="relative w-full">
                    <Visual />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
