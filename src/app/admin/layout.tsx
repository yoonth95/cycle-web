import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "관리자 페이지 | 삼천리 자전거 중동역점",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Toaster position="top-center" duration={1000} />
      {children}
    </div>
  );
}
