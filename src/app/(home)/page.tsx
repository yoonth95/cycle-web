import { HeroSection } from "@/components/features/home/hero-section";
import { ServicesSection } from "@/components/features/home/services-section";
import { BicycleTypesSection } from "@/components/features/home/bicycle-types-section";
import { LocationSection } from "@/components/features/home/location-section";

export default function Home() {
  return (
    <>
      <HeroSection />

      <ServicesSection />

      <BicycleTypesSection />

      <LocationSection />
    </>
  );
}
