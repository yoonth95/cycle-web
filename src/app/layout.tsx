import "@/styles/globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { Noto_Sans_KR } from "next/font/google";
import QueryProvider from "@/providers/QueryProvider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  verification: {},
  other: {
    "naver-site-verification": "4c44c36bd2e52ce173664c507b6e25148748bc05",
  },
  title: "삼천리 자전거 중동역점 | 부천 중동 대표 자전거 전문점",
  description:
    "부천 중동 북부역 상동시장입구에 위치한 삼천리 자전거 중동역점입니다. 다양한 자전거와 전문적인 수리 서비스를 제공합니다.",
  keywords: [
    "삼천리 자전거",
    "중동역점",
    "부천",
    "자전거",
    "수리",
    "전기자전거",
    "로드",
    "시티",
    "폴딩",
  ],
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
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = (await headers()).get("x-pathname") ?? "";
  const isAdminRoute = pathname.startsWith("/admin");

  // console.log(pathname, isAdminRoute);
  const content = isAdminRoute ? (
    children
  ) : (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );

  return (
    <html lang="ko">
      <body className={`${noto.className} font-sans antialiased`}>
        <QueryProvider>{content}</QueryProvider>
      </body>
    </html>
  );
}
