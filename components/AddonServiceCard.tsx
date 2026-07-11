"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus, Check,
  Globe, Headphones, Bot, PhoneMissed, Star, CalendarCheck, MessagesSquare, Repeat,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";
import type { AddonService } from "@/config/site";

const ICONS: Record<string, LucideIcon> = {
  Globe, Headphones, Bot, PhoneMissed, Star, CalendarCheck, MessagesSquare, Repeat,
};

export function AddonServiceCard({
  service,
  selectedPlanId,
  onSelect,
  onRemove,
  index,
}: {
  service: AddonService;
  selectedPlanId?: string;
  onSelect: (planId: string) => void;
  onRemove: () => void;
  index: number;
}) {
  const Icon = ICONS[service.icon] ?? Star;
  const hasChoice = service.plans.length > 1;

  const initial = service.plans.findIndex((p) => p.id === selectedPlanId);
  const [variantIdx, setVariantIdx] = useState(initial >= 0 ? initial : 0);
  const plan = service.plans[variantIdx];
  const isSelected = selectedPlanId !== undefined;

  const chooseVariant = (i: number) => {
    setVariantIdx(i);
    if (isSelected) onSelect(service.plans[i].id); // update the build in place
  };

  const toggle = () => {
    if (isSelected) onRemove();
    else onSelect(plan.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.05, ease: EASE }}
      className={cn(
        "relative flex flex-col rounded-2xl p-5 border transition-all duration-300",
        isSelected
          ? "bg-[#12140F] border-[#C9A24B]/55 shadow-lg shadow-[#C9A24B]/10"
          : "bg-[#111113] border-white/[0.07] hover:border-white/[0.16]"
      )}
    >
      {/* Selected check badge */}
      {isSelected && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#C9A24B] flex items-center justify-center shadow"
        >
          <Check size={13} className="text-[#0D0D0F]" strokeWidth={3} />
        </motion.span>
      )}

      <div className="flex items-start justify-between mb-4">
        <span
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center ring-1 ring-inset transition-colors duration-300",
            isSelected
              ? "bg-gradient-to-br from-[#C9A24B]/30 to-[#C9A24B]/[0.06] ring-[#C9A24B]/35"
              : "bg-gradient-to-br from-[#C9A24B]/15 to-transparent ring-[#C9A24B]/15"
          )}
        >
          <Icon size={18} className="text-[#E8C87A]" />
        </span>
      </div>

      <h3 className="text-base font-bold text-white mb-1.5 leading-snug">{service.name}</h3>
      <p className="text-sm text-white/45 leading-relaxed mb-4 flex-1">{service.description}</p>

      {hasChoice && (
        <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-[#0D0D0F] border border-white/[0.07] mb-4 w-fit">
          {service.plans.map((p, i) => (
            <button
              key={p.id}
              onClick={() => chooseVariant(i)}
              className={cn(
                "px-3 py-1 rounded-md text-xs font-bold transition-colors duration-200",
                i === variantIdx ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      {plan.bullets.length > 0 && (
        <ul className="space-y-1.5 mb-4">
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

        <button
          onClick={toggle}
          aria-pressed={isSelected}
          className={cn(
            "group flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-xl text-sm font-bold transition-colors duration-200",
            isSelected
              ? "bg-[#C9A24B]/15 text-[#E8C87A] border border-[#C9A24B]/40 hover:bg-[#C9A24B]/25"
              : "bg-white/[0.06] text-white border border-white/10 hover:bg-white/10 hover:border-white/20"
          )}
        >
          {isSelected ? (
            <>
              <Check size={14} /> Added
            </>
          ) : (
            <>
              <Plus size={14} /> Add to build
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
