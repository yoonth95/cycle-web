import "server-only";

import {
  fetchPageLayout,
  fetchPageSections,
  invalidatePageCache,
  getSupabaseConfig,
  createCacheOptions,
} from "@/lib/common/page-server";
import { normalizeBicycleSectionsFromDB } from "@/lib/bicycle/transform";
import type {
  BicycleLayoutData,
  BicyclePageContentData,
  BicycleCategoryLayoutData,
  BicycleCategoryOptionsType,
  BicycleFromDB,
  BicyclesBySubcategory,
  BicycleCategoryItemType,
} from "@/types/bicycle";
import type { PageCacheOptions, NormalizationInput } from "@/types/common";

// =============================================================================
// 사용자용 API (Edge + ISR 캐싱)
// =============================================================================

/**
 * 자전거 페이지 레이아웃 조회 (더 긴 캐시 시간 적용)
 */
export async function getBicycleLayout(): Promise<BicycleLayoutData | null> {
  const data = await fetchPageLayout<BicycleLayoutData>("bicycles", {
    isPreview: false,
    revalidateTime: 3600, // 1시간 캐시 (레이아웃은 거의 변하지 않음)
  });
  return data?.layout || null;
}

/**
 * 자전거 페이지 레이아웃과 페이지 정보 조회 (pageId, slug 포함)
 */
