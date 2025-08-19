"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

type BicyclesResponse<T> = {
  items: T[];
  nextCursor: null | { order: number; id: string };
};

export function useBicyclesInfinite<T>(categoryId: string) {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") ?? "all";
  const limit = 10;

  return useInfiniteQuery<BicyclesResponse<T>>({
    queryKey: ["bicycles", categoryId, tab, limit],
    queryFn: async ({ pageParam }) => {
      const cursor = pageParam as null | { order: number; id: string };
      const qs = new URLSearchParams({
        categoryId,
        tab,
        limit: String(limit),
        ...(cursor ? { cursorOrder: String(cursor.order), cursorId: cursor.id } : {}),
      });

      const res = await fetch(`/api/bicycles?${qs.toString()}`, {
        next: {
          revalidate: 300,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch bicycles");
      return (await res.json()) as BicyclesResponse<T>;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: null,

    // 클라이언트 캐싱 전략
    staleTime: 60 * 1000, // 1분 동안 fresh
    gcTime: 10 * 60 * 1000, // 10분 후 메모리에서 정리
    refetchOnWindowFocus: false,
  });
}
