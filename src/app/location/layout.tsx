import { Metadata } from "next";

export const metadata: Metadata = {
  title: "오시는길 | 삼천리자전거",
  description:
    "삼천리자전거 중동역점 위치와 연락처 정보입니다. 도보시 중동북부역 2번출구 건너편에서 찾아오실 수 있습니다.",
};

export default function LocationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
