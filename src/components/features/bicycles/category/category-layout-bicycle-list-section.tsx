"use client";

import { useSearchParams } from "next/navigation";
import { CategoryLayoutBicycleList } from "@/components/features/bicycles/category";
import { BicycleCategoryContentSectionBase, BicycleCategoryItemType } from "@/types/bicycle";

interface CategoryLayoutBicycleListSectionProps {
  section: BicycleCategoryContentSectionBase;
  currentCategory: BicycleCategoryItemType;
}

const CategoryLayoutBicycleListSection = ({
  section,
  currentCategory,
}: CategoryLayoutBicycleListSectionProps) => {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "all";

  return (
    <div>
      <CategoryLayoutBicycleList
        section={section}
        currentCategory={currentCategory}
        currentTab={currentTab}
      />
    </div>
  );
};

export default CategoryLayoutBicycleListSection;
