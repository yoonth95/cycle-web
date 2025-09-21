import type { LocationPageContentData } from "@/types/location";
import type { NormalizationInput } from "@/types/common";
import { LocationSectionSchema } from "@/types/home";

/**
 * 데이터베이스에서 가져온 location 섹션 데이터를 정규화
 */
export function normalizeLocationSectionsFromDB(
  sections: NormalizationInput[],
): LocationPageContentData | null {
  const locationSections = sections.filter((section) => section.section === "location");

  if (!locationSections.length) return null;

  const normalizedSections = locationSections.map((section) => {
    const dataWithSection = {
      ...(section.data as Record<string, unknown>),
      section: "location" as const,
    };

    const parsedData = LocationSectionSchema.parse(dataWithSection);

    return parsedData;
  });

  return {
    sections: normalizedSections,
  };
}
