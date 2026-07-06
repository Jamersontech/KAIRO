"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Wrench, Zap, ArrowRight, Plus, Minus } from "lucide-react";
import { AnimatedDotGrid } from "./AnimatedDotGrid";
import { FinalCTA } from "./FinalCTA";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Audit",
    subtitle: "We find the gaps before we build anything.",
    description: "Every engagement starts with a free, no-pressure audit of your current digital presence. We look at your website, Google profile, online reputation, and lead follow-up process — and show you exactly where revenue is slipping through the cracks.",
    details: [
      "Website performance & conversion analysis",
      "Google Business Profile review",
      "Competitor research in your area",
      "Lead response time assessment",
      "Custom growth opportunity report",
    ],
    duration: "Week 1",
    color: "#0F5132",
    dark: false,
  },
  {
    number: "02",
    icon: Wrench,
    title: "Build",
    subtitle: "We deploy your digital infrastructure — fast.",
    description: "Once we have a clear picture of what you need, we build it. Your new website goes live within 48 hours. Your automation sequences are configured, tested, and connected to your tools. No delays, no endless revision cycles.",
    details: [
      "Custom website designed and launched in 48 hours",
      "Lead capture forms configured and tested",
      "SMS & email sequences written and activated",
      "Google review system connected to your workflow",
      "CRM integration and lead routing",
    ],
    duration: "Week 1–2",
    color: "#C9A24B",
    dark: true,
  },
  {
    number: "03",
    icon: Zap,
    title: "Automate & Grow",
    subtitle: "The systems run. You focus on your clients.",
    description: "Once everything is live, Kairo runs in the background. Leads get instant responses. Appointments get confirmed. Clients get review requests. You get a monthly report showing exactly what's happening — and what we're optimising next.",
    details: [
      "Leads followed up in under 5 minutes, automatically",
      "Appointment reminders sent 24h and 1h before",
      "Review requests triggered after every completed job",
      "Monthly analytics and performance report",
      "Continuous A/B testing and optimisation",
    ],
    duration: "Month 1 onward",
    color: "#6B8FE0",
    dark: false,
  },
];

const faqs = [
  {
    q: "How long until I see results?",
    a: "Most clients see measurable changes within the first 30 days — more inquiries from the website, faster lead response, and new Google reviews rolling in. Full momentum typically builds over 60–90 days.",
  },
  {
    q: "Do I need to provide anything?",
    a: "Just your time for an onboarding call (about 60 minutes) and access to your existing website or Google account. We handle everything else.",
  },
  {
    q: "Will this work for my type of business?",
    a: "Kairo is designed for service-based local businesses — contractors, dental & medical practices, salons & spas, fitness studios, law firms, auto shops, and more. If clients find you via Google and word of mouth, we can help.",
  },
  {
    q: "Do I have to sign a long-term contract?",
    a: "We don't lock you into multi-year contracts. Month-to-month options are available, though most clients stay because the systems keep delivering real value.",
  },
  {
    q: "What if I already have a website?",
    a: "We'll audit it honestly. If it's converting well, we'll build on it. If it's costing you leads, we'll show you why — and build something better.",
  },
];

