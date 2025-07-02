import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, MapPin } from "lucide-react";

export function HeroSection() {
  return (
    <section className="bg-white min-h-[70vh] flex items-center">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* 이미지 영역 */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
              {/* 실제 이미지 대신 플레이스홀더 */}
              <div className="absolute inset-0 bg-gradient-to-br from-muted to-border flex items-center justify-center">
                <p className="text-muted-foreground text-lg font-medium">매장 외관 사진</p>
              </div>

              {/* 그라데이션 오버레이 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              {/* 하단 텍스트 */}
              <div className="absolute bottom-4 left-4 text-white">
                <p className="body-small opacity-90">삼천리 자전거 중동역점 매장 외관</p>
              </div>
            </div>
          </div>

          {/* 텍스트 콘텐츠 */}
          <div className="space-y-6">
            {/* 뱃지 */}
            <div className="inline-flex items-center px-4 py-2 bg-figma-your-pink rounded-full">
              <span className="text-sm font-medium text-figma-old-brick">부천 중동 대표 자전거 전문점</span>
            </div>

            {/* 메인 제목 */}
            <div className="space-y-4">
              <h1 className="heading-2 text-foreground leading-tight">
                삼천리 자전거
                <br />
                중동역점
              </h1>

              <p className="body-large text-muted-foreground">
                부천 중동 북부역 상동시장입구 대로변에 있는 삼천리 자전거 중동역점입니다. 다양한 자전거와 전문적인 수리
                서비스를 제공합니다.
              </p>
            </div>

            {/* 연락처 정보 카드 */}
            <div className="space-y-3">
              <Card className="p-4 border-figma-your-pink hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-figma-your-pink rounded p-1 flex items-center justify-center">
                    <Phone className="w-3 h-3 text-figma-old-brick" />
                  </div>
                  <div>
                    <h3 className="body-medium-strong text-foreground">전화문의</h3>
                    <p className="mono-small text-muted-foreground">032-326-3002</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border-figma-your-pink hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-figma-your-pink rounded p-1 flex items-center justify-center">
                    <MapPin className="w-3 h-3 text-figma-old-brick" />
                  </div>
                  <div>
                    <h3 className="body-medium-strong text-foreground">위치</h3>
                    <p className="body-small text-muted-foreground">중동역점</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* 액션 버튼 */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="bg-figma-alizarin-crimson hover:bg-figma-old-brick text-white px-6 py-2.5 h-auto"
                size="lg"
              >
                <Phone className="w-4 h-4 mr-2" />
                전화 문의하기
              </Button>

              <Button
                variant="outline"
                className="border-figma-alizarin-crimson text-figma-alizarin-crimson hover:bg-figma-alizarin-crimson hover:text-white px-6 py-2.5 h-auto"
                size="lg"
              >
                <MapPin className="w-4 h-4 mr-2" />
                오시는 길
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
