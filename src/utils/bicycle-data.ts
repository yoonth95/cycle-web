import bicycleDetails from "@/data/bicycle-details.json";
import bicyclesCategoryListData from "@/data/bicycles-category-list.json";
import sportsData from "@/data/category-pages/sports-category.json";
import lifestyleData from "@/data/category-pages/lifestyle-category.json";
import smartMobilityData from "@/data/category-pages/smart-mobility-category.json";
import juniorKidsData from "@/data/category-pages/junior-kids-category.json";
import type { BicycleDetail, CategoryListItem, SubcategoryInfo } from "@/types/bicycle";

// 카테고리별 데이터 매핑
const categoryDataMap = {
  sports: sportsData,
  lifestyle: lifestyleData,
  "smart-mobility": smartMobilityData,
  "junior-kids": juniorKidsData,
} as const;

// 자전거 ID로 자전거 정보 가져오기
export function getBicycleById(id: number): BicycleDetail | null {
  const bicycleData = bicycleDetails as Record<string, BicycleDetail>;
  return bicycleData[id.toString()] || null;
}

// 모든 카테고리 정보 가져오기 (동적)
export function getAllCategories(): CategoryListItem[] {
  return bicyclesCategoryListData as CategoryListItem[];
}

// 특정 카테고리 정보 가져오기 (동적)
export function getCategoryInfoSync(categorySlug: string): CategoryListItem | null {
  const categories = getAllCategories();
  return categories.find((cat) => cat.slug === categorySlug) || null;
}

// 카테고리의 서브카테고리들 가져오기 (동적)
export function getSubcategoriesSync(categorySlug: string): SubcategoryInfo[] {
  const categoryData = categoryDataMap[categorySlug as keyof typeof categoryDataMap];
  if (!categoryData) return [];

  return categoryData.subcategories || [];
}

// 모든 path 라벨 생성 (동적)
export function generatePathLabels(): Record<string, string> {
  const pathLabels: Record<string, string> = {
    bicycles: "자전거",
    style: "스타일",
  };

  // 카테고리 라벨 추가
  const categories = getAllCategories();
  categories.forEach((category) => {
    pathLabels[category.slug] = category.title;
  });

  // 서브카테고리 라벨 추가
  Object.values(categoryDataMap).forEach((categoryData) => {
    categoryData.subcategories.forEach((subcategory) => {
      pathLabels[subcategory.id] = subcategory.name;
    });
  });

  return pathLabels;
}
