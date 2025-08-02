import { notFound } from "next/navigation";
import { BicycleCategoryContent } from "@/components/features/bicycles/category";
import {
  getCategoryInfo,
  getAllSubcategoriesWithCounts,
  getBicyclesByCategory,
} from "@/utils/bicycle-data";

export default async function StyleCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryData = getCategoryInfo(category);

  if (!categoryData) notFound();

  // 모든 서브카테고리 정보와 개수 가져오기
  const subcategories = getAllSubcategoriesWithCounts(category);

  // 각 서브카테고리별 자전거 데이터 미리 로드
  const initialBicycles: Record<string, any[]> = {};
  subcategories.forEach((sub) => {
    initialBicycles[sub.id] = getBicyclesByCategory(category, sub.id);
  });

  return (
    <BicycleCategoryContent
      category={category}
      categoryData={categoryData}
      subcategories={subcategories}
      initialBicycles={initialBicycles}
      pageType="style"
    />
  );
}
