import { z } from "zod";

// =============================================================================
// 공통 스키마
// =============================================================================
export type {
  DbPageRow,
  DbPageLayoutRow,
  DbPageSectionRow,
  NormalizationInput,
} from "@/types/common";

// =============================================================================
// Notices 섹션 스키마
// =============================================================================

export const NoticesContentSectionBaseSchema = z.object({
  id: z.number(),
  order: z.number(),
  section: z.enum(["notices-header", "notices-table"]),
  className: z.string().optional(),
});

/**
 * Header 섹션 스키마
 */
export const NoticesLayoutContentHeaderSchema = NoticesContentSectionBaseSchema.extend({
  section: z.literal("notices-header"),
  title: z.string(),
  description: z.union([
    z.string(),
    z.object({
      ops: z.array(z.record(z.string(), z.unknown())),
    }),
  ]),
});

/**
 * Table 섹션 스키마
 */
export const NoticeListParamsSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  sortBy: z.enum(["created_at", "updated_at", "view_count", "title"]),
  sortOrder: z.enum(["asc", "desc"]),
});
export const NoticesLayoutContentTableSchema = NoticesContentSectionBaseSchema.extend({
  section: z.literal("notices-table"),
  defaultValues: NoticeListParamsSchema,
});

/**
 * Notices 섹션 스키마
 */
export const NoticesLayoutContentSectionSchema = z.discriminatedUnion("section", [
  NoticesLayoutContentHeaderSchema,
  NoticesLayoutContentTableSchema,
]);

// =============================================================================
// Notice 상세 스키마
// =============================================================================
export const NoticeListItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  view_count: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const NoticeDetailSchema = NoticeListItemSchema.extend({
  content: z.union([
    z.string(),
    z.object({
      ops: z.array(z.record(z.string(), z.unknown())),
    }),
  ]),
  is_published: z.boolean(),
});

export const NoticeListResponseSchema = z.object({
  notices: z.array(NoticeListItemSchema),
  totalCount: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
  pageSize: z.number(),
});

// =============================================================================
// 레이아웃 스키마
// =============================================================================

export const NoticesLayoutContentSchema = z.object({
  className: z.string().optional(),
  sections: z.array(NoticesLayoutContentSectionSchema),
});

export const NoticesLayoutDataSchema = z.object({
  layout: z.object({
    type: z.string(),
    className: z.string().optional(),
    content: NoticesLayoutContentSchema,
  }),
});

export const NoticesPageContentDataSchema = z.object({
  sections: z.array(NoticesLayoutContentSectionSchema),
});

// =============================================================================
// 타입 추론들
// =============================================================================

// 섹션 타입들
export type NoticesContentSectionBase = z.infer<typeof NoticesContentSectionBaseSchema>;
export type NoticesLayoutContentHeader = z.infer<typeof NoticesLayoutContentHeaderSchema>;
export type NoticesLayoutContentTable = z.infer<typeof NoticesLayoutContentTableSchema>;

// 레이아웃 타입들
export type NoticesLayoutContent = z.infer<typeof NoticesLayoutContentSchema>;
export type NoticesLayoutData = z.infer<typeof NoticesLayoutDataSchema>;
export type NoticesPageContentData = z.infer<typeof NoticesPageContentDataSchema>;

// 공지사항 타입들
export type NoticeListParamsType = z.infer<typeof NoticeListParamsSchema>;
export type NoticeListItemType = z.infer<typeof NoticeListItemSchema>;
export type NoticeDetailType = z.infer<typeof NoticeDetailSchema>;
export type NoticeListResponseType = z.infer<typeof NoticeListResponseSchema>;

// 컴포넌트 Props 타입들
export interface NoticesHeaderSectionProps {
  data: NoticesLayoutContentHeader;
}

export interface NoticesTableSectionProps {
  data: NoticesLayoutContentTable;
}

// 유틸리티 타입들
export interface NoticesSectionMap {
  "notices-header": NoticesLayoutContentHeader;
  "notices-table": NoticesLayoutContentTable;
}

export type NoticesContentSectionKey = keyof NoticesSectionMap;
export type NoticesContentSection = NoticesSectionMap[NoticesContentSectionKey];
