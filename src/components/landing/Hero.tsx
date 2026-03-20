"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";

const avatarSrcs = [
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/68.jpg",
  "https://randomuser.me/api/portraits/men/75.jpg",
  "https://randomuser.me/api/portraits/women/17.jpg",
  "https://randomuser.me/api/portraits/men/46.jpg",
];
const sizes = [46, 40, 42, 38, 36, 44];

// Far positions (scattered — radar searching)
const farPos = [
  { x: 200, y: -20 }, { x: 370, y: 50 }, { x: 380, y: 250 },
  { x: 210, y: 320 }, { x: 60, y: 260 }, { x: 50, y: 60 },
];
// Near positions (gathered into orbit)
const nearPos = [
  { x: 200, y: 35 }, { x: 325, y: 100 }, { x: 325, y: 230 },
  { x: 200, y: 295 }, { x: 105, y: 230 }, { x: 105, y: 100 },
];

const DURATIONS = [2200, 1800, 2200, 9000, 1500, 2000]; // stage 0-5
const TOTAL = 6;

const labels: { text: string; color: string }[] = [
  { text: "Prospect Discovery", color: "#155eef" },
  { text: "Processing", color: "#7c3aed" },
  { text: "Intelligent Connection", color: "#155eef" },
  { text: "Filtering Leads", color: "#7c3aed" },
  { text: "Qualified Leads", color: "#059669" },
  { text: "Ready to Deploy", color: "#155eef" },
];

