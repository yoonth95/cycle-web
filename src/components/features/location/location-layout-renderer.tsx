"use client";

import { LocationSection } from "@/components/features/home/location-section";
import { deltaToHtml, QuillDelta } from "@/lib/home/quill";
import type { LocationPageProps } from "@/types/location";

export function LocationLayoutRenderer({ layoutData, contentData }: LocationPageProps) {
  const { layout } = layoutData;

  return (
    <div className={layout.className}>
      <div className={layout.content.className}>
        {layout.content.sections
          .sort((a, b) => a.order - b.order)
          .map((sectionLayout) => {
            const sectionData = contentData.sections.find(
              (section) => section.id === sectionLayout.id,
            );

            if (!sectionData) {
              return (
                <div key={sectionLayout.id} className={sectionLayout.className}>
                  <div className="container mx-auto px-4 py-8">
                    <h2 className="mb-2 text-xl font-semibold">섹션을 찾을 수 없습니다</h2>
                    <p className="text-muted-foreground">
                      요청하신 섹션 데이터를 찾을 수 없습니다.
                    </p>
                  </div>
                </div>
              );
            }

            switch (sectionLayout.section) {
              case "location":
                const htmlDescription = deltaToHtml(sectionData.description as QuillDelta);
                const data = {
                  ...sectionData,
                  description: htmlDescription,
                };
                return (
                  <div key={sectionLayout.id} className={sectionLayout.className}>
                    <LocationSection data={data} />
                  </div>
                );
              default:
                return null;
            }
          })}
      </div>
    </div>
  );
}
