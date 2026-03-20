import Link from "next/link";
import { connectDB } from "@/lib/db";
import { Post } from "@/lib/models/Post";
import { Plus, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function AdminPostsPage() {
  await connectDB();

  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .populate("category", "name color")
    .select("title slug status category createdAt views readingTime")
    .lean();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">
          Posts
        </h1>
        <Link href="/admin/posts/editor">
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            New Post
          </Button>
        </Link>
      </div>

      <div className="card-elevated rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="p-4 font-medium">Title</th>
              <th className="p-4 font-medium hidden md:table-cell">Category</th>
              <th className="p-4 font-medium hidden sm:table-cell">Status</th>
              <th className="p-4 font-medium hidden lg:table-cell">Views</th>
              <th className="p-4 font-medium hidden lg:table-cell">Date</th>
              <th className="p-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => {
              const cat = post.category as { name: string; color: string } | null;
              return (
                <tr
                  key={String(post._id)}
                  className="border-b border-border last:border-0 hover:bg-white/5 transition-colors"
                >
                  <td className="p-4 font-medium max-w-[200px] truncate">
                    {post.title}
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    {cat && (
                      <Badge
                        variant="outline"
                        className="text-xs"
                        style={{ borderColor: cat.color, color: cat.color }}
                      >
                        {cat.name}
                      </Badge>
                    )}
                  </td>
                  <td className="p-4 hidden sm:table-cell">
                    <Badge
                      variant={post.status === "published" ? "default" : "outline"}
                      className="text-xs"
                    >
                      {post.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-muted-foreground hidden lg:table-cell">
                    {post.views}
                  </td>
                  <td className="p-4 text-muted-foreground hidden lg:table-cell">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <Link href={`/admin/posts/editor?id=${post._id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit2 className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {posts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No posts yet. Create your first one.
          </div>
        )}
      </div>
    </div>
  );
}