function FAQItem({ faq }: { faq: { q: string; a: string } }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${open ? "border-[#0F5132]/40 bg-[#111113]" : "border-white/[0.07] bg-[#111113] hover:border-white/15"}`}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left flex items-center justify-between gap-4 px-6 py-5"
      >
        <span className="font-semibold text-white text-sm">{faq.q}</span>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${open ? "bg-[#0F5132] text-white" : "bg-white/8 text-white/40"}`}>
          {open ? <Minus size={12} /> : <Plus size={12} />}
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease }}
          >
            <p className="px-6 pb-5 text-sm text-white/50 leading-relaxed">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function HowItWorksContent() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative min-h-[68vh] bg-[#0D0D0F] flex flex-col justify-end pb-20 pt-40 overflow-hidden">
        <AnimatedDotGrid isDark />
        <div className="absolute top-1/3 right-1/4 w-[480px] h-[480px] bg-[#0F5132]/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/5 w-[320px] h-[320px] bg-[#C9A24B]/8 rounded-full blur-[100px] pointer-events-none" />

        {/* Watermark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[22rem] font-black leading-none text-white/[0.022] select-none pointer-events-none tabular-nums">
          3
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
            <span className="text-[10px] font-black tracking-widest uppercase text-[#C9A24B] mb-4 block">
              The Process
            </span>
            <h1 className="text-5xl lg:text-7xl font-black text-white leading-[0.92] tracking-tight mb-6 max-w-4xl">
              Three steps from{" "}
              <span style={{ background: "linear-gradient(90deg, #C9A24B, #E8C87A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                where you are
              </span>
              {" "}to where you want to be.
            </h1>
            <p className="text-lg text-white/45 leading-relaxed max-w-2xl mb-10">
              We've streamlined onboarding so most businesses are fully live with automation in under two weeks — not two months.
            </p>
            {/* Step pills */}
            <div className="flex flex-wrap gap-3">
              {steps.map((s) => (
                <div key={s.number} className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-sm text-white/45">
                  <span className="text-[10px] font-black text-white/25">{s.number}</span>
                  {s.title}
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/6 text-white/30">{s.duration}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Steps ── */}
      {steps.map((step, idx) => {
        const Icon = step.icon;
        return (
          <section
            key={step.number}
            className={`relative py-28 overflow-hidden ${step.dark ? "bg-[#0D0D0F]" : "bg-[#111113]"}`}
          >
            <AnimatedDotGrid isDark />

            {/* Giant step number watermark */}
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 text-[22rem] font-black leading-none select-none pointer-events-none tabular-nums -translate-x-8"
              style={{ color: "rgba(255,255,255,0.03)" }}
            >
              {step.number}
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-center">

                {/* Text side */}
                <motion.div
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease }}
                  className={idx % 2 === 1 ? "lg:order-2" : ""}
                >
                  {/* Step badge */}
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${step.color}20` }}
                    >
                      <Icon size={22} style={{ color: step.color }} />
                    </div>
                    <div>
                      <div className="text-[10px] font-black tracking-widest uppercase text-white/30">
                        Step {step.number}
                      </div>
                      <div
                        className="text-[10px] font-black px-2.5 py-0.5 rounded-full mt-0.5"
                        style={{ backgroundColor: `${step.color}18`, color: step.color }}
                      >
                        {step.duration}
                      </div>
                    </div>
                  </div>

                  <h2
                    className="text-4xl lg:text-5xl font-black leading-[0.95] tracking-tight mb-4"
                    style={{
                      background: `linear-gradient(135deg, #ffffff 55%, ${step.color} 100%)`,
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                    }}
                  >
                    {step.title}
                  </h2>
                  <p className="text-base font-semibold mb-4" style={{ color: step.color }}>
                    {step.subtitle}
                  </p>
                  <p className="text-base leading-relaxed mb-8 text-white/50">
                    {step.description}
                  </p>
                  <Link
                    href="/contact"
                    className={`inline-flex items-center gap-2 text-sm font-bold transition-all duration-200 hover:gap-3 group`}
                    style={{ color: step.color }}
                  >
                    Start your free audit
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </motion.div>

                {/* Detail card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.15, ease }}
                  className={idx % 2 === 1 ? "lg:order-1" : ""}
                >
                  <div
                    className="rounded-3xl p-8 relative overflow-hidden border"
                    style={{
                      backgroundColor: step.dark ? "#141417" : "#17171b",
                      borderColor: "rgba(255,255,255,0.09)",
                    }}
                  >
                    {/* Accent top bar */}
                    <div className="absolute top-0 inset-x-0 h-[2px] rounded-t-3xl" style={{ background: `linear-gradient(90deg, ${step.color}, transparent)` }} />

                    {/* Corner glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl pointer-events-none"
                      style={{ backgroundColor: `${step.color}12`, transform: "translate(20%, -20%)" }} />

                    <div className="relative">
                      <p className="text-[10px] font-black tracking-widest uppercase mb-6 text-white/25">
                        What happens in this step
                      </p>
                      <ul className="space-y-4">
                        {step.details.map((detail, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: 8 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.35, delay: i * 0.07, ease }}
                            className="flex items-start gap-3.5"
                          >
                            <div
                              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-black"
                              style={{ backgroundColor: `${step.color}15`, color: step.color }}
                            >
                              {i + 1}
                            </div>
                            <span className="text-sm leading-relaxed text-white/58">{detail}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Connecting arrow between steps */}
            {idx < steps.length - 1 && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-10">
                <div className="w-10 h-10 rounded-full border-4 flex items-center justify-center bg-[#0D0D0F] border-[#1C1C1E]">
                  <ArrowRight size={14} className="rotate-90 text-white/20" />
                </div>
              </div>
            )}
          </section>
        );
      })}

      {/* ── FAQ ── */}
      <section className="relative py-24 bg-[#0D0D0F] overflow-hidden">
        <AnimatedDotGrid isDark />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#0F5132]/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-[#C9A24B] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B] animate-pulse" />
              FAQ
            </span>
            <h2 className="text-4xl font-black text-white leading-tight">
              Common questions
            </h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq) => <FAQItem key={faq.q} faq={faq} />)}
          </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
