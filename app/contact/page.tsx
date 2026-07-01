import type { Metadata } from "next";
import { Mail, Phone, Clock, Calendar } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get a free website audit from Kairo. We'll review your digital presence and show you exactly how to grow.",
};

export default function ContactPage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <section className="py-16 bg-[#FAF9F6] border-b border-[#1C1C1E]/6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A24B] mb-3 block">
              Let's Talk
            </span>
            <h1 className="text-5xl lg:text-6xl font-bold text-[#1C1C1E] leading-tight mb-4">
              Get your free
              <br />
              website audit.
            </h1>
            <p className="text-lg text-[#1C1C1E]/60 leading-relaxed">
              Fill out the form below and we'll take a close look at your current
              digital presence. You'll get a clear, honest assessment of where you
              can improve — and what it would take to get there.
            </p>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Sidebar */}
            <div className="space-y-8">
              {/* Contact details */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-[#1C1C1E]/40 mb-5">
                  Contact Info
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#0F5132]/10 flex items-center justify-center flex-shrink-0">
                      <Mail size={16} className="text-[#0F5132]" />
                    </div>
                    <div>
                      <div className="text-xs text-[#1C1C1E]/40 mb-0.5">Email</div>
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="text-sm font-medium text-[#1C1C1E] hover:text-[#0F5132] transition-colors"
                      >
                        {siteConfig.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#0F5132]/10 flex items-center justify-center flex-shrink-0">
                      <Phone size={16} className="text-[#0F5132]" />
                    </div>
                    <div>
                      <div className="text-xs text-[#1C1C1E]/40 mb-0.5">Phone</div>
                      <a
                        href={`tel:${siteConfig.phone}`}
                        className="text-sm font-medium text-[#1C1C1E] hover:text-[#0F5132] transition-colors"
                      >
                        {siteConfig.phone}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#0F5132]/10 flex items-center justify-center flex-shrink-0">
                      <Clock size={16} className="text-[#0F5132]" />
                    </div>
                    <div>
                      <div className="text-xs text-[#1C1C1E]/40 mb-0.5">Response Time</div>
                      <p className="text-sm font-medium text-[#1C1C1E]">
                        Within 1 business day
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Calendar booking */}
              <div className="bg-[#FAF9F6] rounded-2xl p-6 border border-[#1C1C1E]/6">
                <div className="w-9 h-9 rounded-lg bg-[#0F5132]/10 flex items-center justify-center mb-4">
                  <Calendar size={16} className="text-[#0F5132]" />
                </div>
                <h3 className="font-semibold text-[#1C1C1E] mb-1">
                  Prefer to book directly?
                </h3>
                <p className="text-sm text-[#1C1C1E]/60 leading-relaxed mb-4">
                  Schedule a 30-minute strategy call and we'll walk you through your
                  audit live.
                </p>
                <a
                  href={siteConfig.calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F5132] text-white text-sm font-semibold hover:bg-[#16733f] transition-colors"
                >
                  <Calendar size={15} />
                  Book a Strategy Call
                </a>
              </div>

              {/* What to expect */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-[#1C1C1E]/40 mb-4">
                  What Happens Next
                </h3>
                <ol className="space-y-3">
                  {[
                    "We review your form within 1 business day",
                    "We audit your website, Google profile, and online presence",
                    "You receive a custom report with specific, actionable findings",
                    "We schedule a call to walk through it together — no pressure",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#1C1C1E]/60">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#0F5132]/10 text-[#0F5132] text-[10px] font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-[#1C1C1E]/6 shadow-sm p-8">
              <h2 className="text-2xl font-bold text-[#1C1C1E] mb-2">
                Request your free audit
              </h2>
              <p className="text-sm text-[#1C1C1E]/50 mb-8">
                Takes 2 minutes. No commitment required.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
