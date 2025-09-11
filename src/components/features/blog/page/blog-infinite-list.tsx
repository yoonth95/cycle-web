"use client";

import { BlogCardGrid, BlogListView } from "@/components/features/blog/page";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { useBlogInfinite } from "@/lib/blog/client";
import type { BlogViewType, BlogItem } from "@/types/blog";

interface BlogInfiniteListProps {
  viewType: BlogViewType;
  pageSize: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

/**
 * 블로그 무한 스크롤 리스트 컨테이너
 */
export function BlogInfiniteList({ viewType, pageSize, sortBy, sortOrder }: BlogInfiniteListProps) {
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useBlogInfinite<BlogItem>({
      pageSize,
      sortBy,
      sortOrder,
    });

  // 무한 스크롤 설정
  const { sentinelRef } = useInfiniteScroll({
    onLoadMore: fetchNextPage,
    hasNextPage,
    isFetching: isFetchingNextPage,
    rootMargin: "100px",
    threshold: 0.1,
  });

  // 데이터 평탄화
  const blogs = data?.pages.flatMap((page) => page.items) || [];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <LoadingSpinner fullScreen={false} message="블로그 리뷰를 불러오는 중..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-red-500">
          블로그 리뷰를 불러오는데 실패했습니다.
          {error instanceof Error && ` (${error.message})`}
        </p>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-gray-500">등록된 블로그 리뷰가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 블로그 목록 */}
      {viewType === "card" ? <BlogCardGrid blogs={blogs} /> : <BlogListView blogs={blogs} />}

      {/* 무한 스크롤 트리거 */}
      <div
        ref={sentinelRef}
        className="flex justify-center py-8"
        style={{ minHeight: "1px" }} // 감지를 위한 최소 높이
      >
        {isFetchingNextPage && (
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
            <span className="text-sm text-gray-500">더 많은 블로그를 불러오는 중...</span>
          </div>
        )}
      </div>

      {/* 더 이상 불러올 데이터가 없을 때 */}
      {!hasNextPage && blogs.length > 0 && (
        <div className="flex items-center justify-center py-4">
          <p className="text-gray-500">모든 블로그 리뷰를 불러왔습니다.</p>
        </div>
      )}
    </div>
  );
}