export async function getBicycleLayoutWithPageInfo(): Promise<{
  pageId: string;
  slug: string;
  layout: BicycleLayoutData;
} | null> {
  const data = await fetchPageLayout<BicycleLayoutData>("bicycles", {
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
 * 자전거 페이지 콘텐츠 조회 (pageId와 slug를 외부에서 전달받아 중복 조회 방지)
 */
export async function getBicycleContent(
  pageId: string,
  slug: string,
): Promise<BicyclePageContentData | null> {
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

  return normalizeBicycleSectionsFromDB(normalizedInput);
}

/**
 * 자전거 스타일 페이지 레이아웃 조회 (더 긴 캐시 시간 적용)
 */
export async function getBicycleStyleLayout(): Promise<BicycleLayoutData | null> {
  const data = await fetchPageLayout<BicycleLayoutData>("bicycles-style", {
    isPreview: false,
    revalidateTime: 3600, // 1시간 캐시
  });
  return data?.layout || null;
}

/**
 * 자전거 스타일 페이지 레이아웃과 페이지 정보 조회 (pageId, slug 포함)
 */
export async function getBicycleStyleLayoutWithPageInfo(): Promise<{
  pageId: string;
  slug: string;
  layout: BicycleLayoutData;
} | null> {
  const data = await fetchPageLayout<BicycleLayoutData>("bicycles-style", {
    isPreview: false,
    revalidateTime: 3600, // 1시간 캐시
  });

  if (!data?.layout) return null;

  return {
    pageId: data.id,
    slug: data.slug,
    layout: data.layout,
  };
}

/**
 * 자전거 스타일 페이지 콘텐츠 조회 (pageId와 slug를 외부에서 전달받아 중복 조회 방지)
 */
export async function getBicycleStyleContent(
  pageId: string,
  slug: string,
): Promise<BicyclePageContentData | null> {
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

  return normalizeBicycleSectionsFromDB(normalizedInput);
}

/**
 * 자전거 카테고리 페이지 레이아웃 조회 (최적화된 캐시 시간)
 */
export async function getBicycleCategoryLayout(): Promise<BicycleCategoryLayoutData> {
  const data = await fetchPageLayout<BicycleCategoryLayoutData>("bicycles-category", {
    isPreview: false,
    revalidateTime: 7200, // 2시간 캐시 (카테고리 레이아웃은 매우 안정적)
  });

  // 기본 레이아웃 반환 (데이터가 없을 경우)
  const defaultLayout: BicycleCategoryLayoutData = {
    layout: {
      type: "sidebar-content",
      className: "grid grid-cols-1 lg:grid-cols-4 gap-8",
      content: {
        className: "lg:col-span-3",
        sections: [
          {
            id: 1,
            section: "header",
            order: 1,
            className: "mb-8",
          },
          {
            id: 2,
            section: "tabs",
            order: 2,
            className: "mb-6",
          },
          {
            id: 3,
            section: "bicycleList",
            order: 3,
            className: "",
          },
        ],
      },
      sidebar: {
        section: "sidebar",
        position: "left",
        className: "lg:col-span-1",
      },
    },
  };

  return data?.layout || defaultLayout;
}

// 자전거 카테고리 사이드바, 탭 목록 조회 (최적화된 캐시)
export async function fetchBicycleCategoriesAllOptions(
  currentSlug?: string,
  options: PageCacheOptions = { isPreview: false, revalidateTime: 1800 }, // 30분 기본 캐시
) {
  const { baseUrl, headers } = getSupabaseConfig();
  const cacheOption = createCacheOptions("bicycle-categories-options", options);

  try {
    const response = await fetch(
      `${baseUrl}/rest/v1/bicycle_categories?select=id,slug,title,description,subcategories&order=order_index`,
      { ...cacheOption, headers },
    );

    if (!response.ok) {
      throw new Error(`Bicycle categories fetch failed: ${response.status}`);
    }

    const categories = await response.json();
    const currentCategory = currentSlug
      ? categories.find((cat: BicycleCategoryItemType) => cat.slug === currentSlug)
      : null;

    return {
      categories: categories || [],
      currentCategory,
    };
  } catch (error) {
    console.error("[fetchAllBicycleCategoriesWithCurrent] Error:", error);
    return { categories: [], currentCategory: null };
  }
}

export async function getBicycleCategoriesOptions(
  currentSlug: string,
): Promise<BicycleCategoryOptionsType> {
  const data = await fetchBicycleCategoriesAllOptions(currentSlug);
  return data;
}

/**
 * 특정 카테고리의 자전거 데이터를 서브카테고리별로 그룹화하여 조회 (Edge 캐싱 적용)
 */
export async function fetchBicyclesByCategory(
  categoryId: string,
  selectedSubcategory?: string,
  options: PageCacheOptions = { isPreview: false, revalidateTime: 300 },
): Promise<BicycleFromDB[]> {
  const { baseUrl, headers } = getSupabaseConfig();

  // 캐시 키에 서브카테고리 정보 포함
  const cacheKey = selectedSubcategory
    ? `bicycles-${categoryId}-${selectedSubcategory}`
    : `bicycles-${categoryId}`;
  const cacheOption = createCacheOptions(cacheKey, options);

  try {
    let url = `${baseUrl}/rest/v1/bicycles?select=*&category_id=eq.${categoryId}&order=order_index`;

    // 서브카테고리 필터링
    if (selectedSubcategory && selectedSubcategory !== "all") {
      url += `&subcategories=eq.${selectedSubcategory}`;
    }

    const response = await fetch(url, {
      ...cacheOption,
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[fetchBicyclesByCategory] Failed with status ${response.status}:`, errorText);
      console.error(`[fetchBicyclesByCategory] Request URL:`, url);
      throw new Error(`Bicycles fetch failed: ${response.status} - ${errorText}`);
    }

    const bicycles = await response.json();
    return bicycles || [];
  } catch (error) {
    console.error("[fetchBicyclesByCategory] Error:", error);
    return [];
  }
}

/**
 * 특정 카테고리의 모든 자전거를 서브카테고리별로 그룹화하여 조회
 */
export async function fetchBicyclesGroupedBySubcategory(
  categoryId: string,
  subcategories: string[],
  options: PageCacheOptions = { isPreview: false, revalidateTime: 300 },
): Promise<BicyclesBySubcategory> {
  const { baseUrl, headers } = getSupabaseConfig();
  const cacheOption = createCacheOptions(`bicycles-grouped-${categoryId}`, options);

  try {
    const response = await fetch(
      `${baseUrl}/rest/v1/bicycles?select=*&category_id=eq.${categoryId}&order=order_index`,
      { ...cacheOption, headers },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `[fetchBicyclesGroupedBySubcategory] Failed with status ${response.status}:`,
        errorText,
      );
      throw new Error(`Bicycles fetch failed: ${response.status} - ${errorText}`);
    }

    const bicycles: BicycleFromDB[] = await response.json();

    // 서브카테고리별로 그룹화
    const grouped: BicyclesBySubcategory = {};

    // 모든 서브카테고리를 빈 배열로 초기화
    subcategories.forEach((sub) => {
      grouped[sub] = [];
    });

    // 전체 카테고리도 추가
    grouped["all"] = bicycles;

    // 자전거를 서브카테고리별로 분류
    bicycles.forEach((bicycle) => {
      if (bicycle.subcategory && grouped[bicycle.subcategory]) {
        grouped[bicycle.subcategory].push(bicycle);
      }
    });

    return grouped;
  } catch (error) {
    console.error("[fetchBicyclesGroupedBySubcategory] Error:", error);
    return {};
  }
}

// =============================================================================
// 관리자용 API (캐시 우회 + 무효화)
// =============================================================================

// 관리자 미리보기용 - 항상 최신 데이터
export async function getBicyclePreviewData(slug: string) {
  return await fetchPageLayout<BicycleLayoutData>(slug, { isPreview: true });
}

// 관리자 발행 후 캐시 무효화
export async function invalidateBicyclePage(slug: string) {
  return await invalidatePageCache(slug);
}
