import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "문의사항 작성 | 삼천리 자전거 중동역점",
  description: "궁금한 점이 있으시면 언제든지 문의해 주세요. 빠른 시간 내에 답변드리겠습니다.",
};

export default function ContactsNewLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="min-h-[calc(100vh-64px)]">{children}</main>
      <Toaster position="top-center" duration={1000} />
    </>
  );
}
