import { notFound } from "next/navigation";
import { CategoryLayoutRenderer } from "@/components/features/bicycles/category";
import bicyclesCategoryLayoutData from "@/data/bicycles-category-layout.json";
import sportsData from "@/data/category-pages/sports-category.json";
import lifestyleData from "@/data/category-pages/lifestyle-category.json";
import smartMobilityData from "@/data/category-pages/smart-mobility-category.json";
import juniorKidsData from "@/data/category-pages/junior-kids-category.json";
import bicyclesCategoryListData from "@/data/bicycles-category-list.json";
import type { CategoryLayoutData, CategoryPageData, CategoryListItem } from "@/types/bicycle";

// 카테고리별 데이터 매핑
const categoryDataMap: Record<string, CategoryPageData> = {
  sports: sportsData,
  lifestyle: lifestyleData,
  "smart-mobility": smartMobilityData,
  "junior-kids": juniorKidsData,
};

export default async function StyleCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  // 카테고리 데이터 가져오기
  const categoryPageData = categoryDataMap[category];

  if (!categoryPageData) notFound();

  const layoutData = bicyclesCategoryLayoutData as CategoryLayoutData;
  const categoryList = bicyclesCategoryListData as CategoryListItem[];

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-8 lg:max-w-[80rem]">
        <CategoryLayoutRenderer
          layoutData={layoutData}
          categoryPageData={categoryPageData}
          categoryList={categoryList}
        />
      </div>
    </div>
  );
}
