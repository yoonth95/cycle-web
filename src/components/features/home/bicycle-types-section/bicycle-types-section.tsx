import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const bicycleTypes = [
  {
    title: "전기자전거",
    description: "전기모터의 힘을 더하여 적은 힘으로도 편하게 주행할 수 있는 자전거",
    image: "/api/placeholder/300/400",
    featured: true,
  },
  {
    title: "로드",
    description: "빠른 속도와 효율적인 주행을 위한 자전거",
    image: "/api/placeholder/300/400",
  },
  {
    title: "하이브리드",
    description: "도시와 자연을 모두 누릴 수 있는 다목적 자전거",
    image: "/api/placeholder/300/400",
  },
  {
    title: "픽시",
    description: "심플하고 스타일리시한 고정기어 자전거",
    image: "/api/placeholder/300/400",
  },
  {
    title: "컴포트 산악형",
    description: "편안한 승차감의 산악 자전거",
    image: "/api/placeholder/300/400",
  },
  {
    title: "시티",
    description: "도심 주행에 최적화된 편리한 자전거",
    image: "/api/placeholder/300/400",
  },
  {
    title: "폴딩",
    description: "휴대성이 뛰어난 접이식 자전거",
    image: "/api/placeholder/300/400",
  },
  {
    title: "키즈",
    description: "아이들을 위한 안전하고 재미있는 자전거",
    image: "/api/placeholder/300/400",
  },
  {
    title: "주니어",
    description: "청소년을 위한 성장기 맞춤 자전거",
    image: "/api/placeholder/300/400",
  },
];

export function BicycleTypesSection() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mx-auto mb-12 lg:mb-16">
          <h2 className="heading-3 text-foreground mb-4">자전거 종류</h2>
          <p className="body-medium text-muted-foreground">
            다양한 종류의 자전거를 보유하고 있습니다. 고객님의 용도에 맞는 자전거를 찾아보세요.
          </p>
        </div>

        {/* 자전거 카드 그리드 */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bicycleTypes.map((bicycle, index) => (
            <Card
              key={index}
              className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="relative aspect-[3/4]">
                {/* 이미지 플레이스홀더 */}
                <div className="absolute inset-0 bg-gradient-to-br from-muted to-border flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <div className="w-8 h-8 bg-muted-foreground/30 rounded-full" />
                    </div>
                    <p className="text-muted-foreground text-sm">자전거 이미지</p>
                  </div>
                </div>

                {/* 그라데이션 오버레이 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* 텍스트 오버레이 */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  {bicycle.featured && bicycle.description && (
                    <div className="mb-3">
                      <p className="body-small opacity-90 leading-relaxed">{bicycle.description}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <h3 className="heading-6 font-bold">{bicycle.title}</h3>

                    {bicycle.featured && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/30 text-white hover:bg-white hover:text-foreground text-xs px-3 py-1 h-auto"
                      >
                        VIEW MORE
                      </Button>
                    )}
                  </div>
                </div>

                {/* 호버 효과 */}
                <div className="absolute inset-0 bg-figma-alizarin-crimson/0 group-hover:bg-figma-alizarin-crimson/10 transition-colors duration-300" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
