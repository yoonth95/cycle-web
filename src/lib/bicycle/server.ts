import "server-only";

import {
  fetchPageData,
  transformPageSections,
  invalidatePageCache,
} from "@/lib/common/page-server";
import { normalizeBicycleSectionsFromDB } from "@/lib/bicycle/transform";
import type { BicycleLayoutData, BicyclePageContentData } from "@/types/bicycle";

// =============================================================================
// 사용자용 API (Edge + ISR 캐싱)
// =============================================================================

/**
 * 자전거 페이지 레이아웃 조회
 */
export async function getBicycleLayout(): Promise<BicycleLayoutData | null> {
  const data = await fetchPageData<BicycleLayoutData>("bicycles");
  return data?.layout || null;
}

/**
 * 자전거 페이지 콘텐츠 조회
 */
export async function getBicycleContent(): Promise<BicyclePageContentData | null> {
  const data = await fetchPageData("bicycles");
  return transformPageSections(data, normalizeBicycleSectionsFromDB);
}

/**
 * 자전거 스타일 페이지 레이아웃 조회
 */
export async function getBicycleStyleLayout(): Promise<BicycleLayoutData | null> {
  const data = await fetchPageData<BicycleLayoutData>("bicycles-style");
  return data?.layout || null;
}

/**
 * 자전거 스타일 페이지 콘텐츠 조회
 */
export async function getBicycleStyleContent(): Promise<BicyclePageContentData | null> {
  const data = await fetchPageData("bicycles-style");
  return transformPageSections(data, normalizeBicycleSectionsFromDB);
}

// =============================================================================
// 관리자용 API (캐시 우회 + 무효화)
// =============================================================================

/**
 * 관리자 미리보기용 - 항상 최신 데이터
 */
export async function getBicyclePreviewData(slug: string) {
  return await fetchPageData<BicycleLayoutData>(slug, { isPreview: true });
}

/**
 * 관리자 발행 후 캐시 무효화
 */
export async function invalidateBicyclePage(slug: string) {
  return await invalidatePageCache(slug);
}
