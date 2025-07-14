import { NavigationDataType } from "@/types/navigation-data";

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
