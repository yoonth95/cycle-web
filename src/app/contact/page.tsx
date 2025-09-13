import { PageSuspenseWrapper, DataValidationWrapper } from "@/components/common";
import { ContactPageLayoutRenderer } from "@/components/features/contact/page";
import { getContactLayout } from "@/lib/contact";

export const revalidate = 300;

export const metadata = {
  title: "문의사항 | 삼천리 자전거 중동역점",
  description: "궁금한 점이 있으시면 언제든지 문의해 주세요. 빠른 시간 내에 답변드리겠습니다.",
};

export default async function ContactPage() {
  const layoutData = (await getContactLayout())?.layout;

  return (
    <>
      <DataValidationWrapper data={layoutData}>
        {(validLayoutData) => {
          return (
            <div className={validLayoutData.layout.className}>
              <div className={validLayoutData.layout.content.className}>
                <PageSuspenseWrapper loadingMessage="문의사항 페이지를 불러오는 중...">
                  <ContactPageLayoutRenderer layoutData={validLayoutData.layout.content} />
                </PageSuspenseWrapper>
              </div>
            </div>
          );
        }}
      </DataValidationWrapper>
    </>
  );
}
