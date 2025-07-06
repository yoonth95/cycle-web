"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/common/section-header";
import { getIconComponent } from "@/utils/icon-mapping";
import type { LocationSectionProps } from "@/types";
import { MapPin, Phone, Clock, Navigation, Map, CircleQuestionMark } from "lucide-react";

export function LocationSection({ data }: LocationSectionProps) {
  return (
    <section className="py-16 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeader title={data.title} description={data.description} />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* 지도 영역 */}
          <div className="flex flex-col gap-4">
            <Card className="overflow-hidden">
              <div className="aspect-[4/3] bg-muted relative">
                {/* 지도 플레이스홀더 */}
                <div className="absolute inset-0 bg-gradient-to-br from-muted to-border flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground font-medium">지도 영역</p>
                    <p className="text-muted-foreground text-sm">삼천리 자전거 중동역점 위치</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* 지도 액션 버튼 */}
            <div className="flex gap-3 justify-end">
              <Button className="bg-foreground hover:bg-foreground/90 text-background">
                <Navigation className="w-4 h-4 mr-2" />
                길찾기
              </Button>
              <Button variant="outline" className="border">
                <Map className="w-4 h-4 mr-2" />
                지도에서 보기
              </Button>
            </div>
          </div>

          {/* 매장 정보 */}
          <div className="flex flex-col gap-6 justify-between">
            <h3 className="heading-4 text-foreground">매장 정보</h3>

            <div className="space-y-6">
              {/* 주소 */}
              <div className="flex items-start gap-4 pb-4 border-b border-border">
                <MapPin className="w-6 h-6 flex-shrink-0 text-figma-thunderbird" />
                <div>
                  <h4 className="body-medium-strong text-foreground mb-1">주소</h4>
                  <p className="body-medium text-muted-foreground">{data.address}</p>
                </div>
              </div>

              {/* 전화번호 */}
              <div className="flex items-start gap-4 pb-4 border-b border-border">
                <Phone className="w-6 h-6 flex-shrink-0 text-figma-thunderbird" />
                <div>
                  <h4 className="body-medium-strong text-foreground mb-2">전화번호</h4>
                  <div className="space-y-1">
                    {data.phoneNumbers.map((number, index) => (
                      <p key={index} className="mono-medium text-muted-foreground">
                        {number}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* 이용시간 */}
              <div className="flex items-start gap-4 pb-4 border-b border-border">
                <Clock className="w-6 h-6 flex-shrink-0 text-figma-thunderbird" />
                <div>
                  <h4 className="body-medium-strong text-foreground mb-3">이용시간</h4>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <span className="body-medium text-muted-foreground w-8">매일</span>
                      <div>
                        <p className="mono-medium-strong text-foreground">
                          {data.hours.summer.time}
                        </p>
                        <p className="body-xs text-muted-foreground">{data.hours.summer.label}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="body-medium text-muted-foreground w-8">매일</span>
                      <div>
                        <p className="mono-medium-strong text-foreground">
                          {data.hours.winter.time}
                        </p>
                        <p className="body-xs text-muted-foreground">{data.hours.winter.label}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 이용안내 */}
              <div className="flex items-start gap-4">
                <CircleQuestionMark className="w-6 h-6 flex-shrink-0 text-figma-thunderbird" />
                <div>
                  <h4 className="body-medium-strong text-foreground mb-3">이용안내</h4>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                    {data.amenities.map((amenity, index) => (
                      <Card
                        key={index}
                        className="p-3 bg-muted border flex flex-col items-center justify-center h-full"
                      >
                        <div className="text-center">
                          {(() => {
                            const IconComponent = getIconComponent(amenity.iconName);
                            return (
                              <IconComponent className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                            );
                          })()}
                          <p className="body-xs text-muted-foreground">{amenity.label}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
