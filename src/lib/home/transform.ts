import { z } from "zod";
import { deltaToHtml } from "@/lib/home/quill";
import {
  type HomePageContentData,
  type HeroSectionType,
  type ServicesSectionType,
  type BicycleTypesSectionType,
  type LocationSectionType,
  type SectionMap,
  type NormalizationInput,
  SectionSchema,
  ServiceItemSchema,
  BicycleTypeItemSchema,
} from "@/types/home";

export function normalizeHomeSectionsFromDB(
  rows: NormalizationInput[],
): HomePageContentData | null {
  const sections: Array<SectionMap[keyof SectionMap]> = [];

  const toHtml = (value: unknown): string => {
    if (typeof value === "string") return value;
    if (value && typeof value === "object" && "ops" in (value as Record<string, unknown>)) {
      return deltaToHtml(value as { ops?: Array<Record<string, unknown>> });
    }
    return "";
  };

  for (const row of rows) {
    if (!row?.data || typeof row.data !== "object") continue;

    // row.section_type(=row.section)를 payload에 주입하여 스키마 판별
    const payloadWithSection = {
      ...(row.data as Record<string, unknown>),
      section: row.section,
    };

    // DB의 각 row.data는 section에 맞는 payload여야 함
    const parsed = SectionSchema.safeParse(payloadWithSection);
    if (!parsed.success) {
      console.warn("Invalid section payload", row.section, parsed.error?.message);
      continue;
    }

    const s = parsed.data as z.infer<typeof SectionSchema>;
    switch (s.section) {
      case "hero": {
        const normalized: HeroSectionType = {
          ...s,
          title: toHtml(s.title),
          description: toHtml(s.description),
        } as HeroSectionType;
        sections.push(normalized);
        break;
      }
      case "services": {
        const normalized: ServicesSectionType = {
          ...s,
          description: toHtml(s.description),
          serviceTypes: (s.serviceTypes as Array<z.infer<typeof ServiceItemSchema>>).map((it) => ({
            ...it,
            description: toHtml(it.description),
          })),
        } as ServicesSectionType;
        sections.push(normalized);
        break;
      }
      case "bicycleTypes": {
        const normalized: BicycleTypesSectionType = {
          ...s,
          description: toHtml(s.description),
          bicycleTypes: (s.bicycleTypes as Array<z.infer<typeof BicycleTypeItemSchema>>).map(
            (it) => ({
              ...it,
              description: toHtml(it.description),
            }),
          ),
        } as BicycleTypesSectionType;
        sections.push(normalized);
        break;
      }
      case "location": {
        const normalized: LocationSectionType = {
          ...s,
          description: toHtml(s.description),
        } as LocationSectionType;
        sections.push(normalized);
        break;
      }
      default: {
        // 타입 가드상 도달하지 않음
        break;
      }
    }
  }

  if (sections.length === 0) return null;

  return { sections } satisfies HomePageContentData;
}
