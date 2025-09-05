import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageSuspenseWrapper, DataValidationWrapper } from "@/components/common";
import { DynamicMetadataUpdater } from "@/components/features/bicycles/common";
import { CategoryLayoutRenderer } from "@/components/features/bicycles/category";
import { getBicycleCategoriesOptions, getBicycleCategoryLayout } from "@/lib/bicycle/server";
import { generateBasicBicycleCategoryMetadata } from "@/utils/metadata-generator";
import type { BicycleCategoryLayoutData, CategoryPageData } from "@/types/bicycle";

export const revalidate = 300;

// 기본 메타데이터 생성 (데이터 로드 전)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  return generateBasicBicycleCategoryMetadata({ category });
}

export default async function StyleCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  // 레이아웃을 먼저 빠르게 로드
  const layoutData = await getBicycleCategoryLayout();

  return (
    <DataValidationWrapper data={layoutData}>
      {(validLayoutData) => (
        <div className="bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <PageSuspenseWrapper loadingMessage="카테고리 상품을 불러오는 중...">
              <CategoryPageContent layoutData={validLayoutData} category={category} />
            </PageSuspenseWrapper>
          </div>
        </div>
      )}
    </DataValidationWrapper>
  );
}

// 카테고리 데이터를 별도 컴포넌트로 분리하여 스트리밍
async function CategoryPageContent({
  layoutData,
  category,
}: {
  layoutData: BicycleCategoryLayoutData;
  category: string;
}) {
  const { categories, currentCategory } = await getBicycleCategoriesOptions(category);

  if (!currentCategory) notFound();

  // CategoryPageData 구성
  const categoryPageData: CategoryPageData = {
    categoryList: categories,
    category: currentCategory,
    subcategories: currentCategory.subcategories,
  };

  return (
    <>
      {/* 동적 메타데이터 업데이트 */}
      <DynamicMetadataUpdater category={currentCategory} />

      {/* 실제 페이지 콘텐츠 */}
      <CategoryLayoutRenderer layoutData={layoutData} categoryPageData={categoryPageData} />
    </>
  );
}
