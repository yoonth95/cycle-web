import {
  normalizeSectionsFromDB,
  createPageContentData,
  type SectionHandlerMap,
} from "@/lib/common/transform-utils";
import {
  type ProductsPageContentData,
  type AccessoriesHeaderSectionType,
  type AccessoriesImageSectionType,
  type AccessoriesPreparationSectionType,
  type ProductsSectionMap,
  type NormalizationInput,
  ProductsSectionSchema,
} from "@/types/products";

/**
 * Products 페이지 섹션별 데이터 처리 핸들러
 */
const productsSectionHandlers: SectionHandlerMap<typeof ProductsSectionSchema> = {
  "accessories-header": (s, toHtml) => {
    if (s.section !== "accessories-header") return null;
    const normalized: AccessoriesHeaderSectionType = {
      ...s,
      title: toHtml(s.title),
      description: toHtml(s.description),
    };
    return normalized;
  },

  "accessories-image": (s, toHtml) => {
    if (s.section !== "accessories-image") return null;
    const normalized: AccessoriesImageSectionType = {
      ...s,
      image: toHtml(s.image),
    };
    return normalized;
  },

  "accessories-preparation": (s, toHtml) => {
    if (s.section !== "accessories-preparation") return null;
    const normalized: AccessoriesPreparationSectionType = {
      ...s,
      preparationItems: s.preparationItems.map((item) => toHtml(item)),
    };
    return normalized;
  },
};

/**
 * DB에서 가져온 Products 페이지 데이터를 정규화하는 함수
 */
export function normalizeProductsSectionsFromDB(
  rows: NormalizationInput[],
): ProductsPageContentData | null {
  const sections = normalizeSectionsFromDB(
    rows,
    ProductsSectionSchema,
    productsSectionHandlers,
    "products section",
  ) as Array<ProductsSectionMap[keyof ProductsSectionMap]> | null;

  if (!sections) return null;

  return createPageContentData(sections) as ProductsPageContentData;
}
