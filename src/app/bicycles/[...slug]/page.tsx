import { notFound } from "next/navigation";

interface InvalidRoutePageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function InvalidRoutePage({ params }: InvalidRoutePageProps) {
  const { slug } = await params;

  // 허용된 경로가 아니면 not-found로 리다이렉트
  // 현재 유효한 경로들:
  // - /bicycles (이미 page.tsx에서 처리)
  // - /bicycles/style (이미 style/page.tsx에서 처리)
  // - /bicycles/style/[category] (이미 style/[category]/page.tsx에서 처리)
  // - /bicycles/style/[category]/[id] (이미 style/[category]/[id]/page.tsx에서 처리)

  // 여기까지 오는 모든 경로는 잘못된 경로이므로 not-found로 리다이렉트
  notFound();
}
