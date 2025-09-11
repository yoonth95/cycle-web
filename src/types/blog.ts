import { z } from "zod";

// =============================================================================
// DB 스키마 - Raw 데이터 타입
// =============================================================================

export const DbBlogRowSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.unknown(),
  images: z.unknown(),
  link: z.string(),
  is_published: z.boolean(),
  published_at: z.string(),
  created_at: z.string(),
});

// =============================================================================
// 변환된 데이터 타입
// =============================================================================

export const BlogItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.union([
    z.string(),
    z.object({
      ops: z.array(z.record(z.string(), z.unknown())),
    }),
  ]),
  images: z.array(z.string()),
  link: z.string(),
  publishedAt: z.string(),
  imageCount: z.number(),
});

export const BlogListSchema = z.array(BlogItemSchema);

// =============================================================================
// 레이아웃 데이터 타입
// =============================================================================

export const BlogHeaderSectionSchema = z.object({
  id: z.number(),
  order: z.number(),
  title: z.string(),
  section: z.literal("blog-header"),
  className: z.string(),
  description: z.union([
    z.string(),
    z.object({
      ops: z.array(z.record(z.string(), z.unknown())),
    }),
  ]),
});

export const BlogListSectionSchema = z.object({
  id: z.number(),
  order: z.number(),
  section: z.literal("blog-list"),
  className: z.string(),
  defaultValues: z.object({
    page: z.number(),
    pageSize: z.number(),
    sortBy: z.string(),
    sortOrder: z.string(),
    viewType: z.enum(["card", "list"]),
  }),
});

export const BlogLayoutContentSchema = z.object({
  sections: z.array(z.union([BlogHeaderSectionSchema, BlogListSectionSchema])),
  className: z.string(),
});

export const BlogLayoutSchema = z.object({
  type: z.literal("blog-page"),
  content: BlogLayoutContentSchema,
  className: z.string(),
});

export const BlogLayoutDataSchema = z.object({
  layout: BlogLayoutSchema,
});

// =============================================================================
// 타입 추출
// =============================================================================

export type DbBlogRow = z.infer<typeof DbBlogRowSchema>;
export type BlogItem = z.infer<typeof BlogItemSchema>;
export type BlogList = z.infer<typeof BlogListSchema>;
export type BlogHeaderSection = z.infer<typeof BlogHeaderSectionSchema>;
export type BlogListSection = z.infer<typeof BlogListSectionSchema>;
export type BlogLayoutContent = z.infer<typeof BlogLayoutContentSchema>;
export type BlogLayout = z.infer<typeof BlogLayoutSchema>;
export type BlogLayoutData = z.infer<typeof BlogLayoutDataSchema>;

// =============================================================================
// 뷰 타입 (컴포넌트에서 사용)
// =============================================================================

export type BlogViewType = "card" | "list";

export interface BlogListProps {
  blogs: BlogList;
}

export interface BlogCardProps {
  blog: BlogItem;
}

export interface BlogListItemProps {
  blog: BlogItem;
}
