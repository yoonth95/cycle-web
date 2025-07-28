export interface Bicycle {
  id: number;
  name: string;
  price: string;
  image: string;
  tags: string[];
  category: string;
  subcategory: string;
  specs: string[];
  features: string[];
  rating: number;
  reviews: number;
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
