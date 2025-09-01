import "server-only";
import type { DbPageSectionRow, PageDataResult, PageCacheOptions } from "@/types/common";

// =============================================================================
// Supabase API 설정
// =============================================================================
export function getSupabaseConfig() {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const apiKey = process.env.SUPABASE_ANON_KEY;

  if (!baseUrl || !apiKey) {
    throw new Error("Missing Supabase environment variables");
  }

  return {
    baseUrl,
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  };
}

// =============================================================================
// 캐시 옵션 생성
// =============================================================================
export function createCacheOptions(slug: string, options: PageCacheOptions) {
  const { isPreview, revalidateTime = 300 } = options;

  return isPreview
    ? { cache: "no-store" as const } // 관리자 미리보기는 항상 최신
    : {
        next: {
          revalidate: revalidateTime,
          tags: [`page-${slug}`],
        },
        // 추가 최적화: force-cache로 더 적극적인 캐싱
        cache: "force-cache" as const,
      }; // Edge Cache + 더 적극적인 캐싱
}

export function createDetailedCacheOptions(
  slug: string,
  options: PageCacheOptions,
  type: "layout" | "content",
) {
  const { isPreview, revalidateTime = 300 } = options;

  return isPreview
    ? undefined
    : { revalidate: revalidateTime, tags: [`${type}-${slug}`, `page-${slug}`] };
}

// =============================================================================
// 공통 페이지 데이터 페칭
// =============================================================================

/**
 * 페이지 레이아웃만 조회하는 함수
 * @param slug 페이지 슬러그
 * @param options 캐시 옵션
 */
export async function fetchPageLayout<TLayout = unknown>(
  slug: string,
  options: PageCacheOptions = { isPreview: false },
): Promise<{ id: string; slug: string; layout: TLayout | null } | null> {
  const { baseUrl, headers } = getSupabaseConfig();
  const cacheOption = createDetailedCacheOptions(slug, options, "layout");

  try {
    const layoutResponse = await fetch(
      `${baseUrl}/rest/v1/pages?slug=eq.${slug}&select=id,slug,layout:page_layouts(layout)&limit=1`,
      { headers, ...(cacheOption && { next: cacheOption }) },
    );

    if (!layoutResponse.ok) {
      throw new Error(`Layout fetch failed: ${layoutResponse.status}`);
    }

    const [pageData] = (await layoutResponse.json()) as Array<{
      id: string;
      slug: string;
      layout: { layout: TLayout } | null;
    }>;

    if (!pageData) return null;

    return {
      id: pageData.id,
      slug: pageData.slug,
      layout: pageData.layout?.layout ?? null,
    };
  } catch (error) {
    console.error(`[fetchPageLayout] Error for slug "${slug}":`, error);
    return null;
  }
}

/**
 * 페이지 섹션들만 조회하는 함수
 * @param pageId 페이지 ID
 * @param slug 캐시를 위한 페이지 슬러그
 * @param options 캐시 옵션
 */
export async function fetchPageSections(
  pageId: string,
  slug: string,
  options: PageCacheOptions = { isPreview: false },
): Promise<{ sections: DbPageSectionRow[] } | null> {
  const { baseUrl, headers } = getSupabaseConfig();
  const cacheOption = createDetailedCacheOptions(slug, options, "content");

  try {
    // 페이지 ID로 섹션들을 조회
    const sectionsResponse = await fetch(
      `${baseUrl}/rest/v1/page_sections?page_id=eq.${pageId}&select=id,section_type,data,order_index&order=order_index.asc`,
      { headers, ...(cacheOption && { next: cacheOption }) },
    );

    if (!sectionsResponse.ok) {
      throw new Error(`Sections fetch failed: ${sectionsResponse.status}`);
    }

    const sections = (await sectionsResponse.json()) as DbPageSectionRow[];

    return {
      sections: sections ?? [],
    };
  } catch (error) {
    console.error(`[fetchPageSections] Error for pageId "${pageId}":`, error);
    return null;
  }
}

/**
 * 범용 페이지 데이터 조회 함수
 * @param slug 페이지 슬러그
 * @param options 캐시 옵션
 */
export async function fetchPageData<TLayout = unknown>(
  slug: string,
  options: PageCacheOptions = { isPreview: false },
): Promise<PageDataResult<TLayout> | null> {
  const { baseUrl, headers } = getSupabaseConfig();
  const cacheOption = createCacheOptions(slug, options);

  try {
    // pages + page_layouts(1:1) + page_sections(1:N) 한 번에 join
    const pageResponse = await fetch(
      `${baseUrl}/rest/v1/pages?slug=eq.${slug}&select=id,slug,layout:page_layouts(layout),sections:page_sections(id,section_type,data,order_index)&sections.order=order_index.asc&limit=1`,
      { ...cacheOption, headers },
    );

    if (!pageResponse.ok) {
      throw new Error(`Page fetch failed: ${pageResponse.status}`);
    }

    const [pageData] = (await pageResponse.json()) as Array<{
      id: string;
      slug: string;
      layout: { layout: TLayout } | null;
      sections: DbPageSectionRow[];
    }>;

    if (!pageData) return null;

    return {
      page: { id: pageData.id, slug: pageData.slug },
      layout: pageData.layout?.layout ?? null,
      sections: pageData.sections ?? [],
    };
  } catch (error) {
    console.error(`[fetchPageData] Error for slug "${slug}":`, error);
    return null;
  }
}

// =============================================================================
// 캐시 무효화 유틸리티
// =============================================================================

/**
 * 페이지별 경로 매핑 설정
 */
const PAGE_PATHS: Record<string, string[]> = {
  home: ["/"],
  bicycles: ["/bicycles"],
  "bicycles-style": ["/bicycles/style"],
};

/**
 * 관리자 발행 후 캐시 무효화
 * @param slug 페이지 슬러그
 * @param customPaths 커스텀 경로 (선택사항)
 */
export async function invalidatePageCache(slug: string, customPaths?: string[]) {
  const { revalidateTag, revalidatePath } = await import("next/cache");

  // 데이터 캐시 무효화 (Edge Cache)
  revalidateTag(`page-${slug}`);
  revalidateTag(`layout-${slug}`);
  revalidateTag(`content-${slug}`);

  // 페이지 캐시 무효화 (ISR)
  const paths = customPaths || PAGE_PATHS[slug] || [];
  for (const path of paths) {
    revalidatePath(path);
  }

  console.log(`Cache invalidated for: ${slug} (paths: ${paths.join(", ")})`);
}

// =============================================================================
// 페이지별 설정 추가 유틸리티
// =============================================================================

/**
 * 새로운 페이지 경로 등록
 * @param slug 페이지 슬러그
 * @param paths 해당 페이지의 경로들
 */
export function registerPagePaths(slug: string, paths: string[]) {
  PAGE_PATHS[slug] = paths;
}

/**
 * 등록된 페이지 경로 조회
 * @param slug 페이지 슬러그
 */
export function getPagePaths(slug: string): string[] {
  return PAGE_PATHS[slug] || [];
}
