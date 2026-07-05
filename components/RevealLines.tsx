"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { EASE, VIEWPORT } from "@/lib/motion";

interface RevealLinesProps {
  lines: ReactNode[];
  label: string;
  className?: string;
  delay?: number;
}

/**
 * Masked line-rise reveal — each line lifts out of an overflow-hidden mask,
 * the same gesture as the hero wordmark entrance. Bottom padding inside the
 * mask (with matching negative margin) keeps descenders from being sheared.
 *
 * The in-view trigger lives on the h2 and propagates to the lines via
 * variants: the masked lines themselves are fully clipped at their initial
 * offset, so IntersectionObserver would never see them directly.
 */
export function RevealLines({ lines, label, className, delay = 0.15 }: RevealLinesProps) {
  return (
    <motion.h2
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      aria-label={label}
      className={className}
    >
      {lines.map((line, i) => (
        <span key={i} aria-hidden className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <motion.span
            className="block"
            variants={{ hidden: { y: "110%" }, visible: { y: 0 } }}
            transition={{ duration: 0.9, delay: delay + i * 0.09, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
}
