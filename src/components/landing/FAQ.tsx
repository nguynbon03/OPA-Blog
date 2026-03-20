"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";

const faqs = [
  {
    q: "OPA khác gì so với các agency marketing khác?",
    a: "Chúng tôi kết hợp ba trụ cột — Marketing, Công nghệ và AI — thành một giải pháp tích hợp. Thay vì thuê riêng từng team cho quảng cáo, phát triển web và tự động hoá, OPA cung cấp tất cả với AI là nền tảng cốt lõi.",
  },
  {
    q: "Tôi có thể thấy kết quả sau bao lâu?",
    a: "Hầu hết khách hàng thấy cải thiện rõ rệt trong 2-4 tuần. Công cụ AI của chúng tôi bắt đầu tạo nội dung và tối ưu chiến dịch từ ngày đầu tiên, trong khi kết quả chiến lược tích luỹ sau 2-3 tháng.",
  },
  {
    q: "Tôi có cần kiến thức kỹ thuật để sử dụng AI tools của OPA không?",
    a: "Hoàn toàn không. Công cụ của chúng tôi được thiết kế cho chủ doanh nghiệp và đội ngũ marketing không có nền tảng kỹ thuật. Chúng tôi cung cấp onboarding, đào tạo và hỗ trợ liên tục.",
  },
  {
    q: "OPA phục vụ ngành nào?",
    a: "Chúng tôi làm việc với SME trong mọi ngành — từ thương mại điện tử, F&B đến giáo dục và dịch vụ chuyên nghiệp. AI của chúng tôi tự thích ứng với thị trường, đối tượng và mô hình kinh doanh cụ thể của bạn.",
  },
  {
    q: "Chất lượng nội dung AI có đảm bảo không?",
    a: "Tất cả nội dung do AI tạo đều qua kiểm tra chất lượng, căn chỉnh giọng thương hiệu và review tuân thủ. Chúng tôi tuân theo nghiêm ngặt quy định của từng nền tảng và duy trì điểm chất lượng cao.",
  },
  {
    q: "Triển khai nhanh cỡ nào và đo lường thành công ra sao?",
    a: "Chúng tôi có thể launch chiến dịch đầu tiên trong 1 tuần. Thành công được đo qua KPI rõ ràng — lượng lead, tỷ lệ chuyển đổi, chi phí/lead và ROI — tất cả tracking real-time trên dashboard.",
  },
];

function FAQItem({ faq, isOpen, onToggle }: { faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-6 text-left group"
      >
        <span className="text-base font-medium text-[#101828] pr-8 group-hover:text-[#155eef] transition-colors">
          {faq.q}
        </span>
        <span className="shrink-0 h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center text-[#667085] group-hover:border-[#155eef] group-hover:text-[#155eef] transition-colors">
          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-[15px] text-[#667085] leading-relaxed pr-12">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-28 px-6 bg-white">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-sm font-semibold text-[#155eef] mb-3 tracking-wide uppercase">
            Câu Hỏi Thường Gặp
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-[#101828]"
          >
            Giải Đáp Thắc Mắc
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-[#667085] text-lg">
            Tất cả những gì bạn cần biết về OPA và dịch vụ của chúng tôi.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-gray-200 bg-white px-8"
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
