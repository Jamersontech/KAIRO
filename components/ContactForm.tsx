"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, Send, Globe, Phone, MessageSquare, Star, Check } from "lucide-react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Step = 1 | 2 | 3;

interface FormData {
  name: string;
  email: string;
  phone: string;
  business_name: string;
  business_type: string;
  website_url: string;
  google_review_count: string;
  biggest_challenge: string;
  goals: string[];
  plan_interest: string;
  message: string;
}

const initial: FormData = {
  name: "", email: "", phone: "", business_name: "",
  business_type: "", website_url: "", google_review_count: "", biggest_challenge: "",
  goals: [], plan_interest: "", message: "",
};

const BUSINESS_TYPES = [
  "Dental / Medical", "HVAC / Plumbing", "Med Spa / Aesthetics",
  "Legal / Accounting", "Real Estate", "Restaurant / Food",
  "Home Services", "Fitness / Wellness", "Other",
];

const CHALLENGES = [
  { value: "missed_calls", label: "Missing calls and losing leads" },
  { value: "low_visibility", label: "Low Google ranking and visibility" },
  { value: "bad_website", label: "Outdated or underperforming website" },
  { value: "slow_followup", label: "Slow or inconsistent follow-up" },
  { value: "few_reviews", label: "Not enough Google reviews" },
  { value: "all", label: "All of the above" },
];

const GOALS = [
  { value: "website", label: "AI-built website", icon: Globe },
  { value: "voice", label: "AI voice agent", icon: Phone },
  { value: "automation", label: "SMS & email automation", icon: MessageSquare },
  { value: "reviews", label: "Google review generation", icon: Star },
];

const REVIEW_RANGES = ["0 – 10", "11 – 50", "51 – 100", "100+", "Not on Google yet"];

const PLANS = [
  { value: "starter", label: "Starter", sub: "Website + basics" },
  { value: "growth", label: "Growth", sub: "Full automation stack" },
  { value: "full-stack", label: "Full Stack", sub: "Done-for-you everything" },
  { value: "unsure", label: "Not sure yet", sub: "Help me decide" },
];

