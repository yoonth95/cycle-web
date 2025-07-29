import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Bicycle, BicycleFilters } from "@/types/bicycle";
import { applyFilters, getInitialFilters } from "@/utils/bicycle-data";

interface BicycleFilterState {
  // 상태
  filters: BicycleFilters;
  initialBicycles: Record<string, Bicycle[]>;

  // 계산된 값들
  currentBicycles: Bicycle[];
  filteredBicycles: Bicycle[];
  hasActiveFilters: boolean;
  filterStats: { total: number; filtered: number; hidden: number };

  // 액션들
  setInitialData: (bicycles: Record<string, Bicycle[]>) => void;
  updateSubcategory: (subcategoryId: string) => void; // URL 변경에 반응
  setPriceRanges: (priceRanges: string[]) => void;
  resetFilters: () => void;
}

export const useBicycleFilterStore = create<BicycleFilterState>()(
  devtools(
    (set, get) => ({
      // 초기 상태
      filters: getInitialFilters(),
      initialBicycles: {},
      currentBicycles: [],
      filteredBicycles: [],
      hasActiveFilters: false,
      filterStats: { total: 0, filtered: 0, hidden: 0 },

      // 초기 데이터 설정
      setInitialData: (bicycles) => {
        set({
          initialBicycles: bicycles,
        });
      },

      // URL 변경에 반응하여 서브카테고리 업데이트
      updateSubcategory: (subcategoryId) => {
        const state = get();
        const currentBicycles = state.initialBicycles[subcategoryId] || [];
        const filteredBicycles = applyFilters(currentBicycles, state.filters);

        set({
          currentBicycles,
          filteredBicycles,
          filterStats: {
            total: currentBicycles.length,
            filtered: filteredBicycles.length,
            hidden: currentBicycles.length - filteredBicycles.length,
          },
        });
      },

      // 가격 범위 설정
      setPriceRanges: (priceRanges) => {
        const state = get();
        const newFilters = { ...state.filters, priceRanges };
        const filteredBicycles = applyFilters(state.currentBicycles, newFilters);

        set({
          filters: newFilters,
          filteredBicycles,
          hasActiveFilters: checkHasActiveFilters(newFilters),
          filterStats: {
            total: state.currentBicycles.length,
            filtered: filteredBicycles.length,
            hidden: state.currentBicycles.length - filteredBicycles.length,
          },
        });
      },

      // 필터 초기화
      resetFilters: () => {
        const state = get();
        const newFilters = getInitialFilters();
        const filteredBicycles = applyFilters(state.currentBicycles, newFilters);

        set({
          filters: newFilters,
          filteredBicycles,
          hasActiveFilters: false,
          filterStats: {
            total: state.currentBicycles.length,
            filtered: filteredBicycles.length,
            hidden: state.currentBicycles.length - filteredBicycles.length,
          },
        });
      },
    }),
    {
      name: "bicycle-filter-store",
    },
  ),
);

// 필터가 활성화되어 있는지 확인하는 헬퍼 함수
const checkHasActiveFilters = (filters: BicycleFilters): boolean => {
  const { priceRanges } = filters;
  return priceRanges.length > 0;
};
