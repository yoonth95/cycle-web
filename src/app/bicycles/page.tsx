import { BicyclePageSectionRenderer } from "@/components/features/bicycles/page";
import bicyclesPageData from "@/data/bicycles-page.json";
import type { BicyclePageData } from "@/types/bicycle";

export default function BicyclesPage() {
  const pageData = bicyclesPageData as BicyclePageData;
  const orderedSections = [...pageData].sort((a, b) => a.order - b.order);

  return (
    <div className="container mx-auto px-4 py-8 lg:max-w-[70rem]">
      {orderedSections.map((section) => (
        <BicyclePageSectionRenderer key={section.id} section={section} />
      ))}
    </div>
  );
}
