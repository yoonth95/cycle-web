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
import { CategoryData } from "@/types/bicycle";
import { Menu } from "lucide-react";

interface MobileBicycleSidebarProps {
  categoryData: CategoryData;
  pageType: "style" | "brand";
  currentCategory: string;
}

const MobileBicycleSidebar = ({
  categoryData,
  pageType,
  currentCategory,
}: MobileBicycleSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <span className="hover:bg-figma-thunderbird bg-figma-alizarin-crimson flex cursor-pointer items-center justify-center rounded-full p-2 text-white shadow-lg transition-colors">
          <Menu className="h-5 w-5" />
        </span>
      </SheetTrigger>
      <SheetContent className="mt-16">
        <SheetHeader className="h-12">
          <SheetTitle />
          <SheetDescription />
        </SheetHeader>
        <div className="p-4">
          <BicycleSidebar pageType={pageType} currentCategory={currentCategory} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileBicycleSidebar;
