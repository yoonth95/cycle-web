// 최하위 항목 (예: 전기자전거, 로드 등)
export type NavigationSubItem = {
  id: number;
  slug: string;
  link: string;
  order: number;
  type?: "single" | "group";
  items?: NavigationSubItem[];
};

// 중분류 항목 (예: 스마트 모빌리티, 스포츠 등 또는 헬멧, 자전거 보호대 등)
export type NavigationCategoryItem = {
  id: number;
  slug: string;
  link?: string;
  order: number;
  type?: "single" | "group";
  items?: NavigationSubItem[];
};

// 1단계: 대분류 그룹 항목 (예: 스타일, 브랜드)
type NavigationGroupItem = {
  id: number;
  slug: string;
  link: string;
  type: "group";
  order: number;
  items: NavigationCategoryItem[];
};

// 단일 항목 (예: 문의사항, 오시는길)
type NavigationSingleItem = {
  id: number;
  slug: string;
  link: string;
  type: "single";
  order: number;
};

export type NavigationItem = NavigationGroupItem | NavigationSingleItem;
export type NavigationDataType = NavigationItem[];
