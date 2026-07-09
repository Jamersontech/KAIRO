"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, Phone, MessageSquare, Star, ArrowRight, Check } from "lucide-react";
import { AnimatedDotGrid } from "./AnimatedDotGrid";
import { FinalCTA } from "./FinalCTA";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const services = [
  {
    num: "01", id: "websites", icon: Globe, color: "#0F5132",
    title: "AI-Built Websites",
    headline: "A conversion-ready website. Live in 3–5 days.",
    description: "Your website is your hardest-working salesperson — open 24/7, making a first impression before you ever pick up the phone. We build it right the first time using AI-assisted design refined by our team, so every element earns its place.",
    steps: [
      { title: "Strategy Call", body: "We learn your business, your clients, and your goals. No templates — everything starts from scratch." },
      { title: "Design & Build", body: "Our AI-assisted workflow generates a custom design in hours. We refine it, add your content, and build for blazing-fast performance." },
      { title: "SEO & Launch", body: "Meta tags, structured data, and Google Search Console configured before go-live so you start ranking from day one." },
      { title: "Ongoing Optimization", body: "We monitor performance, run A/B tests on CTAs, and make updates so your site keeps improving." },
    ],
    outcomes: ["Go live in 3–5 days","Mobile-first, blazing-fast performance","Conversion-focused copywriting included","On-page SEO configured at launch","Unlimited revisions (Growth & Full Stack)","Integrated contact forms and booking"],
    dark: false,
  },
  {
    num: "02", id: "voice", icon: Phone, color: "#6B8FE0",
    title: "AI Voice Agents",
    headline: "Every call answered. Every lead captured. 24/7.",
    description: "Most local businesses lose leads the moment a call goes to voicemail. Our AI voice agents answer every call instantly — day or night — qualifying the lead, answering FAQs, and booking appointments without any human involvement.",
    steps: [
      { title: "Build & Train", body: "We build a custom voice agent trained on your specific business — services, pricing, FAQs, availability, and your preferred introduction." },
      { title: "Connect to Your Number", body: "We connect the agent to your existing business number or provision a new one. It answers when you're unavailable — you set the rules." },
      { title: "Qualify, Answer & Book", body: "The agent qualifies leads, answers questions, and books appointments directly into your calendar. Complex calls get seamlessly transferred." },
      { title: "Transcripts & Reports", body: "Every call produces a full transcript and AI summary delivered to your inbox or CRM. You always know who called and why." },
    ],
    outcomes: ["24/7 call answering — no voicemail","Lead qualification on every call","Appointment booking via voice","Seamless human handoff when needed","Full call transcripts & summaries","CRM and calendar integration"],
    dark: true,
  },
  {
    num: "03", id: "automation", icon: MessageSquare, color: "#C9A24B",
    title: "SMS & Email Automation",
    headline: "Follow up in seconds. Nurture for months. All automatic.",
    description: "The window to capture a lead closes faster than most owners realize — 78% of buyers choose the first business that responds. Our automation puts you first every time, then keeps nurturing prospects for weeks without you lifting a finger.",
    steps: [
      { title: "Audit & Map", body: "We analyze your current follow-up process and map the full client journey from first inquiry through long-term re-engagement." },
      { title: "Build Your Sequences", body: "We write and configure every message — instant lead responses, confirmations, reminder sequences, and re-engagement campaigns." },
      { title: "Integrate & Activate", body: "We connect everything to your CRM, booking tool, or lead forms. Every action triggers automatically." },
      { title: "Monitor & Refine", body: "We track open rates, reply rates, and conversions, then tune the sequences monthly so they keep performing." },
    ],
    outcomes: ["Instant SMS response to every new lead","Appointment confirmation & reminder sequences","Post-service follow-up flows","6-month re-engagement campaigns","Lead scoring and tagging","Integrates with your existing tools"],
    dark: false,
  },
  {
    num: "04", id: "reviews", icon: Star, color: "#C9A24B",
    title: "Google Review Generation",
    headline: "From 3 stars to market leader — automatically.",
    description: "Google reviews are the most trusted signal in local search. A business with 200 reviews at 4.7 stars beats a competitor with 20 reviews at 5.0 — every time. We build you that reputation systematically, without you asking a single client yourself.",
    steps: [
      { title: "Setup & Connect", body: "We connect your review system to your booking or POS tool so the process triggers automatically after a completed service." },
      { title: "Timed Review Requests", body: "Clients receive a perfectly-timed ask at the peak of their satisfaction — not too soon, not too late." },
      { title: "Response Templates", body: "We provide templated responses for every scenario — glowing reviews, neutral feedback, and negative reviews — so you always look professional." },
      { title: "Monitoring Dashboard", body: "Track your rating trend, new review volume, and sentiment scores monthly so you know exactly how your reputation is growing." },
    ],
    outcomes: ["Automated review requests after every job","Multi-step follow-up for non-responders","Handles Google, Yelp, and Facebook","Professional response templates","Reputation monitoring & alerts","Monthly reputation report"],
    dark: true,
  },
];

