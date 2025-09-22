import { generatePageMetadata } from "@/utils/metadata-generator";

export async function generateMetadata() {
  return generatePageMetadata({
    title: "자전거 스타일",
    description:
      "삼천리자전거의 다양한 스타일별 자전거를 확인하세요. 라이프스타일, 스포츠, 스마트 모빌리티 등 카테고리별로 나뉜 자전거를 소개합니다.",
    keywords: ["삼천리자전거", "자전거 스타일", "라이프스타일", "스포츠", "스마트 모빌리티"],
    image: "/bike.png",
    url: "/bicycles/style",
    type: "website",
  });
}

export default function BicyclesStyleLayout({ children }: { children: React.ReactNode }) {
  return <main className="min-h-[calc(100vh-64px)] bg-gray-50">{children}</main>;
}
