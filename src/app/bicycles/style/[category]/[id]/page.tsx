import { notFound } from "next/navigation";
import { DetailContent } from "@/components/features/bicycles/detail";
import { getBicycleDetailWithCategoryValidation } from "@/lib/bicycle/server";
import { transformBicycleFromDBToDetail } from "@/lib/bicycle/transform";
import { generatePageMetadata } from "@/utils/metadata-generator";

interface BicycleDetailPageProps {
  params: Promise<{
    category: string;
    id: string;
  }>;
}

export async function generateMetadata({ params }: BicycleDetailPageProps) {
  const { category, id } = await params;

  return generatePageMetadata({
    title: "자전거 제품",
    description: "삼천리자전거의 다양한 자전거 제품을 만나보세요.",
    keywords: ["삼천리자전거", "자전거", "제품"],
    url: `/bicycles/style/${category}/${id}`,
    type: "website",
  });
}

export default async function BicycleDetailPage({ params }: BicycleDetailPageProps) {
  const { category, id } = await params;

  const bicycleFromDB = await getBicycleDetailWithCategoryValidation(id, category);

  // 데이터가 없거나 카테고리가 매칭되지 않으면 not-found 페이지로 리다이렉트
  if (!bicycleFromDB) notFound();

  return <DetailContent bicycleData={transformBicycleFromDBToDetail(bicycleFromDB)} />;
}
