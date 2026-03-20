import type { Metadata } from "next";
import Link from "next/link";
import {
  Megaphone,
  Monitor,
  Bot,
  GraduationCap,
  DollarSign,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Dịch Vụ",
  description: "Khám phá 5 mảng dịch vụ chính của OPA: Marketing, Công nghệ, AI, Đào tạo, Affiliate.",
};

const services = [
  {
    icon: Megaphone,
    title: "Marketing Đa Nền Tảng",
    desc: "Chiến lược marketing tổng thể trên Facebook, TikTok, YouTube và website. Tối ưu chi phí quảng cáo, tăng chuyển đổi.",
    features: ["Content Marketing", "Ads Management", "SEO & SEM", "Social Media Strategy"],
    color: "#f59e0b",
  },
  {
    icon: Monitor,
    title: "Giải Pháp Công Nghệ",
    desc: "Tư vấn & triển khai công cụ số hóa cho doanh nghiệp vừa và nhỏ. Từ website, CRM đến hệ thống quản lý nội bộ.",
    features: ["Website & App Development", "CRM Setup", "Workflow Automation", "Cloud Migration"],
    color: "#155eef",
  },
  {
    icon: Bot,
    title: "Ứng Dụng AI Cho Doanh Nghiệp",
    desc: "Tích hợp AI chatbot, automation, analytics vào quy trình kinh doanh. Giảm chi phí vận hành, tăng hiệu suất.",
    features: ["AI Chatbot", "Process Automation", "Data Analytics", "AI Content Generation"],
    color: "#8b5cf6",
  },
  {
    icon: GraduationCap,
    title: "Đào Tạo Khóa Học AI",
    desc: "Khóa học thực chiến cho cá nhân & doanh nghiệp. Từ cơ bản đến nâng cao, ứng dụng AI vào công việc hàng ngày.",
    features: ["AI Fundamentals", "Prompt Engineering", "AI for Marketing", "Custom Training"],
    color: "#ec4899",
  },
  {
    icon: DollarSign,
    title: "AI Affiliate Marketing",
    desc: "Xây dựng hệ thống kiếm tiền từ AI tools. Hướng dẫn từ A-Z cách tạo thu nhập thụ động với affiliate marketing.",
    features: ["AI Tool Reviews", "Affiliate Strategy", "Landing Page Setup", "Email Automation"],
    color: "#22c55e",
  },
];

export default function ServicesPage() {
  return (
    <section className="pt-24 pb-16 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#155eef] bg-[#155eef]/5 rounded-full px-4 py-1.5 mb-4">
            Dịch Vụ
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-[#101828]">
            Giải Pháp Toàn Diện Cho
            <br />
            <span className="text-gradient">Doanh Nghiệp Số</span>
          </h1>
          <p className="text-[#667085] mt-4 max-w-xl mx-auto">
            5 mảng dịch vụ cốt lõi, kết hợp Marketing + Công nghệ + AI để đưa doanh nghiệp của bạn lên tầm cao mới.
          </p>
        </div>

        {/* Services Grid */}
        <div className="space-y-6">
          {services.map((svc, i) => (
            <div
              key={svc.title}
              className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 hover:border-gray-300 hover:shadow-md transition-all"
            >
              <div className="grid md:grid-cols-[1fr_280px] gap-6 items-start">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="p-2.5 rounded-xl"
                      style={{ backgroundColor: `${svc.color}10` }}
                    >
                      <svc.icon className="h-6 w-6" style={{ color: svc.color }} />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#98a2b3]">0{i + 1}</span>
                      <h2 className="text-xl font-bold font-[family-name:var(--font-heading)] text-[#101828]">
                        {svc.title}
                      </h2>
                    </div>
                  </div>
                  <p className="text-[#667085] leading-relaxed">{svc.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {svc.features.map((f) => (
                    <span
                      key={f}
                      className="text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200 text-[#344054]"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-[#667085] mb-4">Bạn cần tư vấn giải pháp phù hợp?</p>
          <Link href="/contact">
            <button className="inline-flex items-center gap-2 rounded-full bg-[#155eef] px-7 py-3.5 text-base font-semibold text-white hover:bg-[#0b4fd1] shadow-sm shadow-[#155eef]/20 transition-all">
              Liên Hệ Ngay
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
