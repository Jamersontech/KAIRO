"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingTier {
  id: string;
  name: string;
  price: string;
  setup: string;
  period: string;
  description: string;
  highlight: boolean;
  features: string[];
  cta: string;
}

export function PricingCard({ tier, index }: { tier: PricingTier; index: number }) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleCheckout = async () => {
    setErr("");
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tierId: tier.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error ?? "Could not start checkout");
        return;
      }
      window.location.href = data.url;
    } catch {
      setErr("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isContactTier = tier.id === "full-stack";

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
          <span className="inline-flex px-4 py-1 rounded-full bg-[#C9A24B] text-white text-xs font-bold tracking-wide shadow-sm">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className={cn("text-lg font-bold mb-1", tier.highlight ? "text-white" : "text-[#1C1C1E]")}>
          {tier.name}
        </h3>
        <p className={cn("text-sm leading-relaxed", tier.highlight ? "text-white/70" : "text-[#1C1C1E]/60")}>
          {tier.description}
        </p>
      </div>

      {/* Price */}
      <div className="mb-8">
        <div className="flex items-baseline gap-1 mb-1">
          <span className={cn("text-4xl font-bold", tier.highlight ? "text-white" : "text-[#1C1C1E]")}>
            {tier.price}
          </span>
          <span className={cn("text-sm", tier.highlight ? "text-white/60" : "text-[#1C1C1E]/50")}>
            {tier.period}
          </span>
        </div>
        <p className={cn("text-xs", tier.highlight ? "text-white/45" : "text-[#1C1C1E]/40")}>
          + {tier.setup} one-time setup fee
        </p>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check size={15} className={cn("mt-0.5 flex-shrink-0", tier.highlight ? "text-[#C9A24B]" : "text-[#0F5132]")} />
            <span className={cn("text-sm leading-snug", tier.highlight ? "text-white/80" : "text-[#1C1C1E]/70")}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {err && (
        <p className={cn("text-xs mb-3 text-center", tier.highlight ? "text-red-300" : "text-red-500")}>
          {err}
        </p>
      )}

      {isContactTier ? (
        <a
          href="/contact"
          className={cn(
            "block text-center px-6 py-3.5 rounded-xl text-sm font-bold transition-colors duration-200",
            tier.highlight ? "bg-white text-[#0F5132] hover:bg-[#FAF9F6]" : "bg-[#0F5132] text-white hover:bg-[#16733f]"
          )}
        >
          {tier.cta}
        </a>
      ) : (
        <button
          onClick={handleCheckout}
          disabled={loading}
          className={cn(
            "flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl text-sm font-bold transition-colors duration-200 disabled:opacity-70",
            tier.highlight ? "bg-white text-[#0F5132] hover:bg-[#FAF9F6]" : "bg-[#0F5132] text-white hover:bg-[#16733f]"
          )}
        >
          {loading ? (
            <><Loader2 size={15} className="animate-spin" /> Processing...</>
          ) : (
            <><ExternalLink size={14} /> {tier.cta}</>
          )}
        </button>
      )}
    </motion.div>
  );
}
