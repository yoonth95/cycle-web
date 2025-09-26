"use client";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

type BicyclesResponse<T> = {
  items: T[];
  nextCursor: null | { order: number; id: string };
  meta?: {
    count: number;
    hasMore: boolean;
    timestamp: string;
  };
};

// fetch 함수를 별도로 분리하여 재사용성 향상
const fetchBicycles = async <T>({
  categoryId,
  tab,
  limit,
  cursor,
}: {
  categoryId: string;
  tab: string;
  limit: number;
  cursor: null | { order: number; id: string };
}): Promise<BicyclesResponse<T>> => {
  const qs = new URLSearchParams({
    categoryId,
    tab,
    limit: String(limit),
    ...(cursor
      ? {
          cursorOrder: String(cursor.order),
          cursorId: cursor.id,
        }
      : {}),
  });

  const res = await fetch(`/api/bicycles?${qs.toString()}`, {
    // 클라이언트 사이드 캐싱 개선
    headers: {
      "Cache-Control": "max-age=300", // 5분 캐시
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch bicycles: ${res.status} ${res.statusText}`);
  }

  return res.json();
};

export function useBicyclesInfinite<T>(categoryId: string, tab: string = "all") {
  const limit = 10; // 기본값 증가로 네트워크 호출 줄이기

  // queryKey 안정화 - 불필요한 리렌더링 방지
  const queryKey = useMemo(() => ["bicycles", categoryId, tab, limit], [categoryId, tab, limit]);

  return useInfiniteQuery<BicyclesResponse<T>>({
    queryKey,
    queryFn: async ({ pageParam }) => {
      const cursor = pageParam as null | { order: number; id: string };

      return fetchBicycles<T>({
        categoryId,
        tab,
        limit,
        cursor,
      });
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: null,

    // 개선된 캐싱 전략
    staleTime: 5 * 60 * 1000, // 5분 동안 fresh (더 길게)
    gcTime: 30 * 60 * 1000, // 30분 후 메모리에서 정리 (더 길게)
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,

    // 데이터 사전 로딩을 위한 옵션
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

// 탭별 데이터 프리페치를 위한 별도 훅
export function useBicyclePrefetch(categoryId: string, tabs: string[]) {
  const queryClient = useQueryClient();

  const prefetchTabs = async () => {
    const prefetchPromises = tabs.map((tab) =>
      queryClient.prefetchInfiniteQuery({
        queryKey: ["bicycles", categoryId, tab, 20],
        queryFn: () =>
          fetchBicycles({
            categoryId,
            tab,
            limit: 20,
            cursor: null,
          }),
        staleTime: 5 * 60 * 1000,
        initialPageParam: null,
      }),
    );

    await Promise.allSettled(prefetchPromises);
  };

  return { prefetchTabs };
}
