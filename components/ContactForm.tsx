"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type FormState = "idle" | "loading" | "success" | "error";

interface FormData {
  name: string;
  business: string;
  email: string;
  phone: string;
  message: string;
}

const initialData: FormData = {
  name: "",
  business: "",
  email: "",
  phone: "",
  message: "",
};

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [state, setState] = useState<FormState>("idle");

  const validate = (): boolean => {
    const next: Partial<FormData> = {};
    if (!formData.name.trim()) next.name = "Name is required.";
    if (!formData.business.trim()) next.business = "Business name is required.";
    if (!formData.email.trim()) {
      next.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!formData.message.trim()) next.message = "Tell us a bit about your business.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Submission failed");
      setState("success");
      setFormData(initialData);
    } catch {
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center py-16 px-8"
      >
        <div className="w-16 h-16 rounded-full bg-[#0F5132]/10 flex items-center justify-center mb-5">
          <CheckCircle2 size={32} className="text-[#0F5132]" />
        </div>
        <h3 className="text-2xl font-bold text-[#1C1C1E] mb-3">
          We'll be in touch!
        </h3>
        <p className="text-[#1C1C1E]/60 max-w-sm leading-relaxed">
          Thanks for reaching out. We'll review your info and get back to you
          within one business day with your free audit.
        </p>
      </motion.div>
    );
  }

  const inputClass = (field: keyof FormData) =>
    cn(
      "w-full px-4 py-3.5 rounded-xl border text-sm text-[#1C1C1E] placeholder-[#1C1C1E]/30 bg-[#FAF9F6] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#0F5132]/30 focus:border-[#0F5132]",
      errors[field]
        ? "border-red-300 bg-red-50"
        : "border-[#1C1C1E]/12 hover:border-[#1C1C1E]/25"
    );

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Row: Name + Business */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-[#1C1C1E]/60 uppercase tracking-wider mb-1.5">
            Your Name <span className="text-red-400">*</span>
          </label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Jane Smith"
            className={inputClass("name")}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>
          )}
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#1C1C1E]/60 uppercase tracking-wider mb-1.5">
            Business Name <span className="text-red-400">*</span>
          </label>
          <input
            name="business"
            type="text"
            value={formData.business}
            onChange={handleChange}
            placeholder="Smith Family Dentistry"
            className={inputClass("business")}
          />
          {errors.business && (
            <p className="mt-1.5 text-xs text-red-500">{errors.business}</p>
          )}
        </div>
      </div>

      {/* Row: Email + Phone */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-[#1C1C1E]/60 uppercase tracking-wider mb-1.5">
            Email Address <span className="text-red-400">*</span>
          </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="jane@yourshop.com"
            className={inputClass("email")}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
          )}
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#1C1C1E]/60 uppercase tracking-wider mb-1.5">
            Phone Number
          </label>
          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(555) 000-0000"
            className={inputClass("phone")}
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-semibold text-[#1C1C1E]/60 uppercase tracking-wider mb-1.5">
          Tell Us About Your Business <span className="text-red-400">*</span>
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          placeholder="What kind of business do you run? What's your biggest challenge with getting new clients or following up with leads?"
          className={cn(inputClass("message"), "resize-none")}
        />
        {errors.message && (
          <p className="mt-1.5 text-xs text-red-500">{errors.message}</p>
        )}
      </div>

      {/* Error state */}
      {state === "error" && (
        <div className="flex items-center gap-2.5 p-4 rounded-xl bg-red-50 border border-red-100">
          <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-600">
            Something went wrong. Please try again or email us directly.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#0F5132] text-white font-bold text-sm hover:bg-[#16733f] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-[#0F5132]/20"
      >
        {state === "loading" ? (
          <>
            <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={16} />
            Send My Free Audit Request
          </>
        )}
      </button>

      <p className="text-xs text-center text-[#1C1C1E]/40">
        No spam. No pressure. We'll reply within 1 business day.
      </p>
    </form>
  );
}
