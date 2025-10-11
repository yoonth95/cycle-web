import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "관리자 페이지 | 삼천리 자전거 중동역점",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
