import { SectionHeader } from "@/components/common";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function BlogLoading() {
  return (
    <div className="container mx-auto px-2 py-8">
      <SectionHeader
        title="블로그 리뷰"
        description="다양한 자전거 관련 블로그와 리뷰를 만나보세요."
      />

      <div className="flex items-center justify-center py-16">
        <LoadingSpinner message="블로그 리뷰를 불러오는 중..." fullScreen={false} />
      </div>
    </div>
  );
}
