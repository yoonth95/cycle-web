import { notFound } from "next/navigation";
import { CategoryLayoutRenderer } from "@/components/features/bicycles/category";
import { getBicycleCategoriesOptions, getBicycleCategoryLayout } from "@/lib/bicycle/server";
import type { CategoryPageData } from "@/types/bicycle";

export const revalidate = 300;

export default async function StyleCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  // 먼저 레이아웃과 카테고리 정보를 가져옴
  const [layoutData, { categories, currentCategory }] = await Promise.all([
    getBicycleCategoryLayout(),
    getBicycleCategoriesOptions(category),
  ]);

  // 현재 카테고리 정보가 없으면 404
  if (!layoutData || !currentCategory) notFound();

  // CategoryPageData 구성
  const categoryPageData: CategoryPageData = {
    categoryList: categories,
    category: currentCategory,
    subcategories: currentCategory.subcategories,
  };

  return (
    <>
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <CategoryLayoutRenderer layoutData={layoutData} categoryPageData={categoryPageData} />
        </div>
      </div>
    </>
  );
}
