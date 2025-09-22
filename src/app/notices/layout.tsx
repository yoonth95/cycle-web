import { generatePageMetadata } from "@/utils/metadata-generator";

export async function generateMetadata() {
  return generatePageMetadata({
    title: "공지사항",
    description:
      "삼천리자전거의 최신 소식과 공지사항을 확인하세요. 이벤트, 프로모션 등 다양한 정보를 만나보세요.",
    keywords: ["삼천리자전거", "공지사항", "소식", "이벤트", "프로모션"],
    image: "/logo-red.png",
    url: "/notices",
    type: "website",
  });
}

export default function NoticesLayout({ children }: { children: React.ReactNode }) {
  return <main className="min-h-[calc(100vh-64px)]">{children}</main>;
}
