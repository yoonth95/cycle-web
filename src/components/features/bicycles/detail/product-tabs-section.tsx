"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SpecificationCategory } from "@/types/bicycle";
import { IntroTabContent, SpecsTabContent, SizeTabContent } from "./tab-contents";

interface ProductTabsSectionProps {
  productImages: string[];
  specifications: SpecificationCategory[];
  sizeImages: string[];
  productName: string;
}

// 탭 설정
const TAB_CONFIG = [
  { value: "intro", label: "제품 소개" },
  { value: "specs", label: "제품 사양" },
  { value: "size", label: "사이즈" },
] as const;

const ProductTabsSection = ({
  productImages,
  specifications,
  sizeImages,
  productName,
}: ProductTabsSectionProps) => {
  return (
    <div className="rounded-lg bg-white shadow-sm">
      <Tabs defaultValue="intro" className="w-full">
        <TabsList className="grid w-full grid-cols-3 rounded-t-lg bg-gray-100">
          {TAB_CONFIG.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="data-[state=active]:bg-white">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="intro" className="p-6">
          <IntroTabContent productImages={productImages} productName={productName} />
        </TabsContent>

        <TabsContent value="specs" className="p-6">
          <SpecsTabContent specifications={specifications} />
        </TabsContent>

        <TabsContent value="size" className="p-6">
          <SizeTabContent sizeImages={sizeImages} productName={productName} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductTabsSection;
