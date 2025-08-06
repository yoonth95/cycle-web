export interface SubcategoryInfo {
  id: string;
  name: string;
  description: string;
}

// 자전거 상세 정보 타입 (bicycle-details.json용)
export interface BicycleDetail {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  mainImages: string[];
  mainSpecs: string[];
  fullSpecs: Record<string, string>;
  features: string[];
  description: string;
  productImages: string[];
  sizeImages: string[];
  availableSizes: string[];
  availableColors: string[];
}

// Bicycles 페이지 관련 타입들
export interface BicyclePageSection {
  id: number;
  section: string;
  order: number;
  title: string;
  description: string;
  image?: string;
  cardList?: BicycleCard[];
}

export interface BicycleCard {
  id: number;
  order: number;
  title: string;
  description: string;
  icon: string;
  link: string;
  image: string;
  items: BicycleCardItem[];
}

export interface BicycleCardItem {
  id: number;
  title: string;
  link: string;
  order: number;
}

export type BicyclePageData = BicyclePageSection[];

// 카테고리 페이지 레이아웃 관련 타입들
export interface CategoryLayoutData {
  layout: CategoryLayout;
}

export interface CategoryLayout {
  type: "sidebar-content";
  className: string;
  sidebar: CategorySidebar;
  content: CategoryContent;
}

export interface CategorySidebar {
  position: "left" | "right";
  className: string;
  mobileClassName?: string;
  section: string;
}

export interface CategoryContent {
  className: string;
  sections: CategoryContentSection[];
}

export interface CategoryContentSection {
  id: number;
  section: string;
  order: number;
  className: string;
  placeholder?: CategoryPlaceholder;
}

export interface CategoryPlaceholder {
  title: string;
  description: string;
}

// 카테고리 페이지 데이터 타입들
export interface CategoryPageData {
  category: CategoryInfo;
  subcategories: SubcategoryInfo[];
  bicycles: BicyclesBySubcategory;
}

// 카테고리 리스트 아이템 타입
export interface CategoryListItem {
  id: number;
  title: string;
  description: string;
  slug: string;
}

export interface CategoryInfo {
  id: string;
  title: string;
  description: string;
  slug: string;
}

export interface BicycleTag {
  label: string;
  color: string;
  variant: string;
}

export interface BicycleItem {
  id: number;
  name: string;
  image: string;
  tags: BicycleTag[];
  category: string;
  subcategory: string;
  specs: string[];
  features: string[];
}

export interface BicyclesBySubcategory {
  [subcategory: string]: BicycleItem[];
}

// Detail page specification types
export interface SpecificationCategory {
  category: string;
  items: SpecificationItem[];
}

export interface SpecificationItem {
  spec: string;
  value: string;
}
