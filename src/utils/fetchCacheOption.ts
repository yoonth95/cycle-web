import type { PageCacheOptions } from "@/types/common";

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
