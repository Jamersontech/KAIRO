"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check, Minus,
  Globe, ClipboardList, Mail, Star, BarChart3, MessageCircle,
  PhoneMissed, Headphones, ClipboardCheck, MessagesSquare, CalendarCheck,
  ShieldCheck, Bell, Video, Zap, Megaphone, Repeat, TrendingUp, Sparkles,
  CalendarClock, Headset,
  type LucideIcon,
} from "lucide-react";
import { EASE } from "@/lib/motion";
import {
  ALL_FEATURES, CATEGORY_ORDER, PLANS, featuresInCategory,
  type Category, type DerivedFeature,
} from "@/lib/pricingFeatures";

// Fired by a pricing card when a feature is clicked — see PricingCard.
export const SELECT_FEATURE_EVENT = "kairo:select-feature";

const ICONS: Record<string, LucideIcon> = {
  Globe, ClipboardList, Mail, Star, BarChart3, MessageCircle,
  PhoneMissed, Headphones, ClipboardCheck, MessagesSquare, CalendarCheck,
  ShieldCheck, Bell, Video, Zap, Megaphone, Repeat, TrendingUp, Sparkles,
  CalendarClock, Headset,
};

function PlanBadges({ avail }: { avail: boolean[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {PLANS.map((plan, i) => (
        <span
          key={plan}
          className={
            avail[i]
              ? "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C9A24B]/15 text-[#E8C87A] border border-[#C9A24B]/30"
              : "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/[0.03] text-white/25 border border-white/[0.06]"
          }
        >
          {avail[i] ? <Check size={9} /> : <Minus size={9} />}
          {plan}
        </span>
      ))}
    </div>
  );
}

function FeatureCard({
  feature,
  focused,
  cardRef,
}: {
  feature: DerivedFeature;
  focused: boolean;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  const Icon = ICONS[feature.icon] ?? Star;
  return (
    <div
      ref={cardRef}
      className={
        "scroll-mt-28 rounded-2xl p-6 bg-[#0D0D0F] border transition-colors duration-500 " +
        (focused ? "border-[#C9A24B]/70 shadow-lg shadow-[#C9A24B]/10" : "border-white/[0.07]")
      }
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="relative flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#C9A24B]/25 to-[#C9A24B]/[0.04] ring-1 ring-inset ring-[#C9A24B]/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <Icon size={19} strokeWidth={2} className="text-[#E8C87A]" />
        </span>
        <div className="min-w-0">
          <h3 className="text-base font-black text-white leading-tight">{feature.name}</h3>
        </div>
      </div>

      <PlanBadges avail={feature.avail} />

      <p className="text-sm text-white/75 leading-relaxed mt-4">{feature.what}</p>
      <p className="text-sm text-white/55 leading-relaxed mt-2.5">
        <span className="font-bold text-[#C9A24B]">Why it matters: </span>
        {feature.why}
      </p>
      <p className="text-xs text-white/45 leading-relaxed italic border-t border-white/[0.06] mt-4 pt-3.5">
        {feature.example}
      </p>
    </div>
  );
}

export function PricingFeatureExplorer() {
  const [activeCategory, setActiveCategory] = useState<Category>(CATEGORY_ORDER[0]);
  const [focusSlug, setFocusSlug] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const selectFeature = (slug: string) => {
    const f = ALL_FEATURES.find((x) => x.slug === slug);
    if (!f) return;
    setActiveCategory(f.category);
    setFocusSlug(slug);
  };

  // Scroll the focused card into view once its category grid has rendered.
  useEffect(() => {
    if (!focusSlug) return;
    const raf = requestAnimationFrame(() => {
      cardRefs.current[focusSlug]?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    const clear = setTimeout(() => setFocusSlug(null), 2400);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(clear);
    };
  }, [focusSlug]);

  useEffect(() => {
    const fromHash = () => {
      const m = window.location.hash.match(/^#feature-(.+)$/);
      if (m) selectFeature(m[1]);
    };
    fromHash();
    const onEvent = (e: Event) => {
      const slug = (e as CustomEvent<string>).detail;
      if (slug) selectFeature(slug);
    };
    window.addEventListener(SELECT_FEATURE_EVENT, onEvent);
    window.addEventListener("hashchange", fromHash);
    return () => {
      window.removeEventListener(SELECT_FEATURE_EVENT, onEvent);
      window.removeEventListener("hashchange", fromHash);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeFeatures = featuresInCategory(activeCategory);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="scroll-mt-24 py-24 bg-[#111113] border-y border-white/[0.05]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#C9A24B] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B]" />
            Every Feature, Explained
          </span>
          <h2 className="text-4xl font-black text-white tracking-[-0.02em] mb-4">
            Pick a category and see{" "}
            <span className="font-serif-accent text-gold-gradient">exactly what you get.</span>
          </h2>
          <p className="text-white/45 leading-relaxed">
            No tech talk — just what each feature is, why it matters, and a real example.
            Tap any feature on a plan above to jump straight to it.
          </p>
        </div>

        {/* Mobile category pills */}
        <div className="lg:hidden -mx-4 px-4 mb-6 flex gap-2 overflow-x-auto pb-2">
          {CATEGORY_ORDER.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={
                "flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold border transition-colors duration-200 " +
                (cat === activeCategory
                  ? "bg-[#C9A24B] text-[#0D0D0F] border-[#C9A24B]"
                  : "bg-transparent text-white/55 border-white/10")
              }
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-8 items-start">
          {/* Desktop category nav */}
          <nav className="hidden lg:block sticky top-24 space-y-1">
            {CATEGORY_ORDER.map((cat) => {
              const on = cat === activeCategory;
              const count = featuresInCategory(cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={
                    "w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl text-left transition-colors duration-200 " +
                    (on ? "bg-[#C9A24B]/12 text-white" : "text-white/55 hover:text-white hover:bg-white/[0.04]")
                  }
                >
                  <span className="text-sm font-bold leading-tight">{cat}</span>
                  <span
                    className={
                      "text-[11px] font-black tabular-nums " + (on ? "text-[#C9A24B]" : "text-white/30")
                    }
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Card grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: EASE }}
              className="grid sm:grid-cols-2 gap-4"
            >
              {activeFeatures.map((f) => (
                <FeatureCard
                  key={f.slug}
                  feature={f}
                  focused={focusSlug === f.slug}
                  cardRef={(el) => {
                    cardRefs.current[f.slug] = el;
                  }}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
