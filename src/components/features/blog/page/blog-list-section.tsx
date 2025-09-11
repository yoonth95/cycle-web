"use client";

import { BlogViewToggle } from "@/components/features/blog/page";
import type { BlogListSection as BlogListSectionType } from "@/types/blog";

interface BlogListSectionProps {
  className: string;
  defaultValues: BlogListSectionType["defaultValues"];
}

export function BlogListSection({ className, defaultValues }: BlogListSectionProps) {
  return (
    <div className={className}>
      <BlogViewToggle
        defaultViewType={defaultValues.viewType}
        defaultPageSize={defaultValues.pageSize}
        defaultSortBy={defaultValues.sortBy}
        defaultSortOrder={defaultValues.sortOrder as "asc" | "desc"}
      />
    </div>
  );
}
