import { generatePageMetadata } from "@/utils/metadata-generator";

export async function generateMetadata() {
  return generatePageMetadata({
    title: "자전거",
    description:
      "삼천리자전거의 다양한 자전거 제품을 만나보세요. 라이프스타일, 스포츠, 스마트 모빌리티 등 다양한 카테고리의 자전거를 소개합니다.",
    keywords: ["삼천리자전거", "자전거", "바이시클", "라이프스타일", "스포츠", "스마트 모빌리티"],
    image: "/bike.png", // 자전거 대표 이미지
    url: "/bicycles",
    type: "website",
  });
}

export default function BicyclesLayout({ children }: { children: React.ReactNode }) {
  return <main className="min-h-[calc(100vh-64px)] bg-gray-50">{children}</main>;
}
