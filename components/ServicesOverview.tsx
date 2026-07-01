"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, MessageSquare, Star, ArrowRight } from "lucide-react";

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

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease },
  }),
};

export function ServicesOverview() {
  return (
    <section className="py-24 lg:py-32 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A24B] mb-3 block">
            What We Do
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1C1C1E] leading-tight mb-4">
            Three systems. One agency.
            <br />
            Endless growth.
          </h2>
          <p className="text-lg text-[#1C1C1E]/60 leading-relaxed">
            Kairo bundles the digital infrastructure that enterprise companies pay
            six figures for — and delivers it to local businesses for a fraction of
            the cost.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className="group relative bg-white rounded-2xl p-8 border border-[#1C1C1E]/6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${service.color}15` }}
                >
                  <Icon size={22} style={{ color: service.color }} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#1C1C1E] mb-2">
                  {service.title}
                </h3>
                <p className="text-sm font-medium text-[#0F5132] mb-3">
                  {service.tagline}
                </p>
                <p className="text-sm text-[#1C1C1E]/60 leading-relaxed mb-6 flex-1">
                  {service.description}
                </p>

                {/* Benefits */}
                <ul className="space-y-2 mb-8">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-sm text-[#1C1C1E]/70">
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: service.color }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F5132] hover:gap-3 transition-all duration-200"
                >
                  Learn more
                  <ArrowRight size={15} />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
