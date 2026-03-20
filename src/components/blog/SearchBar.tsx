"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const updateSearch = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("q", value);
      } else {
        params.delete("q");
      }
      params.delete("page");
      router.push(`/blog?${params.toString()}`);
    },
    [router, searchParams]
  );

  useEffect(() => {
    const timer = setTimeout(() => updateSearch(query), 300);
    return () => clearTimeout(timer);
  }, [query, updateSearch]);

  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <input
        type="text"
        placeholder="Tìm kiếm bài viết..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-full bg-white/90 backdrop-blur-sm border-0 pl-11 pr-4 py-3 text-sm text-[#101828] placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-white/50"
      />
    </div>
  );
}
