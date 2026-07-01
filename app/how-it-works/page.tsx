import type { Metadata } from "next";
import Link from "next/link";
import { Search, Wrench, Zap, ArrowRight } from "lucide-react";
import { FinalCTA } from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Learn how Kairo transforms your local business in three simple steps: Audit, Build, and Automate.",
};

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Audit",
    subtitle: "We find the gaps before we build anything.",
    description:
      "Every engagement starts with a free, no-pressure audit of your current digital presence. We look at your website, Google profile, online reputation, and lead follow-up process — and show you exactly where revenue is slipping through the cracks.",
    details: [
      "Website performance & conversion analysis",
      "Google Business Profile review",
      "Competitor research in your area",
      "Lead response time assessment",
      "Custom growth opportunity report",
    ],
    duration: "Week 1",
  },
  {
    number: "02",
    icon: Wrench,
    title: "Build",
    subtitle: "We deploy your digital infrastructure — fast.",
    description:
      "Once we have a clear picture of what you need, we build it. Your new website goes live within 48 hours. Your automation sequences are configured, tested, and connected to your tools. No delays, no endless revision cycles.",
    details: [
      "Custom website designed and launched in 48 hours",
      "Lead capture forms configured and tested",
      "SMS & email sequences written and activated",
      "Google review system connected to your workflow",
      "CRM integration and lead routing",
    ],
    duration: "Week 1–2",
  },
  {
    number: "03",
    icon: Zap,
    title: "Automate & Grow",
    subtitle: "The systems run. You focus on your clients.",
    description:
      "Once everything is live, Kairo runs in the background. Leads get instant responses. Appointments get confirmed. Clients get review requests. You get a monthly report showing exactly what's happening — and what we're optimizing.",
    details: [
      "Leads followed up in under 5 minutes, automatically",
      "Appointment reminders sent 24h and 1h before",
      "Review requests triggered after every completed job",
      "Monthly analytics and performance report",
      "Continuous A/B testing and optimization",
    ],
    duration: "Month 1 onward",
  },
];

const faqs = [
  {
    q: "How long until I see results?",
    a: "Most clients see measurable changes within the first 30 days — more inquiries from the website, faster lead response, and new Google reviews rolling in. Full momentum typically builds over 60–90 days.",
  },
  {
    q: "Do I need to provide anything?",
    a: "Just your time for an onboarding call (about 60 minutes) and access to your existing website or Google account. We handle everything else.",
  },
  {
    q: "Will this work for my type of business?",
    a: "Kairo is designed for service-based local businesses — contractors, dental & medical practices, salons & spas, fitness studios, law firms, auto shops, and more. If clients find you via Google and word of mouth, we can help.",
  },
  {
    q: "Do I have to sign a long-term contract?",
    a: "We don't lock you into multi-year contracts. Month-to-month options are available, though most clients stick around because the systems keep delivering value.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A24B] mb-3 block">
              The Process
            </span>
            <h1 className="text-5xl lg:text-6xl font-bold text-[#1C1C1E] leading-tight mb-5">
              Three steps from where
              <br />
              you are to where you want to be.
            </h1>
            <p className="text-xl text-[#1C1C1E]/60 leading-relaxed max-w-2xl">
              We've streamlined onboarding so most businesses are fully live with
              automation in under two weeks — not two months.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    idx % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Text */}
                  <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-[#0F5132] flex items-center justify-center">
                        <Icon size={24} className="text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold tracking-widest text-[#1C1C1E]/40 uppercase">
                          Step {step.number}
                        </span>
                        <div className="inline-flex ml-3 px-2.5 py-0.5 rounded-full bg-[#C9A24B]/15 text-xs font-medium text-[#C9A24B]">
                          {step.duration}
                        </div>
                      </div>
                    </div>
                    <h2 className="text-4xl font-bold text-[#1C1C1E] mb-3">
                      {step.title}
                    </h2>
                    <p className="text-xl font-medium text-[#0F5132] mb-4">
                      {step.subtitle}
                    </p>
                    <p className="text-base text-[#1C1C1E]/60 leading-relaxed mb-6">
                      {step.description}
                    </p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F5132] hover:gap-3 transition-all duration-200"
                    >
                      Start your audit
                      <ArrowRight size={15} />
                    </Link>
                  </div>

                  {/* Details card */}
                  <div className={`${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                    <div className="bg-[#FAF9F6] rounded-2xl p-8 border border-[#1C1C1E]/6">
                      <h4 className="text-xs font-semibold uppercase tracking-widest text-[#1C1C1E]/40 mb-5">
                        What happens in this step
                      </h4>
                      <ul className="space-y-3">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-[#0F5132]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-[9px] font-bold text-[#0F5132]">
                                {i + 1}
                              </span>
                            </div>
                            <span className="text-sm text-[#1C1C1E]/70 leading-snug">
                              {detail}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#C9A24B] mb-3 block">
              FAQ
            </span>
            <h2 className="text-4xl font-bold text-[#1C1C1E]">
              Common questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="bg-white rounded-2xl p-6 border border-[#1C1C1E]/6"
              >
                <h3 className="font-semibold text-[#1C1C1E] mb-2">{faq.q}</h3>
                <p className="text-sm text-[#1C1C1E]/60 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
