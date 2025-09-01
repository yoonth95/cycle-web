import {
  CategoryLayoutSidebar,
  CategoryLayoutContent,
} from "@/components/features/bicycles/category";
import { AutoPerformanceTracker } from "@/components/common/performance-tracker";
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
      {/* 성능 측정 컴포넌트 - UI를 렌더링하지 않음 */}
      <AutoPerformanceTracker />

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
