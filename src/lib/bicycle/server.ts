import "server-only";

import {
  fetchPageData,
  transformPageSections,
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
import { PageCacheOptions } from "@/types/common";

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

/**
 * 자전거 카테고리 페이지 레이아웃 조회
 */
export async function getBicycleCategoryLayout(): Promise<BicycleCategoryLayoutData> {
  const data = await fetchPageData<BicycleCategoryLayoutData>("bicycles-category", {
    isPreview: false,
    revalidateTime: 60 * 60,
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

// 자전거 카테고리 사이드바, 탭 목록 조회
export async function fetchBicycleCategoriesAllOptions(
  currentSlug?: string,
  options: PageCacheOptions = { isPreview: false },
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

/**
 * 자전거 카테고리 페이지 콘텐츠 조회
 */
// export async function getBicycleCategoryContent(): Promise<BicyclePageContentData | null> {
//   const data = await fetchPageData("bicycles-category");
//   return transformPageSections(data, normalizeBicycleSectionsFromDB);
// }

// =============================================================================
// 관리자용 API (캐시 우회 + 무효화)
// =============================================================================

// 관리자 미리보기용 - 항상 최신 데이터
export async function getBicyclePreviewData(slug: string) {
  return await fetchPageData<BicycleLayoutData>(slug, { isPreview: true });
}

// 관리자 발행 후 캐시 무효화
export async function invalidateBicyclePage(slug: string) {
  return await invalidatePageCache(slug);
}
