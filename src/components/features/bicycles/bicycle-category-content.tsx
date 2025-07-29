"use client";

import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { BicycleSidebar, BicycleSubcategoryTab, MobileBicycleSidebar } from ".";
import { useBicycleFilterStore } from "@/stores/bicycle-filter-store";
import { Bicycle, SubcategoryInfo, CategoryData } from "@/types/bicycle";

interface BicycleCategoryContentProps {
  category: string;
  categoryData: CategoryData;
  subcategories: SubcategoryInfo[];
  initialBicycles: Record<string, Bicycle[]>;
  pageType: "style" | "brand";
}

export default function BicycleCategoryContent({
  category,
  categoryData,
  subcategories,
  initialBicycles,
  pageType,
}: BicycleCategoryContentProps) {
  const searchParams = useSearchParams();

  // URL에서 현재 활성 탭 가져오기
  const defaultSubcategory = useMemo(() => {
    return (
      subcategories.find((sub) => sub.isDefault)?.id ||
      subcategories.find((sub) => sub.id === "all")?.id ||
      subcategories[0]?.id ||
      "all"
    );
  }, [subcategories]);

  const activeSubcategory = searchParams.get("tab") || defaultSubcategory;

  // Zustand 스토어 사용
  const {
    filters,
    filteredBicycles,
    hasActiveFilters,
    filterStats,
    setInitialData,
    updateSubcategory,
    setPriceRanges,
    resetFilters,
  } = useBicycleFilterStore();

  // 컴포넌트 마운트 시 초기 데이터 설정
  useEffect(() => {
    setInitialData(initialBicycles);
  }, [initialBicycles, setInitialData]);

  // URL 탭 변경을 감지하여 스토어 업데이트
  useEffect(() => {
    updateSubcategory(activeSubcategory);
  }, [activeSubcategory, updateSubcategory]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Mobile Filter Button */}
        <div className="fixed right-6 bottom-6 z-50 lg:hidden">
          <MobileBicycleSidebar
            pageType={pageType}
            currentCategory={category}
            filters={filters}
            hasActiveFilters={hasActiveFilters}
            onPriceRangeChange={setPriceRanges}
            onResetFilters={resetFilters}
          />
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden w-80 flex-shrink-0 lg:block">
          <div className="sticky top-24">
            <BicycleSidebar
              pageType={pageType}
              currentCategory={category}
              filters={filters}
              hasActiveFilters={hasActiveFilters}
              onPriceRangeChange={setPriceRanges}
              onResetFilters={resetFilters}
            />
          </div>
        </div>

        {/* Main content */}
        <div className="w-full flex-1 lg:w-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="mb-2 text-2xl font-bold text-gray-900 lg:text-3xl">
              {categoryData.title}
            </h1>
            <p className="text-gray-600">{categoryData.description}</p>
          </div>

          {/* Tabs */}
          <BicycleSubcategoryTab
            subcategories={subcategories}
            initialBicycles={initialBicycles}
            filteredBicycles={filteredBicycles}
            activeSubcategory={activeSubcategory}
            hasActiveFilters={hasActiveFilters}
            filterStats={filterStats}
          />
        </div>
      </div>
    </div>
  );
}
