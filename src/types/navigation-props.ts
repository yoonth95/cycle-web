import { NavigationDataType } from "@/types/navigation-data";

export interface NavigationProps {
  menuData: NavigationDataType;
}

export interface DesktopNavigationProps extends NavigationProps {
  activeCategory: string | null;
  onCategoryHover: (category: string | null) => void;
  onNavMouseEnter: () => void;
  onNavMouseLeave: () => void;
}

export interface FullMenuProps {
  sortedMenuData: NavigationDataType;
  isMenuOpen: boolean;
}

export interface FullDesktopMenuProps extends FullMenuProps {}

export interface FullMobileMenuProps extends FullMenuProps {}

export interface HoverDropdownMenuProps {
  activeCategory: string | null;
  activeMenuItem: any;
  isMenuOpen: boolean;
}

export interface HamburgerButtonProps {
  isMenuOpen: boolean;
  onToggle: () => void;
}
