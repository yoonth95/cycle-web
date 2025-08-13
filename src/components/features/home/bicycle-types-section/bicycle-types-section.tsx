import SectionHeader from "@/components/common/section-header";
import MobileBicycleTypes from "./mobile-bicycle-types";
import DesktopBicycleTypes from "./desktop-bicycle-types";
import type { BicycleTypesSectionProps } from "@/types/home";

export function BicycleTypesSection({ data }: BicycleTypesSectionProps) {
  return (
    <section className="pt-16 lg:pt-20">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeader title={data.title} description={data.description} />
        <div className="hidden sm:block">
          <DesktopBicycleTypes data={data.bicycleTypes} />
        </div>
        <div className="sm:hidden">
          <MobileBicycleTypes windowWidth={375} data={data.bicycleTypes} />
        </div>
      </div>
    </section>
  );
}
