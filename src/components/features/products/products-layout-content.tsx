import {
  AccessoriesHeaderSection,
  AccessoriesImageSection,
  AccessoriesPreparationSection,
} from ".";
import type {
  ProductsContentLayout,
  ProductsPageContentData,
  AccessoriesHeaderSectionType,
  ProductsSectionMap,
  AccessoriesImageSectionType,
  AccessoriesPreparationSectionType,
} from "@/types/products";

interface ProductsLayoutContentProps {
  contentLayout: ProductsContentLayout;
  contentData: ProductsPageContentData;
}

function findSectionData<T extends keyof ProductsSectionMap>(
  sectionKey: T,
  contentData: ProductsPageContentData,
): ProductsSectionMap[T] | undefined {
  return contentData.sections.find((s) => s.section === sectionKey) as
    | ProductsSectionMap[T]
    | undefined;
}

const ProductsLayoutContent = ({ contentLayout, contentData }: ProductsLayoutContentProps) => {
  const orderedSections = [...contentLayout.sections].sort((a, b) => a.order - b.order);

  return (
    <div className={contentLayout.className}>
      {orderedSections.map((section) => {
        switch (section.section) {
          case "accessories-header": {
            const data = findSectionData("accessories-header", contentData) as
              | AccessoriesHeaderSectionType
              | undefined;

            if (!data) return null;
            return <AccessoriesHeaderSection key={section.id} data={data} />;
          }
          case "accessories-image": {
            const data = findSectionData("accessories-image", contentData) as
              | AccessoriesImageSectionType
              | undefined;
            if (!data) return null;
            return <AccessoriesImageSection key={section.id} data={data} />;
          }
          case "accessories-preparation": {
            const data = findSectionData("accessories-preparation", contentData) as
              | AccessoriesPreparationSectionType
              | undefined;
            if (!data) return null;
            return <AccessoriesPreparationSection key={section.id} data={data} />;
          }

          default:
            console.warn(`Unknown products content section type: ${section.section}`);
            return null;
        }
      })}
    </div>
  );
};

export default ProductsLayoutContent;
