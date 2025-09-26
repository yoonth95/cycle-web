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
  type BicycleFromDB,
  type BicycleDetail,
  BicycleSectionSchema,
  BicycleFromDBSchema,
  BicycleDetailSchema,
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

/**
 * Supabase BicycleFromDB 데이터를 상세 페이지용 BicycleDetail로 변환
 * Zod 스키마를 사용하여 타입 안전성 보장
 */
export function transformBicycleFromDBToDetail(rawData: unknown): BicycleDetail {
  const bicycleFromDB = BicycleFromDBSchema.parse(rawData);

  // specs에서 주요 사양 추출 (첫 4개 항목을 mainSpecs로 사용)
  const specs = bicycleFromDB.specs ?? {};

  // images 처리 (최소 1개는 보장)
  const mainImages = bicycleFromDB.images.length > 0 ? bicycleFromDB.images : [];

  // contents에서 productImages 추출 (null인 경우 기본 이미지 사용)
  const productImages =
    Array.isArray(bicycleFromDB.contents) && bicycleFromDB.contents.length > 0
      ? bicycleFromDB.contents
      : mainImages; // contents가 없으면 mainImages 사용

  // sizes에서 sizeImages 추출 (null인 경우 기본 이미지 사용)
  const sizeImages =
    Array.isArray(bicycleFromDB.sizes) && bicycleFromDB.sizes.length > 0 ? bicycleFromDB.sizes : []; // sizes가 없으면 기본 이미지 사용

  // BicycleDetail 객체 생성
  const detailData = {
    id: bicycleFromDB.id,
    name: bicycleFromDB.name,
    category: bicycleFromDB.category,
    category_id: bicycleFromDB.category_id,
    subcategory: bicycleFromDB.subcategory,
    tags: bicycleFromDB.tags ?? [],
    mainImages,
    fullSpecs: specs,
    features: bicycleFromDB.features ?? [],
    description: bicycleFromDB.description ?? "",
    productImages,
    sizeImages,
    availableSizes: [], // 현재는 빈 배열 (추후 확장 가능)
    availableColors: [], // 현재는 빈 배열 (추후 확장 가능)
  };

  // 결과를 BicycleDetail 스키마로 검증하고 반환
  return BicycleDetailSchema.parse(detailData);
}

/**
 * 안전한 BicycleFromDB 데이터 파싱
 */
export function parseBicycleFromDB(rawData: unknown): BicycleFromDB | null {
  try {
    return BicycleFromDBSchema.parse(rawData);
  } catch (error) {
    console.error("[parseBicycleFromDB] Parsing failed:", error);
    return null;
  }
}

/**
 * 여러 자전거 데이터를 안전하게 파싱
 */
export function parseBicyclesFromDB(rawDataArray: unknown[]): BicycleFromDB[] {
  return rawDataArray
    .map(parseBicycleFromDB)
    .filter((item): item is BicycleFromDB => item !== null);
}
