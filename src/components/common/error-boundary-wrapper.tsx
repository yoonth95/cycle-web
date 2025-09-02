import { ReactNode } from "react";
import { notFound } from "next/navigation";

interface ErrorBoundaryWrapperProps<T> {
  data: T | null | undefined;
  children: (data: T) => ReactNode;
  onError?: () => void; // 데이터가 없을 때 사용할 대체 함수
}

const ErrorBoundaryWrapper = <T,>({
  data,
  children,
  onError = notFound,
}: ErrorBoundaryWrapperProps<T>) => {
  if (!data) {
    onError();
    return null;
  }

  return <>{children(data)}</>;
};

export default ErrorBoundaryWrapper;
