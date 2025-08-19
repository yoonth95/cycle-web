import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CategoryLayoutSidebar from "./category-layout-sidebar";
import type { CategoryListItemType } from "@/types/bicycle";
import { Funnel } from "lucide-react";

interface CategoryMobileSidebarProps {
  categoryList?: CategoryListItemType[];
  currentCategorySlug?: string;
}

const CategoryMobileSidebar = ({
  categoryList = [],
  currentCategorySlug,
}: CategoryMobileSidebarProps) => {
  return (
    <div className="fixed right-6 bottom-6 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <span className="hover:bg-figma-thunderbird bg-figma-alizarin-crimson relative flex cursor-pointer items-center justify-center rounded-full p-2 text-white shadow-lg transition-colors">
            <Funnel className="h-5 w-5" />
          </span>
        </SheetTrigger>

        <SheetContent side="right" className="mt-16 w-80">
          <SheetHeader className="h-8">
            <SheetTitle />
            <SheetDescription />
          </SheetHeader>

          <div className="p-4">
            <CategoryLayoutSidebar
              sidebar={{
                position: "right",
                className: "w-full",
                section: "sidebar",
              }}
              categoryList={categoryList}
              currentCategorySlug={currentCategorySlug}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CategoryMobileSidebar;
