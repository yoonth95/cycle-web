import type { NoticeListResponseType } from "@/types/notice";

interface NoticesTableHeaderProps {
  noticeListData: NoticeListResponseType;
}

/**
 * 공지사항 테이블 상단 정보를 표시하는 컴포넌트
 */
export function NoticesTableHeader({ noticeListData }: NoticesTableHeaderProps) {
  return (
    <div className="border-b p-6">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">총 {noticeListData.totalCount}개의 공지사항</div>
        <div className="text-sm text-gray-600">
          페이지 {noticeListData.currentPage} / {noticeListData.totalPages}
        </div>
      </div>
    </div>
  );
}
