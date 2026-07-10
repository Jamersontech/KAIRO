"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Loader2, ArrowRight, Check,
  Globe, Headphones, Bot, PhoneMissed, Star, CalendarCheck, MessagesSquare, Repeat,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";
import type { AddonService } from "@/config/site";

const ICONS: Record<string, LucideIcon> = {
  Globe, Headphones, Bot, PhoneMissed, Star, CalendarCheck, MessagesSquare, Repeat,
};

export function AddonServiceCard({ service, index }: { service: AddonService; index: number }) {
  const [planIdx, setPlanIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const Icon = ICONS[service.icon] ?? Star;
  const plan = service.plans[planIdx];
  const hasChoice = service.plans.length > 1;

  const handleCheckout = async () => {
    setErr("");
    setLoading(true);
    try {
      const res = await fetch("/api/checkout-addon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: plan.id }),
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.06, ease: EASE }}
      className="flex flex-col rounded-2xl p-6 bg-[#111113] border border-white/[0.07] hover:border-white/[0.14] transition-colors duration-300"
    >
      <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center mb-4">
        <Icon size={18} className="text-[#C9A24B]" />
      </div>

      <h3 className="text-base font-bold text-white mb-1.5 leading-snug">{service.name}</h3>
      <p className="text-sm text-white/45 leading-relaxed mb-5 flex-1">{service.description}</p>

      {hasChoice && (
        <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-[#0D0D0F] border border-white/[0.07] mb-4 w-fit">
          {service.plans.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setPlanIdx(i)}
              className={cn(
                "px-3 py-1 rounded-md text-xs font-bold transition-colors duration-200",
                i === planIdx ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      {plan.bullets.length > 0 && (
        <ul className="space-y-1.5 mb-5">
          {plan.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-xs text-white/45 leading-relaxed">
              <Check size={12} className="text-[#C9A24B] mt-0.5 flex-shrink-0" />
              {b}
            </li>
          ))}
        </ul>
      )}

      <div className="pt-4 mt-auto border-t border-white/[0.06]">
        <div className="flex items-baseline gap-1.5 mb-0.5">
          <span className="text-2xl font-black text-white tracking-[-0.01em]">${plan.monthly}</span>
          <span className="text-xs text-white/40">/mo</span>
        </div>
        <p className="text-[11px] text-white/30 mb-4">
          {plan.setup > 0 ? `+ $${plan.setup} one-time setup` : "No setup fee"}
        </p>

        {err && <p className="text-xs mb-3 text-red-400">{err}</p>}

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="group flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl text-sm font-bold bg-white/[0.06] text-white border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors duration-200 disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 size={14} className="animate-spin" /> Processing…
            </>
          ) : (
            <>
              Get Started
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
