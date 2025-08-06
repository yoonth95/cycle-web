import { BicyclePageHeader } from "@/components/features/bicycles/page";
import BicycleStyleCardListSection from "./bicycle-style-card-list-section";
import type { BicyclePageSection } from "@/types/bicycle";

interface BicycleStylePageSectionRendererProps {
  section: BicyclePageSection;
}

const BicycleStylePageSectionRenderer = ({ section }: BicycleStylePageSectionRendererProps) => {
  switch (section.section) {
    case "header":
      return <BicyclePageHeader key={section.id} section={section} />;

    case "cardListSection":
      return <BicycleStyleCardListSection key={section.id} section={section} />;

    default:
      console.warn(`Unknown section type: ${section.section}`);
      return null;
  }
};

export default BicycleStylePageSectionRenderer;
