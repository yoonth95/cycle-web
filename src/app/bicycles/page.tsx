import { notFound } from "next/navigation";
import { PageSuspenseWrapper, DataValidationWrapper } from "@/components/common";
import { BicyclePageLayoutRenderer } from "@/components/features/bicycles/page";
import { getBicycleLayoutWithPageInfo, getBicycleContent } from "@/lib/bicycle";
import { BicycleLayoutData } from "@/types/bicycle";

export const revalidate = 300;

export default async function BicyclesPage() {
  // 레이아웃 조회 시 pageId와 slug도 함께 받기
  const layoutResult = await getBicycleLayoutWithPageInfo();

  return (
    <DataValidationWrapper data={layoutResult}>
      {(validLayoutResult) => (
        <PageSuspenseWrapper loadingMessage="자전거 목록을 불러오는 중...">
          <BicyclePageContent
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
async function BicyclePageContent({
  layoutData,
  pageId,
  slug,
}: {
  layoutData: BicycleLayoutData;
  pageId: string;
  slug: string;
}) {
  const contentData = await getBicycleContent(pageId, slug);
  if (!contentData) notFound();

  return <BicyclePageLayoutRenderer layoutData={layoutData} contentData={contentData} />;
}
