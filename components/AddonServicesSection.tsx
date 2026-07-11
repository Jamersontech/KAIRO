"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowRight, X, Sparkles } from "lucide-react";
import { addonServicesConfig, pricingConfig, type AddonPlan, type AddonService } from "@/config/site";
import { AddonServiceCard } from "@/components/AddonServiceCard";
import { EASE, VIEWPORT } from "@/lib/motion";

interface ResolvedItem {
  serviceId: string;
  service: AddonService;
  plan: AddonPlan;
}

// serviceId -> planId
type Selection = Record<string, string>;

function resolve(selection: Selection): ResolvedItem[] {
  const items: ResolvedItem[] = [];
  for (const service of addonServicesConfig.services) {
    const planId = selection[service.id];
    if (!planId) continue;
    const plan = service.plans.find((p) => p.id === planId);
    if (plan) items.push({ serviceId: service.id, service, plan });
  }
  return items;
}

// The most-popular package, used to nudge stackers toward better value.
const growthTier = pricingConfig.tiers.find((t) => t.id === "growth");
const GROWTH_PRICE = growthTier?.price ?? "$397";
const GROWTH_MONTHLY = Number(GROWTH_PRICE.replace(/[^0-9]/g, "")) || 397;

export function AddonServicesSection() {
  const [selected, setSelected] = useState<Selection>({});
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const items = useMemo(() => resolve(selected), [selected]);
  const monthlyTotal = items.reduce((s, i) => s + i.plan.monthly, 0);
  const setupTotal = items.reduce((s, i) => s + i.plan.setup, 0);
  const count = items.length;

  const select = (serviceId: string, planId: string) =>
    setSelected((s) => ({ ...s, [serviceId]: planId }));
  const remove = (serviceId: string) =>
    setSelected((s) => {
      const next = { ...s };
      delete next[serviceId];
      return next;
    });

  const showNudge = count >= 3 || monthlyTotal >= GROWTH_MONTHLY;

  const checkout = async () => {
    if (count === 0) return;
    setErr("");
    setLoading(true);
    try {
      const res = await fetch("/api/checkout-addon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planIds: items.map((i) => i.plan.id) }),
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
    <section
      id="individual-services"
      className="scroll-mt-24 py-24 bg-[#0D0D0F] border-t border-white/[0.05]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-2xl mb-10"
        >
          <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
            Individual Services
          </span>
          <h2 className="text-3xl lg:text-4xl font-black text-white tracking-[-0.02em] mb-3">
            Need one specific solution?{" "}
            <span className="font-serif-accent text-gold-gradient">Build your own.</span>
          </h2>
          <p className="text-white/45 leading-relaxed">
            Pick the services your business needs, see your total instantly, and check out —
            all at once. Every service can also be added to a package later.
          </p>
        </motion.div>

        <div className="lg:grid lg:grid-cols-[1fr_340px] lg:gap-8 lg:items-start">
          {/* Service grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {addonServicesConfig.services.map((service, i) => (
              <AddonServiceCard
                key={service.id}
                service={service}
                index={i}
                selectedPlanId={selected[service.id]}
                onSelect={(planId) => select(service.id, planId)}
                onRemove={() => remove(service.id)}
              />
            ))}
          </div>

          {/* Sticky summary — desktop */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <BuildSummary
                items={items}
                monthlyTotal={monthlyTotal}
                setupTotal={setupTotal}
                showNudge={showNudge}
                loading={loading}
                err={err}
                onCheckout={checkout}
                onRemove={remove}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky checkout bar — mobile */}
      <AnimatePresence>
        {count > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#111113]/95 backdrop-blur-md border-t border-white/10 px-4 py-3 flex items-center justify-between gap-3"
          >
            <div className="min-w-0">
              <div className="text-sm font-black text-white leading-none">
                ${monthlyTotal}
                <span className="text-xs font-normal text-white/45">/mo</span>
              </div>
              <div className="text-[11px] text-white/40 mt-0.5">
                {count} service{count > 1 ? "s" : ""}
                {setupTotal > 0 ? ` · +$${setupTotal} setup` : ""}
              </div>
            </div>
            <button
              onClick={checkout}
              disabled={loading}
              className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C9A24B] text-[#0D0D0F] text-sm font-black hover:bg-[#E8C87A] transition-colors disabled:opacity-70"
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <>Checkout <ArrowRight size={14} /></>}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function BuildSummary({
  items,
  monthlyTotal,
  setupTotal,
  showNudge,
  loading,
  err,
  onCheckout,
  onRemove,
}: {
  items: ResolvedItem[];
  monthlyTotal: number;
  setupTotal: number;
  showNudge: boolean;
  loading: boolean;
  err: string;
  onCheckout: () => void;
  onRemove: (serviceId: string) => void;
}) {
  const empty = items.length === 0;

  return (
    <div className="rounded-2xl bg-[#111113] border border-white/[0.09] overflow-hidden">
      <div className="px-6 pt-6 pb-4 border-b border-white/[0.07]">
        <h3 className="text-sm font-black uppercase tracking-[0.18em] text-[#C9A24B]">Your build</h3>
      </div>

      <div className="px-6 py-5">
        {empty ? (
          <p className="text-sm text-white/40 leading-relaxed py-6 text-center">
            Add services on the left and your total appears here.
          </p>
        ) : (
          <ul className="space-y-3 mb-5">
            <AnimatePresence initial={false}>
              {items.map((item) => {
                const label =
                  item.service.plans.length > 1
                    ? `${item.service.name} — ${item.plan.label}`
                    : item.service.name;
                return (
                  <motion.li
                    key={item.serviceId}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22, ease: EASE }}
                    className="flex items-start justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white leading-snug">{label}</div>
                      {item.plan.setup > 0 && (
                        <div className="text-[11px] text-white/35">+ ${item.plan.setup} setup</div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-sm font-bold text-white/80 tabular-nums">
                        ${item.plan.monthly}
                        <span className="text-[11px] font-normal text-white/35">/mo</span>
                      </span>
                      <button
                        onClick={() => onRemove(item.serviceId)}
                        aria-label={`Remove ${item.service.name}`}
                        className="w-5 h-5 rounded-md flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        )}

        {/* Totals */}
        <div className={empty ? "opacity-40" : ""}>
          <div className="flex items-baseline justify-between pt-4 border-t border-white/[0.07]">
            <span className="text-sm text-white/50">Monthly total</span>
            <span className="text-2xl font-black text-white tabular-nums">
              ${monthlyTotal}
              <span className="text-sm font-normal text-white/40">/mo</span>
            </span>
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-xs text-white/40">One-time setup</span>
            <span className="text-sm font-bold text-white/70 tabular-nums">${setupTotal}</span>
          </div>
        </div>

        {/* Package value nudge */}
        <AnimatePresence>
          {showNudge && (
            <motion.a
              href="#packages"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="mt-4 flex items-start gap-2.5 rounded-xl bg-[#0F5132]/15 border border-[#0F5132]/30 p-3 group"
            >
              <Sparkles size={15} className="text-[#C9A24B] flex-shrink-0 mt-0.5" />
              <span className="text-xs text-white/70 leading-relaxed">
                The <strong className="text-[#E8C87A]">Growth</strong> package includes all of this and
                more for {GROWTH_PRICE}/mo.{" "}
                <span className="text-[#C9A24B] font-semibold group-hover:underline underline-offset-2">
                  Compare packages →
                </span>
              </span>
            </motion.a>
          )}
        </AnimatePresence>

        {err && <p className="text-xs mt-4 text-center text-red-400">{err}</p>}

        <button
          onClick={onCheckout}
          disabled={empty || loading}
          className="group mt-5 flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl bg-[#C9A24B] text-[#0D0D0F] text-sm font-black hover:bg-[#E8C87A] transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 size={15} className="animate-spin" /> Processing…
            </>
          ) : (
            <>
              Get Started
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
            </>
          )}
        </button>
        <p className="text-[11px] text-white/30 text-center mt-3">
          Setup billed today · first month free · cancel anytime
        </p>
      </div>
    </div>
  );
}
