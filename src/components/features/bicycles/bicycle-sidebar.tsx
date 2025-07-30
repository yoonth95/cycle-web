"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import bicycleStylesData from "@/data/bicycle-styles.json";

interface BicycleSidebarProps {
  pageType: "style";
  currentCategory: string;
  // 필터 관련 props (향후 확장용)
  // filters?: BicycleFilters;
  // hasActiveFilters?: boolean;
  // onPriceRangeChange?: (priceRanges: string[]) => void;
  // onResetFilters?: () => void;
}

const BicycleSidebar = ({ pageType, currentCategory }: BicycleSidebarProps) => {
  // 페이지 타입에 따라 적절한 카테고리 데이터 가져오기
  const categories = bicycleStylesData.styleCategories;

  return (
    <div className="flex flex-col gap-4">
      {/* 카테고리 목록 */}
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <h3 className="mb-4 font-bold text-gray-900">스타일별 카테고리</h3>
        <div className="space-y-2">
          {categories.map((category) => {
            const isActive = category.slug === currentCategory;
            const href = `/bicycles/${pageType}/${category.slug}`;

            return (
              <div key={category.id}>
                {isActive ? (
                  // 현재 활성화된 카테고리
                  <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-3 shadow-sm">
                    <div className="flex-1">
                      <span className="font-medium text-red-700">{category.title}</span>
                    </div>
                  </div>
                ) : (
                  // 다른 카테고리 (링크)
                  <Link href={href} className="block">
                    <Button
                      variant="ghost"
                      className="h-auto w-full justify-start p-3 transition-colors hover:bg-gray-50 hover:text-red-600"
                    >
                      <div className="flex w-full items-center justify-between">
                        <div className="text-left">
                          <div className="font-medium text-gray-900">{category.title}</div>
                        </div>
                      </div>
                    </Button>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 필터 옵션 (향후 활성화용 - 주석 해제하면 사용 가능) */}
      {/*
      {filters && (
        <div className="rounded-lg border border-gray-200 bg-white">
          <div className="flex h-18 items-center justify-between border-b border-gray-100 p-4">
            <h3 className="font-bold text-gray-900">필터</h3>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onResetFilters}
                className="bg-figma-cinderella text-figma-thunderbird hover:bg-figma-cinderella/80 hover:text-figma-thunderbird"
              >
                초기화
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-6 p-4">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-700">가격대</h4>
                {filters.priceRanges.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {filters.priceRanges.length}
                  </Badge>
                )}
              </div>
              <div className="space-y-3">
                {PRICE_RANGES.map((range) => (
                  <label key={range.label} className="flex cursor-pointer items-center text-sm">
                    <input
                      type="checkbox"
                      checked={filters.priceRanges.includes(range.label)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          onPriceRangeChange?.([...filters.priceRanges, range.label]);
                        } else {
                          onPriceRangeChange?.(filters.priceRanges.filter((r) => r !== range.label));
                        }
                      }}
                      className="mr-3 h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-gray-700">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      */}
    </div>
  );
};

export default BicycleSidebar;
