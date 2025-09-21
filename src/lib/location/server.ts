import "server-only";

import { fetchPageLayout, fetchPageSections, invalidatePageCache } from "@/lib/common/page-server";
import { normalizeLocationSectionsFromDB } from "@/lib/location/transform";
import type { LocationLayoutData, LocationPageContentData } from "@/types/location";
import type { NormalizationInput } from "@/types/common";

// =============================================================================
// 사용자용 API (Edge + ISR 캐싱) - home 패턴과 동일
// =============================================================================

/**
 * location 페이지 레이아웃과 페이지 정보 조회 (pageId, slug 포함)
 */
export async function getLocationLayoutWithPageInfo(): Promise<{
  pageId: string;
  slug: string;
  layout: LocationLayoutData;
} | null> {
  const data = await fetchPageLayout<LocationLayoutData>("location", {
    isPreview: false,
    revalidateTime: 3600, // 1시간 캐시 (레이아웃은 거의 변하지 않음)
  });

  if (!data?.layout) return null;

  return {
    pageId: data.id,
    slug: data.slug,
    layout: data.layout,
  };
}

/**
 * location 페이지 콘텐츠 조회 (pageId와 slug를 외부에서 전달받아 중복 조회 방지)
 */
export async function getLocationContent(
  pageId: string,
  slug: string,
): Promise<LocationPageContentData | null> {
  // 섹션 데이터만 조회 (레이아웃은 이미 조회됨)
  const sectionsData = await fetchPageSections(pageId, slug, {
    isPreview: false,
    revalidateTime: 300, // 5분 ISR
  });

  if (!sectionsData?.sections?.length) return null;

  const normalizedInput: NormalizationInput[] = sectionsData.sections.map((section) => ({
    id: section.id,
    slug: slug,
    section: section.section_type,
    data: section.data,
    order_index: section.order_index,
  }));

  return normalizeLocationSectionsFromDB(normalizedInput);
}

// =============================================================================
// 관리자용 API (캐시 우회 + 무효화)
// =============================================================================

/**
 * 관리자 미리보기용 - 항상 최신 데이터
 */
export async function getLocationPreviewData(slug: string) {
  return await fetchPageLayout<LocationLayoutData>(slug, { isPreview: true });
}

/**
 * 관리자 발행 후 캐시 무효화
 */
export async function invalidateLocationPage(slug: string) {
  return await invalidatePageCache(slug);
}
