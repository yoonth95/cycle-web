import { notFound } from "next/navigation";
import { PageSuspenseWrapper, DataValidationWrapper } from "@/components/common";
import { NoticeDetailContent } from "@/components/features/notices/detail";
import { getNoticeDetail, incrementNoticeViewCount } from "@/lib/notice/server";
import GenericDynamicMetadataUpdater from "@/components/common/generic-dynamic-metadata-updater";

export const revalidate = 300;

export async function generateMetadata() {
  return {
    title: `공지사항 | 삼천리 자전거 중동역점`,
    description: "공지사항입니다.",
  };
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
