"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { EASE } from "@/lib/motion";

const faqs = [
  {
    q: "What's the one-time setup fee for?",
    a: "It covers building your website, setting up all your automations, and getting everything live and tested. You pay it once, at the start — then just the flat monthly price.",
  },
  {
    q: "Is the monthly price really all-in?",
    a: "Yes. One flat monthly price covers your website, your automations, and your support. No per-message fees, no surprise charges.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes — no long-term contracts. Cancel with 30 days' notice. Most clients stay because the system keeps paying for itself in new customers.",
  },
  {
    q: "How fast will I be up and running?",
    a: "Most businesses are fully live in 3–5 days. We handle the entire setup for you — you don't need to touch any tech.",
  },
  {
    q: "What do I actually have to do?",
    a: "Almost nothing. A short kickoff call and access to your existing website or Google profile. We build, connect, and manage everything else.",
  },
  {
    q: "Which plan is right for me?",
    a: "Need a professional website that captures leads? Start with Starter. Missing calls and want to book more customers automatically? Growth is the sweet spot — most clients pick it. Want us to actively grow your business every month? Full Stack.",
  },
  {
    q: "Do you work with my type of business?",
    a: "Yes — we specialize in local service businesses: dentists, chiropractors, roofers, HVAC, plumbers, electricians, contractors, med spas, lawyers, and real estate teams.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`rounded-2xl border transition-colors duration-300 overflow-hidden ${
        open ? "border-[#0F5132]/40 bg-[#111113]" : "border-white/[0.07] bg-[#111113] hover:border-white/15"
      }`}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left flex items-center justify-between gap-4 px-6 py-5"
      >
        <span className="font-semibold text-white text-sm sm:text-base">{q}</span>
        <span
          className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
            open ? "bg-[#0F5132] text-white" : "bg-white/8 text-white/40"
          }`}
        >
          {open ? <Minus size={12} /> : <Plus size={12} />}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            <p className="px-6 pb-5 text-sm text-white/55 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function PricingFAQ() {
  return (
    <div className="space-y-3">
      {faqs.map((f) => (
        <FAQItem key={f.q} q={f.q} a={f.a} />
      ))}
    </div>
  );
}
