import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import bicycleStylesData from "@/data/bicycle-styles.json";
import bicycleBrandsData from "@/data/bicycle-brands.json";

interface BicycleSidebarProps {
  pageType: "style" | "brand";
  currentCategory: string;
}

const BicycleSidebar = ({ pageType, currentCategory }: BicycleSidebarProps) => {
  // 페이지 타입에 따라 적절한 카테고리 데이터 가져오기
  const categories =
    pageType === "style" ? bicycleStylesData.styleCategories : bicycleBrandsData.brandCategories;

  return (
    <div className="flex flex-col gap-4">
      {/* 카테고리 목록 */}
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <h3 className="mb-4 font-bold text-gray-900">
          {pageType === "style" ? "스타일별 카테고리" : "브랜드별 카테고리"}
        </h3>
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

      {/* 필터 옵션 */}
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-100 p-4">
          <h3 className="font-bold text-gray-900">필터</h3>
        </div>
        <div className="flex flex-col gap-4 p-4">
          {/* 가격대 */}
          <div>
            <h4 className="mb-2 text-sm font-medium text-gray-700">가격대</h4>
            <div className="space-y-2">
              {["50만원 미만", "50-100만원", "100-150만원", "150-200만원", "200만원 이상"].map(
                (price, index) => (
                  <label key={index} className="flex items-center text-sm">
                    <input type="checkbox" className="mr-2 rounded" />
                    {price}
                  </label>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BicycleSidebar;
