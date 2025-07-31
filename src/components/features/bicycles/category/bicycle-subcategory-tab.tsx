"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { BicycleTabsClient, BicycleCard } from "@/components/features/bicycles/category";
import { Bicycle, SubcategoryInfo } from "@/types/bicycle";
import { TabsContent } from "@/components/ui/tabs";

interface BicycleSubcategoryTabProps {
  subcategories: SubcategoryInfo[];
  initialBicycles: Record<string, Bicycle[]>;
  currentBicycles: Bicycle[];
  activeSubcategory: string;
  // 필터 관련 props (향후 확장용)
  // filteredBicycles?: Bicycle[];
  // hasActiveFilters?: boolean;
  // filterStats?: FilterStats;
}

const BicycleSubcategoryTab = ({
  subcategories,
  initialBicycles,
  currentBicycles,
  activeSubcategory,
  // 필터 관련 props (향후 확장용)
  // filteredBicycles,
  // hasActiveFilters = false,
  // filterStats,
}: BicycleSubcategoryTabProps) => {
  return (
    <BicycleTabsClient subcategories={subcategories}>
      {subcategories.map((sub) => {
        // 필터 적용 로직 (향후 확장용)
        const isCurrentSubcategory = sub.id === activeSubcategory;
        const bicycles = isCurrentSubcategory
          ? currentBicycles // 향후: filteredBicycles || currentBicycles
          : initialBicycles[sub.id] || [];

        return (
          <TabsContent key={sub.id} value={sub.id}>
            {/* 필터 결과 표시는 나중에 필터 활성화시 추가 예정 */}
            {/* Products Grid */}
            {bicycles.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {bicycles.map((bike) => (
                  <BicycleCard key={bike.id} bike={bike} />
                ))}
              </div>
            ) : (
              <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-gray-200 bg-gray-50">
                <div className="text-center">
                  {/* 필터 상태에 따른 메시지는 나중에 필터 활성화시 추가 예정 */}
                  <p className="text-gray-500">해당 카테고리에 제품이 없습니다.</p>
                </div>
              </div>
            )}

            {/* Load More Button */}
            {bicycles.length > 0 && (
              <div className="mt-8 text-center">
                <Button variant="outline" className="px-8">
                  {/* 필터 상태에 따른 버튼 텍스트는 나중에 필터 활성화시 추가 예정 */}더 많은 제품
                  보기
                </Button>
              </div>
            )}
          </TabsContent>
        );
      })}
    </BicycleTabsClient>
  );
};

export default BicycleSubcategoryTab;
