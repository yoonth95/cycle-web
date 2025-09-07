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
// Products/Accessories 섹션 스키마
// =============================================================================

/**
 * Accessories 섹션 스키마
 */
export const AccessoriesHeaderSectionSchema = z.object({
  id: z.number(),
  section: z.literal("accessories-header"),
  title: z.string(),
  description: z.union([z.string(), z.record(z.string(), z.unknown())]),
});

export const AccessoriesImageSectionSchema = z.object({
  id: z.number(),
  section: z.literal("accessories-image"),
  image: z.string(),
});

export const AccessoriesPreparationSectionSchema = z.object({
  id: z.number(),
  section: z.literal("accessories-preparation"),
  preparationItems: z.array(z.string()),
});

export const ProductsSectionSchema = z.discriminatedUnion("section", [
  AccessoriesHeaderSectionSchema,
  AccessoriesImageSectionSchema,
  AccessoriesPreparationSectionSchema,
]);

// =============================================================================
// 레이아웃 스키마
// =============================================================================

export const ProductsContentSectionLayoutBaseSchema = z.object({
  id: z.number(),
  section: z.enum(["accessories-header", "accessories-image", "accessories-preparation"]),
  order: z.number(),
  className: z.string().optional(),
});

export const ProductsContentLayoutSchema = z.object({
  className: z.string().optional(),
  sections: z.array(ProductsContentSectionLayoutBaseSchema),
});

export const ProductsLayoutDataSchema = z.object({
  pageId: z.string(),
  layout: z.object({
    type: z.string(),
    className: z.string().optional(),
    content: ProductsContentLayoutSchema,
  }),
});

export const ProductsPageContentDataSchema = z.object({
  sections: z.array(ProductsSectionSchema),
});

// =============================================================================
// 타입 추론들
// =============================================================================

// 섹션 타입들
export type AccessoriesHeaderSectionType = z.infer<typeof AccessoriesHeaderSectionSchema>;
export type AccessoriesImageSectionType = z.infer<typeof AccessoriesImageSectionSchema>;
export type AccessoriesPreparationSectionType = z.infer<typeof AccessoriesPreparationSectionSchema>;

// 레이아웃 타입들
export type ProductsContentSectionLayoutBase = z.infer<
  typeof ProductsContentSectionLayoutBaseSchema
>;
export type ProductsContentLayout = z.infer<typeof ProductsContentLayoutSchema>;
export type ProductsLayoutData = z.infer<typeof ProductsLayoutDataSchema>;
export type ProductsPageContentData = z.infer<typeof ProductsPageContentDataSchema>;

// 컴포넌트 Props 타입들
export interface AccessoriesHeaderSectionProps {
  data: AccessoriesHeaderSectionType;
}

export interface AccessoriesImageSectionProps {
  data: AccessoriesImageSectionType;
}

export interface AccessoriesPreparationSectionProps {
  data: AccessoriesPreparationSectionType;
}

// 유틸리티 타입들
export interface ProductsSectionMap {
  "accessories-header": AccessoriesHeaderSectionType;
  "accessories-image": AccessoriesImageSectionType;
  "accessories-preparation": AccessoriesPreparationSectionType;
}

export type ProductsContentSectionKey = keyof ProductsSectionMap;
export type ProductsContentSection = ProductsSectionMap[ProductsContentSectionKey];
