# 자전거 필터 기능 활성화 가이드

## 개요

현재 자전거 애플리케이션에서는 필터 기능이 비활성화되어 있습니다. 이 가이드는 나중에 필터 기능을 활성화할 때 필요한 단계들을 설명합니다.

## 필터 기능 활성화 단계

### 1. 타입 정의 (src/types/bicycle.ts)

```typescript
// 현재 활성화된 타입들
export interface BicycleFilters {
  priceRanges: string[];
  // TODO: 향후 추가 가능한 필터들
  // brands?: string[];
  // colors?: string[];
  // ratings?: number;
  // availability?: boolean;
}

export interface FilterStats {
  total: number;
  filtered: number;
  hidden: number;
}
```

### 2. 유틸 함수 활성화 (src/utils/bicycle-data.ts)

주석 처리된 필터 관련 함수들을 활성화하세요:

```typescript
// 주석을 해제하여 활성화
export const parsePrice = (priceString: string): number => {
  return parseInt(priceString.replace(/[^0-9]/g, ""));
};

export const PRICE_RANGES: PriceRange[] = [
  { min: 0, max: 500000, label: "50만원 미만" },
  // ... 나머지 범위들
];

export const applyFilters = (bicycles: Bicycle[], filters: BicycleFilters): Bicycle[] => {
  return bicycles.filter((bicycle) => filterByPriceRange(bicycle, filters.priceRanges));
};

export const getInitialFilters = (): BicycleFilters => ({
  priceRanges: [],
});
```

### 3. 스토어 활성화 (src/stores/bicycle-filter-store.ts)

1. 필터 관련 import 주석 해제:

```typescript
import { applyFilters, getInitialFilters, checkHasActiveFilters } from "@/utils/bicycle-data";
```

2. 인터페이스에서 옵셔널 제거:

```typescript
interface BicycleFilterState {
  // 기본 데이터
  initialBicycles: Record<string, Bicycle[]>;
  currentBicycles: Bicycle[];

  // 필터 관련 - ? 제거
  filters: BicycleFilters;
  filteredBicycles: Bicycle[];
  hasActiveFilters: boolean;
  filterStats: FilterStats;

  // 필터 액션들 - ? 제거 및 주석 해제
  setPriceRanges: (priceRanges: string[]) => void;
  resetFilters: () => void;
}
```

3. 스토어 구현에서 주석 해제:

```typescript
// 초기 상태 주석 해제
filters: getInitialFilters(),
filteredBicycles: [],
hasActiveFilters: false,
filterStats: { total: 0, filtered: 0, hidden: 0 },

// updateSubcategory 함수 내 필터 로직 주석 해제
const filteredBicycles = state.filters
  ? applyFilters(currentBicycles, state.filters)
  : currentBicycles;

// 필터 액션들 주석 해제
setPriceRanges: (priceRanges) => { /* 구현 */ },
resetFilters: () => { /* 구현 */ },
```

### 4. 컴포넌트 Props 활성화

#### BicycleSidebar (src/components/features/bicycles/bicycle-sidebar.tsx)

```typescript
interface BicycleSidebarProps {
  pageType: "style";
  currentCategory: string;
  // 주석 해제
  filters: BicycleFilters;
  hasActiveFilters: boolean;
  onPriceRangeChange: (priceRanges: string[]) => void;
  onResetFilters: () => void;
}
```

#### MobileBicycleSidebar 동일하게 수정

#### BicycleSubcategoryTab

```typescript
interface BicycleSubcategoryTabProps {
  // 기존 props...
  // 주석 해제
  filteredBicycles: Bicycle[];
  hasActiveFilters: boolean;
  filterStats: FilterStats;
}
```

### 5. UI 컴포넌트 활성화

각 컴포넌트에서 "필터 props는 나중에 활성화시 추가 예정" 주석 부분을 실제 props로 대체하세요.

#### 예시 (BicycleCategoryContent):

```typescript
<BicycleSidebar
  pageType={pageType}
  currentCategory={category}
  // 이 부분을 활성화
  filters={filters}
  hasActiveFilters={hasActiveFilters}
  onPriceRangeChange={setPriceRanges}
  onResetFilters={resetFilters}
/>
```

### 6. 데이터 모델 업데이트

자전거 데이터에 price 필드 추가:

```json
{
  "id": 1,
  "name": "팬텀 FS PRO",
  "price": "1,200,000원", // 이 필드 추가
  "image": "/bike.png"
  // 기타 필드들...
}
```

### 7. 필터 UI 활성화

BicycleSidebar 컴포넌트에서 주석 처리된 필터 UI를 활성화하세요:

```typescript
// 주석 해제하여 활성화
{filters && (
  <div className="rounded-lg border border-gray-200 bg-white">
    {/* 필터 UI 구현 */}
  </div>
)}
```

## 확장 가능한 필터들

향후 추가할 수 있는 필터들:

- **브랜드 필터**: 제조사별 필터링
- **색상 필터**: 자전거 색상별 필터링
- **평점 필터**: 사용자 평점 기준 필터링
- **재고 필터**: 재고 있는 제품만 표시
- **크기 필터**: 자전거 크기별 필터링
- **용도 필터**: 사용 용도별 필터링

## 주의사항

1. 필터 활성화 전에 데이터 구조가 올바른지 확인하세요
2. 모든 컴포넌트에서 필터 관련 props를 일관되게 전달하세요
3. 필터 상태 관리가 올바르게 동작하는지 테스트하세요
4. 성능 최적화를 위해 필터링 로직을 검토하세요

## 테스트 체크리스트

- [ ] 가격 범위 필터가 올바르게 동작하는가?
- [ ] 필터 초기화가 정상 동작하는가?
- [ ] 필터 상태가 URL 변경시 유지되는가?
- [ ] 모바일과 데스크톱에서 필터 UI가 올바르게 표시되는가?
- [ ] 필터 적용 결과가 정확하게 표시되는가?
