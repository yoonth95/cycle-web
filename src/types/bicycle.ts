import { z } from "zod";

// =============================================================================
// 공통 타입 imports
// =============================================================================
export type {
  DbPageRow,
  DbPageLayoutRow,
  DbPageSectionRow,
  NormalizationInput,
} from "@/types/common";

// =============================================================================
// 기본 공통 스키마들
// =============================================================================

/**
 * 자전거 태그 스키마
 */
export const BicycleTagSchema = z.object({
  label: z.string(),
  color: z.string(),
  variant: z.enum(["default", "secondary", "destructive", "outline"]).default("default"),
});

/**
 * UUID 스키마 (재사용 가능)
 */
export const UUIDSchema = z.string().uuid();

/**
 * 이미지 URL 배열 스키마
 */
export const ImageArraySchema = z.array(z.string()).default([]);

/**
 * 문자열 배열 스키마
 */
export const StringArraySchema = z.array(z.string()).default([]);

/**
 * 태그 배열 스키마
 */
export const TagArraySchema = z.array(BicycleTagSchema).default([]);

/**
 * JSON 객체 스키마 (specs 등에 사용)
 */
export const JSONObjectSchema = z.record(z.string()).default({});

// =============================================================================
// 데이터베이스 스키마들 (Supabase 테이블 구조 기반)
// =============================================================================

/**
 * bicycles 테이블 스키마
 */
export const BicycleFromDBSchema = z.object({
  // 기본 필드
  id: UUIDSchema,
  name: z.string().min(1),
  category_id: UUIDSchema,
  description: z.string().nullable(),
  order_index: z.number().int().positive().default(1),

  // 타임스탬프
  created_at: z.string().nullable(),
  updated_at: z.string().nullable(),

  // JSON 필드들
  specs: JSONObjectSchema.nullable(),
  features: StringArraySchema.nullable(),
  tags: TagArraySchema.nullable(),
  images: ImageArraySchema,
  contents: ImageArraySchema.nullable(), // 제품 소개 이미지들
  sizes: ImageArraySchema.nullable(), // 사이즈 가이드 이미지들

  // 카테고리 정보
  subcategory: z.string().default(""),
  category: z.string().default("smart-mobility"), // 백업용 (정규화되면 제거 예정)
});

/**
 * bicycle_categories 테이블 스키마
 */
export const BicycleCategoryFromDBSchema = z.object({
  id: UUIDSchema,
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().nullable(),
  order_index: z.number().int().positive().default(1),
  created_at: z.string().nullable(),
  updated_at: z.string().nullable(),
  subcategories: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        slug: z.string(),
        order: z.number(),
      }),
    )
    .default([]),
});

/**
 * 조인된 자전거 데이터 (카테고리 정보 포함)
 */
export const BicycleWithCategorySchema = BicycleFromDBSchema.extend({
  bicycle_categories: BicycleCategoryFromDBSchema.pick({
    slug: true,
    title: true,
  }).nullable(),
});

// =============================================================================
// 상세 페이지 및 UI용 스키마들
// =============================================================================

/**
 * 자전거 상세 페이지용 스키마
 */
export const BicycleDetailSchema = z.object({
  id: UUIDSchema,
  name: z.string(),
  category: z.string(),
  category_id: UUIDSchema,
  subcategory: z.string(),
  tags: TagArraySchema,

  // 이미지들
  mainImages: ImageArraySchema,
  productImages: ImageArraySchema, // contents에서 변환
  sizeImages: ImageArraySchema, // sizes에서 변환

  // 사양 및 특징
  fullSpecs: JSONObjectSchema, // 전체 사양
  features: StringArraySchema,

  // 기본 정보
  description: z.string(),

  // 향후 확장 가능한 필드들
  availableSizes: StringArraySchema,
  availableColors: StringArraySchema,
});

/**
 * 사양 카테고리 스키마 (상세 페이지 탭용)
 */
export const SpecificationItemSchema = z.object({
  spec: z.string(),
  value: z.string(),
});

export const SpecificationCategorySchema = z.object({
  category: z.string(),
  items: z.array(SpecificationItemSchema),
});

// =============================================================================
// 카테고리 및 리스트 페이지 스키마들
// =============================================================================

/**
 * 서브카테고리 스키마
 */
