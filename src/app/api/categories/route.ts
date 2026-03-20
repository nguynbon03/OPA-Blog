import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { Category } from "@/lib/models/Category";
import { requireAdmin } from "@/lib/auth";
import slugify from "slugify";

export async function GET() {
  await connectDB();
  const categories = await Category.find().sort({ order: 1 }).lean();
  return Response.json({ success: true, data: categories });
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return Response.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const body = await req.json();

  const category = await Category.create({
    ...body,
    slug: slugify(body.name, { lower: true, strict: true }),
  });

  return Response.json({ success: true, data: category }, { status: 201 });
}
