import { Skeleton } from "@/components/ui/skeleton";

export function LocationSkeleton() {
  return (
    <section className="py-16 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* 섹션 헤더 스켈레톤 */}
        <div className="mb-12 space-y-4 text-center">
          <Skeleton className="mx-auto h-8 w-48" />
          <Skeleton className="mx-auto h-4 w-96" />
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* 지도 영역 스켈레톤 */}
          <div className="flex flex-col gap-4">
            <Skeleton className="aspect-[4/3] rounded-lg" />
            <div className="flex justify-end">
              <Skeleton className="h-10 w-20" />
            </div>
          </div>

          {/* 매장 정보 스켈레톤 */}
          <div className="flex flex-col justify-between gap-6">
            <Skeleton className="h-6 w-24" />

            <div className="space-y-6">
              {/* 정보 항목들 */}
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start gap-4 border-b pb-4">
                  <Skeleton className="h-6 w-6 rounded" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
