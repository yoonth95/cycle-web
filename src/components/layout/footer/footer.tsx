import { Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-figma-ebony text-white py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center space-y-6">
          {/* 매장명 */}
          <h2 className="heading-4 text-white">삼천리 자전거 중동역점</h2>

          {/* 위치 설명 */}
          <p className="body-medium text-muted-foreground">부천 중동 북부역 상동시장입구 대로변</p>

          {/* 연락처 정보 */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span className="mono-small">전화: 032-326-3002</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span className="mono-small">휴대폰: 010-3112-9310</span>
            </div>
          </div>

          {/* 마감 인사 */}
          <p className="body-small text-muted-foreground">
            언제나 주시면 친절하게 안내해 드리겠습니다. 출기운을 되세요~ 고맙습니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
