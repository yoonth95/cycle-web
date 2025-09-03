import { z } from "zod";

// =============================================================================
// 공통 DB 스키마
// =============================================================================

export const DbPageRowSchema = z.object({
  id: z.string(),
  slug: z.string(),
});

export const DbPageLayoutRowSchema = z.object({
  id: z.string(),
  page_id: z.string(),
  layout: z.unknown(),
});

export const DbPageSectionRowSchema = z.object({
  id: z.string(),
  page_id: z.string(),
  section_type: z.string(),
  data: z.unknown(),
  order_index: z.number(),
});

export const NormalizationInputSchema = z.object({
  id: z.string(),
  slug: z.string(),
  section: z.string(),
  data: z.unknown(),
  order_index: z.number(),
});

// =============================================================================
// 공통 타입 정의
// =============================================================================

export type DbPageRow = z.infer<typeof DbPageRowSchema>;
export type DbPageLayoutRow = z.infer<typeof DbPageLayoutRowSchema>;
export type DbPageSectionRow = z.infer<typeof DbPageSectionRowSchema>;
export type NormalizationInput = z.infer<typeof NormalizationInputSchema>;

// =============================================================================
// 캐시 설정 타입
// =============================================================================

export interface CacheConfig {
  revalidate: number;
  tags: string[];
}

export interface PageCacheOptions {
  isPreview: boolean;
  revalidateTime?: number;
}

// =============================================================================
// 무효화 설정 타입
// =============================================================================

export interface InvalidationConfig {
  slug: string;
  paths: string[];
}

// =============================================================================
// 변환 함수 타입
// =============================================================================

export type DataTransformFunction<TInput, TOutput> = (input: TInput[]) => TOutput | null;
