import SectionHeader from "@/components/common/section-header";
import type { BicyclePageSection } from "@/types/bicycle";

interface BicyclePageHeaderProps {
  section: BicyclePageSection;
}

const BicyclePageHeader = ({ section }: BicyclePageHeaderProps) => {
  return <SectionHeader title={section.title} description={section.description} />;
};

export default BicyclePageHeader;
