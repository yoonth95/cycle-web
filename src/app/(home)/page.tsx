import { notFound } from "next/navigation";
import { PageSuspenseWrapper, DataValidationWrapper } from "@/components/common";
import { HomeLayoutRenderer } from "@/components/features/home";
import { getHomeLayout, getHomeContent } from "@/lib/home/server";
import { HomeLayoutData } from "@/types/home";

export const revalidate = 300;

export default async function Home() {
  // 레이아웃을 먼저 로드하고 콘텐츠는 스트리밍
  const layoutData = await getHomeLayout();

  return (
    <DataValidationWrapper data={layoutData}>
      {(validLayoutData) => (
        <PageSuspenseWrapper loadingMessage="홈페이지 콘텐츠를 불러오는 중...">
          <HomePageContent layoutData={validLayoutData} />
        </PageSuspenseWrapper>
      )}
    </DataValidationWrapper>
  );
}

// 콘텐츠를 별도 컴포넌트로 분리하여 스트리밍
async function HomePageContent({ layoutData }: { layoutData: HomeLayoutData }) {
  const contentData = await getHomeContent();
  if (!contentData) notFound();

  return <HomeLayoutRenderer layoutData={layoutData} contentData={contentData} />;
}
