import { generatePageMetadata } from "@/utils/metadata-generator";

export async function generateMetadata() {
  return generatePageMetadata({
    title: "블로그 리뷰",
    description:
      "삼천리자전거의 다양한 자전거 관련 블로그와 리뷰를 만나보세요. 최신 뉴스와 팁을 확인하세요.",
    keywords: ["삼천리자전거", "블로그", "리뷰", "자전거 뉴스", "자전거 팁"],
    image: "/logo-red.png", // 블로그 대표 이미지
    url: "/blog",
    type: "website",
  });
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <main className="min-h-[calc(100vh-64px)]">{children}</main>;
}
