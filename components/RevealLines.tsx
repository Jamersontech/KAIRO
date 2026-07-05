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
 */
export function RevealLines({ lines, label, className, delay = 0.15 }: RevealLinesProps) {
  return (
    <h2 className={className} aria-label={label}>
      {lines.map((line, i) => (
        <span key={i} aria-hidden className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <motion.span
            className="block"
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.9, delay: delay + i * 0.09, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}
