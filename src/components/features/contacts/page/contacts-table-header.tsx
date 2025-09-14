import type { ContactsListResponseType } from "@/types/contact";

interface ContactsTableHeaderProps {
  contactListData: ContactsListResponseType;
}

export function ContactsTableHeader({ contactListData }: ContactsTableHeaderProps) {
  return (
    <div className="border-b p-6">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">총 {contactListData.totalCount}건의 문의사항</div>
        <div className="text-sm text-gray-600">
          페이지 {contactListData.currentPage} / {contactListData.totalPages}
        </div>
      </div>
    </div>
  );
}
