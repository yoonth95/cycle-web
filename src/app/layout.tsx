import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "삼천리 자전거 중동역점 | 부천 중동 대표 자전거 전문점",
  description:
    "부천 중동 북부역 상동시장입구에 위치한 삼천리 자전거 중동역점입니다. 다양한 자전거와 전문적인 수리 서비스를 제공합니다.",
  keywords: ["삼천리 자전거", "중동역점", "부천", "자전거", "수리", "전기자전거", "로드", "시티", "폴딩"],
  openGraph: {
    title: "삼천리 자전거 중동역점",
    description: "부천 중동 대표 자전거 전문점",
    type: "website",
    locale: "ko_KR",
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
  },
};

const noto = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body className={`${noto.className} font-sans antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
