import Image from "next/image";

interface SizeTabContentProps {
  sizeImages: string[];
  productName: string;
}

// 유틸리티 함수
const generateImageAlt = (productName: string, index: number): string => {
  return `${productName} 사이즈 가이드 이미지 ${index + 1}`;
};

const SizeTabContent = ({ sizeImages, productName }: SizeTabContentProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">사이즈 가이드</h3>
      <div className="grid gap-6">
        {sizeImages.map((image, index) => {
          const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_IMAGE_URL}${image}`;
          return (
            <div key={index} className="mx-auto">
              <Image
                src={imageUrl}
                alt={generateImageAlt(productName, index)}
                width={1200}
                height={0}
                style={{
                  width: "825px",
                  height: "auto",
                }}
                priority={index === 0} // 첫 번째 이미지만 우선 로딩
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SizeTabContent;
