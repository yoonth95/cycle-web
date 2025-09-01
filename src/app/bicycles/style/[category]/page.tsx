import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CategoryLayoutRenderer } from "@/components/features/bicycles/category";
import { getBicycleCategoriesOptions, getBicycleCategoryLayout } from "@/lib/bicycle/server";
import type { BicycleCategoryLayoutData, CategoryPageData } from "@/types/bicycle";

export const revalidate = 300;

// 메타데이터 생성 함수를 page.tsx로 이동
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;

  try {
    // 카테고리 정보를 가져와서 한국어 제목 사용
    const { currentCategory } = await getBicycleCategoriesOptions(category);

    if (!currentCategory) {
      return {
        title: "페이지를 찾을 수 없습니다 | 삼천리자전거",
        description: "요청하신 페이지를 찾을 수 없습니다.",
      };
    }

    // 한국어 제목으로 메타데이터 생성
    return {
      title: `${currentCategory.title} | 삼천리자전거`,
      description: `${currentCategory.title} 자전거 모음. 다양한 ${currentCategory.title} 자전거를 만나보세요.`,

      // 추가 SEO 최적화
      keywords: [
        currentCategory.title,
        "자전거",
        "삼천리자전거",
        ...currentCategory.subcategories.map((sub) => sub.name),
      ].join(", "),

      // Open Graph 메타데이터
      openGraph: {
        title: `${currentCategory.title} | 삼천리자전거`,
        description: `${currentCategory.title} 자전거 모음. 다양한 ${currentCategory.title} 자전거를 만나보세요.`,
        type: "website",
        locale: "ko_KR",
      },

      // 구조화된 데이터를 위한 추가 정보
      alternates: {
        canonical: `/bicycles/${category}`,
      },

      // 로봇 메타태그
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
        },
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);

    // 에러 시 기본 메타데이터 반환
    return {
      title: `${category} | 삼천리자전거`,
      description: `${category} 자전거 목록`,
    };
  }
}

export default async function StyleCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  // 레이아웃을 먼저 빠르게 로드
  const layoutData = await getBicycleCategoryLayout();
  if (!layoutData) notFound();

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
              {/* 사이드바 스켈레톤 */}
              <div className="space-y-4 lg:col-span-1">
                <div className="h-8 animate-pulse rounded bg-gray-200"></div>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-6 animate-pulse rounded bg-gray-200"></div>
                ))}
              </div>
              {/* 콘텐츠 스켈레톤 */}
              <div className="space-y-6 lg:col-span-3">
                <div className="h-12 animate-pulse rounded bg-gray-200"></div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="h-64 animate-pulse rounded bg-gray-200"></div>
                  ))}
                </div>
              </div>
            </div>
          }
        >
          <CategoryPageContent layoutData={layoutData} category={category} />
        </Suspense>
      </div>
    </div>
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

  return <CategoryLayoutRenderer layoutData={layoutData} categoryPageData={categoryPageData} />;
}
