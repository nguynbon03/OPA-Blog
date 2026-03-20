"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

const logos = [
  "OpenAI", "Google", "Meta", "Microsoft", "Anthropic", "Nvidia",
];

export function LogoBar() {
  return (
    <section className="py-16 px-6 border-y border-gray-100">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="mx-auto max-w-5xl text-center"
      >
        <p className="text-xs text-muted-foreground mb-8 uppercase tracking-widest">
          Trusted by forward-thinking teams
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logos.map((name) => (
            <span
              key={name}
              className="text-lg font-semibold text-gray-300 hover:text-gray-400 transition-colors duration-300 font-[family-name:var(--font-heading)]"
            >
              {name}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
