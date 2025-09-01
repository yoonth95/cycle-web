import "server-only";

import {
  fetchPageData,
  fetchPageLayout,
  fetchPageSections,
  invalidatePageCache,
} from "@/lib/common/page-server";
import { normalizeHomeSectionsFromDB } from "@/lib/home/transform";
import type { HomeLayoutData, HomePageContentData } from "@/types/home";
import type { NormalizationInput } from "@/types/common";

// =============================================================================
// 하이브리드 접근 방식 (새로 추가)
// =============================================================================

/**
 * 빌드 타임 전용 - 레이아웃 데이터 (정적)
 */
export async function getHomeLayoutStatic(): Promise<{
  pageId: string;
  slug: string;
  layoutData: HomeLayoutData;
} | null> {
  try {
    const data = await fetchPageLayout<HomeLayoutData>("home", {
      isPreview: false,
      revalidateTime: 0, // 빌드 타임에만 실행
    });
    if (!data?.layout) return null;
    return {
      pageId: data.id,
      slug: data.slug,
      layoutData: data.layout,
    };
  } catch (error) {
    console.error("[getHomeLayoutStatic] Error:", error);
    return null;
  }
}

/**
 * API 전용 - 콘텐츠 데이터 (ISR)
 */
export async function getHomeContentForAPI(
  pageId: string,
  slug: string,
): Promise<HomePageContentData | null> {
  try {
    const data = await fetchPageSections(pageId, slug, {
      isPreview: false,
      revalidateTime: 300, // 5분 ISR
    });
    if (!data?.sections?.length) return null;

    const normalizedInput: NormalizationInput[] = data.sections.map((section) => ({
      id: section.id,
      slug: slug,
      section: section.section_type,
      data: section.data,
      order_index: section.order_index,
    }));

    return normalizeHomeSectionsFromDB(normalizedInput);
  } catch (error) {
    console.error("[getHomeContentForAPI] Error:", error);
    return null;
  }
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
