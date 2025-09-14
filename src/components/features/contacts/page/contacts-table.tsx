"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { CustomPagination } from "@/components/common";
import {
  ContactsTableHeader,
  createContactsTableColumns,
  ContactsTableMobileBody,
} from "@/components/features/contacts/page";
import { useMobile } from "@/hooks/use-mobile";
import type { ContactsListResponseType } from "@/types/contact";

interface ContactsTableProps {
  contactListData: ContactsListResponseType;
  onPageChange?: (page: number) => void; // 선택적 prop으로 페이지 변경 핸들러
  isFetching?: boolean;
}

/**
 * 문의사항 테이블 메인 컴포넌트
 */
export function ContactsTable({ contactListData, onPageChange, isFetching }: ContactsTableProps) {
  const [isMobile] = useMobile({});
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([
    { id: "index", desc: true }, // 기본적으로 순번(생성일) 기준 내림차순 정렬
  ]);

  const columns = createContactsTableColumns(contactListData);

  const table = useReactTable({
    data: contactListData.contacts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    manualSorting: false, // 클라이언트 사이드 정렬 사용
  });

  const handlePageChange = (page: number) => {
    onPageChange?.(page);
  };

  const handleRowClick = (contactId: string) => {
    router.push(`/contacts/${contactId}`);
  };

  return (
    <>
      {/* 테이블 헤더 정보 */}
      <ContactsTableHeader contactListData={contactListData} />

      {isFetching ? (
        <div className="flex min-h-100 items-center justify-center overflow-hidden">
          <LoadingSpinner size="sm" fullScreen={false} message="조회 중..." />
        </div>
      ) : (
        <>
          {/* 모바일 테이블 레이아웃 */}
          {isMobile ? (
            <div className="divide-y divide-gray-200">
              {contactListData.contacts.length ? (
                contactListData.contacts.map((contact, index) => (
                  <ContactsTableMobileBody
                    key={contact.id}
                    contact={contact}
                    index={index}
                    contactListData={contactListData}
                  />
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">등록된 문의사항이 없습니다.</div>
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
                        className="cursor-pointer text-center transition-colors hover:bg-gray-50"
                        onClick={() => handleRowClick(row.original.id)}
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
                        등록된 문의사항이 없습니다.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}

          {/* 페이지네이션 */}
          <CustomPagination
            totalPages={contactListData.totalPages}
            currentPage={contactListData.currentPage}
            mode="button"
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
}
