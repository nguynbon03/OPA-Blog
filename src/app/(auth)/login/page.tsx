"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Email hoặc mật khẩu không đúng");
    } else {
      router.push("/admin");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#f8fafc]">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg shadow-black/[0.04]">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">
              <span className="text-gradient">Admin</span> Login
            </h1>
            <p className="text-sm text-[#667085] mt-2">
              Đăng nhập để quản lý blog
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
              <label htmlFor="email" className="text-sm font-medium text-[#344054] mb-1.5 block">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@opa.vn"
                required
                className="border-gray-300 bg-white focus:border-[#155eef] focus:ring-1 focus:ring-[#155eef]/20"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-[#344054] mb-1.5 block">
                Mật khẩu
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                required
                className="border-gray-300 bg-white focus:border-[#155eef] focus:ring-1 focus:ring-[#155eef]/20"
              />
            </div>

            <Button type="submit" className="w-full gap-2 bg-[#155eef] hover:bg-[#0b4fd1]" disabled={loading}>
              <LogIn className="h-4 w-4" />
              {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
            </Button>
          </form>

          <p className="text-center text-sm text-[#667085] mt-6">
            Chưa có tài khoản?{" "}
            <Link href="/register" className="text-[#155eef] font-medium hover:underline">
              Đăng Ký
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
