"use client";

import { useState } from "react";
import { BlogControls } from "./blog-controls";
import { BlogInfiniteList } from "./blog-infinite-list";
import type { BlogViewType } from "@/types/blog";

interface BlogViewToggleProps {
  defaultViewType?: BlogViewType;
  defaultPageSize?: number;
  defaultSortBy?: string;
  defaultSortOrder?: "asc" | "desc";
}

/**
 * 블로그 뷰 토글 메인 컨테이너
 * 뷰 타입과 정렬 상태를 관리하고 하위 컴포넌트에 전달
 */
export function BlogViewToggle({
  defaultViewType = "card",
  defaultPageSize = 12,
  defaultSortBy = "published_at",
  defaultSortOrder = "desc",
}: BlogViewToggleProps) {
  const [viewType, setViewType] = useState<BlogViewType>(defaultViewType);
  const [sortBy, setSortBy] = useState(defaultSortBy);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(defaultSortOrder);

  const handleSortChange = (newSortBy: string, newSortOrder: "asc" | "desc") => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  return (
    <div className="space-y-6">
      {/* 상단 컨트롤 */}
      <BlogControls
        viewType={viewType}
        onViewTypeChange={setViewType}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
      />

      {/* 무한 스크롤 블로그 리스트 */}
      <BlogInfiniteList
        viewType={viewType}
        pageSize={defaultPageSize}
        sortBy={sortBy}
        sortOrder={sortOrder}
      />
    </div>
  );
}
