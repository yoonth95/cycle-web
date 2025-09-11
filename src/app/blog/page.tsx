import { PageSuspenseWrapper, DataValidationWrapper } from "@/components/common";
import { BlogPageLayoutRenderer } from "@/components/features/blog/page";
import { getBlogLayout } from "@/lib/blog";

export const revalidate = 300;

export const metadata = {
  title: "블로그 리뷰 | 삼천리 자전거 중동역점",
  description: "다양한 자전거 관련 블로그와 리뷰를 만나보세요.",
};

export default async function BlogPage() {
  const layoutData = (await getBlogLayout())?.layout;

  return (
    <>
      <DataValidationWrapper data={layoutData}>
        {(validLayoutData) => {
          return (
            <div className={validLayoutData.layout.className}>
              <div className={validLayoutData.layout.content.className}>
                <PageSuspenseWrapper loadingMessage="블로그 리뷰를 불러오는 중...">
                  <BlogPageLayoutRenderer layoutData={validLayoutData.layout.content} />
                </PageSuspenseWrapper>
              </div>
            </div>
          );
        }}
      </DataValidationWrapper>
    </>
  );
}
