"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { AnimatedDotGrid } from "./AnimatedDotGrid";

const testimonials = [
  {
    quote:
      "Before Kairo, I was losing leads constantly. Within 30 days of going live with their system, I had 3 new clients from the website alone — and my Google reviews went from 18 to 47. It's like having a sales team that never sleeps.",
    name: "Marcus T.",
    title: "Owner",
    business: "Titan Plumbing & HVAC",
    rating: 5,
  },
  {
    quote:
      "I was skeptical about AI building my site, but it's genuinely the best website I've ever had. Clients comment on it all the time. And the automated follow-up? I booked 6 appointments from leads I would have completely missed.",
    name: "Sandra R.",
    title: "Founder",
    business: "Radiance Med Spa",
    rating: 5,
  },
  {
    quote:
      "My dental practice saw a 60% increase in new patient inquiries within the first quarter. The review automation alone paid for the service — we went from 4.1 to 4.8 stars in two months. I wish I'd done this sooner.",
    name: "Dr. James O.",
    title: "Dentist & Owner",
    business: "Oakdale Family Dentistry",
    rating: 5,
  },
];

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Testimonials() {
  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">

      <AnimatedDotGrid />

      {/* Decorative quote SVGs */}
      <svg
        aria-hidden="true"
        className="absolute top-8 left-6 w-32 h-32 text-[#0F5132]/6 pointer-events-none select-none"
        viewBox="0 0 100 80"
        fill="currentColor"
      >
        <path d="M0 80V48C0 20 14 6 42 0l6 12C30 16 22 26 22 40h20v40H0zm58 0V48C58 20 72 6 100 0l6 12c-18 4-26 14-26 28h20v40H58z" />
      </svg>
      <svg
        aria-hidden="true"
        className="absolute bottom-8 right-6 w-32 h-32 text-[#C9A24B]/6 pointer-events-none select-none rotate-180"
        viewBox="0 0 100 80"
        fill="currentColor"
      >
        <path d="M0 80V48C0 20 14 6 42 0l6 12C30 16 22 26 22 40h20v40H0zm58 0V48C58 20 72 6 100 0l6 12c-18 4-26 14-26 28h20v40H58z" />
      </svg>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A24B] mb-3 block">
            Client Results
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
            Real businesses.
            <br />
            Real results.
          </h2>
          <p className="text-lg text-[#1C1C1E]/60">
            Don't take our word for it — here's what local business owners say after their first 90 days with Kairo.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease }}
              whileHover={{ y: -5, transition: { duration: 0.2, ease: "easeOut" } }}
              className="group relative bg-[#FAF9F6] rounded-2xl p-8 border border-[#1C1C1E]/6 flex flex-col overflow-hidden hover:shadow-xl hover:shadow-[#1C1C1E]/7 transition-shadow duration-300"
            >
              {/* Top accent */}
              <div className="absolute top-0 inset-x-0 h-[2.5px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-2xl bg-gradient-to-r from-[#0F5132] to-[#C9A24B]" />

              {/* Stars */}
              <div className="flex items-center gap-1 mb-5">
                {[...Array(t.rating)].map((_, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 + j * 0.06 }}
                  >
                    <Star size={14} className="fill-[#C9A24B] text-[#C9A24B]" />
                  </motion.div>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-sm text-[#1C1C1E]/70 leading-relaxed flex-1 mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Attribution */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0F5132]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-[#0F5132]">{t.name[0]}</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#1C1C1E]">{t.name}</div>
                  <div className="text-xs text-[#1C1C1E]/45">{t.title}, {t.business}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
