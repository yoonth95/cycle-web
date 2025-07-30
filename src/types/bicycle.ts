export interface Bicycle {
  id: number;
  name: string;
  // price: string;
  image: string;
  tags: string[];
  category: string;
  subcategory: string;
  specs: string[];
  features: string[];
  // rating: number;
  // reviews: number;
}

export interface CategoryData {
  title: string;
  description: string;
  subcategories: SubcategoryInfo[];
}

export interface SubcategoryInfo {
  id: string;
  name: string;
  description?: string;
  count?: number;
  isDefault?: boolean;
}

export interface BicycleData {
  [category: string]: {
    [subcategory: string]: Bicycle[];
  };
}

export interface CategoryConfig {
  [key: string]: CategoryData;
}

// 필터 관련 타입들 (확장성을 위해 보존)
export interface PriceRange {
  min: number;
  max: number;
  label: string;
}

export interface BicycleFilters {
  priceRanges: string[];
  // TODO: 향후 추가 가능한 필터들
  // brands?: string[];
  // colors?: string[];
  // ratings?: number;
  // availability?: boolean;
}

// 필터 상태 관련 타입
export interface FilterStats {
  total: number;
  filtered: number;
  hidden: number;
}
