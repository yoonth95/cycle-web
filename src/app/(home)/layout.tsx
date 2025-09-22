import Script from "next/script";
import { generatePageMetadata } from "@/utils/metadata-generator";

export async function generateMetadata() {
  return generatePageMetadata({
    title: "홈",
    description:
      "삼천리자전거 중동역점 공식 홈페이지입니다. 다양한 자전거 제품과 서비스를 만나보세요.",
    keywords: [
      "삼천리자전거",
      "자전거",
      "중동역점",
      "부천 자전거",
      "부천 중동역 자전거",
      "부천 중동 자전거 전문점",
    ],
    image: "/main-image.png",
    url: "/",
    type: "website",
  });
}

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=rh0dhcco3a&submodules=geocoder`}
        strategy="afterInteractive"
      />
    </>
  );
}
