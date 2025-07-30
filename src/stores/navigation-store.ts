import { create } from "zustand";

interface NavigationState {
  // 햄버거 메뉴 상태
  isMenuOpen: boolean;

  // 호버 드롭다운 메뉴 상태
  activeDropdownId: string | null;

  toggleMenu: () => void;
  closeMenu: () => void;
  setActiveDropdown: (id: string | null) => void;
  closeAllMenus: () => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  isMenuOpen: false,
  activeDropdownId: null,

  // 햄버거 메뉴 토글
  toggleMenu: () =>
    set((state) => ({
      isMenuOpen: !state.isMenuOpen,
      activeDropdownId: !state.isMenuOpen ? null : state.activeDropdownId,
    })),

  // 햄버거 메뉴 닫기
  closeMenu: () => set({ isMenuOpen: false }),

  // 드롭다운 메뉴 설정
  setActiveDropdown: (id: string | null) =>
    set({
      activeDropdownId: id,
      isMenuOpen: id ? false : false,
    }),

  // 모든 메뉴 닫기
  closeAllMenus: () =>
    set({
      isMenuOpen: false,
      activeDropdownId: null,
    }),
}));
