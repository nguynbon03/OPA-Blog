"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { UserPlus, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.error);
        setLoading(false);
        return;
      }

      const signInRes = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (signInRes?.error) {
        router.push("/login");
      } else {
        router.push("/");
      }
    } catch {
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#f8fafc]">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg shadow-black/[0.04]">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">
              Tạo Tài Khoản <span className="text-gradient">OPA</span>
            </h1>
            <p className="text-sm text-[#667085] mt-2">
              Đăng ký để bình luận và tham gia cộng đồng
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-[#344054] mb-1.5 block">
                Họ và Tên
              </label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Nguyễn Văn A"
                required
                className="border-gray-300 bg-white focus:border-[#155eef]"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#344054] mb-1.5 block">
                Email
              </label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="email@example.com"
                required
                className="border-gray-300 bg-white focus:border-[#155eef]"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#344054] mb-1.5 block">
                Mật Khẩu
              </label>
              <Input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Tối thiểu 6 ký tự"
                required
                minLength={6}
                className="border-gray-300 bg-white focus:border-[#155eef]"
              />
            </div>

            <Button type="submit" className="w-full gap-2 bg-[#155eef] hover:bg-[#0b4fd1]" disabled={loading}>
              <UserPlus className="h-4 w-4" />
              {loading ? "Đang tạo..." : "Đăng Ký"}
            </Button>
          </form>

          <p className="text-center text-sm text-[#667085] mt-6">
            Đã có tài khoản?{" "}
            <Link href="/login" className="text-[#155eef] font-medium hover:underline">
              Đăng Nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
