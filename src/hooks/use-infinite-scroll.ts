"use client";

import { useRef, useEffect, useCallback } from "react";

interface UseInfiniteScrollOptions {
  onLoadMore: () => void;
  hasNextPage?: boolean;
  isFetching?: boolean;
  rootMargin?: string; // IntersectionObserver rootMargin (기본값: "100px")
  threshold?: number; // IntersectionObserver threshold (기본값: 0.1)
}

/**
 * IntersectionObserver를 사용한 무한 스크롤 기능을 제공하는 커스텀 훅
 */
export function useInfiniteScroll({
  onLoadMore,
  hasNextPage = false,
  isFetching = false,
  rootMargin = "100px",
  threshold = 0.1,
}: UseInfiniteScrollOptions) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // IntersectionObserver 콜백 최적화
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const first = entries[0];
      if (first.isIntersecting && hasNextPage && !isFetching) {
        onLoadMore();
      }
    },
    [onLoadMore, hasNextPage, isFetching],
  );

  // IntersectionObserver 설정
  useEffect(() => {
    const element = sentinelRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin,
      threshold,
    });

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [handleIntersection, rootMargin, threshold]);

  return { sentinelRef };
}
