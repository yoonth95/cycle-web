import {
  normalizeSectionsFromDB,
  createPageContentData,
  type SectionHandlerMap,
} from "@/lib/common/transform-utils";
import {
  type BicyclePageContentData,
  type BicycleHeaderSectionType,
  type BicycleCardListSectionType,
  type BicycleSectionMap,
  type BicycleNormalizationInput,
  BicycleSectionSchema,
} from "@/types/bicycle";

/**
 * Bicycle 페이지 섹션별 데이터 처리 핸들러
 */
const bicycleSectionHandlers: SectionHandlerMap<typeof BicycleSectionSchema> = {
  header: (s, toHtml) => {
    if (s.section !== "header") return null;
    const normalized: BicycleHeaderSectionType = {
      ...s,
      description: toHtml(s.description),
    };
    return normalized;
  },

  cardListSection: (s, toHtml) => {
    if (s.section !== "cardListSection") return null;
    const normalized: BicycleCardListSectionType = {
      ...s,
      description: s.description ? toHtml(s.description) : undefined,
      cardList: s.cardList.map((card) => ({
        ...card,
        description: toHtml(card.description),
      })),
    };
    return normalized;
  },
};

/**
 * DB에서 가져온 Bicycle 페이지 데이터를 정규화하는 함수
 */
export function normalizeBicycleSectionsFromDB(
  rows: BicycleNormalizationInput[],
): BicyclePageContentData | null {
  const sections = normalizeSectionsFromDB(
    rows,
    BicycleSectionSchema,
    bicycleSectionHandlers,
    "bicycle section",
  ) as Array<BicycleSectionMap[keyof BicycleSectionMap]> | null;

  if (!sections) return null;

  return createPageContentData(sections) as BicyclePageContentData;
}
