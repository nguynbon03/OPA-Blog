"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Send, CheckCircle, Calendar, BarChart3 } from "lucide-react";

const agents = [
  {
    id: "research",
    icon: Search,
    label: "Nghiên Cứu Lead",
    title: "AI Nghiên Cứu Khách Hàng",
    description:
      "Tự động tìm kiếm cơ hội mới. OPA quét web, cơ sở dữ liệu và tín hiệu thị trường để tìm khách hàng tiềm năng phù hợp — trước cả đối thủ của bạn.",
    cta: "Bắt Đầu",
    visual: {
      name: "Nguyễn Minh Anh",
      role: "VP Growth tại TechFlow",
      score: "Điểm: 92/100",
      status: "Đã thêm CRM",
    },
  },
  {
    id: "outreach",
    icon: Send,
    label: "Tiếp Cận Tự Động",
    title: "AI Tiếp Cận Khách Hàng",
    description:
      "Tạo tin nhắn cá nhân hoá ở quy mô lớn. AI viết email và follow-up theo ngữ cảnh, tự nhiên như người viết — tăng tỷ lệ phản hồi gấp 3 lần so với template.",
    cta: "Bắt Đầu",
    visual: {
      name: "Hệ Thống Tự Động",
      role: "Cá nhân hoá quy mô lớn",
      score: "3x phản hồi",
      status: "Đang gửi",
    },
  },
  {
    id: "qualification",
    icon: CheckCircle,
    label: "Đánh Giá Lead",
    title: "AI Đánh Giá Chất Lượng",
    description:
      "Chấm điểm và đánh giá lead tức thì dựa trên tín hiệu ý định mua, lịch sử tương tác và tiêu chí phù hợp. Tập trung đội ngũ vào deal thực sự chốt được.",
    cta: "Bắt Đầu",
    visual: {
      name: "Chấm Điểm Thông Minh",
      role: "Xếp hạng theo ý định",
      score: "Chính xác 95%",
      status: "Đã đánh giá",
    },
  },
  {
    id: "meeting",
    icon: Calendar,
    label: "Đặt Lịch Họp",
    title: "AI Đặt Lịch Tự Động",
    description:
      "Xử lý đặt lịch, dời lịch và xác nhận tự động. Không còn qua lại — agent đặt cuộc họp thẳng vào lịch của bạn, không cần thao tác thủ công.",
    cta: "Bắt Đầu",
    visual: {
      name: "Đồng Bộ Lịch",
      role: "Đặt lịch không ma sát",
      score: "85% tham gia",
      status: "Đã đặt",
    },
  },
  {
    id: "insights",
    icon: BarChart3,
    label: "CRM & Báo Cáo",
    title: "AI Quản Lý CRM & Insights",
    description:
      "Giữ CRM sạch sẽ, cập nhật ghi chú sau mỗi tương tác, và phân tích thời gian phản hồi, tốc độ deal, xu hướng chuyển đổi — hoàn toàn tự động.",
    cta: "Bắt Đầu",
    visual: {
      name: "Phân Tích Pipeline",
      role: "Insights thời gian thực",
      score: "Toàn diện 360°",
      status: "Đã đồng bộ",
    },
  },
];

export function AgentTabs() {
  const [active, setActive] = useState("research");
  const current = agents.find((a) => a.id === active)!;

  return (
    <section className="bg-[#f8fafc] px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[#155eef] mb-3 tracking-wide uppercase">
            AI Agents
          </p>
          <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-[#101828]">
            AI Agents vận hành toàn bộ quy trình
          </h2>
          <p className="mt-4 text-[#667085] max-w-2xl mx-auto text-lg">
            OPA xử lý mọi khâu — từ tìm kiếm khách hàng đến chốt deal — để bạn không bỏ lỡ bất kỳ cơ hội nào.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[280px_1fr] md:gap-8">
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            {agents.map((agent) => (
              <button
                key={agent.id}
                onClick={() => setActive(agent.id)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-left text-sm font-medium transition-all whitespace-nowrap ${
                  active === agent.id
                    ? "bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] text-[#101828] border border-gray-200"
                    : "text-[#667085] hover:text-[#101828] hover:bg-white/60"
                }`}
              >
                <agent.icon className={`h-4 w-4 shrink-0 ${active === agent.id ? "text-[#155eef]" : ""}`} />
                {agent.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] md:p-10"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#101828] mb-4 font-[family-name:var(--font-heading)]">
                    {current.title}
                  </h3>
                  <p className="text-[#667085] leading-relaxed mb-6">
                    {current.description}
                  </p>
                  <button className="inline-flex items-center gap-2 rounded-full bg-[#155eef] text-white px-6 py-3 text-sm font-semibold hover:bg-[#0b4fd1] transition-colors shadow-md shadow-[#155eef]/20">
                    {current.cta}
                    <span className="h-2 w-2 rounded-full bg-white/50" />
                  </button>
                </div>

                <div className="rounded-2xl bg-[#f8fafc] border border-gray-100 p-6">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#155eef]/5 border-2 border-[#155eef]/20">
                    <current.icon className="h-8 w-8 text-[#155eef]" />
                  </div>
                  <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
                    <p className="font-semibold text-[#101828] text-sm">{current.visual.name}</p>
                    <p className="text-xs text-[#667085] mb-3">{current.visual.role}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-[#155eef] bg-[#155eef]/5 rounded-full px-3 py-1">
                        {current.visual.score}
                      </span>
                      <span className="text-xs font-medium text-[#059669] bg-[#059669]/5 rounded-full px-3 py-1">
                        {current.visual.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