export function ContactForm() {
  const [step, setStep] = useState<Step>(1);
  const [data, setData] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const set = (key: keyof FormData, value: string | string[]) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleGoal = (v: string) =>
    set("goals", data.goals.includes(v) ? data.goals.filter((g) => g !== v) : [...data.goals, v]);

  const validateStep = (s: Step): boolean => {
    const next: Partial<Record<keyof FormData, string>> = {};
    if (s === 1) {
      if (!data.name.trim()) next.name = "Required";
      if (!data.email.trim()) next.email = "Required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) next.email = "Enter a valid email";
      if (!data.business_name.trim()) next.business_name = "Required";
    }
    if (s === 2) {
      if (!data.biggest_challenge) next.biggest_challenge = "Please pick one";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goNext = () => { if (validateStep(step)) setStep((s) => (s + 1) as Step); };
  const goBack = () => setStep((s) => (s - 1) as Step);

  const submit = async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, goals: data.goals.join(", ") }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center py-16 px-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 14, stiffness: 160, delay: 0.1 }}
          className="w-20 h-20 rounded-full bg-[#0F5132]/10 flex items-center justify-center mb-6"
        >
          <CheckCircle2 size={38} className="text-[#0F5132]" />
        </motion.div>
        <h3 className="text-2xl font-bold text-[#1C1C1E] mb-3">You&apos;re all set!</h3>
        <p className="text-[#1C1C1E]/55 max-w-sm leading-relaxed">
          We&apos;ll review{" "}
          <strong className="text-[#1C1C1E]">{data.business_name}</strong> and send your
          personalised audit within <strong className="text-[#1C1C1E]">1 business day</strong>.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0F5132]/8 text-sm text-[#0F5132] font-semibold">
          {data.email}
        </div>
      </motion.div>
    );
  }

  const progress = ((step - 1) / 2) * 100;

  return (
    <div>
      {/* Step progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          {(["About you", "Your situation", "Your goals"] as const).map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-300"
                style={{
                  backgroundColor: i + 1 <= step ? "#0F5132" : "rgba(28,28,30,0.07)",
                  color: i + 1 <= step ? "#fff" : "rgba(28,28,30,0.3)",
                }}
              >
                {i + 1 < step ? <Check size={11} /> : i + 1}
              </div>
              <span
                className="text-xs font-semibold transition-colors duration-300 hidden sm:block"
                style={{ color: i + 1 <= step ? "#1C1C1E" : "rgba(28,28,30,0.3)" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
        <div className="h-1 bg-[#1C1C1E]/7 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#0F5132] rounded-full"
            animate={{ width: `${progress}%` }}
            initial={false}
            transition={{ duration: 0.4, ease }}
          />
        </div>
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.26, ease }}
        >
          {/* ── STEP 1 ── */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="mb-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#C9A24B] mb-1">Step 1 of 3</p>
                <h3 className="text-xl font-bold text-[#1C1C1E]">Tell us about yourself</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Your Name" required error={errors.name}>
                  <input value={data.name} onChange={(e) => set("name", e.target.value)}
                    placeholder="Jane Smith" className={inputCls(!!errors.name)} />
                </Field>
                <Field label="Business Name" required error={errors.business_name}>
                  <input value={data.business_name} onChange={(e) => set("business_name", e.target.value)}
                    placeholder="Smith Family Dentistry" className={inputCls(!!errors.business_name)} />
                </Field>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Email Address" required error={errors.email}>
                  <input type="email" value={data.email} onChange={(e) => set("email", e.target.value)}
                    placeholder="jane@yourbusiness.com" className={inputCls(!!errors.email)} />
                </Field>
                <Field label="Phone Number">
                  <input type="tel" value={data.phone} onChange={(e) => set("phone", e.target.value)}
                    placeholder="(555) 000-0000" className={inputCls(false)} />
                </Field>
              </div>
            </div>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="mb-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#C9A24B] mb-1">Step 2 of 3</p>
                <h3 className="text-xl font-bold text-[#1C1C1E]">Where are you right now?</h3>
              </div>

              <div>
                <label className={lbl}>Business Type</label>
                <div className="flex flex-wrap gap-2">
                  {BUSINESS_TYPES.map((t) => (
                    <button key={t} type="button" onClick={() => set("business_type", t)}
                      className={chip(data.business_type === t)}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <Field label="Current Website URL (if any)">
                <div className="relative">
                  <Globe size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1C1C1E]/28 pointer-events-none" />
                  <input value={data.website_url} onChange={(e) => set("website_url", e.target.value)}
                    placeholder="https://yoursite.com" className={`${inputCls(false)} pl-9`} />
                </div>
              </Field>

              <div>
                <label className={lbl}>Current Google Review Count</label>
                <div className="flex flex-wrap gap-2">
                  {REVIEW_RANGES.map((r) => (
                    <button key={r} type="button" onClick={() => set("google_review_count", r)}
                      className={chip(data.google_review_count === r)}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={lbl}>
                  Biggest Challenge Right Now <span className="text-red-400">*</span>
                </label>
                {errors.biggest_challenge && (
                  <p className="text-xs text-red-500 mb-2">{errors.biggest_challenge}</p>
                )}
                <div className="space-y-2">
                  {CHALLENGES.map((c) => {
                    const active = data.biggest_challenge === c.value;
                    return (
                      <button key={c.value} type="button" onClick={() => set("biggest_challenge", c.value)}
                        className={`w-full text-left text-sm px-4 py-3 rounded-xl border font-medium transition-all duration-150 flex items-center gap-3 ${
                          active ? "bg-[#0F5132]/7 text-[#0F5132] border-[#0F5132]/25" : "bg-[#FAF9F6] text-[#1C1C1E]/65 border-[#1C1C1E]/8 hover:border-[#1C1C1E]/20"
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                          active ? "border-[#0F5132] bg-[#0F5132]" : "border-[#1C1C1E]/20"
                        }`}>
                          {active && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        {c.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 3 ── */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="mb-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#C9A24B] mb-1">Step 3 of 3</p>
                <h3 className="text-xl font-bold text-[#1C1C1E]">What do you need from Kairo?</h3>
              </div>

              <div>
                <label className={lbl}>Services You&apos;re Interested In (pick all that apply)</label>
                <div className="grid grid-cols-2 gap-2.5">
                  {GOALS.map((g) => {
                    const Icon = g.icon;
                    const active = data.goals.includes(g.value);
                    return (
                      <button key={g.value} type="button" onClick={() => toggleGoal(g.value)}
                        className={`text-left p-4 rounded-xl border transition-all duration-150 flex items-start gap-3 ${
                          active ? "bg-[#0F5132]/7 border-[#0F5132]/25" : "bg-[#FAF9F6] border-[#1C1C1E]/8 hover:border-[#1C1C1E]/18"
                        }`}
                      >
                        <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                          active ? "bg-[#0F5132]" : "bg-[#1C1C1E]/8"
                        }`}>
                          {active ? <Check size={11} className="text-white" /> : <Icon size={11} className="text-[#1C1C1E]/35" />}
                        </div>
                        <span className={`text-sm font-medium leading-snug ${active ? "text-[#0F5132]" : "text-[#1C1C1E]/60"}`}>
                          {g.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className={lbl}>Which Plan Interests You?</label>
                <div className="grid grid-cols-2 gap-2">
                  {PLANS.map((p) => {
                    const active = data.plan_interest === p.value;
                    return (
                      <button key={p.value} type="button" onClick={() => set("plan_interest", p.value)}
                        className={`text-left p-4 rounded-xl border transition-all duration-150 ${
                          active ? "bg-[#0F5132]/7 border-[#0F5132]/25" : "bg-[#FAF9F6] border-[#1C1C1E]/8 hover:border-[#1C1C1E]/18"
                        }`}
                      >
                        <div className={`text-sm font-bold ${active ? "text-[#0F5132]" : "text-[#1C1C1E]"}`}>{p.label}</div>
                        <div className="text-xs text-[#1C1C1E]/40 mt-0.5">{p.sub}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <Field label="Anything else we should know?">
                <textarea value={data.message} onChange={(e) => set("message", e.target.value)}
                  rows={3} placeholder="e.g. We get ~20 calls a week but miss half after 5pm..."
                  className={`${inputCls(false)} resize-none`} />
              </Field>

              <div className="bg-[#FAF9F6] rounded-xl p-4 border border-[#1C1C1E]/7 text-xs text-[#1C1C1E]/45 leading-relaxed">
                Submitting for{" "}
                <strong className="text-[#1C1C1E]">{data.business_name}</strong>
                {data.business_type && <> · {data.business_type}</>} — reply to{" "}
                <strong className="text-[#1C1C1E]">{data.email}</strong> within 1 business day.
              </div>

              {status === "error" && (
                <div className="flex items-center gap-2.5 p-4 rounded-xl bg-red-50 border border-red-100">
                  <AlertCircle size={14} className="text-red-400 flex-shrink-0" />
                  <p className="text-sm text-red-600">Something went wrong. Please try again or email us directly.</p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className={`flex mt-8 gap-3 ${step > 1 ? "justify-between" : "justify-end"}`}>
        {step > 1 && (
          <button onClick={goBack}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-[#1C1C1E]/12 text-sm font-semibold text-[#1C1C1E]/55 hover:border-[#1C1C1E]/25 transition-colors"
          >
            <ArrowLeft size={14} /> Back
          </button>
        )}
        {step < 3 ? (
          <button onClick={goNext}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0F5132] text-white text-sm font-bold hover:bg-[#16733f] transition-colors shadow-lg shadow-[#0F5132]/20"
          >
            Continue <ArrowRight size={14} />
          </button>
        ) : (
          <button onClick={submit} disabled={status === "loading"}
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#0F5132] text-white text-sm font-bold hover:bg-[#16733f] disabled:opacity-60 transition-colors shadow-lg shadow-[#0F5132]/20"
          >
            {status === "loading"
              ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Sending...</>
              : <><Send size={14} /> Send Audit Request</>}
          </button>
        )}
      </div>
    </div>
  );
}

// ── Small helpers ─────────────────────────────────────────

function Field({ label, required, error, children }: {
  label: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-widest text-[#1C1C1E]/45 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}

const lbl = "block text-xs font-bold uppercase tracking-widest text-[#1C1C1E]/45 mb-2.5";

function inputCls(hasError: boolean) {
  return [
    "w-full px-4 py-3 rounded-xl border text-sm text-[#1C1C1E] placeholder-[#1C1C1E]/28 bg-[#FAF9F6] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#0F5132]/20 focus:border-[#0F5132]",
    hasError ? "border-red-300 bg-red-50/60" : "border-[#1C1C1E]/10 hover:border-[#1C1C1E]/20",
  ].join(" ");
}

function chip(active: boolean) {
  return [
    "text-xs px-3.5 py-2 rounded-xl border font-semibold transition-all duration-150",
    active ? "bg-[#0F5132] text-white border-[#0F5132]" : "bg-[#FAF9F6] text-[#1C1C1E]/60 border-[#1C1C1E]/10 hover:border-[#1C1C1E]/22",
  ].join(" ");
}
