"use client";

import { useQuery } from "@tanstack/react-query";
import HomeLayoutContent from "./home-layout-content";
import { HomeContentSkeleton } from "./skeletons/home-content-skeleton";
import { HomeContentError } from "./home-content-error";
import type { HomeLayoutData, HomePageContentData } from "@/types/home";

interface HomeLayoutRendererProps {
  layoutData: HomeLayoutData;
  pageId: string;
  slug: string;
}

const HomeLayoutRenderer = ({ layoutData, pageId, slug }: HomeLayoutRendererProps) => {
  const {
    data: contentData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["home-content", pageId],
    queryFn: async (): Promise<HomePageContentData> => {
      const response = await fetch(`/api/home/content?pageId=${pageId}&slug=${slug}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    retry: (failureCount, error) => {
      // 404는 재시도 안함, 네트워크 에러만 재시도
      if (error.message.includes("404")) return false;
      return failureCount < 2;
    },
  });

  const { layout } = layoutData;
  const { content } = layout;

  return (
    <div className={layout.className}>
      {isLoading ? (
        <HomeContentSkeleton sections={content.sections} />
      ) : error ? (
        <HomeContentError />
      ) : contentData ? (
        <HomeLayoutContent contentLayout={content} contentData={contentData} />
      ) : null}
    </div>
  );
};

export default HomeLayoutRenderer;
