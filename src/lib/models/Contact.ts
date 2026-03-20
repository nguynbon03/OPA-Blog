import mongoose, { Schema, type Document } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  status: "new" | "read" | "replied";
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "read", "replied"],
      default: "new",
    },
  },
  { timestamps: true }
);

export const Contact =
  mongoose.models.Contact ||
  mongoose.model<IContact>("Contact", ContactSchema);
