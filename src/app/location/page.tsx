import { notFound } from "next/navigation";
import { PageSuspenseWrapper, DataValidationWrapper } from "@/components/common";
import { LocationLayoutRenderer } from "@/components/features/location";
import { getLocationLayoutWithPageInfo, getLocationContent } from "@/lib/location/server";
import type { LocationLayoutData } from "@/types/location";

export const revalidate = 300;

export default async function Location() {
  // 레이아웃 조회 시 pageId와 slug도 함께 받기
  const layoutResult = await getLocationLayoutWithPageInfo();

  return (
    <DataValidationWrapper data={layoutResult}>
      {(validLayoutResult) => (
        <PageSuspenseWrapper loadingMessage="오시는길 페이지를 불러오는 중...">
          <LocationPageContent
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
async function LocationPageContent({
  layoutData,
  pageId,
  slug,
}: {
  layoutData: LocationLayoutData;
  pageId: string;
  slug: string;
}) {
  const contentData = await getLocationContent(pageId, slug);
  if (!contentData) notFound();

  return <LocationLayoutRenderer layoutData={layoutData} contentData={contentData} />;
}
