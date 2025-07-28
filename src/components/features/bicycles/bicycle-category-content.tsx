import { BicycleSidebar, BicycleSubcategoryTab, MobileBicycleSidebar } from ".";
import { Bicycle, SubcategoryInfo, CategoryData } from "@/types/bicycle";

interface BicycleCategoryContentProps {
  category: string;
  categoryData: CategoryData;
  subcategories: SubcategoryInfo[];
  initialBicycles: Record<string, Bicycle[]>;
  pageType: "style" | "brand";
}

export default function BicycleCategoryContent({
  category,
  categoryData,
  subcategories,
  initialBicycles,
  pageType,
}: BicycleCategoryContentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Mobile Filter Button */}
        <div className="fixed right-6 bottom-6 z-50 lg:hidden">
          <MobileBicycleSidebar
            categoryData={categoryData}
            pageType={pageType}
            currentCategory={category}
          />
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden w-80 flex-shrink-0 lg:block">
          <div className="sticky top-24">
            <BicycleSidebar pageType={pageType} currentCategory={category} />
          </div>
        </div>

        {/* Main content */}
        <div className="w-full flex-1 lg:w-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="mb-2 text-2xl font-bold text-gray-900 lg:text-3xl">
              {categoryData.title}
            </h1>
            <p className="text-gray-600">{categoryData.description}</p>
          </div>

          {/* Tabs */}
          <BicycleSubcategoryTab subcategories={subcategories} initialBicycles={initialBicycles} />
        </div>
      </div>
    </div>
  );
}
