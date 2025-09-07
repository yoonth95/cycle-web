import "server-only";

import { fetchPageLayout, fetchPageSections, invalidatePageCache } from "@/lib/common/page-server";
import { normalizeProductsSectionsFromDB } from "./transform";
import type { ProductsLayoutData, ProductsPageContentData } from "@/types/products";
import type { NormalizationInput } from "@/types/common";

// =============================================================================
// 사용자용 API (Edge + ISR 캐싱) - home, bicycles 패턴과 동일
// =============================================================================

/**
 * Products 페이지 레이아웃과 페이지 정보 조회 (pageId, slug 포함)
 */
export async function getProductsLayoutWithPageInfo(): Promise<{
  pageId: string;
  slug: string;
  layout: ProductsLayoutData;
} | null> {
  try {
    const data = await fetchPageLayout<ProductsLayoutData>("products", {
      isPreview: false,
      revalidateTime: 3600,
    });

    if (!data?.layout) return null;

    return {
      pageId: data.id,
      slug: data.slug,
      layout: data.layout,
    };
  } catch (error) {
    console.error("[getProductsLayoutWithPageInfo] Error:", error);
    return null;
  }
}

/**
 * Products 페이지 콘텐츠 조회 (pageId와 slug를 외부에서 전달받아 중복 조회 방지)
 */
export async function getProductsContent(
  pageId: string,
  slug: string,
): Promise<ProductsPageContentData | null> {
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

  return normalizeProductsSectionsFromDB(normalizedInput);
}

// =============================================================================
// 관리자용 API (캐시 우회 + 무효화)
// =============================================================================

/**
 * 관리자 미리보기용 - 항상 최신 데이터
 */
export async function getProductsPreviewData(slug: string) {
  return await fetchPageLayout<ProductsLayoutData>(slug, { isPreview: true });
}

/**
 * 관리자 발행 후 캐시 무효화
 */
export async function invalidateProductsPage(slug: string) {
  return await invalidatePageCache(slug);
}
