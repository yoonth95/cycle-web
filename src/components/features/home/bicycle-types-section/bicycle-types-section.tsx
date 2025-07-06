"use client";

import SectionHeader from "@/components/common/section-header";
import MobileBicycleTypes from "./mobile-bicycle-types";
import DesktopBicycleTypes from "./desktop-bicycle-types";
import { useMobile } from "@/hooks/use-mobile";

export const bicycleTypes = [
  {
    title: "전기자전거",
    description: "전기모터의 힘을 더하여 적은 힘으로도 편하게 주행할 수 있는 자전거",
    image: "/bike.png",
    featured: true,
  },
  {
    title: "로드",
    description: "빠른 속도와 효율적인 주행을 위한 자전거",
    image: "/bike.png",
  },
  {
    title: "하이브리드",
    description: "도시와 자연을 모두 누릴 수 있는 다목적 자전거",
    image: "/bike.png",
  },
  {
    title: "픽시",
    description: "심플하고 스타일리시한 고정기어 자전거",
    image: "/bike.png",
  },
  {
    title: "컴포트 산악형",
    description: "편안한 승차감의 산악 자전거",
    image: "/bike.png",
  },
  {
    title: "시티",
    description: "도심 주행에 최적화된 편리한 자전거",
    image: "/bike.png",
  },
  {
    title: "폴딩",
    description: "휴대성이 뛰어난 접이식 자전거",
    image: "/bike.png",
  },
  {
    title: "키즈",
    description: "아이들을 위한 안전하고 재미있는 자전거",
    image: "/bike.png",
  },
  {
    title: "주니어",
    description: "청소년을 위한 성장기 맞춤 자전거",
    image: "/bike.png",
  },
];

export function BicycleTypesSection() {
  const [isMobile, windowWidth] = useMobile({ breakpoint: 640 });

  return (
    <section className="pt-16 lg:pt-20">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeader
          title="자전거 종류"
          description="다양한 종류의 자전거를 보유하고 있습니다. 고객님의 용도에 맞는 자전거를 찾아보세요."
        />

        {isMobile ? <MobileBicycleTypes windowWidth={windowWidth} /> : <DesktopBicycleTypes />}
      </div>
    </section>
  );
}
