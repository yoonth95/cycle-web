// 공통 상수 정의
export interface NavigationItem {
  name: string;
  href: string;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { name: "자전거", href: "#bicycles" },
  { name: "자전거용품", href: "#accessories" },
  { name: "오시는길", href: "#location" },
  { name: "우리가게소식", href: "#news" },
  { name: "문의사항", href: "#contact" },
];

export const CONTACT_INFO = {
  name: "삼천리 자전거 중동역점",
  phone: "032-326-3002",
  mobile: "010-3112-9310",
  address: "부천 중동 북부역 상동시장입구 대로변",
} as const;
