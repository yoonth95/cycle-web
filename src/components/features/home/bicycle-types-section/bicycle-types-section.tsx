"use client";

import SectionHeader from "@/components/common/section-header";
import MobileBicycleTypes from "./mobile-bicycle-types";
import DesktopBicycleTypes from "./desktop-bicycle-types";
import { useMobile } from "@/hooks/use-mobile";
import type { BicycleTypesSectionProps } from "@/types";

export function BicycleTypesSection({ data }: BicycleTypesSectionProps) {
  const [isMobile, windowWidth] = useMobile({ breakpoint: 640 });

  return (
    <section className="pt-16 lg:pt-20">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeader title={data.title} description={data.description} />

        {isMobile ? (
          <MobileBicycleTypes windowWidth={windowWidth} data={data.bicycleTypes} />
        ) : (
          <DesktopBicycleTypes data={data.bicycleTypes} />
        )}
      </div>
    </section>
  );
}
