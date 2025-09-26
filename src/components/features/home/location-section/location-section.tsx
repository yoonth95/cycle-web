import { Card } from "@/components/ui/card";
import SectionHeader from "@/components/common/section-header";
import { NaverMap, DirectionLink } from ".";
import { getIconComponent } from "@/utils/icon-mapping";
import type { LocationSectionProps } from "@/types/home";
import { MapPin, Phone, Clock, CircleQuestionMark } from "lucide-react";

export function LocationSection({ data }: LocationSectionProps) {
  return (
    <section className="py-16 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeader title={data.title} description={data.description} />

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* 지도 영역 */}
          <div className="flex flex-col gap-4">
            <Card className="overflow-hidden">
              <div className="bg-muted relative aspect-[4/3]">
                <NaverMap lat={Number(data.lat)} lng={Number(data.lng)} />
              </div>
            </Card>

            {/* 지도 액션 버튼 */}
            <div className="flex justify-end gap-3">
              <DirectionLink />
            </div>
          </div>

          {/* 매장 정보 */}
          <div className="flex flex-col justify-between gap-6">
            <h3 className="heading-4 text-foreground">매장 정보</h3>

            <div className="space-y-6">
              {/* 주소 */}
              <div className="border-border flex items-start gap-4 border-b pb-4">
                <MapPin className="text-figma-thunderbird h-6 w-6 flex-shrink-0" />
                <div>
                  <h4 className="body-medium-strong text-foreground mb-1">주소</h4>
                  <p className="body-medium text-muted-foreground">{data.address}</p>
                </div>
              </div>

              {/* 전화번호 */}
              <div className="border-border flex items-start gap-4 border-b pb-4">
                <Phone className="text-figma-thunderbird h-6 w-6 flex-shrink-0" />
                <div>
                  <h4 className="body-medium-strong text-foreground mb-2">전화번호</h4>
                  <div className="space-y-1">
                    <p className="body-medium text-muted-foreground">{data.phoneNumber}</p>
                    <p className="body-medium text-muted-foreground">{data.officeNumber}</p>
                  </div>
                </div>
              </div>

              {/* 이용시간 */}
              <div className="border-border flex items-start gap-4 border-b pb-4">
                <Clock className="text-figma-thunderbird h-6 w-6 flex-shrink-0" />
                <div>
                  <h4 className="body-medium-strong text-foreground mb-3">이용시간</h4>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <span className="body-medium text-muted-foreground w-8">매일</span>
                      <div>
                        <p className="mono-medium-strong text-foreground">
                          {data.seasonalHours.summer.time}
                        </p>
                        <p className="body-xs text-muted-foreground">
                          {data.seasonalHours.summer.label}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="body-medium text-muted-foreground w-8">매일</span>
                      <div>
                        <p className="mono-medium-strong text-foreground">
                          {data.seasonalHours.winter.time}
                        </p>
                        <p className="body-xs text-muted-foreground">
                          {data.seasonalHours.winter.label}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 이용안내 */}
              <div className="flex items-start gap-4">
                <CircleQuestionMark className="text-figma-thunderbird h-6 w-6 flex-shrink-0" />
                <div>
                  <h4 className="body-medium-strong text-foreground mb-3">이용안내</h4>
                  <div className="grid grid-cols-3 gap-3 md:grid-cols-5">
                    {data.storeInfo
                      .sort((a, b) => a.order - b.order)
                      .map((storeInfo) => (
                        <Card
                          key={storeInfo.order}
                          className="bg-muted flex h-full flex-col items-center justify-center border p-3"
                        >
                          <div className="text-center">
                            {(() => {
                              const IconComponent = getIconComponent(storeInfo.iconName);
                              return (
                                <IconComponent className="text-muted-foreground mx-auto mb-2 h-6 w-6" />
                              );
                            })()}
                            <p className="body-xs text-muted-foreground">{storeInfo.label}</p>
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
