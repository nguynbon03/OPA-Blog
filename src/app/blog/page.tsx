import { Suspense } from "react";
import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import { Post } from "@/lib/models/Post";
import { Category } from "@/lib/models/Category";
import { PostCard } from "@/components/blog/PostCard";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { SearchBar } from "@/components/blog/SearchBar";

export const metadata: Metadata = {
  title: "Blog",
  description: "Khám phá bài viết về AI, công nghệ và đổi mới sáng tạo.",
};

const POSTS_PER_PAGE = 9;

interface Props {
  searchParams: Promise<{ category?: string; q?: string; page?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams;
  await connectDB();

  const filter: Record<string, unknown> = { status: "published" };

  if (params.category) {
    const cat = await Category.findOne({ slug: params.category }).lean();
    if (cat) filter.category = cat._id;
  }

  if (params.q) {
    filter.$or = [
      { title: { $regex: params.q, $options: "i" } },
      { excerpt: { $regex: params.q, $options: "i" } },
    ];
  }

  const page = Math.max(1, parseInt(params.page || "1"));
  const skip = (page - 1) * POSTS_PER_PAGE;

  const [posts, total, categories] = await Promise.all([
    Post.find(filter)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(POSTS_PER_PAGE)
      .populate("category", "name slug color")
      .lean(),
    Post.countDocuments(filter),
    Category.find().sort({ order: 1 }).lean(),
  ]);

  const totalPages = Math.ceil(total / POSTS_PER_PAGE);

  return (
    <section className="pt-24 pb-16 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Hero banner */}
        <div className="mb-12 rounded-2xl bg-gradient-to-r from-[#155eef] to-[#2970ff] p-10 md:p-16 text-center">
          <h1 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-white mb-3">
            Insights & Chiến Lược Cho Kỷ Nguyên AI
          </h1>
          <p className="text-white/80 max-w-xl mx-auto mb-6">
            Khám phá bài viết chuyên sâu, hướng dẫn thực chiến và xu hướng mới nhất về AI, Marketing và Công nghệ.
          </p>
          <div className="max-w-md mx-auto">
            <Suspense fallback={null}>
              <SearchBar />
            </Suspense>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-4 mb-10 items-center justify-between">
          <Suspense fallback={null}>
            <CategoryFilter
              categories={categories.map((c) => ({
                name: c.name,
                slug: c.slug,
                color: c.color,
              }))}
            />
          </Suspense>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 rounded-2xl border border-gray-200 bg-white">
            <p className="text-[#667085]">Chưa có bài viết nào.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const cat = post.category as { name: string; slug: string; color: string } | null;
              return (
                <PostCard
                  key={String(post._id)}
                  title={post.title}
                  slug={post.slug}
                  excerpt={post.excerpt || ""}
                  coverImage={post.coverImage || ""}
                  category={cat ? { name: cat.name, slug: cat.slug, color: cat.color } : undefined}
                  publishedAt={post.publishedAt?.toISOString() || new Date().toISOString()}
                  readingTime={post.readingTime || 1}
                />
              );
            })}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <a
                key={p}
                href={`/blog?${new URLSearchParams({
                  ...(params.category ? { category: params.category } : {}),
                  ...(params.q ? { q: params.q } : {}),
                  page: String(p),
                }).toString()}`}
                className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm transition-colors ${
                  p === page
                    ? "bg-[#155eef] text-white"
                    : "bg-white border border-gray-200 text-muted-foreground hover:text-foreground"
                }`}
              >
                {p}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
