import BicycleCard from "./bicycle-card";
import type { BicyclePageSection } from "@/types/bicycle";

interface BicycleCardListSectionProps {
  section: BicyclePageSection;
}

const BicycleCardListSection = ({ section }: BicycleCardListSectionProps) => {
  if (!section.cardList?.length) {
    return null;
  }

  return (
    <section className="mb-12">
      <div className="flex items-center justify-center">
        {section.cardList
          .sort((a, b) => a.order - b.order)
          .map((card) => (
            <BicycleCard key={card.id} card={card} />
          ))}
      </div>
    </section>
  );
};

export default BicycleCardListSection;
