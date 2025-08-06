import {
  CategoryLayoutHeader,
  CategoryLayoutTabsWrapper,
  CategoryMobileSidebar,
} from "@/components/features/bicycles/category";
import type {
  CategoryContent,
  CategoryInfo,
  SubcategoryInfo,
  BicyclesBySubcategory,
  CategoryListItem,
} from "@/types/bicycle";

interface CategoryLayoutContentProps {
  content: CategoryContent;
  categoryData?: CategoryInfo;
  subcategories?: SubcategoryInfo[];
  bicycles?: BicyclesBySubcategory;
  categoryList?: CategoryListItem[];
  currentCategorySlug?: string;
}

const CategoryLayoutContent = ({
  content,
  categoryData,
  subcategories = [],
  bicycles = {},
  categoryList = [],
  currentCategorySlug,
}: CategoryLayoutContentProps) => {
  const orderedSections = [...content.sections].sort((a, b) => a.order - b.order);

  // tabs와 bicycleList 섹션 찾기
  const tabSection = orderedSections.find((section) => section.section === "tabs");
  const listSection = orderedSections.find((section) => section.section === "bicycleList");
  const otherSections = orderedSections.filter(
    (section) => section.section !== "tabs" && section.section !== "bicycleList",
  );

  return (
    <div className={content.className}>
      {/* 모바일 사이드바 버튼 */}
      <div className="lg:hidden">
        <CategoryMobileSidebar
          categoryList={categoryList}
          currentCategorySlug={currentCategorySlug}
        />
      </div>

      {otherSections.map((section) => {
        switch (section.section) {
          case "header":
            return (
              <CategoryLayoutHeader
                key={section.id}
                section={section}
                categoryData={categoryData}
              />
            );
          default:
            console.warn(`Unknown content section type: ${section.section}`);
            return null;
        }
      })}

      {tabSection && listSection && (
        <CategoryLayoutTabsWrapper
          tabSection={tabSection}
          listSection={listSection}
          subcategories={subcategories}
          bicycles={bicycles}
          categorySlug={currentCategorySlug}
        />
      )}
    </div>
  );
};

export default CategoryLayoutContent;
