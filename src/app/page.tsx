import { Hero } from "@/components/landing/Hero";
import { BentoServices } from "@/components/landing/BentoServices";
import { Comparison } from "@/components/landing/Comparison";
import { AgentTabs } from "@/components/landing/AgentTabs";
import { Stats } from "@/components/landing/Stats";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { CTA } from "@/components/landing/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <BentoServices />
      <Comparison />
      <AgentTabs />
      <Stats />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
