import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.name}.`,
};

export default function PrivacyPage() {
  return (
    <div className="pt-20 min-h-screen">
      <section className="py-16 bg-[#FAF9F6]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#1C1C1E] mb-3">Privacy Policy</h1>
          <p className="text-sm text-[#1C1C1E]/40 mb-12">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
          <div className="prose prose-sm max-w-none text-[#1C1C1E]/70 space-y-6">
            <p className="text-lg text-[#1C1C1E]/60 bg-[#C9A24B]/10 border border-[#C9A24B]/20 rounded-xl p-4">
              This is a placeholder Privacy Policy. Replace this content with your actual policy before launch.
            </p>
            <p>
              {siteConfig.name} (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your personal information and your right to privacy.
            </p>
            <h2 className="text-xl font-bold text-[#1C1C1E]">Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you fill out our contact form, including your name, business name, email address, and phone number.
            </p>
            <h2 className="text-xl font-bold text-[#1C1C1E]">How We Use Your Information</h2>
            <p>
              We use the information we collect to respond to your inquiries, provide our services, and send you relevant communications.
            </p>
            <h2 className="text-xl font-bold text-[#1C1C1E]">Contact Us</h2>
            <p>
              If you have questions about this policy, contact us at{" "}
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
