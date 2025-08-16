import "server-only";

import {
  fetchPageData,
  transformPageSections,
  invalidatePageCache,
} from "@/lib/common/page-server";
import { normalizeHomeSectionsFromDB } from "@/lib/home/transform";
import type { HomeLayoutData, HomePageContentData } from "@/types/home";

// =============================================================================
// 사용자용 API (Edge + ISR 캐싱)
// =============================================================================

/**
 * 홈 페이지 레이아웃 조회
 */
export async function getHomeLayout(): Promise<HomeLayoutData | null> {
  const data = await fetchPageData<HomeLayoutData>("home");
  return data?.layout || null;
}

/**
 * 홈 페이지 콘텐츠 조회
 */
export async function getHomeContent(): Promise<HomePageContentData | null> {
  const data = await fetchPageData("home");
  return transformPageSections(data, normalizeHomeSectionsFromDB);
}

// =============================================================================
// 관리자용 API (캐시 우회 + 무효화)
// =============================================================================

/**
 * 관리자 미리보기용 - 항상 최신 데이터
 */
export async function getHomePreviewData(slug: string) {
  return await fetchPageData<HomeLayoutData>(slug, { isPreview: true });
}

/**
 * 관리자 발행 후 캐시 무효화
 */
export async function invalidateHomePage(slug: string) {
  return await invalidatePageCache(slug);
}
