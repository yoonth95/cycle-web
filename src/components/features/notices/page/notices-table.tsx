"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CustomPagination } from "@/components/common";
import {
  NoticesTableHeader,
  createNoticesTableColumns,
  NoticesTableMobileBody,
} from "@/components/features/notices/page";
import { useMobile } from "@/hooks/use-mobile";
import type { NoticeListResponseType } from "@/types/notice";

interface NoticesTableProps {
  noticeListData: NoticeListResponseType;
}

/**
 * 공지사항 테이블 메인 컴포넌트
 */
export function NoticesTable({ noticeListData }: NoticesTableProps) {
  const router = useRouter();
  const params = useSearchParams();
  const [isMobile] = useMobile({});
  const [sorting, setSorting] = useState<SortingState>([
    { id: "index", desc: true }, // 기본적으로 순번(생성일) 기준 내림차순 정렬
  ]);

  const columns = createNoticesTableColumns(noticeListData);

  const table = useReactTable({
    data: noticeListData.notices,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    manualSorting: false, // 클라이언트 사이드 정렬 사용
  });

  const handleRowClick = (noticeId: string) => {
    router.push(`/notices/${noticeId}`);
  };

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set("page", page.toString());
    router.push(`?${newParams.toString()}`);
  };

  return (
    <>
      {/* 테이블 헤더 정보 */}
      <NoticesTableHeader noticeListData={noticeListData} />

      {/* 모바일 테이블 레이아웃 */}
      {isMobile ? (
        <div className="divide-y divide-gray-200">
          {noticeListData.notices.length ? (
            noticeListData.notices.map((notice, index) => (
              <NoticesTableMobileBody
                key={notice.id}
                notice={notice}
                index={index}
                noticeListData={noticeListData}
                onClick={handleRowClick}
              />
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">등록된 공지사항이 없습니다.</div>
          )}
        </div>
      ) : (
        /* 데스크톱 테이블 레이아웃 */
        <div className="overflow-hidden">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      style={{ width: header.getSize() }}
                      className="bg-gray-50 text-center font-semibold text-gray-900"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    onClick={() => handleRowClick(row.original.id)}
                    className="cursor-pointer text-center transition-colors hover:bg-gray-50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    등록된 공지사항이 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* 페이지네이션 */}
      <CustomPagination
        totalPages={noticeListData.totalPages}
        currentPage={noticeListData.currentPage}
        mode="button"
        onPageChange={handlePageChange}
      />
    </>
  );
}
