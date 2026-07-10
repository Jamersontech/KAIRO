"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { addonServicesConfig } from "@/config/site";
import { AddonServiceCard } from "@/components/AddonServiceCard";
import { CalendlyButton } from "@/components/CalendlyButton";
import { EASE, VIEWPORT } from "@/lib/motion";

export function AddonServicesSection() {
  return (
    <section className="py-24 bg-[#0D0D0F] border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-2xl mb-4"
        >
          <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
            Individual Services
          </span>
          <h2 className="text-3xl lg:text-4xl font-black text-white tracking-[-0.02em] mb-3">
            Need one specific solution?
          </h2>
          <p className="text-white/45 leading-relaxed">
            Choose the services your business needs and build your own growth system.
            Every service below can be added to a package at any time.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {addonServicesConfig.services.map((service, i) => (
            <AddonServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        <p className="text-center text-xs text-white/25 mt-8">
          Buying several of these? A Kairo package usually works out cheaper —{" "}
          <a href="#packages" className="text-white/40 hover:text-white/60 underline underline-offset-2 transition-colors">
            compare plans above
          </a>
          .
        </p>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="mt-14 rounded-3xl bg-[#111113] border border-white/[0.08] px-8 py-10 sm:px-12 sm:py-12 text-center"
        >
          <h3 className="text-2xl font-black text-white mb-2">
            Not sure what your business needs?
          </h3>
          <p className="text-white/50 leading-relaxed max-w-lg mx-auto mb-7">
            Book a free consultation and we&apos;ll recommend the right setup based on your goals.
          </p>
          <CalendlyButton className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#0F5132] text-white font-bold text-sm hover:bg-[#16733f] transition-colors duration-200">
            <Calendar size={15} />
            Book a Consultation
          </CalendlyButton>
        </motion.div>
      </div>
    </section>
  );
}
