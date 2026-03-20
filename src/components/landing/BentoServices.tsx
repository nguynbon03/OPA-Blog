"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Megaphone, Code, Brain, GraduationCap, DollarSign, TrendingUp, Users, Target } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";

const services = [
  {
    id: "marketing",
    icon: Megaphone,
    title: "Marketing Đa Nền Tảng",
    description: "Facebook, TikTok, YouTube, Google Ads — chiến lược toàn diện tăng trưởng cho SME Việt Nam. Tối ưu chi phí, tăng ROI, và mở rộng thị trường.",
    features: ["Performance Marketing", "Content Strategy", "Social Media", "SEO & SEM"],
    color: "#155eef",
    bg: "#eff6ff",
    span: "md:col-span-2",
    stats: [
      { icon: TrendingUp, value: "3x", label: "Tăng ROI" },
      { icon: Users, value: "10K+", label: "Leads/tháng" },
      { icon: Target, value: "95%", label: "Đúng mục tiêu" },
    ],
  },
  {
    id: "technology",
    icon: Code,
    title: "Giải Pháp Công Nghệ",
    description: "Website, App, CRM, Automation — nền tảng số hoá doanh nghiệp từ A-Z.",
    features: ["Web Development", "Mobile Apps", "CRM Integration"],
    color: "#7c3aed",
    bg: "#f5f3ff",
    span: "",
  },
  {
    id: "ai",
    icon: Brain,
    title: "Ứng Dụng AI",
    description: "ChatBot, AI Content, Workflow Automation — công nghệ AI thực chiến cho mọi quy mô.",
    features: ["AI Chatbot", "Content Generation", "Workflow AI"],
    color: "#059669",
    bg: "#ecfdf5",
    badge: "HOT",
    span: "",
  },
  {
    id: "training",
    icon: GraduationCap,
    title: "Đào Tạo AI",
    description: "Khoá học thực chiến từ cơ bản đến nâng cao, ứng dụng ngay vào công việc.",
    features: ["AI cho Marketing", "AI Tools Mastery"],
    color: "#d97706",
    bg: "#fffbeb",
    span: "",
  },
  {
    id: "affiliate",
    icon: DollarSign,
    title: "AI Affiliate",
    description: "Kiếm tiền từ AI Affiliate Marketing — mô hình mới, thu nhập bền vững.",
    features: ["Affiliate Strategy", "Passive Income"],
    color: "#ef4444",
    bg: "#fef2f2",
    span: "",
  },
];

function ServiceCard({ service, index }: { service: typeof services[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity: cardOpacity }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className={`relative group rounded-2xl border border-gray-200 p-8 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] hover:border-transparent overflow-hidden ${service.span}`}
    >
      <div style={{ backgroundColor: service.bg }} className="absolute inset-0 rounded-2xl" />
      <div className="relative z-10">
        {service.badge && (
          <span className="absolute top-0 right-0 rounded-full bg-[#059669] px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
            {service.badge}
          </span>
        )}

        <div
          className="inline-flex rounded-xl p-3 mb-5"
          style={{ backgroundColor: `${service.color}15` }}
        >
          <service.icon className="h-6 w-6" style={{ color: service.color }} />
        </div>

        <h3 className="text-xl font-bold text-[#101828] mb-2 font-[family-name:var(--font-heading)]">
          {service.title}
        </h3>
        <p className="text-[15px] text-[#667085] leading-relaxed mb-5">
          {service.description}
        </p>

        {/* Stats row for featured card */}
        {service.stats && (
          <div className="flex gap-6 mb-6 pb-5 border-b border-gray-200/60">
            {service.stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <stat.icon className="h-4 w-4" style={{ color: service.color }} />
                <div>
                  <p className="text-lg font-bold text-[#101828]">{stat.value}</p>
                  <p className="text-[11px] text-[#667085]">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {service.features.map((f) => (
            <span
              key={f}
              className="rounded-full px-3 py-1 text-xs font-medium"
              style={{
                backgroundColor: `${service.color}10`,
                color: service.color,
              }}
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          boxShadow: `inset 0 0 60px ${service.color}08`,
        }}
      />
    </motion.div>
  );
}

export function BentoServices() {
  return (
    <section id="services" className="py-28 px-6 bg-white">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-sm font-semibold text-[#155eef] mb-3 tracking-wide uppercase">
            Dịch Vụ
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-[#101828]"
          >
            Dịch Vụ Của Chúng Tôi
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-[#667085] max-w-2xl mx-auto text-lg">
            Kết hợp Marketing, Công nghệ và AI để giúp doanh nghiệp tăng trưởng bền vững.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
