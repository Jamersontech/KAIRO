"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { siteConfig } from "@/config/site";

export function FinalCTA() {
  return (
    <section className="py-24 lg:py-32 bg-[#FAF9F6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative bg-[#0F5132] rounded-3xl px-8 py-16 lg:px-16 overflow-hidden"
        >
          {/* Background shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#C9A24B]/10 rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
              <span className="text-xs font-semibold text-white/80">
                Free, no-pressure consultation
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
              Ready to stop losing
              <br />
              leads to your competitors?
            </h2>
            <p className="text-lg text-white/70 leading-relaxed mb-10 max-w-2xl mx-auto">
              Book a free website audit and we'll show you exactly where your business
              is leaking revenue online — and how to fix it. No jargon, no pitch decks.
              Just a clear plan.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white text-[#0F5132] font-bold text-base hover:bg-[#FAF9F6] transition-colors duration-200 shadow-lg"
              >
                Get a Free Website Audit
                <ArrowRight size={18} />
              </Link>
              <a
                href={siteConfig.calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl border border-white/30 text-white font-semibold text-base hover:bg-white/10 transition-colors duration-200"
              >
                <Calendar size={18} />
                Book a Call
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
