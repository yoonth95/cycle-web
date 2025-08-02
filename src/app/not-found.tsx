"use client";

import NotFoundPage from "@/components/common/not-found-page";

export default function NotFound() {
  return (
    <NotFoundPage
      icon="search"
      title="페이지를 찾을 수 없습니다"
      description={
        <>
          요청하신 페이지가 존재하지 않거나 삭제되었을 수 있습니다.
          <br />
          URL을 다시 확인해 주세요.
        </>
      }
      actions={[
        {
          label: "이전 페이지로 가기",
          icon: "arrowLeft",
          variant: "ghost",
          onClick: () => window.history.back(),
        },
        {
          href: "/",
          label: "홈으로 돌아가기",
          icon: "home",
          className: "w-full bg-red-500 hover:bg-red-600",
        },
      ]}
    />
  );
}
