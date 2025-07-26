import Script from "next/script";

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
