import { Skeleton } from "@/components/ui/skeleton";

export function HeroSkeleton() {
  return (
    <section className="relative">
      <div className="relative container mx-auto px-6">
        <div className="grid min-h-[85vh] items-center gap-12 lg:grid-cols-5 lg:gap-9 xl:gap-12">
          {/* 텍스트 영역 스켈레톤 */}
          <div className="space-y-4 pt-10 lg:order-last lg:col-span-2 lg:pt-0 xl:space-y-8">
            {/* 배지 */}
            <Skeleton className="h-8 w-32 rounded-full" />

            {/* 제목과 설명 */}
            <div className="space-y-4 lg:space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-3/4" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-5/6" />
              </div>
            </div>

            {/* 연락처 카드들 */}
            <div className="grid gap-3 lg:gap-6">
              <Skeleton className="h-20 rounded-xl" />
              <div className="grid gap-3 sm:grid-cols-2 lg:gap-4">
                <Skeleton className="h-16 rounded-lg" />
                <Skeleton className="h-16 rounded-lg" />
              </div>
            </div>
          </div>

          {/* 이미지 영역 스켈레톤 */}
          <div className="relative lg:order-first lg:col-span-3">
            <Skeleton className="aspect-[4/3] rounded-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
