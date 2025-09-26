"use client";

import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductImageSectionProps {
  mainImages: string[];
  productName: string;
}

// 상수 정의
const MAIN_IMAGE_ASPECT_RATIO = 54 / 31;
const MIN_IMAGES_FOR_NAVIGATION = 1;

// 유틸리티 함수
const generateImageAlt = (productName: string, index: number): string => {
  return `${productName} 이미지 ${index + 1}`;
};

const shouldShowCarouselNavigation = (imagesLength: number): boolean => {
  return imagesLength > MIN_IMAGES_FOR_NAVIGATION;
};

const ProductImageSection = ({ mainImages, productName }: ProductImageSectionProps) => {
  const showNavigation = shouldShowCarouselNavigation(mainImages.length);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {mainImages.map((image, index) => {
              const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_IMAGE_URL}${image}`;
              return (
                <CarouselItem key={index}>
                  <AspectRatio ratio={MAIN_IMAGE_ASPECT_RATIO}>
                    <Image
                      src={imageUrl}
                      alt={generateImageAlt(productName, index)}
                      fill
                      className="object-cover"
                      priority={index === 0} // 첫 번째 이미지는 우선 로드
                    />
                  </AspectRatio>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          {showNavigation && (
            <>
              <CarouselPrevious className="left-4 bg-white/90 hover:bg-white" />
              <CarouselNext className="right-4 bg-white/90 hover:bg-white" />
            </>
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default ProductImageSection;
