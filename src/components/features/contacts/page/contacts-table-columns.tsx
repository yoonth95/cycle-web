import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { formatDate, isUpdatedArticle } from "@/utils/common";
import type { ContactsListItemType, ContactsListResponseType } from "@/types/contact";
import { ChevronUpIcon, ChevronDownIcon, Lock } from "lucide-react";

/**
 * 문의사항 테이블 컬럼 정의를 생성합니다
 */
export function createContactsTableColumns(
  contactListData: ContactsListResponseType,
): ColumnDef<ContactsListItemType>[] {
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
          contactListData.totalCount -
          (contactListData.currentPage - 1) * contactListData.pageSize -
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
        <div className="flex items-center gap-2">
          {row.original.is_private && (
            <Lock className="group-hover:text-figma-alizarin-crimson h-4 w-4 text-gray-500" />
          )}
          <span className="hover:text-figma-alizarin-crimson group-hover:text-figma-alizarin-crimson font-medium text-gray-900 transition-colors">
            {row.original.title}
          </span>
          {row.original.contact_comments && row.original.contact_comments.length > 0 && (
            <span className="text-figma-alizarin-crimson text-xs font-bold">
              [ {row.original.contact_comments.length} ]
            </span>
          )}
        </div>
      ),
      minSize: 300,
    },

    // 글쓴이 컬럼
    {
      accessorKey: "author",
      header: "작성자",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="text-center text-sm text-gray-900">{row.original.author}</div>
      ),
      size: 120,
    },

    // 작성 날짜 컬럼
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium hover:bg-transparent"
        >
          작성 날짜
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
            <div className="text-gray-900">{formatDate(row.original.created_at, true)}</div>
            {isUpdated && <div className="text-xs text-gray-500">(수정됨)</div>}
          </div>
        );
      },
      size: 120,
      sortingFn: (rowA, rowB) => {
        return (
          new Date(rowB.original.created_at).getTime() -
          new Date(rowA.original.created_at).getTime()
        );
      },
    },
  ];
}
