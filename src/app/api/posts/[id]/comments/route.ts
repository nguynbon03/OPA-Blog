import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { Comment } from "@/lib/models/Comment";
import { auth } from "@/lib/auth";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, ctx: RouteContext) {
  const { id } = await ctx.params;
  await connectDB();

  const comments = await Comment.find({ post: id })
    .sort({ createdAt: -1 })
    .populate("user", "name avatar role")
    .lean();

  return Response.json({ success: true, data: comments });
}

export async function POST(req: NextRequest, ctx: RouteContext) {
  const session = await auth();
  if (!session?.user) {
    return Response.json(
      { success: false, error: "Đăng nhập để bình luận" },
      { status: 401 }
    );
  }

  const { id } = await ctx.params;
  const body = await req.json();

  if (!body.content?.trim()) {
    return Response.json(
      { success: false, error: "Nội dung không được để trống" },
      { status: 400 }
    );
  }

  if (body.content.length > 2000) {
    return Response.json(
      { success: false, error: "Bình luận tối đa 2000 ký tự" },
      { status: 400 }
    );
  }

  await connectDB();

  const comment = await Comment.create({
    post: id,
    user: (session.user as { id: string }).id,
    content: body.content.trim(),
  });

  const populated = await Comment.findById(comment._id)
    .populate("user", "name avatar role")
    .lean();

  return Response.json({ success: true, data: populated }, { status: 201 });
}
