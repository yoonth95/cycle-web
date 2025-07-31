import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BicycleSidebar } from "@/components/features/bicycles/category";
import { Funnel } from "lucide-react";

interface MobileBicycleSidebarProps {
  pageType: "style";
  currentCategory: string;
  // 필터 관련 props (향후 확장용)
  // filters?: BicycleFilters;
  // hasActiveFilters?: boolean;
  // onPriceRangeChange?: (priceRanges: string[]) => void;
  // onResetFilters?: () => void;
}

const MobileBicycleSidebar = ({
  pageType,
  currentCategory,
  // 필터 props (향후 활성화용)
  // filters,
  // hasActiveFilters,
  // onPriceRangeChange,
  // onResetFilters,
}: MobileBicycleSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <span className="hover:bg-figma-thunderbird bg-figma-alizarin-crimson relative flex cursor-pointer items-center justify-center rounded-full p-2 text-white shadow-lg transition-colors">
          <Funnel className="h-5 w-5" />
          {/* 필터 활성 표시 (향후 활성화용) 
          {hasActiveFilters && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
              !
            </span>
          )}
          */}
        </span>
      </SheetTrigger>
      <SheetContent className="mt-16 w-80">
        <SheetHeader className="h-12">
          <SheetTitle>필터</SheetTitle>
          <SheetDescription>원하는 조건으로 자전거를 찾아보세요</SheetDescription>
        </SheetHeader>
        <div className="p-4">
          {/* 필터 props는 나중에 활성화시 추가 예정 */}
          <BicycleSidebar pageType={pageType} currentCategory={currentCategory} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileBicycleSidebar;
