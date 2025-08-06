import { BicycleStylePageSectionRenderer } from "@/components/features/bicycles/style";
import bicyclesStylePageData from "@/data/bicycles-style-page.json";
import type { BicyclePageData } from "@/types/bicycle";

export default function StylePage() {
  const pageData = bicyclesStylePageData as BicyclePageData;
  const orderedSections = [...pageData].sort((a, b) => a.order - b.order);

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-2 py-8 sm:px-4 lg:max-w-[70rem]">
        {orderedSections.map((section) => (
          <BicycleStylePageSectionRenderer key={section.id} section={section} />
        ))}
      </div>
    </div>
  );
}
