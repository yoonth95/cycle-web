import { HeroSection } from "@/components/features/home/hero-section";
import { ServicesSection } from "@/components/features/home/services-section";
import { BicycleTypesSection } from "@/components/features/home/bicycle-types-section";
import { LocationSection } from "@/components/features/home/location-section";
import { getHomePageData } from "@/lib/data-service";

export default async function Home() {
  const data = await getHomePageData();

  return (
    <>
      <HeroSection data={data.hero} />

      <ServicesSection data={data.services} />

      <BicycleTypesSection data={data.bicycleTypes} />

      <LocationSection data={data.location} />
    </>
  );
}
