"use client";

import { useEffect } from "react";
import { devPerformanceUtils } from "@/utils/performance-tracker";

/**
 * 개발 환경에서만 사용되는 성능 모니터링 컴포넌트
 * 프로덕션 빌드에서는 제외됨
 */
export function DevPerformanceMonitor() {
  useEffect(() => {
    // 개발 환경에서만 실행
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    // 전역 객체에 성능 유틸리티 추가
    if (typeof window !== "undefined") {
      (window as unknown as { perfTracker: typeof devPerformanceUtils }).perfTracker =
        devPerformanceUtils;

      console.log(
        "%c🎯 Performance Tracker Loaded",
        "color: #10b981; font-weight: bold; font-size: 14px;",
      );
      console.log("%cUse window.perfTracker for analysis:", "color: #6b7280; font-size: 12px;");
      console.log("%c- window.perfTracker.showAllResults()", "color: #3b82f6; font-size: 11px;");
      console.log("%c- window.perfTracker.showStats()", "color: #3b82f6; font-size: 11px;");
    }
  }, []);

  // 개발 환경이 아니면 아무것도 렌더링하지 않음
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return null; // UI는 렌더링하지 않음 (콘솔만 사용)
}

export default DevPerformanceMonitor;
