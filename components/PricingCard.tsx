"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Loader2, ArrowRight, Sparkle,
  Globe, ClipboardList, Mail, Star, BarChart3, MessageCircle,
  PhoneMissed, Headphones, ClipboardCheck, MessagesSquare, CalendarCheck,
  ShieldCheck, Bell, Video, Zap, Megaphone, Repeat, TrendingUp, Sparkles,
  CalendarClock, Headset,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";
import type { PricingTier } from "@/config/site";
import { SELECT_FEATURE_EVENT } from "@/components/PricingFeatureExplorer";

const ICONS: Record<string, LucideIcon> = {
  Globe, ClipboardList, Mail, Star, BarChart3, MessageCircle,
  PhoneMissed, Headphones, ClipboardCheck, MessagesSquare, CalendarCheck,
  ShieldCheck, Bell, Video, Zap, Megaphone, Repeat, TrendingUp, Sparkles,
  CalendarClock, Headset,
};

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

  const hot = tier.highlight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
      whileHover={{ y: -5, transition: { duration: 0.25, ease: "easeOut" } }}
      className={cn(
        "relative flex flex-col rounded-3xl p-8 border transition-colors duration-300",
        hot
          ? "bg-[#12140F] border-[#C9A24B]/50 shadow-2xl shadow-[#0F5132]/25 lg:-mt-6"
          : "bg-[#111113] border-white/[0.08] hover:border-white/20"
      )}
    >
      {/* Gold top hairline on the popular card */}
      {hot && (
        <div className="absolute top-0 inset-x-0 h-[2px] rounded-t-3xl bg-gradient-to-r from-transparent via-[#C9A24B] to-transparent" />
      )}
      {hot && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#C9A24B] text-[#0D0D0F] text-xs font-black tracking-wide shadow-lg">
            <Sparkle size={11} className="fill-[#0D0D0F]" />
            Most Popular
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-black text-white mb-2">{tier.name}</h3>
        <p className={cn("text-sm font-semibold mb-2", hot ? "text-[#E8C87A]" : "text-[#C9A24B]")}>
          {tier.purpose}
        </p>
        <p className="text-sm leading-relaxed text-white/45">{tier.tagline}</p>
      </div>

      {/* Price */}
      <div className="mb-7 pb-7 border-b border-white/[0.07]">
        <div className="flex items-baseline gap-1.5">
          <span className="text-5xl font-black text-white tracking-[-0.02em]">{tier.price}</span>
          <span className="text-base text-white/40">{tier.period}</span>
        </div>
        <p className="text-xs text-white/40 mt-2">
          + {tier.setup} one-time setup
        </p>
      </div>

      {/* Inherit note */}
      {tier.inherits && (
        <p className="text-xs font-bold text-white/70 mb-5">
          Everything in {tier.inherits},{" "}
          <span className={hot ? "text-[#E8C87A]" : "text-[#C9A24B]"}>plus:</span>
        </p>
      )}

      {/* Features — each links into the explorer below */}
      <ul className="space-y-1.5 mb-8 flex-1">
        {tier.features.map((f) => {
          const Icon = ICONS[f.icon] ?? Star;
          return (
            <li key={f.name}>
              <a
                href={`#feature-${f.slug}`}
                onClick={() =>
                  window.dispatchEvent(new CustomEvent(SELECT_FEATURE_EVENT, { detail: f.slug }))
                }
                className="group/feat flex items-start gap-3 -mx-2 px-2 py-1.5 rounded-lg hover:bg-white/[0.04] transition-colors duration-200"
              >
                <span
                  className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5 ring-1 ring-inset",
                    hot
                      ? "bg-gradient-to-br from-[#C9A24B]/25 to-[#C9A24B]/[0.05] ring-[#C9A24B]/25"
                      : "bg-gradient-to-br from-[#C9A24B]/15 to-transparent ring-[#C9A24B]/15"
                  )}
                >
                  <Icon size={15} className="text-[#E8C87A]" />
                </span>
                <span className="flex-1">
                  <span className="flex items-center gap-1 text-sm font-semibold text-white leading-snug">
                    {f.name}
                    <ArrowRight
                      size={12}
                      className="text-[#C9A24B] opacity-0 -translate-x-1 group-hover/feat:opacity-100 group-hover/feat:translate-x-0 transition-all duration-200"
                    />
                  </span>
                  <span className="block text-xs text-white/45 leading-snug mt-0.5">{f.benefit}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      {/* Main result */}
      <div
        className={cn(
          "rounded-xl px-4 py-3 mb-6 border",
          hot ? "bg-[#0F5132]/25 border-[#0F5132]/40" : "bg-white/[0.03] border-white/[0.06]"
        )}
      >
        <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#C9A24B] mb-1">
          The result
        </span>
        <span className="block text-sm font-semibold text-white/85 leading-snug">
          {tier.mainResult}
        </span>
      </div>

      {err && <p className="text-xs mb-3 text-center text-red-400">{err}</p>}

      <button
        onClick={handleCheckout}
        disabled={loading}
        className={cn(
          "group flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl text-sm font-bold transition-colors duration-200 disabled:opacity-70",
          hot
            ? "bg-[#C9A24B] text-[#0D0D0F] hover:bg-[#E8C87A]"
            : "bg-[#0F5132] text-white hover:bg-[#16733f]"
        )}
      >
        {loading ? (
          <><Loader2 size={15} className="animate-spin" /> Processing…</>
        ) : (
          <>
            {tier.cta}
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
          </>
        )}
      </button>
    </motion.div>
  );
}
