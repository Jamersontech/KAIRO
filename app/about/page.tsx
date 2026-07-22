import type { Metadata } from "next";
import { FinalCTA } from "@/components/FinalCTA";
import { AboutValuesSection } from "@/components/AboutValuesSection";
import { AboutIntro } from "@/components/AboutIntro";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Kairo — the AI automation agency helping local businesses compete and grow.",
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <AboutIntro />

      {/* Values — client component for animations */}
      <AboutValuesSection />

      <FinalCTA />
    </div>
  );
}
