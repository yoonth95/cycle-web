import { HeroSkeleton } from "./hero-skeleton";
import { ServicesSkeleton } from "./services-skeleton";
import { BicycleTypesSkeleton } from "./bicycle-types-skeleton";
import { LocationSkeleton } from "./location-skeleton";

interface HomeContentSkeletonProps {
  sections: Array<{
    id: number;
    section: string;
    order: number;
  }>;
}

export function HomeContentSkeleton({ sections }: HomeContentSkeletonProps) {
  const orderedSections = [...sections].sort((a, b) => a.order - b.order);

  return (
    <>
      {orderedSections.map((section) => {
        switch (section.section) {
          case "hero":
            return <HeroSkeleton key={section.id} />;
          case "services":
            return <ServicesSkeleton key={section.id} />;
          case "bicycleTypes":
            return <BicycleTypesSkeleton key={section.id} />;
          case "location":
            return <LocationSkeleton key={section.id} />;
          default:
            return (
              <div
                key={section.id}
                className="flex h-64 animate-pulse items-center justify-center rounded-lg bg-gray-100"
              >
                <span className="text-gray-400">Loading {section.section}...</span>
              </div>
            );
        }
      })}
    </>
  );
}
