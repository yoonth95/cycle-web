import {
  CategoryLayoutSidebar,
  CategoryLayoutContent,
} from "@/components/features/bicycles/category";
import type { BicycleCategoryLayoutData, CategoryPageData } from "@/types/bicycle";

interface CategoryLayoutRendererProps {
  layoutData: BicycleCategoryLayoutData;
  categoryPageData: CategoryPageData;
}

const CategoryLayoutRenderer = ({ layoutData, categoryPageData }: CategoryLayoutRendererProps) => {
  const { layout } = layoutData;
  const { sidebar, content } = layout;

  return (
    <div className={layout.className}>
      {/* 사이드바 위치에 따른 순서 조정 */}
      {sidebar.position === "left" && (
        <CategoryLayoutSidebar
          sidebar={sidebar}
          categoryList={categoryPageData?.categoryList}
          currentCategorySlug={categoryPageData?.category.slug}
        />
      )}

      <CategoryLayoutContent
        content={content}
        currentCategoryData={categoryPageData.category}
        categoryList={categoryPageData?.categoryList}
      />

      {sidebar.position === "right" && (
        <CategoryLayoutSidebar
          sidebar={sidebar}
          categoryList={categoryPageData?.categoryList}
          currentCategorySlug={categoryPageData?.category.slug}
        />
      )}
    </div>
  );
};

export default CategoryLayoutRenderer;
