import BicyclePageHeader from "./bicycle-page-header";
import BicycleCardListSection from "./bicycle-card-list-section";
import type { BicyclePageSection } from "@/types/bicycle";

interface BicyclePageSectionRendererProps {
  section: BicyclePageSection;
}

const BicyclePageSectionRenderer = ({ section }: BicyclePageSectionRendererProps) => {
  switch (section.section) {
    case "header":
      return <BicyclePageHeader key={section.id} section={section} />;

    case "cardListSection":
      return <BicycleCardListSection key={section.id} section={section} />;

    default:
      console.warn(`Unknown section type: ${section.section}`);
      return null;
  }
};

export default BicyclePageSectionRenderer;
