import type { Metadata } from "next";
import { HowItWorksContent } from "@/components/HowItWorksContent";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Learn how Kairo transforms your local business in three simple steps: Audit, Build, and Automate.",
};

export default function HowItWorksPage() {
  return <HowItWorksContent />;
}
