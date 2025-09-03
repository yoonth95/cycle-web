import { notFound } from "next/navigation";
import { PageSuspenseWrapper, DataValidationWrapper } from "@/components/common";
import { HomeLayoutRenderer } from "@/components/features/home";
import { getHomeLayoutWithPageInfo, getHomeContent } from "@/lib/home/server";
import { HomeLayoutData } from "@/types/home";

export const revalidate = 300;

export default async function Home() {
  // 레이아웃 조회 시 pageId와 slug도 함께 받기
  const layoutResult = await getHomeLayoutWithPageInfo();

  return (
    <DataValidationWrapper data={layoutResult}>
      {(validLayoutResult) => (
        <PageSuspenseWrapper loadingMessage="홈페이지 콘텐츠를 불러오는 중...">
          <HomePageContent
            layoutData={validLayoutResult.layout}
            pageId={validLayoutResult.pageId}
            slug={validLayoutResult.slug}
          />
        </PageSuspenseWrapper>
      )}
    </DataValidationWrapper>
  );
}

// 콘텐츠를 별도 컴포넌트로 분리하여 스트리밍
async function HomePageContent({
  layoutData,
  pageId,
  slug,
}: {
  layoutData: HomeLayoutData;
  pageId: string;
  slug: string;
}) {
  const contentData = await getHomeContent(pageId, slug);
  if (!contentData) notFound();

  return <HomeLayoutRenderer layoutData={layoutData} contentData={contentData} />;
}
