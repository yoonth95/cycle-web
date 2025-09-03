import { notFound } from "next/navigation";
import { PageSuspenseWrapper, DataValidationWrapper } from "@/components/common";
import { BicycleStylePageLayoutRenderer } from "@/components/features/bicycles/style";
import { getBicycleStyleLayout, getBicycleStyleContent } from "@/lib/bicycle";
import { BicycleLayoutData } from "@/types/bicycle";

export const revalidate = 300;

export default async function StylePage() {
  // 레이아웃을 먼저 로드하고 콘텐츠는 스트리밍
  const layoutData = await getBicycleStyleLayout();

  return (
    <DataValidationWrapper data={layoutData}>
      {(validLayoutData) => (
        <PageSuspenseWrapper loadingMessage="스타일 카테고리를 불러오는 중...">
          <StylePageContent layoutData={validLayoutData} />
        </PageSuspenseWrapper>
      )}
    </DataValidationWrapper>
  );
}

// 콘텐츠를 별도 컴포넌트로 분리하여 스트리밍
async function StylePageContent({ layoutData }: { layoutData: BicycleLayoutData }) {
  const contentData = await getBicycleStyleContent();
  if (!contentData) notFound();

  return <BicycleStylePageLayoutRenderer layoutData={layoutData} contentData={contentData} />;
}
