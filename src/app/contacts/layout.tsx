import { generatePageMetadata } from "@/utils/metadata-generator";

export async function generateMetadata() {
  return generatePageMetadata({
    title: "문의사항",
    description: "삼천리자전거에 문의하세요. 제품 문의, 매장 정보, 서비스 관련 문의를 받습니다.",
    keywords: ["삼천리자전거", "문의사항", "고객지원", "제품 문의", "매장 정보"],
    image: "/logo-red.png",
    url: "/contacts",
    type: "website",
  });
}
export default function ContactsLayout({ children }: { children: React.ReactNode }) {
  return <main className="min-h-[calc(100vh-64px)]">{children}</main>;
}
