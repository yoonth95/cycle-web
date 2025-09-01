import { Skeleton } from "@/components/ui/skeleton";

export function BicycleTypesSkeleton() {
  return (
    <section className="pt-16 lg:pt-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* 섹션 헤더 스켈레톤 */}
        <div className="mb-12 space-y-4 text-center">
          <Skeleton className="mx-auto h-8 w-48" />
          <Skeleton className="mx-auto h-4 w-96" />
        </div>

        {/* 데스크톱 그리드 */}
        <div className="hidden sm:block">
          <div className="grid grid-cols-3 gap-6 xl:grid-cols-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="aspect-[3/4] rounded-lg" />
            ))}
          </div>
        </div>

        {/* 모바일 그리드 */}
        <div className="sm:hidden">
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col items-center space-y-2">
                <Skeleton className="h-24 w-24 rounded" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
