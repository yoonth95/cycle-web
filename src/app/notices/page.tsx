import { PageSuspenseWrapper, DataValidationWrapper } from "@/components/common";
import { NoticesPageLayoutContentRenderer } from "@/components/features/notices/page";
import { getNoticesLayout } from "@/lib/notice/server";

export const revalidate = 300;

export const metadata = {
  title: "공지사항 | 삼천리 자전거 중동역점",
  description: "삼천리 자전거 중동역점의 최신 소식과 공지사항을 확인하세요.",
};

export default async function NoticesPage() {
  const layoutData = (await getNoticesLayout())?.layout;

  return (
    <DataValidationWrapper data={layoutData?.layout}>
      {(validLayoutData) => {
        return (
          <div className={validLayoutData.className}>
            <div className={validLayoutData.content.className}>
              <PageSuspenseWrapper loadingMessage="공지사항을 불러오는 중...">
                <NoticesPageLayoutContentRenderer layoutData={validLayoutData.content} />
              </PageSuspenseWrapper>
            </div>
          </div>
        );
      }}
    </DataValidationWrapper>
  );
}
