import {
  normalizeSectionsFromDB,
  createPageContentData,
  type SectionHandlerMap,
} from "@/lib/common/transform-utils";
import {
  type HomePageContentData,
  type HeroSectionType,
  type ServicesSectionType,
  type BicycleTypesSectionType,
  type LocationSectionType,
  type SectionMap,
  type NormalizationInput,
  SectionSchema,
} from "@/types/home";

/**
 * Home 페이지 섹션별 데이터 처리 핸들러
 */
const homeSectionHandlers: SectionHandlerMap<typeof SectionSchema> = {
  hero: (s, toHtml) => {
    if (s.section !== "hero") return null;
    const normalized: HeroSectionType = {
      ...s,
      title: toHtml(s.title),
      description: toHtml(s.description),
    };
    return normalized;
  },

  services: (s, toHtml) => {
    if (s.section !== "services") return null;
    const normalized: ServicesSectionType = {
      ...s,
      description: toHtml(s.description),
      serviceTypes: s.serviceTypes.map((it) => ({
        ...it,
        description: toHtml(it.description),
      })),
    };
    return normalized;
  },

  bicycleTypes: (s, toHtml) => {
    if (s.section !== "bicycleTypes") return null;
    const normalized: BicycleTypesSectionType = {
      ...s,
      description: toHtml(s.description),
      bicycleTypes: s.bicycleTypes.map((it) => ({
        ...it,
        description: toHtml(it.description),
      })),
    };
    return normalized;
  },

  location: (s, toHtml) => {
    if (s.section !== "location") return null;
    const normalized: LocationSectionType = {
      ...s,
      description: toHtml(s.description),
    };
    return normalized;
  },
};

/**
 * DB에서 가져온 Home 페이지 데이터를 정규화하는 함수
 */
export function normalizeHomeSectionsFromDB(
  rows: NormalizationInput[],
): HomePageContentData | null {
  const sections = normalizeSectionsFromDB(
    rows,
    SectionSchema,
    homeSectionHandlers,
    "home section",
  ) as Array<SectionMap[keyof SectionMap]> | null;

  if (!sections) return null;

  return createPageContentData(sections) as HomePageContentData;
}
