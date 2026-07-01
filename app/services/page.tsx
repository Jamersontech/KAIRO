import type { Metadata } from "next";
import Link from "next/link";
import { Globe, Phone, MessageSquare, Star, ArrowRight, CheckCircle2 } from "lucide-react";
import { FinalCTA } from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Kairo's four core services: AI-built websites, AI voice agents, SMS & email automation, and Google review generation for local businesses.",
};

const services = [
  {
    id: "websites",
    icon: Globe,
    iconColor: "#0F5132",
    label: "Service 01",
    title: "AI-Built Websites",
    headline: "A conversion-ready website live in 48 hours.",
    description:
      "Your website is your hardest-working salesperson — open 24/7, making a first impression before you ever pick up the phone. We build it right the first time, using AI-assisted design refined by our team to make sure every element earns its place.",
    steps: [
      {
        title: "Strategy Call",
        body: "We learn your business, your clients, and your goals. No templates — everything starts from scratch.",
      },
      {
        title: "Design & Build",
        body: "Our AI-assisted workflow generates a custom design in hours. We refine it, add your content, and build it out for blazing-fast performance.",
      },
      {
        title: "SEO & Launch",
        body: "We configure meta tags, structured data, and Google Search Console before going live so you start ranking from day one.",
      },
      {
        title: "Ongoing Optimization",
        body: "We monitor performance, run A/B tests on CTAs, and make updates so your site keeps improving over time.",
      },
    ],
    outcomes: [
      "Go live in 48 hours",
      "Mobile-first, blazing-fast performance",
      "Conversion-focused copywriting included",
      "On-page SEO configured at launch",
      "Unlimited revisions (Growth & Full Stack)",
      "Integrated contact forms and booking",
    ],
  },
  {
    id: "voice",
    icon: Phone,
    iconColor: "#2D4B8E",
    label: "Service 02",
    title: "AI Voice Agents",
    headline: "Every call answered. Every lead captured. 24/7.",
    description:
      "Most local businesses lose leads the moment a call goes to voicemail. Our AI voice agents answer every call instantly — day or night — qualifying the lead, answering common questions, and booking appointments without any human involvement. You wake up to a full inbox of transcripts, not missed opportunities.",
    steps: [
      {
        title: "Build & Train",
        body: "We build a custom AI voice agent trained on your specific business — your services, pricing, FAQs, availability, and how you like to be introduced.",
      },
      {
        title: "Connect to Your Number",
        body: "We connect the agent to your existing business phone number (or provision a new one). It answers calls when you're unavailable or after hours — you decide the rules.",
      },
      {
        title: "Qualify, Answer & Book",
        body: "The agent qualifies leads, answers common questions, and books appointments directly into your calendar. Complex calls are seamlessly transferred to a human.",
      },
      {
        title: "Transcripts & Reports",
        body: "Every call produces a full transcript and AI-generated summary delivered to your inbox or CRM. You always know who called and why.",
      },
    ],
    outcomes: [
      "24/7 call answering — no voicemail",
      "Lead qualification on every call",
      "Appointment booking via voice",
      "Seamless human handoff when needed",
      "Full call transcripts & summaries",
      "CRM and calendar integration",
    ],
  },
  {
    id: "automation",
    icon: MessageSquare,
    iconColor: "#1C1C1E",
    label: "Service 03",
    title: "SMS & Email Automation",
    headline: "Follow up in seconds. Nurture for months. All automatic.",
    description:
      "The window to capture a lead closes faster than most business owners realize. Studies show 78% of customers choose the first business that responds. Our automation puts you first every time — and keeps working to convert leads for weeks after that first touchpoint.",
    steps: [
      {
        title: "Audit & Map",
        body: "We analyze your current follow-up process (or lack of one) and map out the full client journey from inquiry to re-engagement.",
      },
      {
        title: "Build Your Sequences",
        body: "We write and configure every message — instant lead responses, appointment confirmations, reminder sequences, and re-engagement campaigns.",
      },
      {
        title: "Integrate & Activate",
        body: "We connect everything to your CRM, booking tool, or lead forms. Everything triggers automatically when a client takes an action.",
      },
      {
        title: "Monitor & Refine",
        body: "We track open rates, reply rates, and conversions, then tune the sequences monthly so they keep performing.",
      },
    ],
    outcomes: [
      "Instant SMS response to every new lead",
      "Appointment confirmation & reminder sequences",
      "Post-service follow-up flows",
      "6-month re-engagement campaigns",
      "Lead scoring and tagging",
      "Integrates with your existing tools",
    ],
  },
  {
    id: "reviews",
    icon: Star,
    iconColor: "#C9A24B",
    label: "Service 04",
    title: "Google Review Generation",
    headline: "From 3 stars to market leader — automatically.",
    description:
      "Google reviews are the most trusted signal in local search. A business with 200 reviews at 4.7 stars beats a competitor with 20 reviews at 5.0 — every time. We build you that reputation systematically, without you having to ask a single client yourself.",
    steps: [
      {
        title: "Setup & Connect",
        body: "We connect your review system to your booking or POS tool so the process triggers automatically after a completed service.",
      },
      {
        title: "Timed Review Requests",
        body: "Clients receive a perfectly-timed SMS or email ask at the peak of their satisfaction — not too soon, not too late.",
      },
      {
        title: "Response Templates",
        body: "We provide templated responses for every scenario — glowing reviews, neutral feedback, and negative reviews — so you always look professional.",
      },
      {
        title: "Monitoring Dashboard",
        body: "Track your rating trend, new review volume, and sentiment scores monthly so you know exactly how your reputation is growing.",
      },
    ],
    outcomes: [
      "Automated review requests after every job",
      "Multi-step follow-up for non-responders",
      "Handles Google, Yelp, and Facebook",
      "Professional response templates",
      "Reputation monitoring & alerts",
      "Monthly reputation report",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A24B] mb-3 block">
              What We Build
            </span>
            <h1 className="text-5xl lg:text-6xl font-bold text-[#1C1C1E] leading-tight mb-5">
              Four systems that work
              <br />
              together to grow your business.
            </h1>
            <p className="text-xl text-[#1C1C1E]/60 leading-relaxed mb-8 max-w-2xl">
              Most agencies sell you one thing. Kairo delivers the complete
              infrastructure — website, voice agents, automation, and reputation
              — so every piece reinforces the others.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              {services.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#1C1C1E]/12 text-sm font-medium text-[#1C1C1E]/70 hover:border-[#0F5132] hover:text-[#0F5132] transition-colors"
                >
                  {s.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service sections */}
      {services.map((service, idx) => {
        const Icon = service.icon;
        return (
          <section
            key={service.id}
            id={service.id}
            className={`py-24 ${idx % 2 === 0 ? "bg-white" : "bg-[#FAF9F6]"}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header */}
              <div className="max-w-3xl mb-16">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${service.iconColor}18` }}
                  >
                    <Icon size={22} style={{ color: service.iconColor }} />
                  </div>
                  <span className="text-xs font-semibold tracking-widest uppercase text-[#1C1C1E]/40">
                    {service.label}
                  </span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-[#1C1C1E] leading-tight mb-3">
                  {service.title}
                </h2>
                <p className="text-xl font-medium text-[#0F5132] mb-5">
                  {service.headline}
                </p>
                <p className="text-lg text-[#1C1C1E]/60 leading-relaxed max-w-2xl">
                  {service.description}
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Process */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-[#1C1C1E]/40 mb-6">
                    How It Works
                  </h3>
                  <div className="space-y-0">
                    {service.steps.map((step, i) => (
                      <div key={step.title} className="flex gap-5 pb-8">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-[#0F5132] flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
                            {i + 1}
                          </div>
                          {i < service.steps.length - 1 && (
                            <div className="w-px flex-1 bg-[#0F5132]/15 mt-2" />
                          )}
                        </div>
                        <div className="pt-1 pb-2">
                          <h4 className="font-semibold text-[#1C1C1E] mb-1">
                            {step.title}
                          </h4>
                          <p className="text-sm text-[#1C1C1E]/60 leading-relaxed">
                            {step.body}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Outcomes */}
                <div className="bg-[#0F5132] rounded-2xl p-8">
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-white/50 mb-6">
                    What You Get
                  </h3>
                  <ul className="space-y-3 mb-10">
                    {service.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-3">
                        <CheckCircle2
                          size={16}
                          className="text-[#C9A24B] mt-0.5 flex-shrink-0"
                        />
                        <span className="text-sm text-white/80 leading-snug">
                          {outcome}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#0F5132] font-bold text-sm hover:bg-[#FAF9F6] transition-colors"
                  >
                    Get Started
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <FinalCTA />
    </div>
  );
}
