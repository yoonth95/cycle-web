import {
  CategoryLayoutSidebar,
  CategoryLayoutContent,
} from "@/components/features/bicycles/category";
import type { CategoryLayoutData, CategoryPageData, CategoryListItem } from "@/types/bicycle";

interface CategoryLayoutRendererProps {
  layoutData: CategoryLayoutData;
  categoryPageData?: CategoryPageData;
  categoryList?: CategoryListItem[];
}

/**
 * 카테고리 페이지의 전체 레이아웃을 렌더링하는 컴포넌트
 * 사이드바와 콘텐츠 영역을 배치하고 각각의 컴포넌트를 렌더링
 */
const CategoryLayoutRenderer = ({
  layoutData,
  categoryPageData,
  categoryList = [],
}: CategoryLayoutRendererProps) => {
  const { layout } = layoutData;
  const { sidebar, content } = layout;

  return (
    <div className={layout.className}>
      {/* 사이드바 위치에 따른 순서 조정 */}
      {sidebar.position === "left" && (
        <CategoryLayoutSidebar
          sidebar={sidebar}
          categoryList={categoryList}
          currentCategorySlug={categoryPageData?.category.slug}
        />
      )}

      <CategoryLayoutContent
        content={content}
        categoryData={categoryPageData?.category}
        subcategories={categoryPageData?.subcategories}
        bicycles={categoryPageData?.bicycles}
        categoryList={categoryList}
        currentCategorySlug={categoryPageData?.category.slug}
      />

      {sidebar.position === "right" && (
        <CategoryLayoutSidebar
          sidebar={sidebar}
          categoryList={categoryList}
          currentCategorySlug={categoryPageData?.category.slug}
        />
      )}
    </div>
  );
};

export default CategoryLayoutRenderer;
