import Image from "next/image";

interface IntroTabContentProps {
  productImages: string[];
  productName: string;
}

// 상수 정의
const PRODUCT_IMAGE_ASPECT_RATIO = 3 / 2;

// 유틸리티 함수
const generateImageAlt = (productName: string, index: number): string => {
  return `${productName} 제품 소개 이미지 ${index + 1}`;
};

const IntroTabContent = ({ productImages, productName }: IntroTabContentProps) => {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-xl font-semibold">제품 소개</h3>
      <div className="grid gap-6">
        {productImages.map((image, index) => {
          const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_IMAGE_URL}${image}`;
          return (
            <div key={index} className="relative overflow-hidden rounded-lg">
              <div
                className="relative aspect-[3/2]"
                style={{ aspectRatio: PRODUCT_IMAGE_ASPECT_RATIO }}
              >
                <Image
                  src={imageUrl}
                  alt={generateImageAlt(productName, index)}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IntroTabContent;
