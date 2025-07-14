import { useState, useCallback } from "react";

interface UseNavigationReturn {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export const useNavigation = (): UseNavigationReturn => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  return {
    isMenuOpen,
    toggleMenu,
  };
};
