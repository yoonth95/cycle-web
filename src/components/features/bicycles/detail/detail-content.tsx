import { useMemo } from "react";
import { BicycleDetail, SpecificationCategory } from "@/types/bicycle";
import ProductImageSection from "./product-image-section";
import ProductInfoSection from "./product-info-section";
import ProductTabsSection from "./product-tabs-section";

interface DetailContentProps {
  bicycleData: BicycleDetail;
}

// 상수 정의
const BASIC_SPECS_LIMIT = 6;
const SPEC_CATEGORIES = {
  BASIC: "기본 사양",
  ADDITIONAL: "추가 사양",
} as const;

// 유틸리티 함수
const createSpecificationCategories = (
  fullSpecs: BicycleDetail["fullSpecs"],
): SpecificationCategory[] => {
  const specsEntries = Object.entries(fullSpecs);

  return [
    {
      category: SPEC_CATEGORIES.BASIC,
      items: specsEntries.slice(0, BASIC_SPECS_LIMIT).map(([key, value]) => ({
        spec: key,
        value: value,
      })),
    },
    {
      category: SPEC_CATEGORIES.ADDITIONAL,
      items: specsEntries.slice(BASIC_SPECS_LIMIT).map(([key, value]) => ({
        spec: key,
        value: value,
      })),
    },
  ];
};

const DetailContent = ({ bicycleData }: DetailContentProps) => {
  const specifications = useMemo(
    () => createSpecificationCategories(bicycleData.fullSpecs),
    [bicycleData.fullSpecs],
  );

  const productData = useMemo(
    () => ({
      name: bicycleData.name,
      description: bicycleData.description,
      features: bicycleData.features,
      mainImages: bicycleData.mainImages,
      productImages: bicycleData.productImages,
      sizeImages: bicycleData.sizeImages,
    }),
    [bicycleData],
  );

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl p-4 lg:p-6">
        <div className="mb-8 grid gap-8 lg:grid-cols-2">
          {/* Image Section */}
          <ProductImageSection mainImages={productData.mainImages} productName={productData.name} />

          {/* Product Info */}
          <ProductInfoSection
            name={productData.name}
            description={productData.description}
            features={productData.features}
          />
        </div>

        {/* Tabs Section */}
        <ProductTabsSection
          productImages={productData.productImages}
          specifications={specifications}
          sizeImages={productData.sizeImages}
          productName={productData.name}
        />
      </div>
    </div>
  );
};

export default DetailContent;
