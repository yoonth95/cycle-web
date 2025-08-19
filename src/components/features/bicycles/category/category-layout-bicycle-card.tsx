"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BicycleFromDB } from "@/types/bicycle";

const getTagColor = (color: string) => {
  const colorMap: Record<string, string> = {
    red: "bg-red-500 text-white",
    green: "bg-green-500 text-white",
    blue: "bg-blue-500 text-white",
    yellow: "bg-yellow-500 text-white",
    purple: "bg-purple-500 text-white",
    orange: "bg-orange-500 text-white",
    gray: "bg-gray-500 text-white",
  };
  return colorMap[color] || "bg-gray-500 text-white";
};

interface CategoryLayoutBicycleCardProps {
  bicycle: BicycleFromDB;
  categorySlug?: string;
}

const CategoryLayoutBicycleCard = ({ bicycle, categorySlug }: CategoryLayoutBicycleCardProps) => {
  const router = useRouter();

  return (
    <div
      key={bicycle.id}
      className="group flex cursor-pointer flex-col rounded-lg bg-white transition-shadow hover:shadow-sm"
      onClick={() => {
        router.push(`/bicycles/style/${categorySlug}/${bicycle.id}`);
      }}
    >
      {/* 자전거 이미지 */}
      <AspectRatio ratio={26 / 15} className="relative rounded-t">
        <Image
          src={bicycle.images[0] || "/bike.png"}
          alt={bicycle.name}
          fill
          className="rounded-t object-cover"
        />

        {/* 태그들 */}
        <div className="absolute top-2 left-2 flex gap-1">
          {bicycle.tags.map((tag, index) => (
            <Badge
              key={index}
              variant={tag.variant}
              className={`rounded px-2 py-1 text-xs font-medium ${getTagColor(tag.color)}`}
            >
              {tag.label}
            </Badge>
          ))}
        </div>
      </AspectRatio>

      {/* 자전거 정보 */}
      <div className="flex h-full flex-col justify-between gap-10 rounded-b border-x border-b border-gray-200 p-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-gray-900">{bicycle.name}</h3>
          <p className="line-clamp-2 h-11 text-sm text-gray-600">{bicycle.description}</p>

          {/* 특징 */}
          <div>
            <div className="flex flex-wrap gap-1">
              {(bicycle.features || []).slice(0, 3).map((content, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {content}
                </Badge>
              ))}
              {bicycle.features.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{bicycle.features.length - 3}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* 버튼 */}
        <Button className="w-full bg-red-500 group-hover:bg-red-600">자세히 보기</Button>
      </div>
    </div>
  );
};

export default CategoryLayoutBicycleCard;
