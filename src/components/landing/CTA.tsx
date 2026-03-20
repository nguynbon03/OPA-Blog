"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";

const flowAvatars = [
  { src: "https://randomuser.me/api/portraits/women/23.jpg", x: 20, y: 60 },
  { src: "https://randomuser.me/api/portraits/men/54.jpg", x: 80, y: 30 },
  { src: "https://randomuser.me/api/portraits/women/45.jpg", x: 140, y: 90 },
  { src: "https://randomuser.me/api/portraits/men/22.jpg", x: 200, y: 50 },
  { src: "https://randomuser.me/api/portraits/women/63.jpg", x: 250, y: 80 },
];

export function CTA() {
  return (
    <section id="contact" className="py-24 px-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="mx-auto max-w-5xl rounded-3xl overflow-hidden relative"
        style={{
          background: "linear-gradient(135deg, #155eef 0%, #1a6aff 40%, #2970ff 70%, #5c9cfc 100%)",
        }}
      >
        {/* Decorative circuit lines */}
        <div className="absolute inset-0 opacity-[0.08]">
          <svg className="w-full h-full" viewBox="0 0 800 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 150 H250 Q270 150 270 130 V80 Q270 60 290 60 H800" stroke="white" strokeWidth="2" />
            <path d="M0 200 H180 Q200 200 200 180 V120 Q200 100 220 100 H500 Q520 100 520 120 V180 Q520 200 540 200 H800" stroke="white" strokeWidth="1.5" />
            <path d="M0 100 H350 Q370 100 370 120 V200 Q370 220 390 220 H800" stroke="white" strokeWidth="1" />
            <circle cx="270" cy="60" r="4" fill="white" />
            <circle cx="520" cy="200" r="4" fill="white" />
            <circle cx="370" cy="220" r="4" fill="white" />
          </svg>
        </div>

        <div className="relative z-10 px-8 md:px-16 py-16 md:py-20">
          <div className="grid md:grid-cols-[1fr_auto] gap-10 items-center">
            {/* Text side */}
            <div>
              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-white leading-tight"
              >
                Tăng Trưởng Thông Minh.
                <br />
                Mở Rộng Nhanh Hơn.
              </motion.h2>
              <motion.div variants={fadeUp} className="mt-8">
                <Link href="/blog">
                  <button className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-[#155eef] shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                    Bắt Đầu Ngay
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
              </motion.div>
            </div>

            {/* Visual side — avatar flow */}
            <motion.div
              variants={fadeUp}
              className="hidden md:block relative w-[280px] h-[160px]"
            >
              {/* Flow line */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 280 160" fill="none">
                <path
                  d="M20 80 Q70 30 140 80 Q210 130 260 80"
                  stroke="white"
                  strokeWidth="2"
                  strokeOpacity="0.3"
                  fill="none"
                />
              </svg>

              {flowAvatars.map((av, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.12, ease: "backOut" }}
                  className="absolute"
                  style={{ left: av.x - 16, top: av.y - 16 }}
                >
                  <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-white/40 shadow-md">
                    <Image
                      src={av.src}
                      alt=""
                      width={32}
                      height={32}
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
