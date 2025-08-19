"use client";

import { useSearchParams } from "next/navigation";
import { SubcategoryItemType } from "@/types/bicycle";

interface CategoryLayoutTabButtonProps {
  subcategory: SubcategoryItemType;
  defaultTab: string;
}

const CategoryLayoutTabButton = ({ subcategory, defaultTab }: CategoryLayoutTabButtonProps) => {
  const searchParams = useSearchParams();

  const currentTab = searchParams.get("tab") || defaultTab;

  const handleTabChange = (slug: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("tab", slug);
    window.history.pushState(null, "", `?${params.toString()}`);
  };
  return (
    <button
      key={subcategory.slug}
      onClick={() => handleTabChange(subcategory.slug)}
      data-state={currentTab === subcategory.slug ? "active" : "inactive"}
      className={`relative z-10 flex h-[calc(100%-1px)] min-w-[130px] flex-1 cursor-pointer items-center justify-center rounded-md px-4 py-1.5 text-center text-sm font-medium transition-all duration-150 ease-in ${
        currentTab === subcategory.slug
          ? "bg-figma-cinderella text-figma-thunderbird"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {subcategory.name}
    </button>
  );
};

export default CategoryLayoutTabButton;
