import { HomeLayoutRenderer } from "@/components/features/home";
import { getHomeLayout, getHomeContent } from "@/lib/home/server";
import type { HomeLayoutData, HomePageContentData } from "@/types/home";

export default async function Home() {
  const [layoutData, contentData] = (await Promise.all([getHomeLayout(), getHomeContent()])) as [
    HomeLayoutData | null,
    HomePageContentData | null,
  ];

  if (!layoutData || !contentData) {
    // TODO: 필요 시 로딩/플레이스홀더 처리
    return null;
  }

  return <HomeLayoutRenderer layoutData={layoutData} contentData={contentData} />;
}
