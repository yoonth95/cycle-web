import { Button } from "@/components/ui/button";
import { generatePaginationNumbers } from "@/utils/notices-utils";
import type { NoticeListResponseType } from "@/types/notice";

interface NoticesPaginationProps {
  noticeListData: NoticeListResponseType;
  onPageChange: (page: number) => void;
}

/**
 * 공지사항 페이지네이션 컴포넌트
 */
export function NoticesPagination({ noticeListData, onPageChange }: NoticesPaginationProps) {
  if (noticeListData.totalPages <= 1) {
    return null;
  }

  const paginationNumbers = generatePaginationNumbers(
    noticeListData.currentPage,
    noticeListData.totalPages,
    10,
  );

  return (
    <div className="border-t bg-gray-50 p-6">
      <div className="flex items-center justify-center space-x-2">
        {/* 이전 버튼 */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(noticeListData.currentPage - 1)}
          disabled={noticeListData.currentPage <= 1}
        >
          이전
        </Button>

        {/* 페이지 번호 버튼들 */}
        <div className="flex items-center space-x-1">
          {paginationNumbers.map((pageNumber) => (
            <Button
              key={pageNumber}
              variant={noticeListData.currentPage === pageNumber ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </Button>
          ))}
        </div>

        {/* 다음 버튼 */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(noticeListData.currentPage + 1)}
          disabled={noticeListData.currentPage >= noticeListData.totalPages}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
