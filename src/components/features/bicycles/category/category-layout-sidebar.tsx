import Link from "next/link";
import type { CategoryListItemType, BicycleCategorySidebar } from "@/types/bicycle";
import { cn } from "@/lib/utils";

interface CategoryLayoutSidebarProps {
  sidebar: BicycleCategorySidebar;
  categoryList?: CategoryListItemType[];
  currentCategorySlug?: string;
}

const CategoryLayoutSidebar = ({
  sidebar,
  categoryList = [],
  currentCategorySlug,
}: CategoryLayoutSidebarProps) => {
  const combinedClassName = sidebar.mobileClassName
    ? `${sidebar.className} ${sidebar.mobileClassName}`
    : sidebar.className;

  return (
    <aside className={cn(combinedClassName, "lg:block")}>
      <div className="sticky top-24 rounded-lg border border-gray-200 bg-white p-4">
        <h3 className="mb-4 font-bold text-gray-900">스타일별 카테고리</h3>

        <div className="space-y-2">
          {categoryList.map((category) => {
            const isActive = category.slug === currentCategorySlug;

            return (
              <Link
                key={category.id}
                href={`/bicycles/style/${category.slug}`}
                className={`block rounded-lg p-3 transition-colors ${
                  isActive
                    ? "border-figma-cinderella bg-figma-cinderella text-figma-thunderbird border font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="text-sm font-medium">{category.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default CategoryLayoutSidebar;
