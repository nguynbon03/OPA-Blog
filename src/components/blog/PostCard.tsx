"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fadeUp } from "@/lib/motion";

interface PostCardProps {
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  category?: { name: string; color: string; slug: string };
  publishedAt: string;
  readingTime: number;
}

export function PostCard({
  title,
  slug,
  excerpt,
  coverImage,
  category,
  publishedAt,
  readingTime,
}: PostCardProps) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/blog/${slug}`} className="block group">
        <div className="card-elevated rounded-2xl overflow-hidden hover:border-[#155eef]/30 transition-colors">
          {coverImage && (
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={coverImage}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {category && (
                <Badge
                  className="absolute top-3 left-3 text-xs"
                  style={{ backgroundColor: category.color }}
                >
                  {category.name}
                </Badge>
              )}
            </div>
          )}
          <div className="p-6">
            <h3 className="text-lg font-semibold leading-snug group-hover:text-[#155eef] transition-colors line-clamp-2">
              {title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
              {excerpt}
            </p>
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {readingTime} min read
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
