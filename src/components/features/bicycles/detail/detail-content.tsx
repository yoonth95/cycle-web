import { useMemo } from "react";
import {
  ProductImageSection,
  ProductInfoSection,
  ProductTabsSection,
} from "@/components/features/bicycles/detail";
import { BicycleDetail, SpecificationItem } from "@/types/bicycle";

interface DetailContentProps {
  bicycleData: BicycleDetail;
}

// 유틸리티 함수
const createSpecificationItems = (fullSpecs: BicycleDetail["fullSpecs"]): SpecificationItem[] => {
  return Object.entries(fullSpecs).map(([key, value]) => ({
    spec: key,
    value: value,
  }));
};

const DetailContent = ({ bicycleData }: DetailContentProps) => {
  const specifications = useMemo(
    () => createSpecificationItems(bicycleData.fullSpecs),
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
      tags: bicycleData.tags,
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
            tags={productData.tags}
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
