import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BicyclePageLayoutRenderer } from "@/components/features/bicycles/page";
import { getBicycleLayout, getBicycleContent } from "@/lib/bicycle";
import { BicycleLayoutData } from "@/types/bicycle";

export const revalidate = 300;

// // 빠른 레이아웃 컴포넌트
// async function BicycleLayoutShell() {
//   const layoutData = await getBicycleLayout();
//   if (!layoutData) notFound();
//   return layoutData;
// }

// // 느린 콘텐츠 컴포넌트
// async function BicycleContentShell() {
//   const contentData = await getBicycleContent();
//   if (!contentData) notFound();
//   return contentData;
// }

export default async function BicyclesPage() {
  // 레이아웃을 먼저 로드하고 콘텐츠는 스트리밍
  const layoutData = await getBicycleLayout();
  if (!layoutData) notFound();

  return (
    <Suspense
      fallback={
        <div className="animate-pulse">
          <div className="mb-4 h-8 rounded bg-gray-200"></div>
          <div className="h-64 rounded bg-gray-200"></div>
        </div>
      }
    >
      <BicyclePageContent layoutData={layoutData} />
    </Suspense>
  );
}

// 콘텐츠를 별도 컴포넌트로 분리하여 스트리밍
async function BicyclePageContent({ layoutData }: { layoutData: BicycleLayoutData }) {
  const contentData = await getBicycleContent();
  if (!contentData) notFound();

  return <BicyclePageLayoutRenderer layoutData={layoutData} contentData={contentData} />;
}
