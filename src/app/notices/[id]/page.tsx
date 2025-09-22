import { notFound } from "next/navigation";
import { PageSuspenseWrapper, DataValidationWrapper } from "@/components/common";
import { NoticeDetailContent } from "@/components/features/notices/detail";
import { getNoticeDetail, incrementNoticeViewCount } from "@/lib/notice/server";
import GenericDynamicMetadataUpdater from "@/components/common/generic-dynamic-metadata-updater";
import { generatePageMetadata } from "@/utils/metadata-generator";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return generatePageMetadata({
    title: "공지사항",
    description:
      "삼천리자전거의 최신 소식과 공지사항을 확인하세요. 이벤트, 프로모션 등 다양한 정보를 만나보세요.",
    keywords: ["삼천리자전거", "공지사항"],
    url: `/notices/${id}`,
    type: "article",
  });
}

export default async function NoticeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const notice = await getNoticeDetail(id);

  if (!notice) notFound();

  // 조회수 증가 (백그라운드에서 실행)
  incrementNoticeViewCount(id).catch(console.error);

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8 xl:max-w-[70rem]">
      <GenericDynamicMetadataUpdater data={notice} />

      <DataValidationWrapper data={notice}>
        {(validNotice) => (
          <PageSuspenseWrapper loadingMessage="공지사항을 불러오는 중...">
            <NoticeDetailContent notice={validNotice} />
          </PageSuspenseWrapper>
        )}
      </DataValidationWrapper>
    </div>
  );
}
