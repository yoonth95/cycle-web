import { PageSuspenseWrapper, DataValidationWrapper } from "@/components/common";
import { BlogPageLayoutRenderer } from "@/components/features/blog/page";
import { getBlogLayout } from "@/lib/blog";

export const revalidate = 300;

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
