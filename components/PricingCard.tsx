"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingTier {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  highlight: boolean;
  features: string[];
  cta: string;
}

interface PricingCardProps {
  tier: PricingTier;
  index: number;
}

export function PricingCard({ tier, index }: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className={cn(
        "relative flex flex-col rounded-2xl p-8 border transition-shadow duration-300",
        tier.highlight
          ? "bg-[#0F5132] border-[#0F5132] shadow-xl shadow-[#0F5132]/20"
          : "bg-white border-[#1C1C1E]/8 shadow-sm hover:shadow-md"
      )}
    >
      {tier.highlight && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex px-4 py-1 rounded-full bg-[#C9A24B] text-white text-xs font-bold tracking-wide">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3
          className={cn(
            "text-lg font-bold mb-1",
            tier.highlight ? "text-white" : "text-[#1C1C1E]"
          )}
        >
          {tier.name}
        </h3>
        <p
          className={cn(
            "text-sm leading-relaxed",
            tier.highlight ? "text-white/70" : "text-[#1C1C1E]/60"
          )}
        >
          {tier.description}
        </p>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-1 mb-8">
        <span
          className={cn(
            "text-4xl font-bold",
            tier.highlight ? "text-white" : "text-[#1C1C1E]"
          )}
        >
          {tier.price}
        </span>
        <span
          className={cn(
            "text-sm",
            tier.highlight ? "text-white/60" : "text-[#1C1C1E]/50"
          )}
        >
          {tier.period}
        </span>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8 flex-1">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check
              size={15}
              className={cn(
                "mt-0.5 flex-shrink-0",
                tier.highlight ? "text-[#C9A24B]" : "text-[#0F5132]"
              )}
            />
            <span
              className={cn(
                "text-sm leading-snug",
                tier.highlight ? "text-white/80" : "text-[#1C1C1E]/70"
              )}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href="/contact"
        className={cn(
          "block text-center px-6 py-3.5 rounded-xl text-sm font-bold transition-colors duration-200",
          tier.highlight
            ? "bg-white text-[#0F5132] hover:bg-[#FAF9F6]"
            : "bg-[#0F5132] text-white hover:bg-[#16733f]"
        )}
      >
        {tier.cta}
      </Link>
    </motion.div>
  );
}
