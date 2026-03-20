import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { Contact } from "@/lib/models/Contact";

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.name || !body.email || !body.message) {
    return Response.json(
      { success: false, error: "name, email, and message are required" },
      { status: 400 }
    );
  }

  if (body.message.length > 5000) {
    return Response.json(
      { success: false, error: "Message too long (max 5000 chars)" },
      { status: 400 }
    );
  }

  await connectDB();

  const contact = await Contact.create({
    name: body.name,
    email: body.email,
    message: body.message,
  });

  return Response.json({ success: true, data: { id: contact._id } }, { status: 201 });
}
