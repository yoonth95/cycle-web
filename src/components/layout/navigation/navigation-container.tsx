"use client";

import {
  NavigationBar,
  FullDesktopMenu,
  FullMobileMenu,
  HoverDropdownMenu,
  HamburgerButton,
} from "./";
import { useNavigation } from "@/hooks/use-navigation";
import { useMobile } from "@/hooks/use-mobile";
import { findMenuItemBySlug, sortMenuData } from "@/utils/navigation-utils";
import { NavigationProps } from "@/types/navigation-props";

const NavigationContainer = ({ menuData }: NavigationProps) => {
  const {
    isMenuOpen,
    activeCategory,
    toggleMenu,
    handleCategoryHover,
    handleNavMouseLeave,
    handleNavMouseEnter,
  } = useNavigation();

  const activeMenuItem = findMenuItemBySlug(menuData, activeCategory || "");

  const [isMobile, _] = useMobile({ breakpoint: 768 });

  const sortedMenuData = sortMenuData(menuData);

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <NavigationBar
          menuData={menuData}
          activeCategory={activeCategory}
          onCategoryHover={handleCategoryHover}
          onNavMouseEnter={handleNavMouseEnter}
          onNavMouseLeave={handleNavMouseLeave}
        />
        <HamburgerButton isMenuOpen={isMenuOpen} onToggle={toggleMenu} />
      </div>

      <HoverDropdownMenu
        activeCategory={activeCategory}
        activeMenuItem={activeMenuItem}
        isMenuOpen={isMenuOpen}
      />

      {isMobile ? (
        <FullMobileMenu sortedMenuData={sortedMenuData} isMenuOpen={isMenuOpen} />
      ) : (
        <FullDesktopMenu sortedMenuData={sortedMenuData} isMenuOpen={isMenuOpen} />
      )}
    </>
  );
};

export default NavigationContainer;
