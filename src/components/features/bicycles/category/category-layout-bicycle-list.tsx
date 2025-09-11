"use client";

import { useMemo } from "react";
import { useBicyclesInfinite } from "@/lib/bicycle/client";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import {
  CategoryLayoutBicycleCard,
  CategoryLayoutBicycleSkeleton,
} from "@/components/features/bicycles/category";
import type {
  BicycleCategoryContentSectionBase,
  BicycleCategoryItemType,
  BicycleFromDB,
} from "@/types/bicycle";

interface CategoryLayoutBicycleListProps {
  section: BicycleCategoryContentSectionBase;
  currentCategory: BicycleCategoryItemType;
  currentTab: string;
}

const CategoryLayoutBicycleList = ({
  section,
  currentCategory,
  currentTab,
}: CategoryLayoutBicycleListProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } =
    useBicyclesInfinite<BicycleFromDB>(currentCategory.id, currentTab);

  // 무한 스크롤 설정
  const { sentinelRef } = useInfiniteScroll({
    onLoadMore: fetchNextPage,
    hasNextPage,
    isFetching: isFetchingNextPage,
    rootMargin: "100px",
    threshold: 0.1,
  });

  // 데이터 플래튼 최적화
  const bicycles = useMemo(() => data?.pages.flatMap((p) => p.items) ?? [], [data?.pages]);

  // 에러 상태 처리
  if (error) {
    return (
      <div className={section.className}>
        <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center">
          <p className="text-red-600">데이터를 불러오는 중 오류가 발생했습니다.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-sm text-red-500 underline hover:text-red-700"
          >
            새로고침
          </button>
        </div>
      </div>
    );
  }

  // 로딩 상태 - 스켈레톤 개수 최적화
  if (isLoading) {
    return (
      <div className={section.className}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {Array.from({ length: 6 }, (_, i) => (
            <CategoryLayoutBicycleSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  // 빈 상태
  if (bicycles.length === 0) {
    return (
      <div className={section.className}>
        <div className="rounded-lg border bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <svg
              className="h-6 w-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
              />
            </svg>
          </div>
          <p className="text-gray-500">해당 카테고리에 자전거가 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={section.className}>
      {/* 그리드 레이아웃 개선 - 반응형 최적화 */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {bicycles.map((bicycle) => (
          <CategoryLayoutBicycleCard
            key={bicycle.id}
            bicycle={bicycle}
            categorySlug={currentCategory.slug}
          />
        ))}
      </div>

      {/* 무한 스크롤 트리거 */}
      <div
        ref={sentinelRef}
        className="flex justify-center py-8"
        style={{ minHeight: "1px" }} // 감지를 위한 최소 높이
      >
        {isFetchingNextPage && (
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
            <span className="text-sm text-gray-500">더 많은 자전거를 불러오는 중...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryLayoutBicycleList;
