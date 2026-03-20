"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PenTool, BarChart3, Globe, Sparkles } from "lucide-react";

const showcaseItems = [
  {
    icon: PenTool,
    tag: "Content Creation",
    title: "Write faster with AI assistance",
    description:
      "Draft articles in minutes, not hours. Our AI understands your voice, your style, and your audience to produce content that reads like you wrote it.",
    color: "#155eef",
    bgColor: "#eff6ff",
    metrics: [
      { label: "Time saved", value: "10x" },
      { label: "Quality score", value: "95%" },
    ],
  },
  {
    icon: BarChart3,
    tag: "Analytics",
    title: "Data-driven content strategy",
    description:
      "See which topics resonate, track engagement in real-time, and let AI recommend what to write next based on your audience behavior.",
    color: "#7c3aed",
    bgColor: "#f5f3ff",
    metrics: [
      { label: "Engagement up", value: "340%" },
      { label: "Bounce rate", value: "-60%" },
    ],
  },
  {
    icon: Globe,
    tag: "Distribution",
    title: "Publish everywhere, instantly",
    description:
      "One click to publish across your blog, social media, and newsletter. Automatic formatting for each platform.",
    color: "#059669",
    bgColor: "#ecfdf5",
    metrics: [
      { label: "Platforms", value: "12+" },
      { label: "Reach", value: "50x" },
    ],
  },
  {
    icon: Sparkles,
    tag: "SEO",
    title: "Rank higher, automatically",
    description:
      "AI-powered SEO optimization baked into every post. Meta tags, internal linking, and keyword density handled automatically.",
    color: "#d97706",
    bgColor: "#fffbeb",
    metrics: [
      { label: "Organic traffic", value: "+280%" },
      { label: "Top 10 rankings", value: "3x" },
    ],
  },
];

export function StickyShowcase() {
  return (
    <section className="py-24 px-6 bg-section-alt">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-[#155eef] mb-3">PLATFORM</p>
          <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-[#0f172a]">
            Everything you need to{" "}
            <span className="text-gradient">dominate content</span>
          </h2>
        </div>

        <div className="space-y-6">
          {showcaseItems.map((item, i) => (
            <ShowcaseCard key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ShowcaseCard({ item }: { item: (typeof showcaseItems)[number] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);

  return (
    <motion.div ref={cardRef} style={{ scale, opacity }}>
      <div
        className="rounded-3xl border border-gray-200 p-8 md:p-12 overflow-hidden relative bg-white shadow-sm"
      >
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-4"
              style={{ backgroundColor: item.bgColor, color: item.color }}
            >
              <item.icon className="h-3 w-3" />
              {item.tag}
            </span>

            <h3 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)] text-[#0f172a] mb-4">
              {item.title}
            </h3>

            <p className="text-muted-foreground leading-relaxed mb-6">
              {item.description}
            </p>

            <div className="flex gap-6">
              {item.metrics.map((metric) => (
                <div key={metric.label}>
                  <p className="text-2xl font-bold" style={{ color: item.color }}>
                    {metric.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <div
              className="rounded-2xl p-6 border"
              style={{
                backgroundColor: item.bgColor,
                borderColor: `${item.color}20`,
              }}
            >
              <div className="space-y-3">
                <div className="h-3 rounded-full w-3/4" style={{ backgroundColor: `${item.color}15` }} />
                <div className="h-3 rounded-full w-1/2" style={{ backgroundColor: `${item.color}10` }} />
                <div className="h-3 rounded-full w-5/6" style={{ backgroundColor: `${item.color}08` }} />
                <div className="pt-4 flex gap-2">
                  <div className="h-8 w-20 rounded-lg" style={{ backgroundColor: `${item.color}15` }} />
                  <div className="h-8 w-16 rounded-lg" style={{ backgroundColor: `${item.color}10` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
