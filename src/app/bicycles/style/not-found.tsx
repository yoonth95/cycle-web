import NotFoundPage from "@/components/common/not-found-page";

export default function StyleNotFound() {
  return (
    <NotFoundPage
      icon="bike"
      title="페이지를 찾을 수 없습니다"
      description={
        <>
          요청하신 스타일 카테고리 페이지가 존재하지 않거나
          <br />
          잘못된 경로로 접근하셨습니다.
        </>
      }
      actions={[
        {
          href: "/",
          label: "홈으로 돌아가기",
          icon: "home",
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
