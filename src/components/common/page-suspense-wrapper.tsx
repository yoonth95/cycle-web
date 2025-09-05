import { Suspense, ReactNode } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface PageSuspenseWrapperProps {
  children: ReactNode;
  loadingMessage?: string; // 로딩 시 표시될 메시지
  fallback?: ReactNode; // 커스텀 fallback 컴포넌트 (제공하지 않으면 기본 LoadingSpinner 사용)
  className?: string;
}

const PageSuspenseWrapper = ({
  children,
  loadingMessage = "페이지를 불러오는 중...",
  fallback,
  className,
}: PageSuspenseWrapperProps) => {
  const defaultFallback = fallback || <LoadingSpinner message={loadingMessage} />;

  if (className) {
    return (
      <div className={className}>
        <Suspense fallback={defaultFallback}>{children}</Suspense>
      </div>
    );
  }

  return <Suspense fallback={defaultFallback}>{children}</Suspense>;
};

export default PageSuspenseWrapper;
