import { NavigationDataType, NavigationCategoryItem, NavigationSubItem } from "@/types/navigation";

/**
 * 메뉴 데이터를 order_index 기준으로 정렬
 */
export const sortMenuData = (menuData: NavigationDataType | undefined): NavigationDataType => {
  if (!menuData || !Array.isArray(menuData)) {
    return [];
  }
  return [...menuData].sort((a, b) => a.order_index - b.order_index);
};

/**
 * 특정 slug에 해당하는 메뉴 아이템 찾기
 */
export const findMenuItemBySlug = (menuData: NavigationDataType, slug: string) => {
  return menuData.find((item) => item.slug === slug);
};

/**
 * 메뉴 아이템의 서브 아이템들을 order_index 기준으로 정렬
 */
export const sortSubItems = <T extends NavigationCategoryItem | NavigationSubItem>(
  items: T[] | undefined,
): T[] => {
  if (!items || !Array.isArray(items)) {
    return [];
  }
  return [...items].sort((a, b) => a.order_index - b.order_index);
};

/**
 * 현재 페이지인지 확인하는 유틸리티 함수
 */
export const isCurrentPage = (currentPath: string, href: string): boolean => {
  if (!href || href === "#") return false;

  // 정확한 경로 매칭
  if (currentPath === href) return true;

  // 쿼리 파라미터가 있는 경우 처리
  if (href.includes("?")) {
    return currentPath === href;
  }

  // 쿼리 파라미터가 없는 경우, 경로가 일치하거나 하위 경로인지 확인
  if (currentPath.startsWith(href + "?")) return true;
  if (href !== "/" && currentPath.startsWith(href + "/")) return true;

  return false;
};
