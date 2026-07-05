"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { AnimatedDotGrid } from "./AnimatedDotGrid";
import { SectionKicker } from "./SectionKicker";
import { RevealLines } from "./RevealLines";

const testimonials = [
  {
    quote:
      "Before Kairo, I was losing leads constantly. Within 30 days of going live with their system, I had 3 new clients from the website alone — and my Google reviews went from 18 to 47. It's like having a sales team that never sleeps.",
    name: "Marcus T.",
    title: "Owner",
    business: "Titan Plumbing & HVAC",
    rating: 5,
    accent: "#0F5132",
  },
  {
    quote:
      "I was skeptical about AI building my site, but it's genuinely the best website I've ever had. Clients comment on it all the time. And the automated follow-up? I booked 6 appointments from leads I would have completely missed.",
    name: "Sandra R.",
    title: "Founder",
    business: "Radiance Med Spa",
    rating: 5,
    accent: "#C9A24B",
  },
  {
    quote:
      "My dental practice saw a 60% increase in new patient inquiries within the first quarter. The review automation alone paid for the service — we went from 4.1 to 4.8 stars in two months. I wish I'd done this sooner.",
    name: "Dr. James O.",
    title: "Dentist & Owner",
    business: "Oakdale Family Dentistry",
    rating: 5,
    accent: "#0F5132",
  },
];

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Testimonials() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#0D0D0F] overflow-hidden">
      <AnimatedDotGrid isDark />

      {/* Ambient blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] bg-[#0F5132]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[200px] bg-[#C9A24B]/6 rounded-full blur-[110px] pointer-events-none" />

      {/* Large decorative quote marks */}
      <div className="absolute top-8 left-6 text-[#C9A24B]/5 pointer-events-none select-none" style={{ fontSize: "14rem", lineHeight: 1, fontFamily: "var(--font-serif)", fontStyle: "italic" }}>
        &ldquo;
      </div>
      <div className="absolute bottom-8 right-6 text-[#0F5132]/8 pointer-events-none select-none rotate-180" style={{ fontSize: "14rem", lineHeight: 1, fontFamily: "var(--font-serif)", fontStyle: "italic" }}>
        &ldquo;
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionKicker index="05" eyebrow="Client Results" align="center" className="mb-12" />
        <div className="text-center max-w-2xl mx-auto mb-16">
          <RevealLines
            label="Real businesses. Real results."
            className="text-4xl lg:text-5xl font-black text-white leading-tight tracking-[-0.02em] mb-4"
            lines={[
              <>
                Real businesses.{" "}
                <span className="font-serif-accent text-gold-gradient">Real results.</span>
              </>,
            ]}
          />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="text-lg text-white/40 leading-relaxed"
          >
            Don't take our word for it — here's what local business owners say after their first 90 days with Kairo.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease }}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
              className="group relative bg-[#111113] rounded-2xl p-8 border border-white/[0.07] flex flex-col overflow-hidden transition-all duration-300 hover:border-white/15 hover:shadow-2xl"
              style={{
                boxShadow: "0 0 0 0 transparent",
              }}
            >
              {/* Gradient top accent on hover */}
              <div
                className="absolute top-0 inset-x-0 h-[1.5px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: `linear-gradient(90deg, ${t.accent}, #C9A24B)` }}
              />

              {/* Corner glow */}
              <div
                className="absolute -top-16 -right-16 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-2xl"
                style={{ backgroundColor: `${t.accent}20` }}
              />

              {/* Quote icon */}
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.1 + j * 0.06 }}
                    >
                      <Star size={13} className="fill-[#C9A24B] text-[#C9A24B]" />
                    </motion.div>
                  ))}
                </div>
                <Quote size={18} className="text-white/10" />
              </div>

              {/* Quote */}
              <blockquote className="text-sm text-white/55 leading-relaxed flex-1 mb-7">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Attribution */}
              <div className="flex items-center gap-3 pt-5 border-t border-white/[0.07]">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${t.accent}20` }}
                >
                  <span className="text-sm font-bold" style={{ color: t.accent }}>
                    {t.name[0]}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-white/35">{t.title}, {t.business}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease }}
          className="mt-14 pt-10 border-t border-white/[0.06] grid grid-cols-3 gap-6 text-center"
        >
          {[
            { stat: "4.9★", label: "Average client rating" },
            { stat: "90 days", label: "To full system momentum" },
            { stat: "100%", label: "Of clients see new leads in month 1" },
          ].map((item) => (
            <div key={item.label}>
              <div className="text-2xl font-black text-[#C9A24B] mb-1">{item.stat}</div>
              <div className="text-xs text-white/30 leading-snug">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
