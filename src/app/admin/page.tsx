import { connectDB } from "@/lib/db";
import { Post } from "@/lib/models/Post";
import { Contact } from "@/lib/models/Contact";
import { FileText, Eye, MessageSquare, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default async function AdminDashboard() {
  await connectDB();

  const [totalPosts, publishedPosts, totalViews, newMessages, recentPosts] =
    await Promise.all([
      Post.countDocuments(),
      Post.countDocuments({ status: "published" }),
      Post.aggregate([{ $group: { _id: null, total: { $sum: "$views" } } }]),
      Contact.countDocuments({ status: "new" }),
      Post.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("title slug status createdAt views")
        .lean(),
    ]);

  const stats = [
    { label: "Total Posts", value: totalPosts, icon: FileText, color: "#155eef" },
    { label: "Published", value: publishedPosts, icon: TrendingUp, color: "#22c55e" },
    { label: "Total Views", value: totalViews[0]?.total || 0, icon: Eye, color: "#a855f7" },
    { label: "New Messages", value: newMessages, icon: MessageSquare, color: "#f59e0b" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6">
        Dashboard
      </h1>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="card-elevated rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <div
                className="rounded-lg p-2"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <stat.icon className="h-4 w-4" style={{ color: stat.color }} />
              </div>
            </div>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Posts */}
      <div className="card-elevated rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Posts</h2>
          <Link
            href="/admin/posts"
            className="text-sm text-[#155eef] hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="space-y-3">
          {recentPosts.map((post) => (
            <div
              key={String(post._id)}
              className="flex items-center justify-between py-2 border-b border-border last:border-0"
            >
              <div>
                <Link
                  href={`/admin/posts/editor?id=${post._id}`}
                  className="text-sm font-medium hover:text-[#155eef] transition-colors"
                >
                  {post.title}
                </Link>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">
                  {post.views} views
                </span>
                <Badge
                  variant={post.status === "published" ? "default" : "outline"}
                  className="text-xs"
                >
                  {post.status}
                </Badge>
              </div>
            </div>
          ))}
          {recentPosts.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No posts yet. Create your first post.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
