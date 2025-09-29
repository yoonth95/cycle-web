import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getTagColor } from "@/utils/common";
import { BicycleFromDB } from "@/types/bicycle";

interface CategoryLayoutBicycleCardProps {
  bicycle: BicycleFromDB;
  categorySlug?: string;
}
const CategoryLayoutBicycleCard = ({ bicycle, categorySlug }: CategoryLayoutBicycleCardProps) => {
  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_IMAGE_URL}${bicycle.images[0]}`;

  return (
    <Link href={`/bicycles/style/${categorySlug}/${bicycle.id}`}>
      <div
        key={bicycle.id}
        className="group flex h-full cursor-pointer flex-col rounded-lg bg-white transition-shadow hover:shadow-sm"
      >
        {/* 자전거 이미지 */}
        <AspectRatio ratio={26 / 15} className="relative rounded-t">
          <Image
            src={imageUrl || "/bike.png"}
            alt={bicycle.name}
            fill
            className="h-full w-[520px] rounded-t border-t border-r border-l object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={false}
            quality={85}
          />

          {/* 태그들 */}
          <div className="absolute top-2 left-2 flex gap-1">
            {bicycle.tags?.map((tag, index) => (
              <Badge
                key={`tag-${bicycle.id}-${index}`}
                variant={tag.variant}
                className={`rounded px-2 py-1 text-xs font-medium text-white ${getTagColor(tag.color)}`}
              >
                {tag.label}
              </Badge>
            )) ?? null}
          </div>
        </AspectRatio>

        {/* 자전거 정보 */}
        <div className="flex h-full flex-col justify-between gap-10 rounded-b border-x border-b border-gray-200 p-4">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-gray-900">{bicycle.name}</h3>
            <p className="line-clamp-2 h-11 text-sm text-gray-600">{bicycle.description}</p>

            {/* 특징 */}
            <div className="min-h-6">
              <div className="flex flex-wrap gap-1">
                {(bicycle.features || []).slice(0, 3).map((content, index) => (
                  <Badge
                    key={`feature-${bicycle.id}-${index}`}
                    variant="secondary"
                    className="text-xs"
                  >
                    {content}
                  </Badge>
                ))}
                {(bicycle.features?.length ?? 0) > 3 && (
                  <Badge key={`feature-more-${bicycle.id}`} variant="secondary" className="text-xs">
                    +{(bicycle.features?.length ?? 0) - 3}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <Button className="w-full bg-red-500 group-hover:bg-red-600">자세히 보기</Button>
        </div>
      </div>
    </Link>
  );
};

export default CategoryLayoutBicycleCard;
