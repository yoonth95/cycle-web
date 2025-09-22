import { generatePageMetadata } from "@/utils/metadata-generator";

export async function generateMetadata() {
  return generatePageMetadata({
    title: "오시는길",
    description:
      "삼천리자전거 중동역점 위치와 연락처 정보입니다. 도보시 중동북부역 2번출구 건너편에서 찾아오실 수 있습니다.",
    keywords: ["삼천리자전거", "오시는길", "매장 위치", "지도", "교통편"],
    image: "/logo-red.png",
    url: "/location",
    type: "website",
  });
}

export default function LocationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
