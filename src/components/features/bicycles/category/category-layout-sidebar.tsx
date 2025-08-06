import Link from "next/link";
import type { CategorySidebar, CategoryListItem } from "@/types/bicycle";

interface CategoryLayoutSidebarProps {
  sidebar: CategorySidebar;
  categoryList?: CategoryListItem[];
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
    <aside className={combinedClassName}>
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
                    ? "border border-red-200 bg-red-50 font-medium text-red-700"
                    : "text-gray-700 hover:bg-gray-50"
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
