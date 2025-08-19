import "server-only";
import type {
  DbPageRow,
  DbPageLayoutRow,
  DbPageSectionRow,
  PageDataResult,
  PageCacheOptions,
  NormalizationInput,
  DataTransformFunction,
} from "@/types/common";

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
    : { next: { revalidate: revalidateTime, tags: [`page-${slug}`] } }; // Edge Cache
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
    // 페이지 조회
    const pageResponse = await fetch(
      `${baseUrl}/rest/v1/pages?slug=eq.${slug}&select=id,slug&limit=1`,
      { ...cacheOption, headers },
    );

    if (!pageResponse.ok) {
      throw new Error(`Page fetch failed: ${pageResponse.status}`);
    }

    const [page] = (await pageResponse.json()) as DbPageRow[];
    if (!page) return null;

    // 병렬로 layout과 sections 조회 (각각 독립적 Edge Cache)
    const [layoutResponse, sectionsResponse] = await Promise.all([
      fetch(`${baseUrl}/rest/v1/page_layouts?page_id=eq.${page.id}&select=layout&limit=1`, {
        ...cacheOption,
        headers,
        next: createDetailedCacheOptions(slug, options, "layout"),
      }),
      fetch(
        `${baseUrl}/rest/v1/page_sections?page_id=eq.${page.id}&select=id,section_type,data,order_index`,
        {
          ...cacheOption,
          headers,
          next: createDetailedCacheOptions(slug, options, "content"),
        },
      ),
    ]);

    if (!layoutResponse.ok || !sectionsResponse.ok) {
      throw new Error(
        `Data fetch failed: layout(${layoutResponse.status}) sections(${sectionsResponse.status})`,
      );
    }

    const [layoutData] = (await layoutResponse.json()) as DbPageLayoutRow[];
    const sectionsData = (await sectionsResponse.json()) as DbPageSectionRow[];

    const layout =
      layoutData?.layout && typeof layoutData.layout === "object"
        ? (layoutData.layout as TLayout)
        : null;

    return {
      page,
      layout,
      sections: sectionsData || [],
    };
  } catch (error) {
    console.error(`[fetchPageData] Error for slug "${slug}":`, error);
    return null;
  }
}

// =============================================================================
// 데이터 변환 유틸리티
// =============================================================================

/**
 * 섹션 데이터를 정규화하고 변환
 * @param pageData 페이지 데이터
 * @param transformFunction 변환 함수
 */
export function transformPageSections<TOutput>(
  pageData: PageDataResult | null,
  transformFunction: DataTransformFunction<NormalizationInput, TOutput>,
): TOutput | null {
  if (!pageData?.sections?.length) return null;

  const sortedSections = pageData.sections.slice().sort((a, b) => {
    const ao = a.order_index ?? 1;
    const bo = b.order_index ?? 1;
    return ao - bo;
  });

  const normalizedInput: NormalizationInput[] = sortedSections.map((section) => ({
    id: section.id,
    slug: pageData.page.slug,
    section: section.section_type,
    data: section.data,
    order_index: section.order_index,
  }));

  return transformFunction(normalizedInput);
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
