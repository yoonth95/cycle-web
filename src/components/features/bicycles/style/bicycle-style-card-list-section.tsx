import BicycleStyleCard from "./bicycle-style-card";
import type { BicyclePageSection } from "@/types/bicycle";

interface BicycleStyleCardListSectionProps {
  section: BicyclePageSection;
}

const BicycleStyleCardListSection = ({ section }: BicycleStyleCardListSectionProps) => {
  if (!section.cardList?.length) {
    return null;
  }

  return (
    <section className="mb-12">
      <div className="grid grid-cols-1 gap-4 gap-y-8 sm:grid-cols-3 [@media(min-width:425px)_and_(max-width:768px)]:grid-cols-2">
        {section.cardList
          .sort((a, b) => a.order - b.order)
          .map((card) => (
            <BicycleStyleCard key={card.id} card={card} />
          ))}
      </div>
    </section>
  );
};

export default BicycleStyleCardListSection;
