"use client";

import { NavigationBar, FullDesktopMenu, FullMobileMenu, HamburgerButton } from "./";
import { useNavigation } from "@/hooks/use-navigation";
import { useMobile } from "@/hooks/use-mobile";
import { sortMenuData } from "@/utils/navigation-utils";
import { NavigationProps } from "@/types/navigation-props";

const NavigationContainer = ({ menuData }: NavigationProps) => {
  const { isMenuOpen, toggleMenu } = useNavigation();

  const [isMobile, _] = useMobile({ breakpoint: 768 });

  const sortedMenuData = sortMenuData(menuData);

  return (
    <>
      <div className="flex items-center justify-between w-full dropdown-menu">
        <NavigationBar menuData={menuData} />
        <HamburgerButton isMenuOpen={isMenuOpen} onToggle={toggleMenu} />
      </div>

      {isMobile ? (
        <FullMobileMenu sortedMenuData={sortedMenuData} isMenuOpen={isMenuOpen} />
      ) : (
        <FullDesktopMenu sortedMenuData={sortedMenuData} isMenuOpen={isMenuOpen} />
      )}
    </>
  );
};

export default NavigationContainer;