export const SubcategoryItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  order: z.number(),
});

/**
 * 카테고리 리스트 아이템 스키마
 */
export const CategoryListItemSchema = z.object({
  id: UUIDSchema,
  title: z.string(),
  slug: z.string(),
});

/**
 * 자전거 카테고리 아이템 스키마
 */
export const BicycleCategoryItemSchema = z.object({
  id: UUIDSchema,
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  subcategories: z.array(SubcategoryItemSchema).default([]),
});

/**
 * 카테고리 옵션 스키마
 */
export const BicycleCategoryOptionsSchema = z.object({
  categories: z.array(BicycleCategoryItemSchema),
  currentCategory: BicycleCategoryItemSchema.nullable(),
});

/**
 * 카테고리 페이지 데이터 스키마
 */
export const CategoryPageDataSchema = z.object({
  categoryList: z.array(BicycleCategoryItemSchema),
  category: BicycleCategoryItemSchema,
  subcategories: z.array(SubcategoryItemSchema),
});

/**
 * 서브카테고리별 자전거 그룹 스키마
 */
export const BicyclesBySubcategorySchema = z.record(z.string(), z.array(BicycleFromDBSchema));

// =============================================================================
// 페이지 레이아웃 스키마들
// =============================================================================

/**
 * 자전거 카드 아이템 스키마
 */
export const BicycleCardItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  link: z.string(),
  order: z.number(),
});

/**
 * 자전거 카드 스키마
 */
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

/**
 * 자전거 헤더 섹션 스키마
 */
export const BicycleHeaderSectionSchema = z.object({
  id: z.number(),
  section: z.literal("header"),
  title: z.string(),
  description: z.union([z.string(), z.record(z.string(), z.unknown())]),
  image: z.string().optional(),
});

/**
 * 자전거 카드 리스트 섹션 스키마
 */
export const BicycleCardListSectionSchema = z.object({
  id: z.number(),
  section: z.literal("cardListSection"),
  title: z.string().optional(),
  description: z.union([z.string(), z.record(z.string(), z.unknown())]).optional(),
  cardList: z.array(BicycleCardSchema),
});

/**
 * 자전거 섹션 통합 스키마
 */
export const BicycleSectionSchema = z.discriminatedUnion("section", [
  BicycleHeaderSectionSchema,
  BicycleCardListSectionSchema,
]);

// =============================================================================
// 레이아웃 스키마들
// =============================================================================

/**
 * 자전거 콘텐츠 섹션 레이아웃 기본 스키마
 */
export const BicycleContentSectionLayoutBaseSchema = z.object({
  id: z.number(),
  section: z.enum(["header", "cardListSection"]),
  order: z.number(),
  className: z.string().optional(),
});

/**
 * 자전거 콘텐츠 레이아웃 스키마
 */
export const BicycleContentLayoutSchema = z.object({
  className: z.string().optional(),
  sections: z.array(BicycleContentSectionLayoutBaseSchema),
});

/**
 * 자전거 레이아웃 데이터 스키마
 */
export const BicycleLayoutDataSchema = z.object({
  pageId: z.string(),
  layout: z.object({
    type: z.string(),
    className: z.string().optional(),
    content: BicycleContentLayoutSchema,
  }),
});

/**
 * 자전거 페이지 콘텐츠 데이터 스키마
 */
export const BicyclePageContentDataSchema = z.object({
  sections: z.array(BicycleSectionSchema),
});

// =============================================================================
// 카테고리 페이지 레이아웃 스키마들
// =============================================================================

/**
 * 자전거 카테고리 사이드바 스키마
 */
export const BicycleCategorySidebarSchema = z.object({
  section: z.literal("sidebar"),
  position: z.enum(["left", "right"]),
  className: z.string().optional(),
  mobileClassName: z.string().optional(),
});

/**
 * 자전거 카테고리 콘텐츠 섹션 기본 스키마
 */
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

/**
 * 자전거 카테고리 콘텐츠 레이아웃 스키마
 */
export const BicycleCategoryContentLayoutSchema = z.object({
  className: z.string().optional(),
  sections: z.array(BicycleCategoryContentSectionBaseSchema),
});

/**
 * 자전거 카테고리 레이아웃 데이터 스키마
 */
