"use client";

import { motion } from "framer-motion";
import { Brain, Zap, Shield, Globe, BarChart3, Layers } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";

const features = [
  {
    icon: Brain,
    title: "AI Research",
    description: "In-depth analysis of the latest breakthroughs in artificial intelligence and machine learning.",
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description: "Stay current with breaking news and developments in the AI industry as they happen.",
  },
  {
    icon: Shield,
    title: "Expert Reviews",
    description: "Thorough evaluations of AI tools, frameworks, and platforms by industry professionals.",
  },
  {
    icon: Globe,
    title: "Global Perspectives",
    description: "Insights from AI researchers and practitioners from around the world.",
  },
  {
    icon: BarChart3,
    title: "Data-Driven",
    description: "Articles backed by data, benchmarks, and reproducible experiments.",
  },
  {
    icon: Layers,
    title: "Multi-Domain",
    description: "Covering AI applications across healthcare, finance, creative arts, and more.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-6 bg-white">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-sm font-medium text-[#155eef] mb-3 tracking-wide">
            WHY OPA BLOG
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-[#101828]"
          >
            Everything you need to stay informed
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-[#667085] max-w-2xl mx-auto text-lg">
            Comprehensive AI coverage with expert analysis, practical tutorials, and forward-looking insights.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl bg-white border border-gray-200 p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-[#155eef]/20"
            >
              <div className="mb-5 inline-flex rounded-2xl bg-[#eff6ff] p-3.5">
                <feature.icon className="h-6 w-6 text-[#155eef]" />
              </div>
              <h3 className="text-lg font-semibold text-[#101828] mb-2">{feature.title}</h3>
              <p className="text-[15px] text-[#667085] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
