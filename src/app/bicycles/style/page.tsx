import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BicycleStylePageLayoutRenderer } from "@/components/features/bicycles/style";
import { getBicycleStyleLayout, getBicycleStyleContent } from "@/lib/bicycle";
import { BicycleLayoutData } from "@/types/bicycle";

export const revalidate = 300;

export default async function StylePage() {
  // 레이아웃을 먼저 로드하고 콘텐츠는 스트리밍
  const layoutData = await getBicycleStyleLayout();
  if (!layoutData) notFound();

  return (
    <Suspense
      fallback={
        <div className="animate-pulse space-y-4">
          <div className="h-12 rounded bg-gray-200"></div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 rounded bg-gray-200"></div>
            ))}
          </div>
        </div>
      }
    >
      <StylePageContent layoutData={layoutData} />
    </Suspense>
  );
}

// 콘텐츠를 별도 컴포넌트로 분리하여 스트리밍
async function StylePageContent({ layoutData }: { layoutData: BicycleLayoutData }) {
  const contentData = await getBicycleStyleContent();
  if (!contentData) notFound();

  return <BicycleStylePageLayoutRenderer layoutData={layoutData} contentData={contentData} />;
}
