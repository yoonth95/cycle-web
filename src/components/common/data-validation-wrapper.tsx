import { ReactNode } from "react";
import { notFound } from "next/navigation";

interface DataValidationWrapperProps<T> {
  data: T | null | undefined;
  children: (data: T) => ReactNode;
  onError?: () => void; // 데이터가 없을 때 사용할 대체 함수
}

/**
 * 데이터 검증 래퍼 컴포넌트
 * - 서버 컴포넌트에서 사용 가능
 * - 데이터가 null/undefined일 때 Next.js notFound() 호출
 * - 타입 안전성 보장
 */
const DataValidationWrapper = <T,>({
  data,
  children,
  onError = notFound,
}: DataValidationWrapperProps<T>) => {
  if (!data) {
    onError();
    return null;
  }

  return <>{children(data)}</>;
};

// 하위 호환성을 위한 alias (기존 이름 유지)
export default DataValidationWrapper;
