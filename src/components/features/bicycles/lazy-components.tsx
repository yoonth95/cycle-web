/**
 * 자전거 관련 컴포넌트들의 동적 로딩
 * 번들 크기 최적화를 위해 큰 컴포넌트들을 lazy loading으로 처리
 */

import dynamic from "next/dynamic";

// 자전거 페이지 렌더러 (지연 로딩)
export const LazyBicyclePageLayoutRenderer = dynamic(
  () =>
    import("@/components/features/bicycles/page").then((mod) => ({
      default: mod.BicyclePageLayoutRenderer,
    })),
  {
    loading: () => (
      <div className="animate-pulse space-y-4">
        <div className="h-8 rounded bg-gray-200"></div>
        <div className="h-64 rounded bg-gray-200"></div>
      </div>
    ),
    ssr: true, // SSR 유지 (SEO를 위해)
  },
);

// 자전거 스타일 페이지 렌더러 (지연 로딩)
export const LazyBicycleStylePageLayoutRenderer = dynamic(
  () =>
    import("@/components/features/bicycles/style").then((mod) => ({
      default: mod.BicycleStylePageLayoutRenderer,
    })),
  {
    loading: () => (
      <div className="animate-pulse space-y-4">
        <div className="h-12 rounded bg-gray-200"></div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 rounded bg-gray-200"></div>
          ))}
        </div>
      </div>
    ),
    ssr: true,
  },
);

// 카테고리 레이아웃 렌더러 (지연 로딩)
export const LazyCategoryLayoutRenderer = dynamic(
  () =>
    import("@/components/features/bicycles/category").then((mod) => ({
      default: mod.CategoryLayoutRenderer,
    })),
  {
    loading: () => (
      <div className="grid animate-pulse grid-cols-1 gap-8 lg:grid-cols-4">
        {/* 사이드바 스켈레톤 */}
        <div className="space-y-4 lg:col-span-1">
          <div className="h-8 rounded bg-gray-200"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-6 rounded bg-gray-200"></div>
          ))}
        </div>
        {/* 콘텐츠 스켈레톤 */}
        <div className="space-y-6 lg:col-span-3">
          <div className="h-12 rounded bg-gray-200"></div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="h-64 rounded bg-gray-200"></div>
            ))}
          </div>
        </div>
      </div>
    ),
    ssr: true,
  },
);

export default {
  LazyBicyclePageLayoutRenderer,
  LazyBicycleStylePageLayoutRenderer,
  LazyCategoryLayoutRenderer,
};
