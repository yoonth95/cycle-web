"use client";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import type { BlogList, BlogItem, DbBlogRow } from "@/types/blog";
import { transformBlogList } from "@/lib/blog/transform";

// =============================================================================
// 클라이언트 사이드 블로그 데이터 처리
// =============================================================================

export interface BlogListParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  viewType?: "card" | "list";
}

/**
 * 클라이언트에서 블로그 리스트 데이터를 변환
 */
export function processBlogListData(rawData: DbBlogRow[]): BlogList {
  return transformBlogList(rawData);
}

/**
 * 블로그 리스트 URL 쿼리 파라미터 생성
 */
export function createBlogListParams(params: BlogListParams): URLSearchParams {
  const searchParams = new URLSearchParams();

  if (params.page && params.page > 1) {
    searchParams.set("page", params.page.toString());
  }

  if (params.pageSize && params.pageSize !== 12) {
    searchParams.set("pageSize", params.pageSize.toString());
  }

  if (params.sortBy && params.sortBy !== "published_at") {
    searchParams.set("sortBy", params.sortBy);
  }

  if (params.sortOrder && params.sortOrder !== "desc") {
    searchParams.set("sortOrder", params.sortOrder);
  }

  if (params.viewType && params.viewType !== "card") {
    searchParams.set("viewType", params.viewType);
  }

  return searchParams;
}

/**
 * URL 쿼리 파라미터에서 블로그 리스트 파라미터 추출
 */
export function parseBlogListParams(searchParams: URLSearchParams): BlogListParams {
  return {
    page: searchParams.get("page") ? parseInt(searchParams.get("page")!, 10) : 1,
    pageSize: searchParams.get("pageSize") ? parseInt(searchParams.get("pageSize")!, 10) : 12,
    sortBy: searchParams.get("sortBy") || "published_at",
    sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "desc",
    viewType: (searchParams.get("viewType") as "card" | "list") || "card",
  };
}

// =============================================================================
// 무한 스크롤을 위한 타입 정의
// =============================================================================

type BlogsResponse<T> = {
  items: T[];
  nextCursor: null | { page: number };
  meta?: {
    count: number;
    hasMore: boolean;
    timestamp: string;
  };
};

// =============================================================================
// 블로그 데이터 fetch 함수
// =============================================================================

const fetchBlogs = async <T>({
  pageSize,
  sortBy,
  sortOrder,
  cursor,
}: {
  pageSize: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
  cursor: null | { page: number };
}): Promise<BlogsResponse<T>> => {
  const qs = new URLSearchParams({
    pageSize: String(pageSize),
    sortBy,
    sortOrder,
    ...(cursor ? { page: String(cursor.page) } : { page: "1" }),
  });

  const res = await fetch(`/api/blogs?${qs.toString()}`, {
    headers: {
      "Cache-Control": "max-age=300", // 5분 캐시
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch blogs: ${res.status} ${res.statusText}`);
  }

  return res.json();
};

// =============================================================================
// useInfiniteQuery 훅
// =============================================================================

export interface UseBlogInfiniteOptions {
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export function useBlogInfinite<T = BlogItem>(options: UseBlogInfiniteOptions = {}) {
  const { pageSize = 12, sortBy = "published_at", sortOrder = "desc" } = options;

  // queryKey 안정화 - 불필요한 리렌더링 방지
  const queryKey = useMemo(
    () => ["blogs", pageSize, sortBy, sortOrder],
    [pageSize, sortBy, sortOrder],
  );

  return useInfiniteQuery<BlogsResponse<T>>({
    queryKey,
    queryFn: async ({ pageParam }) => {
      const cursor = pageParam as null | { page: number };

      return fetchBlogs<T>({
        pageSize,
        sortBy,
        sortOrder,
        cursor,
      });
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: null,

    // 개선된 캐싱 전략
    staleTime: 5 * 60 * 1000, // 5분 동안 fresh
    gcTime: 30 * 60 * 1000, // 30분 후 메모리에서 정리
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: false, // 마운트 시 재조회 방지

    // 에러 처리 개선
    retry: (failureCount, error) => {
      // 4xx 에러는 재시도하지 않음
      if (error instanceof Error && error.message.includes("4")) {
        return false;
      }
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

    // Suspense 모드 지원 (옵션)
    throwOnError: false,
  });
}

// =============================================================================
// 프리페치를 위한 별도 훅
// =============================================================================

export function useBlogPrefetch(
  sortBy: string = "published_at",
  sortOrder: "asc" | "desc" = "desc",
) {
  const queryClient = useQueryClient();

  const prefetchBlogs = async () => {
    await queryClient.prefetchInfiniteQuery({
      queryKey: ["blogs", 12, sortBy, sortOrder],
      queryFn: () =>
        fetchBlogs({
          pageSize: 12,
          sortBy,
          sortOrder,
          cursor: null,
        }),
      staleTime: 5 * 60 * 1000,
      initialPageParam: null,
    });
  };

  return { prefetchBlogs };
}
