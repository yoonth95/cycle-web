import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BicycleSidebar } from ".";
import { Menu } from "lucide-react";
import { BicycleFilters } from "@/types/bicycle";

interface MobileBicycleSidebarProps {
  pageType: "style" | "brand";
  currentCategory: string;
  filters: BicycleFilters;
  hasActiveFilters: boolean;
  onPriceRangeChange: (priceRanges: string[]) => void;
  onResetFilters: () => void;
}

const MobileBicycleSidebar = ({
  pageType,
  currentCategory,
  filters,
  hasActiveFilters,
  onPriceRangeChange,
  onResetFilters,
}: MobileBicycleSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <span className="hover:bg-figma-thunderbird bg-figma-alizarin-crimson flex cursor-pointer items-center justify-center rounded-full p-2 text-white shadow-lg transition-colors">
          <Menu className="h-5 w-5" />
          {hasActiveFilters && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
              !
            </span>
          )}
        </span>
      </SheetTrigger>
      <SheetContent className="mt-16 w-80">
        <SheetHeader className="h-12">
          <SheetTitle>필터</SheetTitle>
          <SheetDescription>원하는 조건으로 자전거를 찾아보세요</SheetDescription>
        </SheetHeader>
        <div className="p-4">
          <BicycleSidebar
            pageType={pageType}
            currentCategory={currentCategory}
            filters={filters}
            hasActiveFilters={hasActiveFilters}
            onPriceRangeChange={onPriceRangeChange}
            onResetFilters={onResetFilters}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileBicycleSidebar;
