import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { ProblemSolution } from "@/components/ProblemSolution";
import { ServicesOverview } from "@/components/ServicesOverview";
import { StatsBar } from "@/components/StatsBar";
import { Testimonials } from "@/components/Testimonials";
import { FinalCTA } from "@/components/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <ProblemSolution />
      <ServicesOverview />
      <StatsBar />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
