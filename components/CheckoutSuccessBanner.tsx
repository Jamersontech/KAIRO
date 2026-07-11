"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { EASE } from "@/lib/motion";

/**
 * Shown on /pricing?success=1 — where Stripe Checkout redirects after a
 * completed payment. Without this, a paying customer lands back on the
 * pricing page with no confirmation at all.
 */
export function CheckoutSuccessBanner() {
  const params = useSearchParams();
  const [dismissed, setDismissed] = useState(false);
  const show = params.get("success") === "1" && !dismissed;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="fixed top-20 inset-x-0 z-40 flex justify-center px-4 pointer-events-none"
          role="status"
        >
          <div className="pointer-events-auto flex items-start gap-3.5 max-w-xl w-full rounded-2xl bg-[#0F5132] border border-[#C9A24B]/40 shadow-2xl shadow-black/40 px-5 py-4">
            <span className="flex-shrink-0 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center mt-0.5">
              <CheckCircle2 size={18} className="text-[#E8C87A]" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black text-white">
                Payment confirmed — welcome to Kairo. 🎉
              </p>
              <p className="text-xs text-white/70 leading-relaxed mt-1">
                A receipt is on its way to your email. We&apos;ll reach out within 1
                business day to kick off your onboarding — most businesses are
                live in 3–5 days.
              </p>
            </div>
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss"
              className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
