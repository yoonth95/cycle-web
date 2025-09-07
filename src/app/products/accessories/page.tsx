import { notFound } from "next/navigation";
import { PageSuspenseWrapper, DataValidationWrapper } from "@/components/common";
import { ProductsLayoutRenderer } from "@/components/features/products";
import { getProductsLayoutWithPageInfo, getProductsContent } from "@/lib/products";
import { ProductsLayoutData } from "@/types/products";

export const revalidate = 300;

export default async function AccessoriesPage() {
  // 레이아웃 조회 시 pageId와 slug도 함께 받기
  const layoutResult = await getProductsLayoutWithPageInfo();

  return (
    <DataValidationWrapper data={layoutResult}>
      {(validLayoutResult) => (
        <PageSuspenseWrapper loadingMessage="자전거 용품 콘텐츠를 불러오는 중...">
          <AccessoriesPageContent
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
async function AccessoriesPageContent({
  layoutData,
  pageId,
  slug,
}: {
  layoutData: ProductsLayoutData;
  pageId: string;
  slug: string;
}) {
  const contentData = await getProductsContent(pageId, slug);
  if (!contentData) notFound();

  return <ProductsLayoutRenderer layoutData={layoutData} contentData={contentData} />;
}
