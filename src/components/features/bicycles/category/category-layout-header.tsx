import type { CategoryContentSection } from "@/types/bicycle";

interface CategoryLayoutHeaderProps {
  section: CategoryContentSection;
  categoryData?: {
    title: string;
    description: string;
  };
}

const CategoryLayoutHeader = ({ section, categoryData }: CategoryLayoutHeaderProps) => {
  const title = categoryData?.title || section.placeholder?.title || "카테고리";
  const description = categoryData?.description || section.placeholder?.description || "";

  return (
    <div className={section.className}>
      <h1 className="mb-2 text-2xl font-bold text-gray-900 lg:text-3xl">{title}</h1>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default CategoryLayoutHeader;
