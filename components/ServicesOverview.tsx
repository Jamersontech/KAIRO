"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, Phone, MessageSquare, Star, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "AI-Built Websites",
    tagline: "Go live in 48 hours with a site that actually converts.",
    description:
      "We don't use templates. Every Kairo site is custom-designed using AI-assisted design and built to turn visitors into booked appointments — fast.",
    benefits: ["48-hour launch", "Mobile-first & SEO-ready", "Unlimited revisions"],
    color: "#0F5132",
    href: "/services#websites",
  },
  {
    icon: Phone,
    title: "AI Voice Agents",
    tagline: "Every call answered. Every lead captured. 24/7.",
    description:
      "Your AI voice agent picks up every call, qualifies the lead, answers common questions, and books appointments — even at 2am on a Sunday. You get a full transcript after every call.",
    benefits: ["24/7 call answering", "Lead qualification & booking", "Call transcripts & summaries"],
    color: "#2D4B8E",
    href: "/services#voice",
  },
  {
    icon: MessageSquare,
    title: "SMS & Email Automation",
    tagline: "Follow up instantly. Nurture endlessly. Convert automatically.",
    description:
      "Speed wins leads. Our automation sends the right message at the right moment — from the first inquiry to the 6-month re-engagement — without you touching a keyboard.",
    benefits: ["Instant lead response", "Appointment reminders", "Re-engagement flows"],
    color: "#1C1C1E",
    href: "/services#automation",
  },
  {
    icon: Star,
    title: "Google Review Generation",
    tagline: "Build a 5-star reputation while you sleep.",
    description:
      "After every completed job, clients automatically receive a review request. We handle the timing, the message, and the follow-up so your rating climbs every single week.",
    benefits: ["Automated review requests", "Reputation monitoring", "Response templates"],
    color: "#C9A24B",
    href: "/services#reviews",
  },
];

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function ServicesOverview() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#FAF9F6] overflow-hidden">

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(28,28,30,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Corner accent */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#0F5132]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#C9A24B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="max-w-2xl mb-16"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A24B] mb-3 block">
            What We Do
          </span>
          <h2
            className="text-4xl lg:text-5xl font-bold leading-tight mb-4"
            style={{
              background: "linear-gradient(135deg, #1C1C1E 60%, #0F5132 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Four systems. One agency.
            <br />
            Endless growth.
          </h2>
          <p className="text-lg text-[#1C1C1E]/60 leading-relaxed">
            Kairo bundles the digital infrastructure that enterprise companies pay
            six figures for — and delivers it to local businesses for a fraction of
            the cost.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.09, ease }}
                whileHover={{ y: -6, transition: { duration: 0.22, ease: "easeOut" } }}
                className="group relative bg-white rounded-2xl p-7 border border-[#1C1C1E]/6 shadow-sm hover:shadow-xl hover:shadow-[#1C1C1E]/8 transition-shadow duration-300 flex flex-col overflow-hidden"
              >
                {/* Top accent bar — slides in on hover */}
                <div
                  className="absolute top-0 inset-x-0 h-[2.5px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-2xl"
                  style={{
                    background: `linear-gradient(to right, ${service.color}, transparent)`,
                  }}
                />

                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${service.color}18` }}
                >
                  <Icon size={20} style={{ color: service.color }} />
                </div>

                <h3 className="text-lg font-bold text-[#1C1C1E] mb-1.5">{service.title}</h3>
                <p className="text-xs font-semibold text-[#0F5132] mb-3 leading-snug">
                  {service.tagline}
                </p>
                <p className="text-sm text-[#1C1C1E]/55 leading-relaxed mb-5 flex-1">
                  {service.description}
                </p>

                <ul className="space-y-1.5 mb-6">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-xs text-[#1C1C1E]/65">
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: service.color }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>

                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#0F5132] group-hover:gap-3 transition-all duration-200"
                >
                  Learn more
                  <ArrowRight size={13} />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
