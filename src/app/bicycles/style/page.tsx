import { notFound } from "next/navigation";
import { PageSuspenseWrapper, DataValidationWrapper } from "@/components/common";
import { BicycleStylePageLayoutRenderer } from "@/components/features/bicycles/style";
import { getBicycleStyleLayoutWithPageInfo, getBicycleStyleContent } from "@/lib/bicycle";
import { BicycleLayoutData } from "@/types/bicycle";

export const revalidate = 300;

export default async function StylePage() {
  // 레이아웃 조회 시 pageId와 slug도 함께 받기
  const layoutResult = await getBicycleStyleLayoutWithPageInfo();

  return (
    <DataValidationWrapper data={layoutResult}>
      {(validLayoutResult) => (
        <PageSuspenseWrapper loadingMessage="스타일 카테고리를 불러오는 중...">
          <StylePageContent
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
async function StylePageContent({
  layoutData,
  pageId,
  slug,
}: {
  layoutData: BicycleLayoutData;
  pageId: string;
  slug: string;
}) {
  const contentData = await getBicycleStyleContent(pageId, slug);
  if (!contentData) notFound();

  return <BicycleStylePageLayoutRenderer layoutData={layoutData} contentData={contentData} />;
}
