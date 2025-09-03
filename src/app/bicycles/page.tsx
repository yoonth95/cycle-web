import { notFound } from "next/navigation";
import { PageSuspenseWrapper, DataValidationWrapper } from "@/components/common";
import { BicyclePageLayoutRenderer } from "@/components/features/bicycles/page";
import { getBicycleLayout, getBicycleContent } from "@/lib/bicycle";
import { BicycleLayoutData } from "@/types/bicycle";

export const revalidate = 300;

export default async function BicyclesPage() {
  // 레이아웃을 먼저 로드하고 콘텐츠는 스트리밍
  const layoutData = await getBicycleLayout();

  return (
    <DataValidationWrapper data={layoutData}>
      {(validLayoutData) => (
        <PageSuspenseWrapper loadingMessage="자전거 목록을 불러오는 중...">
          <BicyclePageContent layoutData={validLayoutData} />
        </PageSuspenseWrapper>
      )}
    </DataValidationWrapper>
  );
}

// 콘텐츠를 별도 컴포넌트로 분리하여 스트리밍
async function BicyclePageContent({ layoutData }: { layoutData: BicycleLayoutData }) {
  const contentData = await getBicycleContent();
  if (!contentData) notFound();

  return <BicyclePageLayoutRenderer layoutData={layoutData} contentData={contentData} />;
}