function HeroRobot({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";
  const color = isLeft ? "#155eef" : "#2970ff";

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: isLeft ? 0.8 : 1.2 }}
      className={`absolute top-1/2 -translate-y-1/2 hidden xl:block ${isLeft ? "left-[2%] 2xl:left-[5%]" : "right-[2%] 2xl:right-[5%]"}`}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: isLeft ? 0 : 1 }}
      >
        <svg width="140" height="180" viewBox="0 0 140 180" fill="none">
          {/* Glow */}
          <motion.circle
            cx="70" cy="90" r="60"
            fill={color} opacity="0.04"
            animate={{ r: [60, 70, 60], opacity: [0.04, 0.08, 0.04] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Antenna */}
          <motion.circle cx="70" cy="10" r="7" fill={color}
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <line x1="70" y1="17" x2="70" y2="38" stroke={color} strokeWidth="2.5" />

          {/* Head */}
          <rect x="28" y="38" width="84" height="56" rx="16" fill={color} />

          {/* Visor */}
          <rect x="38" y="50" width="64" height="28" rx="8" fill="#0a1628" opacity="0.3" />

          {/* Eyes */}
          <motion.circle cx="55" cy="64" r="8" fill="white"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          />
          <motion.circle cx="85" cy="64" r="8" fill="white"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          />
          <motion.circle cx={isLeft ? "57" : "53"} cy="64" r="3.5" fill="#101828"
            animate={{ cx: isLeft ? [57, 60, 57] : [83, 86, 83] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle cx={isLeft ? "87" : "83"} cy="64" r="3.5" fill="#101828"
            animate={{ cx: isLeft ? [87, 90, 87] : [83, 86, 83] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Mouth — smile */}
          <path d="M58 78 Q70 86 82 78" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" />

          {/* Body */}
          <rect x="34" y="100" width="72" height="46" rx="12" fill={color} opacity="0.85" />

          {/* Chest light */}
          <motion.circle cx="70" cy="123" r="6" fill="#5c9cfc"
            animate={{ opacity: [0.3, 1, 0.3], r: [6, 7, 6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Chest lines */}
          <rect x="50" y="110" width="40" height="2" rx="1" fill="white" opacity="0.15" />
          <rect x="55" y="136" width="30" height="2" rx="1" fill="white" opacity="0.1" />

          {/* Arms */}
          <motion.rect x="10" y="106" width="20" height="10" rx="5" fill={color} opacity="0.7"
            animate={{ rotate: isLeft ? [0, -20, 0] : [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "30px 111px" }}
          />
          <motion.rect x="110" y="106" width="20" height="10" rx="5" fill={color} opacity="0.7"
            animate={{ rotate: isLeft ? [0, 10, 0] : [0, -20, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            style={{ transformOrigin: "110px 111px" }}
          />

          {/* Feet */}
          <rect x="40" y="150" width="22" height="12" rx="6" fill={color} opacity="0.6" />
          <rect x="78" y="150" width="22" height="12" rx="6" fill={color} opacity="0.6" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setStage((s) => (s + 1) % TOTAL), DURATIONS[stage]);
    return () => clearTimeout(t);
  }, [stage]);

  // Which positions to use
  const positions = stage === 0 ? farPos : nearPos;
  const showAvatars = stage <= 2;
  const showLines = stage === 2;
  const showMockup = stage === 3 || stage === 4;
  const orbInPhone = stage === 3 || stage === 4;
  const showRadar = stage === 0;
  // stage === 5: solo orb spinner — không gì khác hiện

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-4 pb-8 pt-24 sm:px-6 md:pt-16">
      {/* BG — tech grid + gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(21,94,239,1) 1px, transparent 1px), linear-gradient(90deg, rgba(21,94,239,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />

        {/* Gradient orbs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#155eef]/[0.04] blur-[120px]" />
        <motion.div
          className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-[#5c9cfc]/[0.03] blur-[100px]"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[50%] right-[5%] w-[350px] h-[350px] rounded-full bg-[#8b5cf6]/[0.03] blur-[90px]"
          animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[10%] left-[30%] w-[300px] h-[300px] rounded-full bg-[#155eef]/[0.025] blur-[80px]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#155eef]/20"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          />
        ))}

        {/* Circuit lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 1200 800" fill="none">
          <path d="M0 400 H300 Q320 400 320 380 V280 Q320 260 340 260 H500" stroke="#155eef" strokeWidth="1.5" />
          <path d="M700 260 H860 Q880 260 880 280 V380 Q880 400 900 400 H1200" stroke="#155eef" strokeWidth="1.5" />
          <path d="M0 300 H150 Q170 300 170 320 V500 Q170 520 190 520 H400" stroke="#5c9cfc" strokeWidth="1" />
          <path d="M800 520 H1010 Q1030 520 1030 500 V320 Q1030 300 1050 300 H1200" stroke="#5c9cfc" strokeWidth="1" />
          <circle cx="320" cy="260" r="3" fill="#155eef" />
          <circle cx="880" cy="400" r="3" fill="#155eef" />
          <circle cx="170" cy="520" r="2.5" fill="#5c9cfc" />
          <circle cx="1030" cy="300" r="2.5" fill="#5c9cfc" />
        </svg>
      </div>

      {/* Robots */}
      <HeroRobot side="left" />
      <HeroRobot side="right" />

      {/* Text */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="relative z-10 mx-auto max-w-4xl px-2 text-center sm:px-6">
        <motion.div variants={fadeUp} className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#eff6ff] border border-[#155eef]/10 px-5 py-2 text-sm font-medium text-[#155eef]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#155eef] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#155eef]" />
            </span>
            AI-Powered Agency
          </span>
        </motion.div>
        <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-[4rem] font-bold font-[family-name:var(--font-heading)] leading-[1.1] tracking-tight text-[#101828]">
          Marketing x Công Nghệ x AI<br />
          <span className="text-gradient">Giải Pháp Thực Chiến</span>
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-5 text-base md:text-lg text-[#667085] max-w-lg mx-auto leading-relaxed">
          OPA kết hợp sức mạnh Marketing, Công nghệ và AI tiên tiến để giúp doanh nghiệp Việt Nam tăng trưởng bền vững.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact">
            <button className="inline-flex items-center gap-2 rounded-full bg-[#155eef] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#155eef]/25 hover:bg-[#0b4fd1] transition-all hover:-translate-y-0.5">
              Tư Vấn Miễn Phí <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
          <Link href="/services">
            <button className="inline-flex items-center rounded-full border border-gray-200 bg-white px-7 py-3 text-sm font-semibold text-[#344054] hover:bg-gray-50 transition-all shadow-sm">
              Xem Dịch Vụ
            </button>
          </Link>
        </motion.div>
      </motion.div>

      {/* ===== VISUAL ===== */}
      <div className="relative z-5 mt-8 flex w-full justify-center md:mt-10">
        <div className="relative h-[229px] w-[285px] sm:h-[296px] sm:w-[368px] md:h-[370px] md:w-[460px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative origin-top-left scale-[0.62] sm:scale-[0.8] md:scale-100"
          style={{ width: 460, height: 370 }}
        >
        {/* Orbit ring */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 460 370">
          <circle cx="230" cy="175" r="130" fill="none" stroke="#155eef" strokeWidth="1" strokeOpacity="0.06" strokeDasharray="4 6" />
        </svg>

        {/* RADAR PULSE — stage 0 only */}
        <AnimatePresence>
          {showRadar && (
            <>
              <motion.div
                className="absolute rounded-full border-2 border-[#155eef]/20"
                style={{ left: 230 - 20, top: 175 - 20, width: 40, height: 40 }}
                animate={{ scale: [1, 8], opacity: [0.4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                exit={{ opacity: 0 }}
              />
              <motion.div
                className="absolute rounded-full border border-[#155eef]/15"
                style={{ left: 230 - 20, top: 175 - 20, width: 40, height: 40 }}
                animate={{ scale: [1, 6], opacity: [0.3, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
                exit={{ opacity: 0 }}
              />
            </>
          )}
        </AnimatePresence>

        {/* CONNECTION LINES — stage 2 only */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 460 370">
          {nearPos.map((p, i) => (
            <motion.line
              key={i}
              x1="230" y1="175"
              x2={p.x + sizes[i] / 2} y2={p.y + sizes[i] / 2}
              stroke="#155eef" strokeWidth="1.5"
              animate={{
                strokeOpacity: showLines ? [0.06, 0.18, 0.06] : 0,
              }}
              transition={{ strokeOpacity: { duration: 2, repeat: Infinity, delay: i * 0.25 } }}
            />
          ))}
        </svg>

        {/* AVATARS — stage 0,1,2: visible (move from far→near); stage 3+: gone */}
        <AnimatePresence>
          {showAvatars && avatarSrcs.map((src, i) => (
            <motion.div
              key={i}
              className="absolute"
              animate={{
                left: positions[i].x,
                top: positions[i].y,
                opacity: 1,
              }}
              initial={{ left: farPos[i].x, top: farPos[i].y, opacity: 0 }}
              exit={{ opacity: 0, scale: 0.3, transition: { duration: 0.3 } }}
              transition={{
                left: { duration: 0.8, ease: "easeInOut", delay: stage === 0 ? 0.6 + i * 0.1 : 0 },
                top: { duration: 0.8, ease: "easeInOut", delay: stage === 0 ? 0.6 + i * 0.1 : 0 },
                opacity: { duration: 0.5, delay: stage === 0 ? 0.6 + i * 0.1 : 0 },
                scale: { duration: 0.4 },
              }}
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="rounded-full overflow-hidden border-2 border-white shadow-lg shadow-black/[0.08]" style={{ width: sizes[i], height: sizes[i] }}>
                  <Image src={src} alt="" width={sizes[i]} height={sizes[i]} className="object-cover" unoptimized />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* CENTER ORB — always visible, moves into phone area but stays on top */}
        <motion.div
          className="absolute z-30"
          animate={{
            left: orbInPhone ? 192 : 230 - 38,
            top: orbInPhone ? 160 : 175 - 38,
            scale: orbInPhone ? 0.6 : 1,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.div
            animate={{ scale: [1, 1.5], opacity: [0.2, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute -inset-4 rounded-full border border-[#155eef]/20"
          />
          <motion.div
            animate={{ scale: [1, 1.8], opacity: [0.1, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
            className="absolute -inset-7 rounded-full border border-[#155eef]/10"
          />
          <motion.div
            animate={{
              boxShadow: [
                "0 0 25px 8px rgba(21,94,239,0.15)",
                "0 0 50px 18px rgba(21,94,239,0.26)",
                "0 0 25px 8px rgba(21,94,239,0.15)",
              ],
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-[76px] h-[76px] rounded-full bg-gradient-to-br from-[#155eef] to-[#5c9cfc] flex items-center justify-center relative"
          >
            {/* Donut spinner — white ring with gap, spinning */}
            <motion.svg
              className="w-10 h-10"
              viewBox="0 0 40 40"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <circle cx="20" cy="20" r="14" fill="none" stroke="white" strokeWidth="5" strokeOpacity="0.3" />
              <circle cx="20" cy="20" r="14" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" strokeDasharray="60 28" />
            </motion.svg>
          </motion.div>
        </motion.div>

        {/* PHONE MOCKUP — stage 3+ */}
        <AnimatePresence>
          {showMockup && (
            <motion.div
              className="absolute"
              style={{ left: 170, top: 25 }}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="w-[120px] h-[240px] rounded-[24px] bg-gradient-to-b from-[#155eef] to-[#3b82f6] shadow-2xl shadow-[#155eef]/25 border border-white/20 flex flex-col items-center pt-6 px-3">
                <div className="w-8 h-8 rounded-full bg-white/20 mb-4 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-white/40" />
                </div>
                <div className="w-full space-y-2.5">
                  <div className="h-2 bg-white/25 rounded-full w-full" />
                  <div className="h-2 bg-white/18 rounded-full w-3/4" />
                  <div className="h-2 bg-white/12 rounded-full w-5/6" />
                </div>
                <div className="mt-5 w-full space-y-2">
                  <div className="h-1.5 bg-white/12 rounded-full w-full" />
                  <div className="h-1.5 bg-white/08 rounded-full w-2/3" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ALL BADGES + PATHS — keyed by stage so React unmounts INSTANTLY on stage change */}
        {stage === 3 && (
          <div key="filter-stage" className="absolute inset-0">
            {/* Path lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 460 370">
              <motion.path d="M100 105 Q140 105 165 120 Q180 130 180 145" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 3"
                initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 2, ease: "easeOut", delay: 0.5 }} />
              <motion.path d="M95 155 Q130 155 160 160 Q180 165 180 175" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 3"
                initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 2, ease: "easeOut", delay: 2 }} />
              <motion.path d="M100 205 Q135 205 160 195 Q180 188 180 180" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 3"
                initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 2, ease: "easeOut", delay: 3.5 }} />
              <motion.path d="M290 145 Q310 130 330 115 Q345 107 360 105" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 3"
                initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 4.5 }} />
              <motion.path d="M290 170 Q310 165 330 158 Q345 152 355 150" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 3"
                initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 5.8 }} />
              <motion.path d="M290 185 Q310 195 330 200 Q345 203 350 205" fill="none" stroke="#d97706" strokeWidth="1.5" strokeDasharray="4 3"
                initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 7 }} />
            </svg>
            {/* Red badges */}
            <motion.div className="absolute" style={{ top: 95 }}
              initial={{ left: -40, opacity: 0 }} animate={{ left: [-40, -5, 160], opacity: [0, 1, 0] }}
              transition={{ duration: 4, ease: "easeInOut", times: [0, 0.12, 1] }}>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white shadow-lg border border-red-200 px-3 py-1.5 text-[11px] font-medium text-[#344054]">
                <span className="h-2 w-2 rounded-full bg-red-500" />Cold Lead List</span>
            </motion.div>
            <motion.div className="absolute" style={{ top: 145 }}
              initial={{ left: -50, opacity: 0 }} animate={{ left: [-50, -10, 160], opacity: [0, 1, 0] }}
              transition={{ duration: 4, ease: "easeInOut", times: [0, 0.12, 1], delay: 1.5 }}>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white shadow-lg border border-red-200 px-3 py-1.5 text-[11px] font-medium text-[#344054]">
                <span className="h-2 w-2 rounded-full bg-red-500" />Abandoned Leads</span>
            </motion.div>
            <motion.div className="absolute" style={{ top: 195 }}
              initial={{ left: -45, opacity: 0 }} animate={{ left: [-45, -8, 160], opacity: [0, 1, 0] }}
              transition={{ duration: 4, ease: "easeInOut", times: [0, 0.12, 1], delay: 3 }}>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white shadow-lg border border-red-200 px-3 py-1.5 text-[11px] font-medium text-[#344054]">
                <span className="h-2 w-2 rounded-full bg-red-500" />Missed Calls</span>
            </motion.div>
            {/* Green badges */}
            <motion.div className="absolute" style={{ top: 95 }}
              initial={{ left: 240, opacity: 0, scale: 0.8 }} animate={{ left: 310, opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 4.5 }}>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white shadow-lg border border-emerald-200 px-3 py-1.5 text-[11px] font-medium text-[#344054]">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />Qualified Leads</span>
            </motion.div>
            <motion.div className="absolute" style={{ top: 145 }}
              initial={{ left: 240, opacity: 0, scale: 0.8 }} animate={{ left: 305, opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 5.8 }}>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white shadow-lg border border-emerald-200 px-3 py-1.5 text-[11px] font-medium text-[#344054]">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />Booked Meetings</span>
            </motion.div>
            <motion.div className="absolute" style={{ top: 195 }}
              initial={{ left: 240, opacity: 0, scale: 0.8 }} animate={{ left: 300, opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 7 }}>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white shadow-lg border border-amber-200 px-3 py-1.5 text-[11px] font-medium text-[#344054]">
                <span className="h-2 w-2 rounded-full bg-amber-500" />Scheduled Callbacks</span>
            </motion.div>
          </div>
        )}

        {/* RESULT — brief flash of green then gone */}
        {stage === 4 && (
          <div key="result-stage" className="absolute inset-0">
            <motion.div className="absolute" style={{ left: 310, top: 95 }}
              initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white shadow-lg border border-emerald-200 px-3 py-1.5 text-[11px] font-medium text-[#344054]">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />Qualified Leads</span>
            </motion.div>
            <motion.div className="absolute" style={{ left: 305, top: 145 }}
              initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.8, delay: 0.55 }}>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white shadow-lg border border-emerald-200 px-3 py-1.5 text-[11px] font-medium text-[#344054]">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />Booked Meetings</span>
            </motion.div>
            <motion.div className="absolute" style={{ left: 300, top: 195 }}
              initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white shadow-lg border border-amber-200 px-3 py-1.5 text-[11px] font-medium text-[#344054]">
                <span className="h-2 w-2 rounded-full bg-amber-500" />Scheduled Callbacks</span>
            </motion.div>
          </div>
        )}

        {/* STATUS BADGE */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[220px] h-[32px]">
          <AnimatePresence mode="wait">
            <motion.span
              key={stage}
              className="absolute inset-0 flex items-center justify-center rounded-full bg-white shadow-md shadow-black/[0.05] border border-gray-100 text-xs font-medium text-[#344054]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <span className="h-1.5 w-1.5 rounded-full mr-1.5 shrink-0" style={{ backgroundColor: labels[stage].color }} />
              {labels[stage].text}
            </motion.span>
          </AnimatePresence>
        </div>
        </motion.div>
        </div>
      </div>

      {/* Scroll */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="mt-8">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="h-10 w-6 rounded-full border-2 border-gray-200 flex justify-center pt-2">
          <div className="h-2 w-1 rounded-full bg-gray-300" />
        </motion.div>
      </motion.div>
    </section>
  );
}
