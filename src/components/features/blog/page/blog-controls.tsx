"use client";

import { Button } from "@/components/ui/button";
import type { BlogViewType } from "@/types/blog";

interface BlogControlsProps {
  viewType: BlogViewType;
  onViewTypeChange: (type: BlogViewType) => void;
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSortChange: (sortBy: string, sortOrder: "asc" | "desc") => void;
}

/**
 * 블로그 목록 컨트롤 컴포넌트 (정렬, 뷰 타입 선택)
 */
export function BlogControls({
  viewType,
  onViewTypeChange,
  sortBy,
  sortOrder,
  onSortChange,
}: BlogControlsProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* 정렬 옵션 */}
      <div className="flex items-center gap-2">
        <select
          value={`${sortBy}-${sortOrder}`}
          onChange={(e) => {
            const [newSortBy, newSortOrder] = e.target.value.split("-") as [string, "asc" | "desc"];
            onSortChange(newSortBy, newSortOrder);
          }}
          className="rounded border border-gray-300 px-3 py-1 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        >
          <option value="published_at-desc">최신순</option>
          <option value="published_at-asc">오래된순</option>
          <option value="title-asc">제목순</option>
        </select>
      </div>

      {/* 뷰 토글 버튼 */}
      <div className="flex gap-2">
        <Button
          variant={viewType === "card" ? "default" : "outline"}
          size="sm"
          onClick={() => onViewTypeChange("card")}
          className="px-4"
        >
          카드형
        </Button>
        <Button
          variant={viewType === "list" ? "default" : "outline"}
          size="sm"
          onClick={() => onViewTypeChange("list")}
          className="px-4"
        >
          리스트형
        </Button>
      </div>
    </div>
  );
}
