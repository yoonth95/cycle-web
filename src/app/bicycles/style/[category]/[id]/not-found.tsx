"use client";

import NotFoundPage from "@/components/common/not-found-page";

export default function NotFound() {
  return (
    <NotFoundPage
      icon="bike"
      title="찾으시는 자전거 정보를 찾을 수 없습니다."
      description={
        <p className="mx-auto text-base leading-relaxed break-keep text-gray-600 sm:text-xl">
          요청하신 자전거 정보가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
      }
      actions={[
        {
          onClick: () => window.history.back(),
          label: "이전 페이지로 가기",
          icon: "arrowLeft",
          variant: "ghost",
        },
        {
          href: "/bicycles/style",
          label: "스타일별 자전거 보기",
          icon: "bike",
          className: "w-full bg-red-500 hover:bg-red-600",
        },
      ]}
    />
  );
}
