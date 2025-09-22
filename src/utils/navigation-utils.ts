import {
  NavigationDataType,
  NavigationCategoryItem,
  NavigationSubItem,
  NavigationItem,
} from "@/types/navigation";

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

/**
 * 메뉴 아이템과 그 하위 아이템들 중에서 현재 경로와 매칭되는지 재귀적으로 확인
 */
const hasMatchingPath = (
  item: NavigationCategoryItem | NavigationSubItem | NavigationItem,
  currentPath: string,
): boolean => {
  // 현재 아이템의 link가 현재 경로와 매칭되는지 확인
  if (item.link && isCurrentPage(currentPath, item.link)) {
    return true;
  }

  // 하위 아이템들이 있다면 재귀적으로 확인
  if ("items" in item && item.items && Array.isArray(item.items)) {
    return item.items.some((subItem) => hasMatchingPath(subItem, currentPath));
  }

  return false;
};

/**
 * 현재 경로에 따라 열려야 할 아코디언 ID를 동적으로 반환하는 함수
 */
export const getDefaultAccordionValue = (
  currentPath: string,
  sortedMenuData?: NavigationDataType,
): string | undefined => {
  // 홈 페이지인 경우 모든 아코디언 닫힌 상태
  if (currentPath === "/") {
    return undefined;
  }

  // sortedMenuData가 없으면 undefined 반환
  if (!sortedMenuData || !Array.isArray(sortedMenuData)) {
    return undefined;
  }

  // 최상위 메뉴들을 순회하면서 현재 경로와 매칭되는 그룹 찾기
  for (const menuItem of sortedMenuData) {
    // type이 "group"인 것만 아코디언으로 표시됨
    if (menuItem.type === "group" && hasMatchingPath(menuItem, currentPath)) {
      return menuItem.id.toString();
    }
  }

  // 매칭되는 그룹이 없으면 undefined 반환
  return undefined;
};
