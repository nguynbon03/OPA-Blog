"use client";

import { motion } from "framer-motion";
import { Search, BookOpen, Rocket } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Discover",
    description: "Browse curated articles across AI, ML, and emerging tech categories.",
  },
  {
    icon: BookOpen,
    step: "02",
    title: "Learn",
    description: "Deep-dive into expert analysis with code examples, benchmarks, and case studies.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Apply",
    description: "Put knowledge into practice with actionable insights and implementation guides.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-sm font-medium text-[#155eef] mb-3">
            HOW IT WORKS
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-[#0f172a]"
          >
            Simple. Powerful. <span className="text-gradient">Insightful.</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="relative grid gap-8 md:grid-cols-3"
        >
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

          {steps.map((step) => (
            <motion.div key={step.step} variants={fadeUp} className="relative text-center">
              <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#155eef]/5 border border-[#155eef]/10">
                <step.icon className="h-7 w-7 text-[#155eef]" />
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#155eef] text-[10px] font-bold text-white">
                  {step.step}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-[#0f172a] mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
