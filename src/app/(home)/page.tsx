import { HomeLayoutRenderer } from "@/components/features/home";
import { getHomeLayoutStatic } from "@/lib/home/server";

export const dynamic = "force-static";

export default async function Home() {
  // 빌드 타임에 레이아웃 순서만 가져오기
  const result = await getHomeLayoutStatic();

  if (!result) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">페이지를 찾을 수 없습니다</p>
      </div>
    );
  }

  const { pageId, slug, layoutData } = result;

  return <HomeLayoutRenderer layoutData={layoutData} pageId={pageId} slug={slug} />;
}
