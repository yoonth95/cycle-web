import { useState, useEffect, useCallback } from "react";

interface UseNavigationReturn {
  isMenuOpen: boolean;
  activeCategory: string | null;
  toggleMenu: () => void;
  setActiveCategory: (category: string | null) => void;
  handleCategoryHover: (category: string | null) => void;
  handleNavMouseLeave: () => void;
  handleNavMouseEnter: () => void;
}

export const useNavigation = (): UseNavigationReturn => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
    setActiveCategory(null);
  }, [isMenuOpen]);

  const handleCategoryHover = useCallback(
    (category: string | null) => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
        setHoverTimeout(null);
      }
      setActiveCategory(category);
    },
    [hoverTimeout],
  );

  const handleNavMouseLeave = useCallback(() => {
    const timeout = setTimeout(() => setActiveCategory(null), 50);
    setHoverTimeout(timeout);
  }, []);

  const handleNavMouseEnter = useCallback(() => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  }, [hoverTimeout]);

  useEffect(() => {
    return () => {
      if (hoverTimeout) clearTimeout(hoverTimeout);
    };
  }, [hoverTimeout]);

  return {
    isMenuOpen,
    activeCategory,
    toggleMenu,
    setActiveCategory,
    handleCategoryHover,
    handleNavMouseLeave,
    handleNavMouseEnter,
  };
};
