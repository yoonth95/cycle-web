import { notFound } from "next/navigation";
import { getContactDetail } from "@/lib/contact/server";
import { DataValidationWrapper, PageSuspenseWrapper } from "@/components/common";
import GenericDynamicMetadataUpdater from "@/components/common/generic-dynamic-metadata-updater";
import { ContactDetailWithAuth } from "@/components/features/contacts/detail";
import { generatePageMetadata } from "@/utils/metadata-generator";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return generatePageMetadata({
    title: "문의사항",
    description: "삼천리자전거에 문의하세요. 제품 문의, 매장 정보, 서비스 관련 문의를 받습니다.",
    keywords: ["삼천리자전거", "문의사항", "고객지원"],
    url: `/contacts/${id}`,
    type: "website",
  });
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
