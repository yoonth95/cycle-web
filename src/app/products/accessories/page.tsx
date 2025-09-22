import { notFound } from "next/navigation";
import { PageSuspenseWrapper, DataValidationWrapper } from "@/components/common";
import { ProductsLayoutRenderer } from "@/components/features/products";
import { getProductsLayoutWithPageInfo, getProductsContent } from "@/lib/products";
import { ProductsLayoutData } from "@/types/products";
import { generatePageMetadata } from "@/utils/metadata-generator";

export const revalidate = 300;

export async function generateMetadata() {
  return generatePageMetadata({
    title: "자전거 용품",
    description:
      "삼천리자전거의 다양한 자전거 용품과 액세서리를 만나보세요. 헬멧, 라이트, 잠금장치 등 필수 용품을 확인하세요.",
    keywords: ["삼천리자전거", "자전거 용품", "액세서리", "헬멧", "라이트", "잠금장치"],
    image: "/bike.png",
    url: "/products/accessories",
    type: "website",
  });
}

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
