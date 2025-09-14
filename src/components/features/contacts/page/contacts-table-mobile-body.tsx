import React from "react";
import { Badge } from "@/components/ui/badge";
import { isNewNotice, isUpdatedNotice } from "@/utils/notices-utils";
import { formatDate } from "@/utils/common";
import { ContactsListItemType, ContactsListResponseType } from "@/types/contact";

export function ContactsTableMobileBody({
  contact,
  index,
  contactListData,
  // onClick,
}: {
  contact: ContactsListItemType;
  index: number;
  contactListData: ContactsListResponseType;
  // onClick: (contactId: string) => void;
}) {
  const displayIndex =
    contactListData.totalCount -
    (contactListData.currentPage - 1) * contactListData.pageSize -
    index;

  const isUpdated = isUpdatedNotice(contact.created_at, contact.created_at);

  return (
    <div
      // onClick={() => onClick(contact.id)}
      className="cursor-pointer bg-white p-4 transition-colors hover:bg-gray-50"
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center gap-2">
            <h3 className="flex flex-1 items-center gap-2 text-sm font-medium text-gray-900 transition-colors hover:text-blue-600 [@media(min-width:425px)]:text-base">
              {isNewNotice(contact.created_at) && (
                <Badge
                  variant="destructive"
                  className="text-[10px] [@media(min-width:425px)]:text-xs"
                >
                  N
                </Badge>
              )}
              {contact.title}
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span>{formatDate(isUpdated ? contact.created_at : contact.created_at, true)}</span>
            {isUpdated && <span>(수정됨)</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
