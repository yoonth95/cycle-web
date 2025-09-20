import Link from "next/link";
import type { ContactsListResponseType } from "@/types/contact";

interface ContactsTableHeaderProps {
  contactListData: ContactsListResponseType;
}

export function ContactsTableHeader({ contactListData }: ContactsTableHeaderProps) {
  return (
    <div className="border-b p-6">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">총 {contactListData.totalCount}건의 문의사항</div>
        <Link
          href="/contacts/new"
          prefetch={true}
          className="bg-figma-alizarin-crimson text-primary-foreground hover:bg-figma-thunderbird flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium"
        >
          문의사항 작성
        </Link>
      </div>
    </div>
  );
}
