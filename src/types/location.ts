import { z } from "zod";
import { LocationSectionSchema } from "@/types/home";

// 공통 타입은 @/types/common에서 import
export type {
  DbPageRow,
  DbPageLayoutRow,
  DbPageSectionRow,
  NormalizationInput,
} from "@/types/common";

// =============================================================================
// 레이아웃 스키마
// =============================================================================

export const LocationContentSectionLayoutBaseSchema = z.object({
  id: z.number(),
  section: z.enum(["location"]),
  order: z.number(),
  className: z.string().optional(),
});

export const LocationContentLayoutSchema = z.object({
  className: z.string().optional(),
  sections: z.array(LocationContentSectionLayoutBaseSchema),
});

export const LocationLayoutDataSchema = z.object({
  pageId: z.string(),
  layout: z.object({
    type: z.string(),
    className: z.string().optional(),
    content: LocationContentLayoutSchema,
  }),
});

export const LocationPageContentDataSchema = z.object({
  sections: z.array(LocationSectionSchema),
});

// 레이아웃 타입들
export type LocationContentSectionLayoutBase = z.infer<
  typeof LocationContentSectionLayoutBaseSchema
>;
export type LocationContentLayout = z.infer<typeof LocationContentLayoutSchema>;
export type LocationLayoutData = z.infer<typeof LocationLayoutDataSchema>;
export type LocationPageContentData = z.infer<typeof LocationPageContentDataSchema>;

// 컴포넌트 Props 타입들
export interface LocationPageProps {
  layoutData: LocationLayoutData;
  contentData: LocationPageContentData;
}
