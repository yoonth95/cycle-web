import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatViewCount } from "@/utils/notices-utils";
import { formatDate, isNewArticle, isUpdatedArticle } from "@/utils/common";
import type { NoticeListItemType, NoticeListResponseType } from "@/types/notice";
import { ChevronUpIcon, ChevronDownIcon, Eye } from "lucide-react";

/**
 * 공지사항 테이블 컬럼 정의를 생성합니다
 */
export function createNoticesTableColumns(
  noticeListData: NoticeListResponseType,
): ColumnDef<NoticeListItemType>[] {
  return [
    // 순번 컬럼
    {
      id: "index",
      accessorFn: (row) => row.id,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium hover:bg-transparent"
        >
          순번
          {column.getIsSorted() === "asc" ? (
            <ChevronUpIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ChevronDownIcon className="ml-2 h-4 w-4" />
          ) : null}
        </Button>
      ),
      cell: ({ row }) => {
        const index =
          noticeListData.totalCount -
          (noticeListData.currentPage - 1) * noticeListData.pageSize -
          row.index;
        return <div className="text-center text-sm text-gray-500">{index}</div>;
      },
      size: 80,
      sortingFn: (rowA, rowB) => {
        return rowB.index - rowA.index; // 내림차순 (최신이 위로)
      },
    },

    // 제목 컬럼 (정렬 불가)
    {
      accessorKey: "title",
      header: "제목",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <span className="font-medium text-gray-900 transition-colors hover:text-blue-600">
            {row.original.title}
          </span>
          {isNewArticle(row.original.created_at) && (
            <Badge variant="destructive" className="text-[10px]">
              NEW
            </Badge>
          )}
        </div>
      ),
      minSize: 300,
    },

    // 날짜 컬럼
    {
      accessorKey: "date",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium hover:bg-transparent"
        >
          날짜
          {column.getIsSorted() === "asc" ? (
            <ChevronUpIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ChevronDownIcon className="ml-2 h-4 w-4" />
          ) : null}
        </Button>
      ),
      cell: ({ row }) => {
        const isUpdated = isUpdatedArticle(row.original.created_at, row.original.updated_at);

        return (
          <div className="flex flex-wrap items-center justify-center gap-1 text-sm">
            <div className="text-gray-900">
              {formatDate(isUpdated ? row.original.updated_at : row.original.created_at, true)}
            </div>
            {isUpdated && <div className="text-xs text-gray-500">(수정됨)</div>}
          </div>
        );
      },
      size: 120,
      sortingFn: (rowA, rowB) => {
        const dateA = new Date(
          Math.max(
            new Date(rowA.original.created_at).getTime(),
            new Date(rowA.original.updated_at).getTime(),
          ),
        );
        const dateB = new Date(
          Math.max(
            new Date(rowB.original.created_at).getTime(),
            new Date(rowB.original.updated_at).getTime(),
          ),
        );
        return dateA.getTime() - dateB.getTime();
      },
    },

    // 조회수 컬럼 (정렬 불가)
    {
      accessorKey: "view_count",
      header: "조회수",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
          <Eye className="h-3 w-3" />
          <span>{formatViewCount(row.original.view_count)}</span>
        </div>
      ),
      size: 100,
    },
  ];
}