export function ServicesPageContent() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative min-h-[72vh] bg-[#0D0D0F] flex flex-col justify-end pb-20 pt-40 overflow-hidden">
        <AnimatedDotGrid isDark />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#0F5132]/18 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-[360px] h-[360px] bg-[#C9A24B]/8 rounded-full blur-[100px] pointer-events-none" />

        {/* Giant service count */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[22rem] font-black leading-none text-white/[0.025] select-none pointer-events-none tabular-nums">
          04
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
            <span className="text-[10px] font-black tracking-widest uppercase text-[#C9A24B] mb-4 block">
              What We Build
            </span>
            <h1 className="text-5xl lg:text-7xl font-black text-white leading-[0.92] tracking-tight mb-6 max-w-4xl">
              Four systems that{" "}
              <span style={{ background: "linear-gradient(90deg, #C9A24B, #E8C87A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                work together
              </span>
              {" "}to grow your business.
            </h1>
            <p className="text-lg text-white/45 leading-relaxed max-w-2xl mb-10">
              Most agencies sell you one thing. Kairo delivers the complete infrastructure — website, voice agents, automation, and reputation — so every piece reinforces the others.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {services.map((s) => (
                <a key={s.id} href={`#${s.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/12 text-sm font-medium text-white/55 hover:border-[#C9A24B]/50 hover:text-[#C9A24B] transition-colors duration-200">
                  <span className="text-[10px] font-black text-white/25">{s.num}</span>
                  {s.title}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Service sections ── */}
      {services.map((svc, idx) => {
        const Icon = svc.icon;
        return (
          <section
            key={svc.id}
            id={svc.id}
            className={`relative py-28 overflow-hidden ${svc.dark ? "bg-[#0D0D0F]" : "bg-[#FAF9F6] kairo-pattern"}`}
          >
            <AnimatedDotGrid isDark={svc.dark} />

            {/* Watermark number */}
            <div
              className="absolute right-0 bottom-0 text-[18rem] font-black leading-none select-none pointer-events-none tabular-nums"
              style={{ color: svc.dark ? "rgba(255,255,255,0.025)" : "rgba(28,28,30,0.04)" }}
            >
              {svc.num}
            </div>

            {/* Accent orb */}
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
              style={{ backgroundColor: `${svc.color}0a` }} />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Section header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, ease }}
                className="mb-16"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${svc.color}18` }}>
                    <Icon size={18} style={{ color: svc.color }} />
                  </div>
                  <span className={`text-[10px] font-black tracking-widest uppercase ${svc.dark ? "text-white/30" : "text-[#1C1C1E]/35"}`}>
                    Service {svc.num}
                  </span>
                </div>
                <h2
                  className="text-4xl lg:text-6xl font-black leading-[0.92] tracking-tight mb-4"
                  style={{
                    background: svc.dark
                      ? `linear-gradient(135deg, #ffffff 50%, ${svc.color} 100%)`
                      : `linear-gradient(135deg, #1C1C1E 55%, ${svc.color} 100%)`,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  }}
                >
                  {svc.title}
                </h2>
                <p className="text-lg font-semibold mb-4" style={{ color: svc.color }}>
                  {svc.headline}
                </p>
                <p className={`text-base leading-relaxed max-w-2xl ${svc.dark ? "text-white/50" : "text-[#1C1C1E]/58"}`}>
                  {svc.description}
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-10 items-start">
                {/* Steps */}
                <div>
                  <p className={`text-[10px] font-black tracking-widest uppercase mb-6 ${svc.dark ? "text-white/25" : "text-[#1C1C1E]/30"}`}>
                    How It Works
                  </p>
                  <div className="space-y-0">
                    {svc.steps.map((step, i) => (
                      <motion.div
                        key={step.title}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: i * 0.08, ease }}
                        className="flex gap-5 pb-8"
                      >
                        <div className="flex flex-col items-center flex-shrink-0">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black text-white"
                            style={{ backgroundColor: svc.color }}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </div>
                          {i < svc.steps.length - 1 && (
                            <div className="w-px flex-1 mt-2" style={{ backgroundColor: `${svc.color}22` }} />
                          )}
                        </div>
                        <div className="pt-1.5 pb-2">
                          <h4 className={`font-bold mb-1.5 ${svc.dark ? "text-white" : "text-[#1C1C1E]"}`}>{step.title}</h4>
                          <p className={`text-sm leading-relaxed ${svc.dark ? "text-white/45" : "text-[#1C1C1E]/55"}`}>{step.body}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Outcomes */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.15, ease }}
                >
                  <div
                    className="rounded-3xl p-8 relative overflow-hidden"
                    style={{
                      background: svc.dark
                        ? "linear-gradient(135deg, #0F5132 0%, #0a3d24 100%)"
                        : "linear-gradient(135deg, #1C1C1E 0%, #0D0D0F 100%)",
                    }}
                  >
                    {/* Decorative corner */}
                    <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl pointer-events-none"
                      style={{ backgroundColor: `${svc.color}25`, transform: "translate(30%, -30%)" }} />
                    <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full blur-2xl pointer-events-none"
                      style={{ backgroundColor: "#C9A24B0f", transform: "translate(-20%, 20%)" }} />

                    <div className="relative">
                      <p className="text-[10px] font-black tracking-widest uppercase text-white/30 mb-6">What You Get</p>
                      <ul className="space-y-3.5 mb-8">
                        {svc.outcomes.map((out, i) => (
                          <motion.li
                            key={out}
                            initial={{ opacity: 0, x: 8 }} whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.06, ease }}
                            className="flex items-center gap-3"
                          >
                            <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#C9A24B20" }}>
                              <Check size={9} className="text-[#C9A24B]" />
                            </div>
                            <span className="text-sm text-white/75">{out}</span>
                          </motion.li>
                        ))}
                      </ul>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#1C1C1E] font-bold text-sm hover:bg-[#FAF9F6] transition-colors duration-200"
                      >
                        Get Started <ArrowRight size={15} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      <FinalCTA />
    </div>
  );
}
