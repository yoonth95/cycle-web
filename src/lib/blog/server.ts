import "server-only";

import type { BlogLayout, BlogLayoutData, BlogList, DbBlogRow } from "@/types/blog";
import { fetchPageLayout } from "@/lib/common/page-server";
import { transformBlogLayout, transformBlogList } from "@/lib/blog/transform";
import { getSupabaseConfig, createCacheOptions } from "@/utils/fetchCacheOption";
import { PageCacheOptions } from "@/types/common";

// =============================================================================
// 블로그 레이아웃 조회
// =============================================================================
export async function getBlogLayout(): Promise<{
  layout: BlogLayoutData;
} | null> {
  try {
    const data = await fetchPageLayout<BlogLayout>("blog", {
      isPreview: false,
      revalidateTime: 3600,
    });

    if (!data?.layout) return null;

    // transform을 통해 zod 검증과 deltaToHtml 변환 적용
    const transformedLayout = transformBlogLayout(data.layout);

    if (!transformedLayout) {
      console.error("[getBlogLayout] Transform 실패");
      return null;
    }

    return {
      layout: transformedLayout,
    };
  } catch (error) {
    console.error("[getBlogLayout] Error:", error);
    return null;
  }
}

// =============================================================================
// 블로그 리스트 조회
// =============================================================================
export async function getBlogList(
  options: PageCacheOptions & {
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  } = {
    isPreview: false,
    revalidateTime: 300,
    page: 1,
    pageSize: 12,
    sortBy: "published_at",
    sortOrder: "desc",
  },
): Promise<BlogList> {
  const { baseUrl, headers } = getSupabaseConfig();
  const cacheOption = createCacheOptions("blog-list", options);

  const { page = 1, pageSize = 12, sortBy = "published_at", sortOrder = "desc" } = options;

  try {
    // 페이지네이션을 위한 offset 계산
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    const response = await fetch(
      `${baseUrl}/rest/v1/blogs?select=*&is_published=eq.true&order=${sortBy}.${sortOrder}&offset=${offset}&limit=${limit}`,
      { ...cacheOption, headers },
    );

    if (!response.ok) {
      throw new Error(`Blog list fetch failed: ${response.status}`);
    }

    const data = (await response.json()) as DbBlogRow[];

    // Zod 검증과 변환 적용
    return transformBlogList(data);
  } catch (error) {
    console.error("[getBlogList] Error:", error);
    return [];
  }
}

// =============================================================================
// 블로그 총 개수 조회 (페이지네이션용)
// =============================================================================
export async function getBlogCount(
  options: PageCacheOptions = { isPreview: false, revalidateTime: 300 },
): Promise<number> {
  const { baseUrl, headers } = getSupabaseConfig();
  const cacheOption = createCacheOptions("blog-count", options);

  try {
    const response = await fetch(`${baseUrl}/rest/v1/blogs?select=count&is_published=eq.true`, {
      ...cacheOption,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Blog count fetch failed: ${response.status}`);
    }

    const data = await response.json();
    return data?.[0]?.count || 0;
  } catch (error) {
    console.error("[getBlogCount] Error:", error);
    return 0;
  }
}
