import {
  CategoryLayoutHeader,
  CategoryMobileSidebar,
  CategoryLayoutTab,
  CategoryLayoutBicycleListSection,
} from "@/components/features/bicycles/category";
import type {
  BicycleCategoryContentLayout,
  BicycleCategoryItemType,
  CategoryListItemType,
} from "@/types/bicycle";

interface CategoryLayoutContentProps {
  content: BicycleCategoryContentLayout;
  currentCategoryData: BicycleCategoryItemType;
  categoryList: CategoryListItemType[];
}

const CategoryLayoutContent = ({
  content,
  currentCategoryData,
  categoryList,
}: CategoryLayoutContentProps) => {
  const orderedSections = [...content.sections].sort((a, b) => a.order - b.order);

  return (
    <div className={content.className}>
      {orderedSections.map((section) => {
        switch (section.section) {
          case "header":
            return (
              <CategoryLayoutHeader
                key={section.id}
                section={section}
                categoryData={currentCategoryData}
              />
            );
          case "tabs":
            return (
              <CategoryLayoutTab
                key={section.id}
                section={section}
                subcategories={currentCategoryData.subcategories}
              />
            );
          case "bicycleList":
            return (
              <CategoryLayoutBicycleListSection
                key={section.id}
                section={section}
                currentCategory={currentCategoryData}
              />
            );
          default:
            console.warn(`Unknown content section type: ${section.section}`);
            return null;
        }
      })}
      {/* 모바일 사이드바 */}
      <div className="block lg:hidden">
        <CategoryMobileSidebar
          categoryList={categoryList}
          currentCategorySlug={currentCategoryData.slug}
        />
      </div>
    </div>
  );
};

export default CategoryLayoutContent;
