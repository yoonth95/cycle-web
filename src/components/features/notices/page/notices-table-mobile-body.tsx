import React from "react";
import { Badge } from "@/components/ui/badge";
import { formatDate, isNewNotice, isUpdatedNotice } from "@/utils/notices-utils";
import { NoticeListItemType, NoticeListResponseType } from "@/types/notice";

export function NoticesTableMobileBody({
  notice,
  index,
  noticeListData,
  onClick,
}: {
  notice: NoticeListItemType;
  index: number;
  noticeListData: NoticeListResponseType;
  onClick: (noticeId: string) => void;
}) {
  const displayIndex =
    noticeListData.totalCount - (noticeListData.currentPage - 1) * noticeListData.pageSize - index;

  const isUpdated = isUpdatedNotice(notice.created_at, notice.updated_at);

  return (
    <div
      onClick={() => onClick(notice.id)}
      className="cursor-pointer bg-white p-4 transition-colors hover:bg-gray-50"
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">#{displayIndex}</span>
            <h3 className="flex-1 text-sm font-medium text-gray-900 transition-colors hover:text-blue-600 [@media(min-width:425px)]:text-base">
              {notice.title}
            </h3>
            {isNewNotice(notice.created_at) && (
              <Badge
                variant="destructive"
                className="text-[10px] [@media(min-width:425px)]:text-xs"
              >
                NEW
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span>{formatDate(isUpdated ? notice.updated_at : notice.created_at, true)}</span>
            {isUpdated && <span>(수정됨)</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
