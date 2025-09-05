"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import {
  NavigationBar,
  FullDesktopMenu,
  FullMobileMenu,
  HamburgerButton,
} from "@/components/layout/navigation";
import { useMobile } from "@/hooks/use-mobile";
import { sortMenuData } from "@/utils/navigation-utils";
import { useNavigationStore } from "@/stores/navigation-store";
import { NavigationProps } from "@/types/navigation";

const NavigationContainer = ({ menuData }: NavigationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isMenuOpen, toggleMenu, closeAllMenus, setCurrentPath } = useNavigationStore(
    useShallow((state) => ({
      isMenuOpen: state.isMenuOpen,
      toggleMenu: state.toggleMenu,
      closeAllMenus: state.closeAllMenus,
      setCurrentPath: state.setCurrentPath,
    })),
  );

  const [isMobile, _] = useMobile({ breakpoint: 768 });

  const sortedMenuData = sortMenuData(menuData);

  useEffect(() => {
    closeAllMenus();
    // 쿼리 파라미터를 포함한 전체 경로 설정
    const fullPath = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
    setCurrentPath(fullPath);
  }, [pathname, searchParams, closeAllMenus, setCurrentPath]);

  return (
    <>
      <div className="dropdown-menu flex w-full items-center justify-between">
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
