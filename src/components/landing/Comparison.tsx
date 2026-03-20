"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, Zap, CircleDot } from "lucide-react";

const manualSteps = [
  "Nghiên cứu chủ đề thủ công",
  "Viết bài từ đầu, mất hàng giờ",
  "Tự chỉnh sửa và kiểm tra lỗi",
  "Định dạng cho web bằng tay",
  "Tạo ảnh bìa trong Photoshop",
  "Tối ưu SEO theo cảm tính",
  "Lên lịch đăng từng bài một",
  "Theo dõi dữ liệu trên Excel",
  "Qua lại chỉnh sửa liên tục",
  "Cuối cùng cũng xuất bản xong",
];

const aiSteps = [
  { text: "Kết nối nguồn nội dung" },
  { text: "AI tạo & cá nhân hoá nội dung" },
  { text: "Tự động tối ưu SEO & format" },
  { text: "Xuất bản & phân phối tự động" },
];

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [60, 0, 0, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div ref={ref} style={{ y, opacity }}>
      {children}
    </motion.div>
  );
}

export function Comparison() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headingY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [80, 0, 0, -40]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  const leftX = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [-60, 0, 0, -30]);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const rightX = useTransform(scrollYProgress, [0.05, 0.3, 0.75, 1], [60, 0, 0, 30]);
  const rightOpacity = useTransform(scrollYProgress, [0.05, 0.25, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} id="comparison" className="py-24 px-6 bg-[#f8fafc]">
      <div className="mx-auto max-w-5xl">
        {/* Heading — scroll reveal */}
        <motion.div
          style={{ y: headingY, opacity: headingOpacity }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-[#155eef] mb-3 tracking-wide uppercase">
            Sự Khác Biệt
          </p>
          <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-[#101828]">
            Cách cũ vs <span className="text-[#155eef]">Cách OPA</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Manual — slides in from left */}
          <motion.div style={{ x: leftX, opacity: leftOpacity }}>
            <div className="rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold text-[#101828]">Quy Trình Thủ Công</h3>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-[#475467]">
                    Xong rồi
                  </span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1">
                  <span className="text-sm font-bold text-[#101828]">120</span>
                  <span className="text-xs text-[#667085]">Giờ</span>
                </div>
              </div>
              <div className="p-4">
                <div className="rounded-xl border border-gray-100 divide-y divide-gray-100">
                  {manualSteps.map((step, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <CircleDot className="h-4 w-4 text-gray-300 shrink-0" />
                        <span className="text-sm text-[#344054]">{i + 1}. {step}</span>
                      </div>
                      <div className="h-5 w-5 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* AI — slides in from right */}
          <motion.div style={{ x: rightX, opacity: rightOpacity }}>
            <div className="rounded-2xl bg-white border-2 border-[#155eef]/20 overflow-hidden shadow-[0_1px_3px_rgba(21,94,239,0.08)]">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#155eef]/10">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold text-[#101828]">OPA AI Process</h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#155eef] px-3 py-1 text-xs font-semibold text-white">
                    <Zap className="h-3 w-3" />
                    Done
                  </span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-[#eff6ff] px-3 py-1">
                  <span className="text-sm font-bold text-[#155eef]">15</span>
                  <span className="text-xs text-[#155eef]">Phút</span>
                </div>
              </div>
              <div className="p-4">
                <div className="rounded-xl border border-[#155eef]/10 divide-y divide-[#155eef]/10">
                  {aiSteps.map((step, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <Zap className="h-4 w-4 text-[#155eef] shrink-0" />
                        <span className="text-sm font-medium text-[#344054]">{i + 1}. {step.text}</span>
                      </div>
                      <div className="h-5 w-5 rounded-full bg-[#155eef] flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-xl bg-[#f0f5ff] p-5">
                  <p className="text-sm text-[#344054] leading-relaxed">
                    Khi nội dung đã được kết nối, AI xử lý nghiên cứu, viết bài,
                    tối ưu và xuất bản — đưa bài viết hoàn chỉnh thẳng vào blog
                    của bạn, không cần thao tác thủ công.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
