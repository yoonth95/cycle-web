import {
  HeroSection,
  ServicesSection,
  BicycleTypesSection,
  LocationSection,
} from "@/components/features/home";
import type {
  HeroSectionType,
  ServicesSectionType,
  BicycleTypesSectionType,
  LocationSectionType,
} from "@/types/home";
import homePageData from "@/data/home-page.json";

export default async function Home() {
  const orderedSections = [...homePageData].sort((a, b) => a.order - b.order);

  return (
    <>
      {orderedSections.map((section) => {
        switch (section.section) {
          case "hero":
            return <HeroSection key={section.id} data={section as HeroSectionType} />;
          case "services":
            return <ServicesSection key={section.id} data={section as ServicesSectionType} />;
          case "bicycleTypes":
            return (
              <BicycleTypesSection key={section.id} data={section as BicycleTypesSectionType} />
            );
          case "location":
            return <LocationSection key={section.id} data={section as LocationSectionType} />;
          default:
            return null;
        }
      })}
    </>
  );
}
