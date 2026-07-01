import type { Metadata } from "next";
import { ServicesPageContent } from "@/components/ServicesPageContent";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Kairo's four core services: AI-built websites, AI voice agents, SMS & email automation, and Google review generation for local businesses.",
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
