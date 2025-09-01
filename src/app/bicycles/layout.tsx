"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { markNavigationStart } from "@/utils/performance-tracker";

// 성능 추적 스크립트를 동적으로 로드 (개발 환경에서만)
const DevPerformanceMonitor = dynamic(
  () =>
    import("@/components/common/dev-performance-monitor").then((mod) => ({
      default: mod.DevPerformanceMonitor,
    })),
  {
    ssr: false,
    loading: () => null, // 로딩 UI 없음 (개발 도구이므로)
  },
);

export default function BicyclesLayout({ children }: { children: React.ReactNode }) {
  const handleLinkClick = (targetUrl: string) => {
    markNavigationStart(targetUrl);
  };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50">
      {/* 개발 환경에서만 성능 모니터 로드 */}
      {process.env.NODE_ENV === "development" && <DevPerformanceMonitor />}

      <div className="flex flex-col gap-3">
        <Link href="/bicycles" prefetch={true} onClick={() => handleLinkClick("/bicycles")}>
          자전거 페이지
        </Link>
        <Link
          href="/bicycles/style"
          prefetch={true}
          onClick={() => handleLinkClick("/bicycles/style")}
        >
          스타일 페이지
        </Link>
        <Link
          href="/bicycles/style/smart-mobility"
          prefetch={true}
          onClick={() => handleLinkClick("/bicycles/style/smart-mobility")}
        >
          전기 자전거
        </Link>
      </div>
      {children}
    </main>
  );
}
