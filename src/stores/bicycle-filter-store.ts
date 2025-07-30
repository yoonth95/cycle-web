import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Bicycle, BicycleFilters, FilterStats } from "@/types/bicycle";
// import { applyFilters, getInitialFilters, checkHasActiveFilters } from "@/utils/bicycle-data";

interface BicycleFilterState {
  // 기본 데이터
  initialBicycles: Record<string, Bicycle[]>;
  currentBicycles: Bicycle[];

  // 필터 관련 (향후 확장용)
  filters?: BicycleFilters;
  filteredBicycles?: Bicycle[];
  hasActiveFilters?: boolean;
  filterStats?: FilterStats;

  // 기본 액션들
  setInitialData: (bicycles: Record<string, Bicycle[]>) => void;
  updateSubcategory: (subcategoryId: string) => void;

  // 필터 액션들 (향후 확장용)
  // setPriceRanges?: (priceRanges: string[]) => void;
  // resetFilters?: () => void;
}

export const useBicycleFilterStore = create<BicycleFilterState>()(
  devtools(
    (set, get) => ({
      // 초기 상태
      initialBicycles: {},
      currentBicycles: [],

      // 필터 초기화 (향후 확장용 - 필요시 주석 해제)
      // filters: getInitialFilters(),
      // filteredBicycles: [],
      // hasActiveFilters: false,
      // filterStats: { total: 0, filtered: 0, hidden: 0 },

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

        // 필터 적용 로직 (향후 활성화시 주석 해제)
        // const filteredBicycles = state.filters
        //   ? applyFilters(currentBicycles, state.filters)
        //   : currentBicycles;

        set({
          currentBicycles,
          // 필터링 결과 업데이트 (향후 활성화시 주석 해제)
          // filteredBicycles,
          // filterStats: state.filters ? {
          //   total: currentBicycles.length,
          //   filtered: filteredBicycles.length,
          //   hidden: currentBicycles.length - filteredBicycles.length,
          // } : undefined,
        });
      },

      // 필터 액션들 (향후 확장시 주석 해제)
      /*
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
      */
    }),
    {
      name: "bicycle-filter-store",
    },
  ),
);

// 필터 기능 활성화 가이드
/*
필터 기능을 활성화하려면:
1. 위의 주석된 필터 관련 코드들을 해제
2. utils/bicycle-data.ts의 필터 함수들 주석 해제
3. 컴포넌트에서 필터 관련 props 활성화
*/
