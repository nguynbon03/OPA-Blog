"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Building2, Cpu, Users } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";

const stats = [
  { value: 500, suffix: "+", label: "Dự Án Hoàn Thành", icon: Briefcase },
  { value: 200, suffix: "+", label: "Doanh Nghiệp Tin Tưởng", icon: Building2 },
  { value: 50, suffix: "+", label: "AI Tools Triển Khai", icon: Cpu },
  { value: 5, suffix: "K+", label: "Học Viên Đào Tạo", icon: Users },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="py-20 px-6 bg-[#0f172a]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={fadeUp} className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.06]">
              <stat.icon className="h-5 w-5 text-[#5c9cfc]" />
            </div>
            <p className="text-4xl md:text-5xl font-bold text-white font-[family-name:var(--font-heading)]">
              <Counter target={stat.value} suffix={stat.suffix} />
            </p>
            <p className="text-sm text-gray-400 mt-2">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
