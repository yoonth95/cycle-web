import { Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-figma-ebony py-16 text-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="space-y-6 text-center">
          {/* 매장명 */}
          <h2 className="heading-4 text-white">삼천리 자전거 중동역점</h2>

          {/* 위치 설명 */}
          <p className="body-medium text-muted-foreground">
            부천시 원미구 부일로 303 삼천리자전거 중동역점
          </p>

          {/* 연락처 정보 */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="mono-small">전화: 032-326-3002</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="mono-small">휴대폰: 010-3112-9310</span>
            </div>
          </div>

          {/* 마감 인사 */}
          <p className="body-small text-muted-foreground">
            방문하시면 언제나 친절하게 안내해드리겠습니다. 즐거운 하루 되세요~
          </p>
        </div>
      </div>
    </footer>
  );
}
