import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import CallButton from "./call-button";
import { getSeason } from "@/utils/getSeason";
import type { HeroSectionProps } from "@/types/home";
import { Phone, MapPin, Clock } from "lucide-react";

export function HeroSection({ data }: HeroSectionProps) {
  const season = getSeason();

  return (
    <section className="relative">
      <div className="relative container mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-9 xl:gap-12 items-center min-h-[85vh]">
          {/* 텍스트 */}
          <div className="lg:col-span-2 space-y-4 xl:space-y-8 lg:order-last pt-10 lg:pt-0">
            <div className="inline-flex items-center gap-2 bg-figma-cinderella text-figma-thunderbird px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-medium border border-figma-your-pink">
              {data.badge}
            </div>

            <div className="space-y-4 lg:space-y-6">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-figma-ebony-clay leading-tight">
                <span className="block">{data.title}</span>
                <span className="block text-figma-alizarin-crimson">{data.subTitle}</span>
              </h1>

              <p className="text-sm sm:text-base lg:text-base xl:text-xl text-figma-river-bed leading-relaxed">
                {data.description}
              </p>
            </div>

            <div className="grid gap-3 lg:gap-6">
              <Card className="p-4 xl:p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 lg:space-x-4">
                    <div className="p-2 lg:p-3 bg-figma-cinderella rounded-xl">
                      <Phone className="w-4 h-4 md:h-5 md:w-5 xl:h-6 xl:w-6 text-figma-thunderbird" />
                    </div>
                    <div>
                      <p className="text-xs lg:text-sm text-figma-jumbo font-medium">전화 문의</p>
                      <p className="text-lg xl:text-xl font-bold text-figma-cod-gray">
                        {data.officeNumber}
                      </p>
                    </div>
                  </div>
                  <CallButton officeNumber={data.officeNumber} />
                </div>
              </Card>

              <div className="grid sm:grid-cols-2 gap-3 lg:gap-4">
                <Card className="flex items-center p-3 lg:p-4 bg-white/60 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center space-x-2 lg:space-x-3">
                    <div className="p-1.5 lg:p-2 bg-figma-cinderella rounded-lg">
                      <MapPin className="h-4 w-4 md:h-5 md:w-5 text-figma-thunderbird" />
                    </div>
                    <div>
                      <p className="text-xs lg:text-sm text-figma-jumbo">위치</p>
                      <p className="font-semibold text-figma-cod-gray text-sm xl:text-base lg:text-xs">
                        {data.address}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="flex items-center p-3 lg:p-4 bg-white/60 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center space-x-2 lg:space-x-3">
                    <div className="p-1.5 lg:p-2 bg-figma-cinderella rounded-lg">
                      <Clock className="h-4 w-4 md:h-5 md:w-5 text-figma-thunderbird" />
                    </div>
                    <div>
                      <p className="text-xs lg:text-sm text-figma-jumbo">영업시간</p>
                      <p className="font-semibold text-figma-cod-gray text-sm xl:text-base lg:text-xs">
                        {data.seasonalHours[season].time}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* 이미지 */}
          <div className="lg:col-span-3 relative lg:order-first">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <AspectRatio ratio={4 / 3}>
                <Image src={data.mainImage} alt="삼천리 자전거 중동역점" fill />
              </AspectRatio>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
