// SubcategoryInfo는 SubcategoryItemSchema로 대체됨

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

// 카테고리 리스트 아이템 타입
export interface CategoryListItem {
  id: number;
  title: string;
  description: string;
  slug: string;
}

// DB에서 가져오는 자전거 데이터 (Zod 스키마)
export const BicycleTagSchema = z.object({
  label: z.string(),
  color: z.string(),
  variant: z.enum(["default", "secondary", "destructive", "outline"]),
});

export const BicycleFromDBSchema = z.object({
  id: z.string(),
  name: z.string(),
  category_id: z.string(),
  description: z.string(),
  order_index: z.number(),
  specs: z.record(z.string()),
  contents: z.array(z.string()),
  tags: z.array(BicycleTagSchema),
  images: z.array(z.string()),
  subcategories: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export interface BicyclesBySubcategory {
  [subcategory: string]: BicycleFromDB[];
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

import { z } from "zod";

// 공통 스키마
export const BicycleCardItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  link: z.string(),
  order: z.number(),
});

export const BicycleCardSchema = z.object({
  id: z.number(),
  order: z.number(),
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
  link: z.string(),
  image: z.string(),
  items: z.array(BicycleCardItemSchema),
});

// 섹션 스키마들
export const BicycleHeaderSectionSchema = z.object({
  id: z.number(),
  section: z.literal("header"),
  title: z.string(),
  description: z.union([z.string(), z.record(z.string(), z.unknown())]),
  image: z.string().optional(),
});

export const BicycleCardListSectionSchema = z.object({
  id: z.number(),
  section: z.literal("cardListSection"),
  title: z.string().optional(),
  description: z.union([z.string(), z.record(z.string(), z.unknown())]).optional(),
  cardList: z.array(BicycleCardSchema),
});

export const BicycleSectionSchema = z.discriminatedUnion("section", [
  BicycleHeaderSectionSchema,
  BicycleCardListSectionSchema,
]);

export const SubcategoryItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  order: z.number(),
});

// 카테고리 리스트 타입
export const CategoryListItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
});

// 카테고리에 대한 자전거 타입
export const BicycleCategoryItemSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  subcategories: z.array(SubcategoryItemSchema),
});

export const BicycleCategoryOptionsSchema = z.object({
  categories: z.array(BicycleCategoryItemSchema),
  currentCategory: BicycleCategoryItemSchema,
});

export const CategoryPageDataSchema = z.object({
  categoryList: z.array(BicycleCategoryItemSchema),
  category: BicycleCategoryItemSchema,
  subcategories: z.array(SubcategoryItemSchema),
});

// DB 관련 스키마 (서버에서만 사용)
// 공통 타입 import
export type {
  DbPageRow,
  DbPageLayoutRow,
  DbPageSectionRow,
  NormalizationInput,
} from "@/types/common";

// 자전거 특화 정규화 입력 타입 (공통 타입과 동일하지만 명시적 구분)
export const BicycleNormalizationInputSchema = z.object({
  id: z.string(),
  slug: z.string(),
  section: z.string(),
  data: z.unknown(),
  order_index: z.number(),
});

// 자전거, 스타일 페이지 레이아웃 스키마
export const BicycleContentSectionLayoutBaseSchema = z.object({
  id: z.number(),
  section: z.enum(["header", "cardListSection"]),
  order: z.number(),
  className: z.string().optional(),
});

export const BicycleContentLayoutSchema = z.object({
  className: z.string().optional(),
  sections: z.array(BicycleContentSectionLayoutBaseSchema),
});

export const BicycleLayoutDataSchema = z.object({
  layout: z.object({
    type: z.string(),
    className: z.string().optional(),
    content: BicycleContentLayoutSchema,
  }),
});

export const BicyclePageContentDataSchema = z.object({
  sections: z.array(BicycleSectionSchema),
});

// 카테고리 페이지 레이아웃 스키마
export const BicycleCategorySidebarSchema = z.object({
  section: z.literal("sidebar"),
  position: z.enum(["left", "right"]),
  className: z.string().optional(),
  mobileClassName: z.string().optional(),
});

export const BicycleCategoryContentSectionBaseSchema = z.object({
  id: z.number(),
  section: z.enum(["header", "tabs", "bicycleList"]),
  order: z.number(),
  className: z.string().optional(),
  placeholder: z
    .object({
      title: z.string(),
      description: z.string(),
    })
    .optional(),
});

export const BicycleCategoryContentLayoutSchema = z.object({
  className: z.string().optional(),
  sections: z.array(BicycleCategoryContentSectionBaseSchema),
});

export const BicycleCategoryLayoutDataSchema = z.object({
  layout: z.object({
    type: z.string(),
    className: z.string().optional(),
    content: BicycleCategoryContentLayoutSchema,
    sidebar: BicycleCategorySidebarSchema,
  }),
});

// 기본 타입들
export type BicycleCardItemType = z.infer<typeof BicycleCardItemSchema>;
export type BicycleCardType = z.infer<typeof BicycleCardSchema>;
export type CategoryListItemType = z.infer<typeof CategoryListItemSchema>;
export type SubcategoryItemType = z.infer<typeof SubcategoryItemSchema>;
export type BicycleCategoryItemType = z.infer<typeof BicycleCategoryItemSchema>;
export type BicycleCategoryOptionsType = z.infer<typeof BicycleCategoryOptionsSchema>;

// 섹션 타입들
export type BicycleHeaderSectionType = z.infer<typeof BicycleHeaderSectionSchema>;
export type BicycleCardListSectionType = z.infer<typeof BicycleCardListSectionSchema>;

// 레이아웃 타입들
export type BicycleContentSectionLayoutBase = z.infer<typeof BicycleContentSectionLayoutBaseSchema>;
export type BicycleContentLayout = z.infer<typeof BicycleContentLayoutSchema>;
export type BicycleLayoutData = z.infer<typeof BicycleLayoutDataSchema>;
export type BicyclePageContentData = z.infer<typeof BicyclePageContentDataSchema>;

// 카테고리 레이아웃 타입들
export type BicycleCategoryLayoutData = z.infer<typeof BicycleCategoryLayoutDataSchema>;
export type BicycleCategorySidebar = z.infer<typeof BicycleCategorySidebarSchema>;
export type BicycleCategoryContentLayout = z.infer<typeof BicycleCategoryContentLayoutSchema>;
export type BicycleCategoryContentSectionBase = z.infer<
  typeof BicycleCategoryContentSectionBaseSchema
>;

// 카테고리 페이지 데이터 타입
export type CategoryPageData = z.infer<typeof CategoryPageDataSchema>;

// DB 타입들 (서버에서만 사용)
// 공통 DB 타입들은 위에서 이미 export됨
export type BicycleNormalizationInput = z.infer<typeof BicycleNormalizationInputSchema>;

// 컴포넌트 Props 타입들
export interface BicycleHeaderSectionProps {
  data: BicycleHeaderSectionType;
}

export interface BicycleCardListSectionProps {
  data: BicycleCardListSectionType;
}

// 타입 추론
export type BicycleTag = z.infer<typeof BicycleTagSchema>;
export type BicycleFromDB = z.infer<typeof BicycleFromDBSchema>;

// 유틸리티 타입들
export interface BicycleSectionMap {
  header: BicycleHeaderSectionType;
  cardListSection: BicycleCardListSectionType;
}

export type BicycleContentSectionKey = keyof BicycleSectionMap;
export type BicycleContentSection = BicycleSectionMap[BicycleContentSectionKey];