export const BicycleCategoryLayoutDataSchema = z.object({
  layout: z.object({
    type: z.string(),
    className: z.string().optional(),
    content: BicycleCategoryContentLayoutSchema,
    sidebar: BicycleCategorySidebarSchema,
  }),
});

// =============================================================================
// 변환 및 처리 스키마들
// =============================================================================

/**
 * 자전거 정규화 입력 스키마
 */
export const BicycleNormalizationInputSchema = z.object({
  id: z.string(),
  slug: z.string(),
  section: z.string(),
  data: z.unknown(),
  order_index: z.number(),
});

// =============================================================================
// 타입 추론들
// =============================================================================

// 기본 타입들
export type BicycleTag = z.infer<typeof BicycleTagSchema>;
export type BicycleFromDB = z.infer<typeof BicycleFromDBSchema>;
export type BicycleCategoryFromDB = z.infer<typeof BicycleCategoryFromDBSchema>;
export type BicycleWithCategory = z.infer<typeof BicycleWithCategorySchema>;
export type BicycleDetail = z.infer<typeof BicycleDetailSchema>;

// 사양 타입들
export type SpecificationItem = z.infer<typeof SpecificationItemSchema>;
export type SpecificationCategory = z.infer<typeof SpecificationCategorySchema>;

// 카테고리 관련 타입들
export type SubcategoryItemType = z.infer<typeof SubcategoryItemSchema>;
export type CategoryListItemType = z.infer<typeof CategoryListItemSchema>;
export type BicycleCategoryItemType = z.infer<typeof BicycleCategoryItemSchema>;
export type BicycleCategoryOptionsType = z.infer<typeof BicycleCategoryOptionsSchema>;
export type CategoryPageData = z.infer<typeof CategoryPageDataSchema>;
export type BicyclesBySubcategory = z.infer<typeof BicyclesBySubcategorySchema>;

// 카드 및 섹션 타입들
export type BicycleCardItemType = z.infer<typeof BicycleCardItemSchema>;
export type BicycleCardType = z.infer<typeof BicycleCardSchema>;
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

// 변환 타입들
export type BicycleNormalizationInput = z.infer<typeof BicycleNormalizationInputSchema>;

// =============================================================================
// 유틸리티 타입들
// =============================================================================

/**
 * 자전거 섹션 맵 (컴포넌트 Props용)
 */
export interface BicycleSectionMap {
  header: BicycleHeaderSectionType;
  cardListSection: BicycleCardListSectionType;
}

export type BicycleContentSectionKey = keyof BicycleSectionMap;
export type BicycleContentSection = BicycleSectionMap[BicycleContentSectionKey];

/**
 * 컴포넌트 Props 인터페이스들
 */
export interface BicycleHeaderSectionProps {
  data: BicycleHeaderSectionType;
}

export interface BicycleCardListSectionProps {
  data: BicycleCardListSectionType;
}

// =============================================================================
// 레거시 타입들 (점진적 제거 예정)
// =============================================================================

/**
 * @deprecated - BicycleCategoryLayoutData를 사용해주세요
 */
export interface CategoryLayoutData {
  layout: CategoryLayout;
}

/**
 * @deprecated - 구체적인 타입을 사용해주세요
 */
export interface CategoryLayout {
  type: "sidebar-content";
  className: string;
  sidebar: CategorySidebar;
  content: CategoryContent;
}

/**
 * @deprecated - BicycleCategorySidebar를 사용해주세요
 */
export interface CategorySidebar {
  position: "left" | "right";
  className: string;
  mobileClassName?: string;
  section: string;
}

/**
 * @deprecated - BicycleCategoryContentLayout를 사용해주세요
 */
export interface CategoryContent {
  className: string;
  sections: CategoryContentSection[];
}

/**
 * @deprecated - BicycleCategoryContentSectionBase를 사용해주세요
 */
export interface CategoryContentSection {
  id: number;
  section: string;
  order: number;
  className: string;
  placeholder?: CategoryPlaceholder;
}

/**
 * @deprecated - 구체적인 타입을 사용해주세요
 */
export interface CategoryPlaceholder {
  title: string;
  description: string;
}

/**
 * @deprecated - CategoryListItemType을 사용해주세요
 */
export interface CategoryListItem {
  id: number;
  title: string;
  description: string;
  slug: string;
}
