import { Skeleton } from "@/components/ui/skeleton";

export function ServicesSkeleton() {
  return (
    <section className="pt-16 lg:pt-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* 섹션 헤더 스켈레톤 */}
        <div className="mb-12 space-y-4 text-center">
          <Skeleton className="mx-auto h-8 w-48" />
          <Skeleton className="mx-auto h-4 w-96" />
        </div>

        {/* 서비스 카드 그리드 스켈레톤 */}
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4 rounded-lg border p-8 text-center">
              <Skeleton className="mx-auto h-16 w-16 rounded-full" />
              <Skeleton className="mx-auto h-6 w-24" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="mx-auto h-4 w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
