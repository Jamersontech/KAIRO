import type { Metadata } from "next";
import { Calendar, Shield, Zap, TrendingUp, Star } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { AnimatedDotGrid } from "@/components/AnimatedDotGrid";
import { CalendlyButton } from "@/components/CalendlyButton";
import { VoiceAgentButton } from "@/components/VoiceAgentButton";

export const metadata: Metadata = {
  title: "Free Website Audit — Kairo",
  description:
    "Get a free, no-obligation audit of your digital presence from Kairo. We'll show you exactly where you're losing leads and how to fix it.",
};

const whatYouGet = [
  { icon: TrendingUp, title: "Website conversion analysis", desc: "We score your site on speed, design, copy, and conversion rate — and show you the fixes." },
  { icon: Star, title: "Google presence audit", desc: "Review count, star rating, profile completeness, and local search rank vs. your top competitors." },
  { icon: Zap, title: "Lead capture gap report", desc: "Where are calls going unanswered? What follow-up is missing? We map every gap." },
  { icon: Shield, title: "Custom action plan", desc: "A clear, prioritised list of exactly what to do next — no fluff, no pitch decks." },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 bg-[#0D0D0F] overflow-hidden">
        <AnimatedDotGrid isDark />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0F5132]/12 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#C9A24B] mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B] animate-pulse" />
              Free — No Commitment Required
            </span>
            <h1 className="text-5xl lg:text-6xl font-black text-white leading-[0.95] tracking-tight mb-6">
              Find out exactly<br />
              <span
                style={{
                  background: "linear-gradient(90deg, #C9A24B, #E8C87A)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                where you&apos;re losing
              </span>
              <br />
              clients online.
            </h1>
            <p className="text-lg text-white/50 leading-relaxed max-w-xl">
              Fill out the form below. We&apos;ll audit your website, Google presence, and follow-up gaps —
              then send you a personalised report with a clear action plan. It takes 2 minutes.
            </p>
          </div>
        </div>
      </section>

      {/* ── What you get strip ── */}
      <section className="bg-[#111113] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatYouGet.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0F5132]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={14} className="text-[#C9A24B]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white mb-0.5">{item.title}</div>
                    <div className="text-xs text-white/38 leading-snug">{item.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Form + sidebar ── */}
      <section className="relative overflow-hidden bg-[#FAF9F6] kairo-pattern py-16 lg:py-20">
        <AnimatedDotGrid />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_340px] gap-10 items-start">

            {/* Form card */}
            <div className="bg-white rounded-3xl border border-[#1C1C1E]/6 shadow-sm p-8 lg:p-10">
              <ContactForm />
            </div>

            {/* Sidebar */}
            <div className="space-y-5 lg:sticky lg:top-28">

              {/* What happens next */}
              <div className="bg-white rounded-2xl border border-[#1C1C1E]/6 p-6">
                <h3 className="text-sm font-bold text-[#1C1C1E] mb-4">What happens next</h3>
                <ol className="space-y-4">
                  {[
                    { step: "1", title: "We review your submission", desc: "Within 1 business day, our team digs into your business." },
                    { step: "2", title: "We run a full audit", desc: "Website, Google profile, competitor comparison, lead gaps." },
                    { step: "3", title: "You get a custom report", desc: "A clear PDF with specific, actionable findings — not vague suggestions." },
                    { step: "4", title: "We walk through it together", desc: "A 30-min call where we answer every question. Zero pressure." },
                  ].map((s) => (
                    <li key={s.step} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#0F5132]/10 text-[#0F5132] text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                        {s.step}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#1C1C1E]">{s.title}</div>
                        <div className="text-xs text-[#1C1C1E]/45 leading-snug mt-0.5">{s.desc}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Book a call */}
              <div className="bg-[#0F5132] rounded-2xl p-6 text-white">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                  <Calendar size={16} className="text-[#C9A24B]" />
                </div>
                <h3 className="font-bold text-white mb-1.5">Prefer to talk first?</h3>
                <p className="text-sm text-white/65 leading-relaxed mb-4">
                  Skip the form and book a 30-minute strategy call directly. We&apos;ll run through your situation live.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <CalendlyButton className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#0F5132] text-sm font-bold hover:bg-[#FAF9F6] transition-colors">
                    <Calendar size={14} />
                    Book a Strategy Call
                  </CalendlyButton>
                  {/* Self-hides until the Vapi voice agent is configured */}
                  <VoiceAgentButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
