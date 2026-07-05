"use client";

import { motion } from "framer-motion";
import { EASE, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionKickerProps {
  index?: string;
  total?: string;
  eyebrow: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}

export function SectionKicker({
  index,
  total = "06",
  eyebrow,
  tone = "dark",
  align = "left",
  className,
}: SectionKickerProps) {
  const labelCls = tone === "dark" ? "text-white/40" : "text-[#1C1C1E]/50";
  const ruleCls = tone === "dark" ? "bg-white/10" : "bg-[#1C1C1E]/12";
  const totalCls = tone === "dark" ? "text-white/20" : "text-[#1C1C1E]/25";

  const rule = (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, ease: EASE }}
      className={cn("flex-1 h-px origin-left", ruleCls)}
    />
  );

  const numeral = index && (
    <span className="flex items-baseline gap-1.5 tabular-nums flex-shrink-0">
      <span className="text-xs font-bold text-[#C9A24B]">{index}</span>
      <span className={cn("text-xs font-medium", totalCls)}>/ {total}</span>
    </span>
  );

  const label = (
    <span
      className={cn(
        "text-[11px] font-semibold uppercase tracking-[0.28em] flex-shrink-0",
        labelCls
      )}
    >
      {eyebrow}
    </span>
  );

  if (align === "center") {
    return (
      <div className={cn("flex items-center gap-4", className)}>
        {rule}
        {numeral}
        {label}
        {rule && (
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.9, ease: EASE }}
            className={cn("flex-1 h-px origin-right", ruleCls)}
          />
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-4", className)}>
      {numeral}
      {rule}
      {label}
    </div>
  );
}
