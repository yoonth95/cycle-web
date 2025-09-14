"use client";

import React from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ContactsTable } from "@/components/features/contacts/page";
import { useContactsList } from "@/hooks/use-contacts-list";
import type { ContactsLayoutContentTable } from "@/types/contact";

interface ContactsTableSectionProps {
  ContactsTableData: ContactsLayoutContentTable;
}

export function ContactsTableSection({ ContactsTableData }: ContactsTableSectionProps) {
  const {
    data: contactListData,
    isLoading,
    isFetching,
    error,
    handlePageChange,
  } = useContactsList(ContactsTableData.defaultValues);

  // 에러 상태 처리
  if (error) {
    return (
      <section className={ContactsTableData.className}>
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
  if (isLoading && !contactListData) {
    return (
      <section className={ContactsTableData.className}>
        <div className="flex min-h-100 items-center justify-center overflow-hidden">
          <LoadingSpinner size="sm" fullScreen={false} message="문의사항 불러오는 중..." />
        </div>
      </section>
    );
  }

  // 데이터가 없는 경우
  if (!contactListData) {
    return (
      <section className={ContactsTableData.className}>
        <div className="flex min-h-100 items-center justify-center overflow-hidden">
          <div className="p-8 text-center text-gray-500">등록된 문의사항이 없습니다.</div>
        </div>
      </section>
    );
  }

  return (
    <section className={ContactsTableData.className}>
      <div className="relative">
        <ContactsTable
          contactListData={contactListData}
          onPageChange={handlePageChange}
          isFetching={isFetching}
        />
      </div>
    </section>
  );
}
