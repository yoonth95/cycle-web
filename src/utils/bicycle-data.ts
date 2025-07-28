import { Bicycle, BicycleData, CategoryConfig } from "@/types/bicycle";
import bicycleProducts from "@/data/bicycle-products.json";
import bicycleCategories from "@/data/bicycle-categories.json";

export function getBicycleData(): BicycleData {
  return bicycleProducts as BicycleData;
}

export function getCategoryConfig(): CategoryConfig {
  return bicycleCategories as CategoryConfig;
}

export function getBicyclesByCategory(category: string, subcategory?: string): Bicycle[] {
  const data = getBicycleData();
  const categoryData = data[category];

  if (!categoryData) {
    return [];
  }

  if (!subcategory || subcategory === "all") {
    // 모든 서브카테고리의 자전거를 반환
    return Object.values(categoryData).flat();
  }

  return categoryData[subcategory] || [];
}

export function getCategoryInfo(category: string) {
  const config = getCategoryConfig();
  return config[category] || null;
}

export function getSubcategoryCount(category: string, subcategory: string): number {
  const bicycles = getBicyclesByCategory(category, subcategory);
  return bicycles.length;
}

export function getAllSubcategoriesWithCounts(category: string) {
  const config = getCategoryConfig();
  const categoryInfo = config[category];

  if (!categoryInfo) {
    return [];
  }

  return categoryInfo.subcategories.map((sub) => ({
    ...sub,
    count:
      sub.id === "all"
        ? getBicyclesByCategory(category, "all").length
        : getSubcategoryCount(category, sub.id),
  }));
}
