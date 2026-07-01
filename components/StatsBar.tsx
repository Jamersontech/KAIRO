"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "48hrs", label: "Average website launch time" },
  { value: "40%", label: "Average lead increase in 90 days" },
  { value: "200+", label: "Google reviews generated" },
  { value: "50+", label: "Local businesses served" },
  { value: "24/7", label: "Automation running in background" },
];

export function StatsBar() {
  return (
    <section className="bg-[#1C1C1E] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-[#C9A24B] mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-white/50 leading-snug">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
