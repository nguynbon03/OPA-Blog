"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ChevronDown, BookOpen, FileText, Users, HelpCircle } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

type NavLink = { href: string; label: string };
type NavDropdown = {
  label: string;
  children: { href: string; label: string; icon: React.ComponentType<{ className?: string }>; desc: string }[];
};
type NavItem = NavLink | NavDropdown;

function isDropdown(item: NavItem): item is NavDropdown {
  return "children" in item;
}

const navLinks: NavItem[] = [
  { href: "/", label: "Trang Chủ" },
  { href: "/#services", label: "Dịch Vụ" },
  {
    label: "Tài Nguyên",
    children: [
      { href: "/blog", label: "Blog", icon: BookOpen, desc: "Bài viết và insights mới nhất" },
      { href: "/#faq", label: "Câu Hỏi", icon: HelpCircle, desc: "Giải đáp thắc mắc thường gặp" },
      { href: "#", label: "Case Study", icon: FileText, desc: "Kết quả thực tế từ khách hàng" },
      { href: "#", label: "Cộng Đồng", icon: Users, desc: "Tham gia mạng lưới OPA" },
    ],
  },
  { href: "/#contact", label: "Liên Hệ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] border-b border-gray-100"
          : "bg-white/60 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-xl font-bold font-[family-name:var(--font-heading)]">
          <span className="text-[#155eef]">OPA</span>
          <span className="text-[#101828] ml-1">Blog</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link, idx) =>
            isDropdown(link) ? (
              <div key={link.label} ref={dropdownRef} className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-[#475467] hover:text-[#101828] rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {link.label}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 rounded-xl bg-white border border-gray-200 shadow-xl shadow-black/[0.08] p-2"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href + child.label}
                          href={child.href}
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-start gap-3 rounded-lg px-3 py-3 hover:bg-gray-50 transition-colors group"
                        >
                          <div className="mt-0.5 p-1.5 rounded-md bg-[#eff6ff] group-hover:bg-[#155eef]/10 transition-colors">
                            <child.icon className="h-4 w-4 text-[#155eef]" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#101828]">{child.label}</p>
                            <p className="text-xs text-[#667085] mt-0.5">{child.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={(link as NavLink).href + idx}
                href={(link as NavLink).href}
                className="px-4 py-2 text-sm font-medium text-[#475467] hover:text-[#101828] rounded-lg hover:bg-gray-50 transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/admin/login">
            <button className="text-sm font-medium px-4 py-2 rounded-full text-[#475467] hover:text-[#101828] transition-colors">
              Đăng Nhập
            </button>
          </Link>
          <Link href="/blog">
            <button className="text-sm font-semibold px-5 py-2.5 rounded-full bg-[#155eef] text-white hover:bg-[#0b4fd1] shadow-sm shadow-[#155eef]/20 transition-all">
              Bắt Đầu
            </button>
          </Link>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger className="inline-flex items-center justify-center rounded-md p-2 text-[#101828]">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-white border-gray-200">
              <div className="flex flex-col gap-2 mt-8">
                {navLinks.map((link, idx) =>
                  isDropdown(link) ? (
                    <div key={link.label} className="space-y-1">
                      <p className="px-3 py-2 text-xs font-semibold text-[#98a2b3] uppercase tracking-wider">
                        {link.label}
                      </p>
                      {link.children.map((child) => (
                        <Link
                          key={child.href + child.label}
                          href={child.href}
                          className="flex items-center gap-2 px-3 py-2.5 text-sm text-[#475467] hover:text-[#101828] hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <child.icon className="h-4 w-4 text-[#155eef]" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      key={(link as NavLink).href + idx}
                      href={(link as NavLink).href}
                      className="px-3 py-2.5 text-base text-[#475467] hover:text-[#101828] hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      {link.label}
                    </Link>
                  )
                )}
                <Link href="/blog" className="mt-4">
                  <button className="w-full rounded-full bg-[#155eef] text-white py-3 font-semibold hover:bg-[#0b4fd1] transition-colors">
                    Bắt Đầu
                  </button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}
