"use client";

import { useEffect } from "react";
import { markNavigationEnd } from "@/utils/performance-tracker";

interface PerformanceTrackerProps {
  /** 현재 페이지의 URL 경로 */
  currentPath: string;
  /** 성능 측정 완료 시 호출될 콜백 함수 (선택사항) */
  onMeasurementComplete?: (duration: number) => void;
}

/**
 * 페이지 로드 완료 시점을 측정하는 Client Component
 * Server Component에서 사용할 수 있도록 분리된 성능 측정 컴포넌트
 */
export function PerformanceTracker({
  currentPath,
  onMeasurementComplete,
}: PerformanceTrackerProps) {
  useEffect(() => {
    // 컴포넌트가 마운트되면 페이지 로드가 완료된 것으로 간주
    const result = markNavigationEnd(currentPath);

    if (result && onMeasurementComplete) {
      onMeasurementComplete(result.duration);
    }
  }, [currentPath, onMeasurementComplete]);

  // 이 컴포넌트는 UI를 렌더링하지 않음 (성능 측정만 담당)
  return null;
}

/**
 * usePathname을 사용하여 현재 경로를 자동으로 감지하는 버전
 */
export function AutoPerformanceTracker({
  onMeasurementComplete,
}: Pick<PerformanceTrackerProps, "onMeasurementComplete">) {
  useEffect(() => {
    // 현재 URL 경로 감지
    const currentPath = window.location.pathname;

    const result = markNavigationEnd(currentPath);

    if (result && onMeasurementComplete) {
      onMeasurementComplete(result.duration);
    }
  }, [onMeasurementComplete]);

  return null;
}
