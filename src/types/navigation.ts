// 기본 네비게이션 타입 (공통 필드)
export type NavigationMenuType = "group" | "single";

// 공통 필드 정의
interface BaseNavigationFields {
  id: string;
  slug: string;
}

/**
 * 데이터베이스 스키마 타입
 * Supabase에서 직접 가져오는 데이터 구조
 */
export interface NavigationMenu extends BaseNavigationFields {
  link: string | null;
  type: NavigationMenuType;
  order_index: number;
}

export interface NavigationMenuItem extends BaseNavigationFields {
  menu_id: string;
  parent_id: string | null;
  link: string | null;
  type: NavigationMenuType;
  order_index: number;
}

/**
 * 프론트엔드에서 사용하는 네비게이션 타입
 * DB 데이터를 가공한 후 사용하는 구조
 */

// 재귀적 구조를 위한 하위 아이템
export interface NavigationSubItem extends BaseNavigationFields {
  link: string;
  order_index: number;
  type?: NavigationMenuType;
  items?: NavigationSubItem[];
}

// 카테고리 아이템 (link는 선택적)
export interface NavigationCategoryItem extends BaseNavigationFields {
  link?: string;
  order_index: number;
  type?: NavigationMenuType;
  items?: NavigationSubItem[];
}

// 메인 네비게이션 아이템들 (그룹 타입)
interface NavigationGroupItem extends BaseNavigationFields {
  link: string;
  type: "group";
  order_index: number;
  items: NavigationCategoryItem[];
}

// 메인 네비게이션 아이템들 (단일 타입)
interface NavigationSingleItem extends BaseNavigationFields {
  link: string;
  type: "single";
  order_index: number;
}

// 유니온 타입으로 메인 네비게이션 아이템 정의
export type NavigationItem = NavigationGroupItem | NavigationSingleItem;

// 전체 네비게이션 데이터 타입
export type NavigationDataType = NavigationItem[];

/**
 * 컴포넌트에서 사용하는 Props 타입
 */
export interface NavigationProps {
  menuData: NavigationDataType;
}

export interface FullMenuProps {
  sortedMenuData: NavigationDataType;
  isMenuOpen: boolean;
}

export interface HamburgerButtonProps {
  isMenuOpen: boolean;
  onToggle: () => void;
}
