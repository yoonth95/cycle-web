"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  IntroTabContent,
  SpecsTabContent,
  SizeTabContent,
} from "@/components/features/bicycles/detail/tab-contents";
import { SpecificationItem } from "@/types/bicycle";
import { useMemo } from "react";

interface ProductTabsSectionProps {
  productImages?: string[];
  specifications: SpecificationItem[];
  sizeImages?: string[];
  productName: string;
}

const ProductTabsSection = ({
  productImages = [],
  specifications,
  sizeImages = [],
  productName,
}: ProductTabsSectionProps) => {
  // 사용 가능한 탭들을 동적으로 계산
  const availableTabs = useMemo(() => {
    const tabs = [];

    // 제품 소개 탭 (productImages가 있을 때만)
    if (productImages && productImages.length > 0) {
      tabs.push({ value: "intro", label: "제품 소개" });
    }

    // 제품 사양 탭 (항상 표시)
    tabs.push({ value: "specs", label: "제품 사양" });

    // 사이즈 탭 (sizeImages가 있을 때만)
    if (sizeImages && sizeImages.length > 0) {
      tabs.push({ value: "size", label: "사이즈" });
    }

    return tabs;
  }, [productImages, sizeImages]);

  // 첫 번째 사용 가능한 탭을 기본값으로 설정
  const defaultTab = availableTabs[0]?.value || "specs";

  return (
    <div className="rounded-lg bg-white shadow-sm">
      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList
          className={`grid w-full grid-cols-${availableTabs.length} rounded-t-lg bg-gray-100`}
        >
          {availableTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="data-[state=active]:bg-white">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* 제품 소개 탭 - 조건부 렌더링 */}
        {productImages && productImages.length > 0 && (
          <TabsContent value="intro" className="p-6">
            <IntroTabContent productImages={productImages} productName={productName} />
          </TabsContent>
        )}

        {/* 제품 사양 탭 - 항상 렌더링 */}
        <TabsContent value="specs" className="p-6">
          <SpecsTabContent specifications={specifications} />
        </TabsContent>

        {/* 사이즈 탭 - 조건부 렌더링 */}
        {sizeImages && sizeImages.length > 0 && (
          <TabsContent value="size" className="p-6">
            <SizeTabContent sizeImages={sizeImages} productName={productName} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default ProductTabsSection;
