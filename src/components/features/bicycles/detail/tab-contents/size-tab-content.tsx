import Image from "next/image";

interface SizeTabContentProps {
  sizeImages: string[];
  productName: string;
}

// 상수 정의
const SIZE_IMAGE_ASPECT_RATIO = 4 / 3;

// 유틸리티 함수
const generateImageAlt = (productName: string, index: number): string => {
  return `${productName} 사이즈 가이드 이미지 ${index + 1}`;
};

const SizeTabContent = ({ sizeImages, productName }: SizeTabContentProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">사이즈 가이드</h3>
      <div className="grid gap-6">
        {sizeImages.map((image, index) => (
          <div key={index} className="relative overflow-hidden rounded-lg bg-gray-100">
            <div className="relative" style={{ aspectRatio: SIZE_IMAGE_ASPECT_RATIO }}>
              <Image
                src={image}
                alt={generateImageAlt(productName, index)}
                fill
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SizeTabContent;
