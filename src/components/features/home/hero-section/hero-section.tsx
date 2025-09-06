import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import CallButton from "./call-button";
import { getSeason } from "@/utils/getSeason";
import type { HeroSectionProps } from "@/types/home";
import { Phone, MapPin, Clock } from "lucide-react";

export function HeroSection({ data }: HeroSectionProps) {
  const season = getSeason();
  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_IMAGE_URL}${data.mainImage}`;

  return (
    <section className="relative">
      <div className="relative container mx-auto px-6">
        <div className="grid min-h-[85vh] items-center gap-12 lg:grid-cols-5 lg:gap-9 xl:gap-12">
          {/* 텍스트 */}
          <div className="space-y-4 pt-10 lg:order-last lg:col-span-2 lg:pt-0 xl:space-y-8">
            <div className="bg-figma-cinderella text-figma-thunderbird border-figma-your-pink inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium lg:px-4 lg:py-2 lg:text-sm">
              {data.badge}
            </div>

            <div className="space-y-4 lg:space-y-6">
              <div
                className="text-2xl leading-tight font-bold sm:text-3xl lg:text-4xl xl:text-5xl"
                dangerouslySetInnerHTML={{ __html: data.title }}
                suppressHydrationWarning
              />

              <div
                className="text-sm leading-relaxed sm:text-base lg:text-base xl:text-xl"
                dangerouslySetInnerHTML={{ __html: data.description }}
                suppressHydrationWarning
              />
            </div>

            <div className="grid gap-3 lg:gap-6">
              <Card className="border-0 bg-white/80 p-4 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl xl:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 lg:space-x-4">
                    <div className="bg-figma-cinderella rounded-xl p-2 lg:p-3">
                      <Phone className="text-figma-thunderbird h-4 w-4 md:h-5 md:w-5 xl:h-6 xl:w-6" />
                    </div>
                    <div>
                      <p className="text-figma-jumbo text-xs font-medium lg:text-sm">전화 문의</p>
                      <p className="text-figma-cod-gray text-lg font-bold xl:text-xl">
                        {data.officeNumber}
                      </p>
                    </div>
                  </div>
                  <CallButton officeNumber={data.officeNumber} />
                </div>
              </Card>

              <div className="grid gap-3 sm:grid-cols-2 lg:gap-4">
                <Card className="flex items-center border-0 bg-white/60 p-3 shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-lg lg:p-4">
                  <div className="flex items-center space-x-2 lg:space-x-3">
                    <div className="bg-figma-cinderella rounded-lg p-1.5 lg:p-2">
                      <MapPin className="text-figma-thunderbird h-4 w-4 md:h-5 md:w-5" />
                    </div>
                    <div>
                      <p className="text-figma-jumbo text-xs lg:text-sm">위치</p>
                      <p className="text-figma-cod-gray text-sm font-semibold lg:text-xs xl:text-base">
                        {data.address}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="flex items-center border-0 bg-white/60 p-3 shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-lg lg:p-4">
                  <div className="flex items-center space-x-2 lg:space-x-3">
                    <div className="bg-figma-cinderella rounded-lg p-1.5 lg:p-2">
                      <Clock className="text-figma-thunderbird h-4 w-4 md:h-5 md:w-5" />
                    </div>
                    <div>
                      <p className="text-figma-jumbo text-xs lg:text-sm">영업시간</p>
                      <p className="text-figma-cod-gray text-sm font-semibold lg:text-xs xl:text-base">
                        {data.seasonalHours[season].time}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* 이미지 */}
          <div className="relative lg:order-first lg:col-span-3">
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <AspectRatio ratio={4 / 3}>
                <Image src={imageUrl} alt="삼천리 자전거 중동역점" fill />
              </AspectRatio>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
