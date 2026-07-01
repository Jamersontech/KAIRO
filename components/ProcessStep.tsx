"use client";

import { motion } from "framer-motion";

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  index: number;
  isLast?: boolean;
}

export function ProcessStep({
  number,
  title,
  description,
  index,
  isLast = false,
}: ProcessStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="relative flex flex-col items-center text-center"
    >
      {/* Connector line */}
      {!isLast && (
        <div className="hidden lg:block absolute top-8 left-1/2 w-full h-px border-t border-dashed border-[#1C1C1E]/15" />
      )}

      {/* Number circle */}
      <div className="relative z-10 w-16 h-16 rounded-full bg-[#0F5132] flex items-center justify-center mb-6 shadow-lg shadow-[#0F5132]/20">
        <span className="text-xl font-bold text-white">{number}</span>
      </div>

      <h3 className="text-xl font-bold text-[#1C1C1E] mb-3">{title}</h3>
      <p className="text-sm text-[#1C1C1E]/60 leading-relaxed max-w-xs">{description}</p>
    </motion.div>
  );
}
