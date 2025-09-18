import { PageSuspenseWrapper, DataValidationWrapper } from "@/components/common";
import { ContactsPageLayoutContentRenderer } from "@/components/features/contacts/page";
import { getContactsLayout } from "@/lib/contact/server";

export const revalidate = 300;

export default async function ContactsPage() {
  const layoutData = (await getContactsLayout("contacts"))?.layout;

  return (
    <DataValidationWrapper data={layoutData}>
      {(validLayoutData) => {
        return (
          <div className={validLayoutData.layout.className}>
            <div className={validLayoutData.layout.content.className}>
              <PageSuspenseWrapper loadingMessage="문의사항을 불러오는 중...">
                <ContactsPageLayoutContentRenderer layoutData={validLayoutData.layout.content} />
              </PageSuspenseWrapper>
            </div>
          </div>
        );
      }}
    </DataValidationWrapper>
  );
}
