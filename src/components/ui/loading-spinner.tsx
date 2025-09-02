interface LoadingSpinnerProps {
  size?: "sm" | "default" | "lg";
  message?: string;
  fullScreen?: boolean; // 헤더를 제외한 전체 화면 높이 사용 여부
}

/**
 * figma-alizarin-crimson 색상의 로딩 스피너 컴포넌트
 * 헤더를 제외한 전체 화면 높이를 차지합니다.
 */
export function LoadingSpinner({
  size = "default",
  message = "로딩 중...",
  fullScreen = true,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-8 h-8 border-2",
    default: "w-12 h-12 border-3",
    lg: "w-16 h-16 border-4",
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={`${sizeClasses[size]} border-t-figma-alizarin-crimson animate-spin rounded-full border-gray-200`}
      />
      {message && <p className="text-sm font-medium text-gray-600">{message}</p>}
    </div>
  );

  if (!fullScreen) {
    return spinner;
  }

  return (
    <div
      className="flex items-center justify-center bg-white"
      style={{ minHeight: "calc(100vh - 80px)" }} // 헤더 높이(80px) 제외
    >
      {spinner}
    </div>
  );
}
