"use client";

import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BicycleDetail } from "@/types/bicycle";

interface DetailContentProps {
  bicycleData: BicycleDetail;
}

const DetailContent = ({ bicycleData }: DetailContentProps) => {
  // 전체 스펙을 표 형태로 변환
  const specifications = [
    {
      category: "기본 사양",
      items: Object.entries(bicycleData.fullSpecs)
        .slice(0, 6)
        .map(([key, value]) => ({
          spec: key,
          value: value,
        })),
    },
    {
      category: "추가 사양",
      items: Object.entries(bicycleData.fullSpecs)
        .slice(6)
        .map(([key, value]) => ({
          spec: key,
          value: value,
        })),
    },
  ];

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl p-4 lg:p-6">
        <div className="mb-8 grid gap-8 lg:grid-cols-2">
          {/* Image Section */}
          <div className="space-y-4">
            {/* Main Image Carousel */}
            <div className="relative">
              <Carousel
                opts={{
                  align: "start",
                  loop: true, // 무한 루프 설정
                }}
                className="w-full"
              >
                <CarouselContent>
                  {bicycleData.mainImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <AspectRatio ratio={54 / 31}>
                        <Image
                          src={image}
                          alt={`${bicycleData.name} 이미지 ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </AspectRatio>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {/* 2개 이상일 때만 네비게이션 버튼 표시 */}
                {bicycleData.mainImages.length > 1 && (
                  <>
                    <CarouselPrevious className="left-4 bg-white/90 hover:bg-white" />
                    <CarouselNext className="right-4 bg-white/90 hover:bg-white" />
                  </>
                )}
              </Carousel>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Badge className="bg-red-500 text-white">NEW</Badge>
              </div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900">{bicycleData.name}</h1>
              <p className="text-gray-600">{bicycleData.description}</p>
            </div>

            {/* Features */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold">특징</h3>
              <div className="flex flex-wrap gap-2">
                {bicycleData.features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="rounded-lg bg-white shadow-sm">
          <Tabs defaultValue="intro" className="w-full">
            <TabsList className="grid w-full grid-cols-3 rounded-t-lg bg-gray-100">
              <TabsTrigger value="intro" className="data-[state=active]:bg-white">
                제품 소개
              </TabsTrigger>
              <TabsTrigger value="specs" className="data-[state=active]:bg-white">
                제품 사양
              </TabsTrigger>
              <TabsTrigger value="size" className="data-[state=active]:bg-white">
                사이즈
              </TabsTrigger>
            </TabsList>

            <TabsContent value="intro" className="p-6">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">제품 소개</h3>
                <div className="grid gap-6">
                  {bicycleData.productImages.map((image, index) => (
                    <div key={index} className="relative aspect-[3/2] overflow-hidden rounded-lg">
                      <Image
                        src={image}
                        alt={`제품 소개 이미지 ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specs" className="p-6">
              <div className="space-y-8">
                <h3 className="text-xl font-semibold">상세 사양</h3>
                {specifications.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="space-y-4">
                    <h4 className="border-b border-gray-200 pb-2 text-lg font-medium text-gray-900">
                      {category.category}
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <tbody>
                          {category.items.map((item, itemIndex) => (
                            <tr key={itemIndex} className="border-b border-gray-100">
                              <td className="w-1/3 bg-gray-50 px-4 py-3 font-medium text-gray-700">
                                {item.spec}
                              </td>
                              <td className="px-4 py-3 text-gray-900">{item.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="size" className="p-6">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">사이즈 가이드</h3>
                <div className="grid gap-6">
                  {bicycleData.sizeImages.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100"
                    >
                      <Image
                        src={image}
                        alt={`사이즈 가이드 이미지 ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DetailContent;
