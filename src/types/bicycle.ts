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

// 레이아웃 스키마
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

// 기본 타입들
export type BicycleCardItemType = z.infer<typeof BicycleCardItemSchema>;
export type BicycleCardType = z.infer<typeof BicycleCardSchema>;

// 섹션 타입들
export type BicycleHeaderSectionType = z.infer<typeof BicycleHeaderSectionSchema>;
export type BicycleCardListSectionType = z.infer<typeof BicycleCardListSectionSchema>;

// 레이아웃 타입들
export type BicycleContentSectionLayoutBase = z.infer<typeof BicycleContentSectionLayoutBaseSchema>;
export type BicycleContentLayout = z.infer<typeof BicycleContentLayoutSchema>;
export type BicycleLayoutData = z.infer<typeof BicycleLayoutDataSchema>;
export type BicyclePageContentData = z.infer<typeof BicyclePageContentDataSchema>;

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

// 유틸리티 타입들
export interface BicycleSectionMap {
  header: BicycleHeaderSectionType;
  cardListSection: BicycleCardListSectionType;
}

export type BicycleContentSectionKey = keyof BicycleSectionMap;
export type BicycleContentSection = BicycleSectionMap[BicycleContentSectionKey];
