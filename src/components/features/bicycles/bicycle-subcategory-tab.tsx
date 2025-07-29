"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { BicycleTabsClient, BicycleCard } from ".";
import { Bicycle, SubcategoryInfo } from "@/types/bicycle";
import { TabsContent } from "@/components/ui/tabs";

interface BicycleSubcategoryTabProps {
  subcategories: SubcategoryInfo[];
  initialBicycles: Record<string, Bicycle[]>;
  filteredBicycles: Bicycle[];
  activeSubcategory: string;
  hasActiveFilters: boolean;
  filterStats: { total: number; filtered: number; hidden: number };
}

const BicycleSubcategoryTab = ({
  subcategories,
  initialBicycles,
  filteredBicycles,
  activeSubcategory,
  hasActiveFilters,
  filterStats,
}: BicycleSubcategoryTabProps) => {
  return (
    <BicycleTabsClient subcategories={subcategories}>
      {subcategories.map((sub) => {
        // 현재 서브카테고리가 활성화된 경우 필터된 결과 사용, 아니면 원본 데이터 사용
        const bicycles =
          sub.id === activeSubcategory ? filteredBicycles : initialBicycles[sub.id] || [];

        const isCurrentSubcategory = sub.id === activeSubcategory;

        return (
          <TabsContent key={sub.id} value={sub.id}>
            {/* 필터 결과 표시 (현재 활성 탭이고 필터가 적용된 경우) */}
            {isCurrentSubcategory && hasActiveFilters && (
              <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-blue-700">
                    <span className="font-medium">{filterStats.filtered}개</span>의 제품이 검색됨
                    {filterStats.hidden > 0 && (
                      <span className="ml-1 text-blue-600">
                        (전체 {filterStats.total}개 중 {filterStats.hidden}개 숨김)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

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
                  {isCurrentSubcategory && hasActiveFilters ? (
                    <div>
                      <p className="mb-2 text-gray-500">검색 조건에 맞는 제품이 없습니다.</p>
                      <p className="text-sm text-gray-400">다른 필터 조건을 시도해보세요.</p>
                    </div>
                  ) : (
                    <p className="text-gray-500">해당 카테고리에 제품이 없습니다.</p>
                  )}
                </div>
              </div>
            )}

            {/* Load More Button - 필터링된 결과가 있고 원본 데이터보다 적을 때만 표시 */}
            {bicycles.length > 0 && !hasActiveFilters && (
              <div className="mt-8 text-center">
                <Button variant="outline" className="px-8">
                  더 많은 제품 보기
                </Button>
              </div>
            )}

            {/* 필터링된 상태에서의 더보기 버튼 */}
            {bicycles.length > 0 && hasActiveFilters && bicycles.length >= 9 && (
              <div className="mt-8 text-center">
                <Button variant="outline" className="px-8">
                  필터된 결과에서 더 보기
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
