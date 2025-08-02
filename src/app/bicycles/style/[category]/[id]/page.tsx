import { notFound } from "next/navigation";
import { DetailContent } from "@/components/features/bicycles/detail";
import bicycleDetailsData from "@/data/bicycle-details.json";

interface BicycleDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BicycleDetailPage({ params }: BicycleDetailPageProps) {
  const { id } = await params;

  // 자전거 데이터가 존재하는지 확인
  const bicycleData = bicycleDetailsData[id as keyof typeof bicycleDetailsData];

  // 데이터가 없으면 not-found 페이지로 리다이렉트
  if (!bicycleData) {
    notFound();
  }

  return <DetailContent bicycleData={bicycleData} />;
}
