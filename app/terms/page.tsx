import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { AnimatedDotGrid } from "@/components/AnimatedDotGrid";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${siteConfig.name}.`,
};

export default function TermsPage() {
  return (
    <div className="pt-20 min-h-screen">
      <section className="relative overflow-hidden py-16 bg-[#FAF9F6] kairo-pattern">
        <AnimatedDotGrid />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#1C1C1E] mb-3">Terms of Service</h1>
          <p className="text-sm text-[#1C1C1E]/40 mb-12">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
          <div className="space-y-6 text-[#1C1C1E]/70">
            <p className="text-lg text-[#1C1C1E]/60 bg-[#C9A24B]/10 border border-[#C9A24B]/20 rounded-xl p-4">
              This is a placeholder Terms of Service. Replace this content with your actual terms before launch.
            </p>
            <p>
              By accessing and using {siteConfig.name}&apos;s services, you accept and agree to be bound by the terms and provisions of this agreement.
            </p>
            <h2 className="text-xl font-bold text-[#1C1C1E]">Services</h2>
            <p>
              {siteConfig.name} provides website design, marketing automation, and reputation management services for local businesses.
            </p>
            <h2 className="text-xl font-bold text-[#1C1C1E]">Payment Terms</h2>
            <p>
              Services are billed on a monthly basis. Detailed payment terms will be outlined in your service agreement.
            </p>
            <h2 className="text-xl font-bold text-[#1C1C1E]">Contact</h2>
            <p>
              Questions? Email us at{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-[#0F5132] underline">
                {siteConfig.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
