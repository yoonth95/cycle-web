import SectionHeader from "@/components/common/section-header";
import { BicycleStyleCardListSection } from "@/components/features/bicycles/style";
import type { BicycleContentSection } from "@/types/bicycle";

interface BicycleStylePageSectionRendererProps {
  section: BicycleContentSection;
}

export const BicycleStylePageSectionRenderer = ({
  section,
}: BicycleStylePageSectionRendererProps) => {
  switch (section.section) {
    case "header":
      return <SectionHeader title={section.title} description={section.description} />;

    case "cardListSection":
      return <BicycleStyleCardListSection key={section.id} section={section} />;

    default:
      return null;
  }
};

export default BicycleStylePageSectionRenderer;
