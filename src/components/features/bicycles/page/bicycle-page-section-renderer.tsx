import SectionHeader from "@/components/common/section-header";
import { BicycleCardListSection } from "@/components/features/bicycles/page";
import type { BicycleContentSection } from "@/types/bicycle";

interface BicyclePageSectionRendererProps {
  section: BicycleContentSection;
}

export const BicyclePageSectionRenderer = ({ section }: BicyclePageSectionRendererProps) => {
  switch (section.section) {
    case "header":
      return <SectionHeader title={section.title} description={section.description} />;

    case "cardListSection":
      return <BicycleCardListSection key={section.id} section={section} />;

    default:
      return null;
  }
};

export default BicyclePageSectionRenderer;
