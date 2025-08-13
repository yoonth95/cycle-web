import { HeroSection, ServicesSection, BicycleTypesSection, LocationSection } from ".";
import type {
  HomeContentLayout,
  HomePageContentData,
  SectionMap,
  HeroSectionType,
  ServicesSectionType,
  BicycleTypesSectionType,
  LocationSectionType,
} from "@/types/home";

interface HomeLayoutContentProps {
  contentLayout: HomeContentLayout;
  contentData: HomePageContentData;
}

function findSectionData<T extends keyof SectionMap>(
  sectionKey: T,
  contentData: HomePageContentData,
): SectionMap[T] | undefined {
  return contentData.sections.find((s) => s.section === sectionKey) as SectionMap[T] | undefined;
}

const HomeLayoutContent = ({ contentLayout, contentData }: HomeLayoutContentProps) => {
  const orderedSections = [...contentLayout.sections].sort((a, b) => a.order - b.order);

  return (
    <div className={contentLayout.className}>
      {orderedSections.map((section) => {
        switch (section.section) {
          case "hero": {
            const data = findSectionData("hero", contentData) as HeroSectionType | undefined;
            if (!data) return null;
            return <HeroSection key={section.id} data={data} />;
          }
          case "services": {
            const data = findSectionData("services", contentData) as
              | ServicesSectionType
              | undefined;
            if (!data) return null;
            return <ServicesSection key={section.id} data={data} />;
          }
          case "bicycleTypes": {
            const data = findSectionData("bicycleTypes", contentData) as
              | BicycleTypesSectionType
              | undefined;
            if (!data) return null;
            return <BicycleTypesSection key={section.id} data={data} />;
          }
          case "location": {
            const data = findSectionData("location", contentData) as
              | LocationSectionType
              | undefined;
            if (!data) return null;
            return <LocationSection key={section.id} data={data} />;
          }
          default:
            console.warn(`Unknown home content section type: ${section.section}`);
            return null;
        }
      })}
    </div>
  );
};

export default HomeLayoutContent;
