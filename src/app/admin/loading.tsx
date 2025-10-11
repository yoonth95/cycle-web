import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function AdminLoading() {
  return (
    <LoadingSpinner size="default" fullScreen={true} message="관리자 영역을 불러오는 중입니다..." />
  );
}
