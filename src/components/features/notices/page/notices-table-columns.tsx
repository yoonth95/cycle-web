import type { ColumnDef, Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatViewCount } from "@/utils/notices-utils";
import { formatDate, isNewArticle, isUpdatedArticle } from "@/utils/common";
import type { NoticeListItemType, NoticeListResponseType } from "@/types/notice";
import { ChevronUpIcon, ChevronDownIcon, Eye, Pin } from "lucide-react";

/**
 * 커스텀 정렬 함수: pin된 항목들을 항상 상단에 유지하고, 그 안에서만 정렬
 * @param sortFn pin되지 않은 항목들에 대한 정렬 함수
 * @returns TanStack Table 정렬 함수
 */
function createPinnedSortingFn(
  sortFn: (rowA: Row<NoticeListItemType>, rowB: Row<NoticeListItemType>) => number,
) {
  return (rowA: Row<NoticeListItemType>, rowB: Row<NoticeListItemType>) => {
    const dataA = rowA.original;
    const dataB = rowB.original;

    // 둘 다 pin된 경우
    if (dataA.is_pinned && dataB.is_pinned) {
      // pin된 항목들끼리는 updated_at 기준 내림차순 정렬 (최신이 위로)
      return new Date(dataB.updated_at).getTime() - new Date(dataA.updated_at).getTime();
    }

    // 하나만 pin된 경우
    if (dataA.is_pinned && !dataB.is_pinned) return -1; // A가 위로
    if (!dataA.is_pinned && dataB.is_pinned) return 1; // B가 위로

    // 둘 다 pin되지 않은 경우 기존 정렬 로직 적용
    return sortFn(rowA, rowB);
  };
}

/**
 * 공지사항 테이블 컬럼 정의를 생성합니다
 * - pin된 항목과 일반 항목을 분리해서 정렬
 * - pin된 항목들은 updated_at 기준으로 정렬
 * - 일반 항목들은 기존 정렬 로직 적용
 * @param noticeListData 공지사항 목록 데이터
 * @returns 테이블 컬럼 정의 배열
 */
export function createNoticesTableColumns(
  noticeListData: NoticeListResponseType,
): ColumnDef<NoticeListItemType>[] {
  return [
    // Pin 상태 표시 컬럼
    {
      id: "pinned",
      accessorKey: "is_pinned",
      header: "",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex justify-center">
          {row.original.is_pinned && <Pin className="h-4 w-4 fill-current text-amber-500" />}
        </div>
      ),
      size: 50,
    },

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
        // pin된 항목에 대해서는 순번을 표시하지 않음
        if (row.original.is_pinned) {
          return <div className="text-center text-sm font-medium text-amber-500">고정</div>;
        }

        const index =
          noticeListData.totalCount -
          (noticeListData.currentPage - 1) * noticeListData.pageSize -
          row.index;
        return <div className="text-center text-sm text-gray-500">{index}</div>;
      },
      size: 80,
      sortingFn: createPinnedSortingFn(() => {
        return 0; // pin되지 않은 항목들의 순번은 기본 순서 유지
      }),
    },

    // 제목 컬럼 (정렬 불가)
    {
      accessorKey: "title",
      header: "제목",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <span
            className={`font-medium transition-colors hover:text-blue-600 ${
              row.original.is_pinned ? "text-amber-700" : "text-gray-900"
            }`}
          >
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
            <div className={row.original.is_pinned ? "text-amber-700" : "text-gray-900"}>
              {formatDate(isUpdated ? row.original.updated_at : row.original.created_at, true)}
            </div>
            {isUpdated && <div className="text-xs text-gray-500">(수정됨)</div>}
          </div>
        );
      },
      size: 120,
      sortingFn: createPinnedSortingFn((rowA, rowB) => {
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
      }),
    },

    // 조회수 컬럼 (정렬 불가)
    {
      accessorKey: "view_count",
      header: "조회수",
      enableSorting: false,
      cell: ({ row }) => (
        <div
          className={`flex items-center justify-center space-x-1 text-sm ${
            row.original.is_pinned ? "text-amber-600" : "text-gray-600"
          }`}
        >
          <Eye className="h-3 w-3" />
          <span>{formatViewCount(row.original.view_count)}</span>
        </div>
      ),
      size: 100,
    },
  ];
}
