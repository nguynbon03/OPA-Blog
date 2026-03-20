"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    quote: "OPA đã giúp doanh nghiệp chúng tôi tăng 300% lead chỉ trong 3 tháng. ROI vượt xa kỳ vọng.",
    name: "Nguyen Van A",
    role: "CEO, TechStart VN",
    initials: "NA",
    rating: 5,
  },
  {
    quote: "Đội ngũ OPA không chỉ làm marketing mà còn tư vấn chiến lược kinh doanh rất sâu sắc.",
    name: "Tran Thi B",
    role: "Founder, BeautyPlus",
    initials: "TB",
    rating: 5,
  },
  {
    quote: "Khoá học AI của OPA giúp team tôi tiết kiệm 70% thời gian làm content mỗi ngày.",
    name: "Le Van C",
    role: "Marketing Director, FoodCorp",
    initials: "LC",
    rating: 5,
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="py-28 px-6 bg-white">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold text-[#155eef] mb-3 tracking-wide uppercase">
          Testimonials
        </p>
        <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-[#101828] mb-16">
          Khách Hàng Nói Gì
        </h2>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl bg-[#f8fafc] border border-gray-200 p-10 md:p-12"
            >
              <div className="flex items-center justify-center gap-1 mb-6">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-[#f59e0b] text-[#f59e0b]" />
                ))}
              </div>

              <p className="text-xl md:text-2xl text-[#101828] leading-relaxed mb-8 font-medium">
                &ldquo;{testimonials[current].quote}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-[#155eef]/10 text-[#155eef] font-semibold">
                    {testimonials[current].initials}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="font-semibold text-[#101828]">{testimonials[current].name}</p>
                  <p className="text-sm text-[#667085]">{testimonials[current].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-[#667085] hover:text-[#101828] hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    i === current ? "w-8 bg-[#155eef]" : "w-2.5 bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-[#667085] hover:text-[#101828] hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
