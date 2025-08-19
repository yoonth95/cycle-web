import { CategoryLayoutTabButton } from "@/components/features/bicycles/category";
import { BicycleCategoryContentSectionBase, SubcategoryItemType } from "@/types/bicycle";

interface CategoryLayoutTabProps {
  section: BicycleCategoryContentSectionBase;
  subcategories: SubcategoryItemType[];
}

const CategoryLayoutTab = ({ section, subcategories }: CategoryLayoutTabProps) => {
  if (subcategories.length === 0) return null;

  const orderedSubcategories = [...subcategories].sort((a, b) => a.order - b.order);

  const defaultTab =
    orderedSubcategories.find((sub) => sub.slug === "all")?.slug ??
    orderedSubcategories[0]?.slug ??
    "all";

  return (
    <div className={section.className}>
      <div className="flex h-auto w-full flex-wrap items-center justify-start">
        <div className="text-muted-foreground relative flex h-auto w-fit flex-wrap items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-[3px] sm:justify-start">
          {orderedSubcategories.map((subcategory) => (
            <CategoryLayoutTabButton
              key={subcategory.slug}
              subcategory={subcategory}
              defaultTab={defaultTab}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryLayoutTab;
