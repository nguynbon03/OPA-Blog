"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Send, MessageCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CommentData {
  _id: string;
  content: string;
  createdAt: string;
  user: { name: string; avatar: string; role: string };
}

export function Comments({ postId }: { postId: string }) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<CommentData[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetch(`/api/posts/${postId}/comments`)
      .then((r) => r.json())
      .then((d) => setComments(d.data || []))
      .finally(() => setFetching(false));
  }, [postId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim() || loading) return;

    setLoading(true);
    const res = await fetch(`/api/posts/${postId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: content.trim() }),
    });
    const data = await res.json();

    if (data.success) {
      setComments((prev) => [data.data, ...prev]);
      setContent("");
    }
    setLoading(false);
  }

  return (
    <div>
      <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] flex items-center gap-2 mb-6">
        <MessageCircle className="h-5 w-5 text-[#155eef]" />
        Bình Luận ({comments.length})
      </h3>

      {/* Comment form */}
      {session?.user ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-full bg-[#155eef] flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-white text-sm font-bold">
                {(session.user.name || "U").charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Chia sẻ suy nghĩ của bạn..."
                rows={3}
                maxLength={2000}
                className="border-gray-300 focus:border-[#155eef] mb-2"
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#98a2b3]">{content.length}/2000</span>
                <Button
                  type="submit"
                  size="sm"
                  className="gap-2 bg-[#155eef] hover:bg-[#0b4fd1]"
                  disabled={loading || !content.trim()}
                >
                  <Send className="h-3.5 w-3.5" />
                  {loading ? "..." : "Gửi"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-8 rounded-xl bg-[#f8fafc] border border-gray-200 p-5 text-center">
          <p className="text-sm text-[#667085] mb-3">Đăng nhập để tham gia bình luận</p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/login">
              <Button variant="outline" size="sm">Đăng Nhập</Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-[#155eef] hover:bg-[#0b4fd1]">Đăng Ký</Button>
            </Link>
          </div>
        </div>
      )}

      {/* Comments list */}
      {fetching ? (
        <div className="text-center py-8 text-[#98a2b3] text-sm">Đang tải bình luận...</div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 text-[#98a2b3] text-sm">
          Chưa có bình luận. Hãy là người đầu tiên!
        </div>
      ) : (
        <div className="space-y-5">
          {comments.map((c) => (
            <div key={c._id} className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-[#155eef]/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[#155eef] text-xs font-bold">
                  {c.user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-[#101828]">{c.user.name}</span>
                  {(c.user.role === "admin" || c.user.role === "editor") && (
                    <span className="inline-flex items-center gap-0.5 text-xs text-[#155eef] bg-[#155eef]/5 rounded-full px-2 py-0.5">
                      <Shield className="h-2.5 w-2.5" />
                      {c.user.role}
                    </span>
                  )}
                  <span className="text-xs text-[#98a2b3]">
                    {new Date(c.createdAt).toLocaleDateString("vi-VN")}
                  </span>
                </div>
                <p className="text-sm text-[#475467] leading-relaxed whitespace-pre-wrap">
                  {c.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
