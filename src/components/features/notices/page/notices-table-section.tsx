"use client";

import React from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { NoticesTable } from "@/components/features/notices/page";
import { getNoticeListFromAPI } from "@/lib/notice/client";
import { useTableList } from "@/hooks/use-table-list";
import type { NoticesLayoutContentTable } from "@/types/notice";

interface NoticesTableSectionProps {
  NoticesTableData: NoticesLayoutContentTable;
}

export function NoticesTableSection({ NoticesTableData }: NoticesTableSectionProps) {
  const {
    data: noticeListData,
    isLoading,
    isFetching,
    error,
    handlePageChange,
  } = useTableList({
    defaultParams: NoticesTableData.defaultValues,
    queryKey: "notices-list",
    queryFn: getNoticeListFromAPI,
  });

  // 에러 상태 처리
  if (error) {
    return (
      <section className={NoticesTableData.className}>
        <div className="flex min-h-100 items-center justify-center overflow-hidden">
          <div className="p-8 text-center text-red-500">
            데이터를 불러오는 중 오류가 발생했습니다. 새로고침 후 다시 시도해주세요.
            <div className="mt-2 text-sm">{error.message}</div>
          </div>
        </div>
      </section>
    );
  }

  // 초기 로딩 상태 (데이터가 없을 때만)
  if (isLoading && !noticeListData) {
    return (
      <section className={NoticesTableData.className}>
        <div className="flex min-h-100 items-center justify-center overflow-hidden">
          <LoadingSpinner size="sm" fullScreen={false} message="공지사항 불러오는 중..." />
        </div>
      </section>
    );
  }

  // 데이터가 없는 경우
  if (!noticeListData) {
    return (
      <section className={NoticesTableData.className}>
        <div className="flex min-h-100 items-center justify-center overflow-hidden">
          <div className="p-8 text-center text-gray-500">등록된 공지사항이 없습니다.</div>
        </div>
      </section>
    );
  }

  return (
    <section className={NoticesTableData.className}>
      <div className="relative">
        <NoticesTable
          noticeListData={noticeListData}
          onPageChange={handlePageChange}
          isFetching={isFetching}
        />
      </div>
    </section>
  );
}
