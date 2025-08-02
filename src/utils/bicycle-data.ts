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

// 매핑 캐시 (성능 최적화)
let categoryNameToKeyCache: Record<string, string> | null = null;
let subcategoryNameToKeyCache: Record<string, string> | null = null;

// 동적으로 카테고리 이름을 URL 키로 매핑 (캐시 적용)
function getCategoryNameToKeyMap(): Record<string, string> {
  if (!categoryNameToKeyCache) {
    const config = getCategoryConfig();
    const mapping: Record<string, string> = {};

    Object.entries(config).forEach(([key, categoryData]) => {
      mapping[categoryData.title] = key;
    });

    categoryNameToKeyCache = mapping;
  }

  return categoryNameToKeyCache;
}

// 동적으로 서브카테고리 이름을 URL 키로 매핑 (캐시 적용)
function getSubcategoryNameToKeyMap(): Record<string, string> {
  if (!subcategoryNameToKeyCache) {
    const config = getCategoryConfig();
    const mapping: Record<string, string> = {};

    Object.values(config).forEach((categoryData) => {
      categoryData.subcategories.forEach((subcategory) => {
        if (subcategory.id !== "all") {
          mapping[subcategory.name] = subcategory.id;
        }
      });
    });

    subcategoryNameToKeyCache = mapping;
  }

  return subcategoryNameToKeyCache;
}

// 자전거 ID로 자전거 데이터 찾기
export function getBicycleById(id: number): Bicycle | null {
  const data = getBicycleData();

  for (const categoryKey in data) {
    for (const subcategoryKey in data[categoryKey]) {
      const bicycle = data[categoryKey][subcategoryKey].find((bike) => bike.id === id);
      if (bicycle) {
        return bicycle;
      }
    }
  }

  return null;
}

// 카테고리 이름을 URL 키로 변환 (동적으로 JSON에서 매핑)
export function getCategoryKey(categoryName: string): string {
  const categoryMap = getCategoryNameToKeyMap();
  return categoryMap[categoryName] || categoryName;
}

// 서브카테고리 이름을 URL 키로 변환 (동적으로 JSON에서 매핑)
export function getSubcategoryKey(subcategoryName: string): string {
  const subcategoryMap = getSubcategoryNameToKeyMap();
  return subcategoryMap[subcategoryName] || subcategoryName;
}

// 자전거 객체에서 URL path 생성
export function getBicycleUrlPath(bicycle: Bicycle): string {
  const categoryKey = getCategoryKey(bicycle.category);
  const subcategoryKey = getSubcategoryKey(bicycle.subcategory);
  return `${categoryKey}/${bicycle.id}`;
}

// 매핑 캐시 초기화 (새로운 데이터 추가 시 사용)
export function clearMappingCache(): void {
  categoryNameToKeyCache = null;
  subcategoryNameToKeyCache = null;
}

// 필터 관련 유틸 함수들 (확장성을 위해 보존, 현재 주석 처리)
/*
// 가격 문자열을 숫자로 변환하는 함수
export const parsePrice = (priceString: string): number => {
  return parseInt(priceString.replace(/[^0-9]/g, ""));
};

// 가격 범위 상수
export const PRICE_RANGES: PriceRange[] = [
  { min: 0, max: 500000, label: "50만원 미만" },
  { min: 500000, max: 1000000, label: "50-100만원" },
  { min: 1000000, max: 1500000, label: "100-150만원" },
  { min: 1500000, max: 2000000, label: "150-200만원" },
  { min: 2000000, max: Infinity, label: "200만원 이상" },
];

// 가격 범위에 따른 필터링
export const filterByPriceRange = (bicycle: Bicycle, selectedRanges: string[]): boolean => {
  if (selectedRanges.length === 0) return true;

  const price = parsePrice(bicycle.price);
  return selectedRanges.some((rangeLabel) => {
    const range = PRICE_RANGES.find((r) => r.label === rangeLabel);
    if (!range) return false;
    return price >= range.min && price < range.max;
  });
};

// 종합 필터링 함수
export const applyFilters = (bicycles: Bicycle[], filters: BicycleFilters): Bicycle[] => {
  return bicycles.filter((bicycle) => filterByPriceRange(bicycle, filters.priceRanges));
};

// 초기 필터 상태
export const getInitialFilters = (): BicycleFilters => ({
  priceRanges: [],
});

// 필터가 활성화되어 있는지 확인하는 헬퍼 함수
export const checkHasActiveFilters = (filters: BicycleFilters): boolean => {
  const { priceRanges } = filters;
  return priceRanges.length > 0;
};
*/
