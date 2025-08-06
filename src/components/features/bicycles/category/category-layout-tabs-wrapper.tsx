"use client";

import { useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import CategoryLayoutBicycleList from "./category-layout-bicycle-list";
import type {
  CategoryContentSection,
  SubcategoryInfo,
  BicyclesBySubcategory,
} from "@/types/bicycle";

interface CategoryLayoutTabsWrapperProps {
  tabSection: CategoryContentSection;
  listSection: CategoryContentSection;
  subcategories?: SubcategoryInfo[];
  bicycles?: BicyclesBySubcategory;
  categorySlug?: string;
}

const CategoryLayoutTabsWrapper = ({
  tabSection,
  listSection,
  subcategories = [],
  bicycles = {},
  categorySlug,
}: CategoryLayoutTabsWrapperProps) => {
  const searchParams = useSearchParams();

  // 기본 탭 결정: isDefault 우선, 없으면 "all", 그 다음 첫 번째 값, 최종적으로 "all"
  const defaultTab =
    subcategories.find((sub) => sub.id === "all")?.id ?? subcategories[0]?.id ?? "all";

  // URL 쿼리스트링에서 현재 탭 가져오기, 기본값은 defaultTab
  const currentTab = searchParams.get("tab") || defaultTab;

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("tab", value);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  if (subcategories.length === 0) {
    return null;
  }

  return (
    <>
      <div className={tabSection.className}>
        <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full gap-6">
          <TabsList className="flex h-auto flex-wrap justify-center gap-2 rounded-lg border border-gray-200 bg-white sm:justify-start">
            {subcategories.map((subcategory) => (
              <TabsTrigger
                key={subcategory.id}
                value={subcategory.id}
                className="data-[state=active]:bg-figma-cinderella data-[state=active]:text-figma-thunderbird min-w-[130px] cursor-pointer px-4 py-1.5 text-center text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50"
              >
                {subcategory.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className={listSection.className}>
            {subcategories.map((sub) => {
              const currentBicycles =
                sub.id === "all" ? bicycles.all || [] : bicycles[sub.id] || [];

              return (
                <TabsContent key={sub.id} value={sub.id}>
                  {currentBicycles.length > 0 ? (
                    <CategoryLayoutBicycleList
                      section={listSection}
                      bicycles={currentBicycles}
                      categorySlug={categorySlug}
                    />
                  ) : (
                    <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-gray-200 bg-gray-50">
                      <div className="text-center">
                        <p className="text-gray-500">해당 카테고리에 제품이 없습니다.</p>
                      </div>
                    </div>
                  )}

                  {currentBicycles.length > 0 && (
                    <div className="mt-8 text-center">
                      <Button variant="outline" className="px-8">
                        더 많은 제품 보기
                      </Button>
                    </div>
                  )}
                </TabsContent>
              );
            })}
          </div>
        </Tabs>
      </div>
    </>
  );
};

export default CategoryLayoutTabsWrapper;
