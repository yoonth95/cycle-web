import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

const CategoryLayoutBicycleSkeleton = () => {
  return (
    <div className="flex flex-col rounded-lg border border-gray-200 bg-white">
      {/* 자전거 이미지 스켈레톤 */}
      <AspectRatio ratio={26 / 15} className="relative rounded-t">
        <Skeleton className="h-full w-full rounded-t rounded-b-none" />
      </AspectRatio>

      {/* 자전거 정보 스켈레톤 */}
      <div className="flex h-full flex-col justify-between gap-10 rounded-b p-4">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-10 w-full" />

          {/* 특징 스켈레톤 */}
          <div className="flex flex-wrap gap-1">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-14" />
          </div>
        </div>

        {/* 버튼 스켈레톤 */}
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
};

export default CategoryLayoutBicycleSkeleton;
