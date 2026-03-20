"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";

interface CategoryFilterProps {
  categories: { name: string; slug: string; color: string }[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("category") || "";

  function select(slug: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug === active) {
      params.delete("category");
    } else {
      params.set("category", slug);
    }
    params.delete("page");
    router.push(`/blog?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Badge
        variant={!active ? "default" : "outline"}
        className="cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => {
          const params = new URLSearchParams(searchParams.toString());
          params.delete("category");
          params.delete("page");
          router.push(`/blog?${params.toString()}`);
        }}
      >
        All
      </Badge>
      {categories.map((cat) => (
        <Badge
          key={cat.slug}
          variant={active === cat.slug ? "default" : "outline"}
          className="cursor-pointer hover:opacity-80 transition-opacity"
          style={active === cat.slug ? { backgroundColor: cat.color } : {}}
          onClick={() => select(cat.slug)}
        >
          {cat.name}
        </Badge>
      ))}
    </div>
  );
}
