import mongoose, { Schema, type Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  description: string;
  color: string;
  order: number;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    color: { type: String, default: "#155eef" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Category =
  mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);
