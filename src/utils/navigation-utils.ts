import { NavigationDataType } from "@/types/navigation-data";

/**
 * 메뉴 데이터를 order 기준으로 정렬
 */
export const sortMenuData = (menuData: NavigationDataType): NavigationDataType => {
  return [...menuData].sort((a, b) => a.order - b.order);
};

/**
 * 특정 slug에 해당하는 메뉴 아이템 찾기
 */
export const findMenuItemBySlug = (menuData: NavigationDataType, slug: string) => {
  return menuData.find((item) => item.slug === slug);
};

/**
 * 메뉴 아이템의 서브 아이템들을 order 기준으로 정렬
 */
export const sortSubItems = (items: any[]) => {
  return items.sort((a, b) => a.order - b.order);
};
