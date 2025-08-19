"use client";

import { useRef, useEffect } from "react";
import { useBicyclesInfinite } from "@/lib/bicycle/client";
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
}

const CategoryLayoutBicycleList = ({
  section,
  currentCategory,
}: CategoryLayoutBicycleListProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useBicyclesInfinite<BicycleFromDB>(currentCategory.id);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const el = sentinelRef.current;

    const io = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    io.observe(el);
    return () => io.unobserve(el);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const bicycles = data?.pages.flatMap((p) => p.items) ?? [];

  if (isLoading) {
    return (
      <div className={section.className}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <CategoryLayoutBicycleSkeleton />
          <CategoryLayoutBicycleSkeleton />
          <CategoryLayoutBicycleSkeleton />
          <CategoryLayoutBicycleSkeleton />
        </div>
      </div>
    );
  }

  if (bicycles.length === 0) {
    return (
      <div className={section.className}>
        <div className="rounded-lg border bg-white p-8 text-center shadow-sm">
          <p className="text-gray-500">해당 카테고리에 자전거가 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={section.className}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {bicycles.map((bicycle) => (
          <CategoryLayoutBicycleCard
            key={bicycle.id}
            bicycle={bicycle}
            categorySlug={currentCategory.slug}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryLayoutBicycleList;
