import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.name?.trim() || !body.email?.trim() || !body.password) {
    return Response.json(
      { success: false, error: "Tên, email và mật khẩu là bắt buộc" },
      { status: 400 }
    );
  }

  if (body.password.length < 6) {
    return Response.json(
      { success: false, error: "Mật khẩu tối thiểu 6 ký tự" },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.email)) {
    return Response.json(
      { success: false, error: "Email không hợp lệ" },
      { status: 400 }
    );
  }

  await connectDB();

  const existing = await User.findOne({ email: body.email.toLowerCase() });
  if (existing) {
    return Response.json(
      { success: false, error: "Email đã được sử dụng" },
      { status: 409 }
    );
  }

  const hashed = await bcrypt.hash(body.password, 12);

  const user = await User.create({
    name: body.name.trim(),
    email: body.email.toLowerCase().trim(),
    password: hashed,
    role: "user",
  });

  return Response.json(
    { success: true, data: { id: user._id, name: user.name, email: user.email } },
    { status: 201 }
  );
}
