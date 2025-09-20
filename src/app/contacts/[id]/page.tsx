import { notFound } from "next/navigation";
import { getContactDetail } from "@/lib/contact/server";
import { DataValidationWrapper, PageSuspenseWrapper } from "@/components/common";
import GenericDynamicMetadataUpdater from "@/components/common/generic-dynamic-metadata-updater";
import { ContactDetailWithAuth } from "@/components/features/contacts/detail";

export const revalidate = 300;

export async function generateMetadata() {
  return {
    title: `문의사항 | 삼천리 자전거 중동역점`,
    description: "문의사항입니다.",
  };
}

export default async function ContactDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const contact = await getContactDetail(id);

  if (!contact) notFound();

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8 xl:max-w-[70rem]">
      <GenericDynamicMetadataUpdater data={contact} />

      <DataValidationWrapper data={contact}>
        {(validContact) => (
          <PageSuspenseWrapper loadingMessage="문의내역을 불러오는 중...">
            <ContactDetailWithAuth contact={validContact} />
          </PageSuspenseWrapper>
        )}
      </DataValidationWrapper>
    </div>
  );
}
